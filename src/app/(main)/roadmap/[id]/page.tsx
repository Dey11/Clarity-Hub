"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { H2 } from "@/components/typography/h2";
import { Para } from "@/components/typography/para";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface Subtopic {
  name: string;
  isCompleted: boolean;
}

interface Topic {
  name: string;
  subtopics: Subtopic[];
}

interface Roadmap {
  topics: Topic[];
  completion_time: number;
  resources: string[];
  youtube_link: string;
}

export default function RoadmapView({ params }: { params: { id: string } }) {
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const response = await fetch(`/api/roadmap/${params.id}`);
        if (!response.ok) {
          const data = await response.json();
          if (response.status === 401) {
            router.push("/sign-in");
            return;
          }
          throw new Error(data.error || "Failed to fetch roadmap");
        }
        const data = await response.json();
        setRoadmap(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [params.id, router]);

  const toggleSubtopic = (topicIndex: number, subtopicIndex: number) => {
    if (!roadmap) return;

    const updatedTopics = [...roadmap.topics];
    updatedTopics[topicIndex].subtopics[subtopicIndex].isCompleted =
      !updatedTopics[topicIndex].subtopics[subtopicIndex].isCompleted;
    setRoadmap({ ...roadmap, topics: updatedTopics });
  };

  if (loading) {
    return (
      <div className="p-10 pl-32">
        <Para>Loading roadmap...</Para>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 pl-32">
        <Para className="text-red-500">{error}</Para>
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="p-10 pl-32">
        <Para>Roadmap not found</Para>
      </div>
    );
  }

  return (
    <div className="p-10 pl-32">
      <div className="mb-10">
        <Para>Estimated completion time: {roadmap.completion_time} weeks</Para>
      </div>

      <div className="flex flex-col gap-8">
        {roadmap.topics.map((topic, topicIndex) => (
          <div key={topicIndex} className="rounded-xl bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <H2>{topic.name}</H2>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="flex flex-col gap-4">
                {topic.subtopics.map((subtopic, subtopicIndex) => (
                  <div key={subtopicIndex} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={subtopic.isCompleted}
                          onCheckedChange={() =>
                            toggleSubtopic(topicIndex, subtopicIndex)
                          }
                        />
                        <span
                          className={`text-lg ${subtopic.isCompleted ? "text-gray-400 line-through" : ""}`}
                        >
                          {subtopic.name}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-6">
                <div className="rounded-xl bg-gray-50 p-6">
                  <h3 className="mb-4 text-xl font-semibold">
                    Recommended Resources
                  </h3>
                  <ul className="list-inside list-disc space-y-2">
                    {roadmap.resources.map((resource, index) => (
                      <li key={index} className="text-lg">
                        {resource}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl bg-gray-50 p-6">
                  <h3 className="mb-4 text-xl font-semibold">Video Resource</h3>
                  <a
                    href={roadmap.youtube_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-logo-text hover:underline"
                  >
                    Watch Tutorial
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
