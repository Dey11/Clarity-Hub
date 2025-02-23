import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const roadmap = await prisma.roadmap.findUnique({
      where: { id: params.id },
      include: {
        RoadmapItem: true,
      },
    });

    if (!roadmap) {
      return NextResponse.json(
        { error: "Roadmap not found" },
        { status: 404 }
      );
    }

    if (roadmap.userId !== userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    const formattedRoadmap = {
      topics: roadmap.RoadmapItem.map((item) => ({
        name: item.name,
        subtopics: item.subtopics.map((subtopic) => ({
          name: subtopic,
          isCompleted: item.completedSubtopics.includes(subtopic),
        })),
      })),
      completion_time: roadmap.completionTime,
      resources: roadmap.RoadmapItem[0]?.resources || [],
      youtube_link: roadmap.RoadmapItem[0]?.youtubeLink || "",
    };

    return NextResponse.json(formattedRoadmap);
  } catch (error) {
    console.error("Error fetching roadmap:", error);
    return NextResponse.json(
      { error: "Failed to fetch roadmap" },
      { status: 500 }
    );
  }
}