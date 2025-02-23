import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

import { prisma } from "@/lib/db";

const roadmapSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  level: z.string().optional(),
  exam: z.string().optional(),
  topic: z.string().min(1, "Topic/Syllabus is required"),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  timeline: z.string().min(1, "Timeline is required"),
  priorKnowledge: z.enum(["none", "beginner", "intermediate", "advanced"]),
});

type RoadmapItem = {
  name: string;
  subtopics: string[];
  completion_time: number;
  resources: string[];
  youtube_link: string;
};

async function fetchRoadmapFromExternalAPI(
  data: z.infer<typeof roadmapSchema>
): Promise<RoadmapItem[]> {
  const { subject, level, exam, topic, difficulty, timeline, priorKnowledge } =
    data;

  const res = await fetch(process.env.ROADMAP_API!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      syllabus: topic,
      subject,
      class_level: level,
      exam,
      difficulty,
      timeline,
      priorKnowledge,
    }),
  });

  const resData = await res.json();

  return resData;
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const body = await req.json();

    const validationResult = roadmapSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation error",
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    const roadmapItems = await fetchRoadmapFromExternalAPI(data);

    const roadmap = await prisma.roadmap.create({
      data: {
        userId: userId,
        syllabus: data.topic,
        subject: data.subject,
        level: data.level,
        exam: data.exam,
        difficulty: data.difficulty as "beginner" | "intermediate" | "advanced",
        completionTime: parseInt(data.timeline),
        priorKnowledge: data.priorKnowledge,
      },
    });

    await prisma.roadmapItem.createMany({
      data: roadmapItems.map((item) => ({
        roadmapId: roadmap.id,
        name: item.name,
        subtopics: item.subtopics,
        completedSubtopics: [],
        completionTime: item.completion_time,
        resources: item.resources,
        youtubeLink: item.youtube_link,
      })),
    });

    return NextResponse.json({ id: roadmap.id });
  } catch (error) {
    console.error("Error generating roadmap:", error);
    return NextResponse.json(
      { error: "Failed to generate roadmap" },
      { status: 500 }
    );
  }
}
