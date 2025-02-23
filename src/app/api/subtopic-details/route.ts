import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";

import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const subtopicName = url.searchParams.get("name");

    if (!subtopicName) {
      return NextResponse.json(
        { error: "Subtopic name is required" },
        { status: 400 }
      );
    }

    // Check if we have cached data in the database
    const existingDetails = await prisma.roadmapItem.findFirst({
      where: {
        subtopics: {
          has: subtopicName,
        },
        generatedText: {
          not: null,
        },
      },
      select: {
        generatedText: true,
      },
    });

    if (existingDetails?.generatedText) {
      return NextResponse.json({ details: existingDetails.generatedText });
    }

    // If no cached data, fetch from external API
    const response = await fetch(process.env.DATA_API!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic: subtopicName }),
    });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = await response.json();

    // Store the fetched data in the database
    await prisma.roadmapItem.updateMany({
      where: {
        subtopics: {
          has: subtopicName,
        },
      },
      data: {
        generatedText: data[0].answer,
      },
    });

    // Verify the update by retrieving the updated record
    const updatedDetails = await prisma.roadmapItem.findFirst({
      where: {
        subtopics: {
          has: subtopicName,
        },
        generatedText: {
          not: null,
        },
      },
      select: {
        generatedText: true,
      },
    });

    return NextResponse.json({ details: data[0].answer });
  } catch (error) {
    console.error("Error fetching subtopic details:", error);
    return NextResponse.json(
      { error: "Failed to fetch subtopic details" },
      { status: 500 }
    );
  }
}
