"use client";

import { useState } from "react";

import { H2 } from "@/components/typography/h2";
import { Para } from "@/components/typography/para";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface Subtopic {
  name: string;
  isCompleted: boolean;
}

interface Subtopic {
  name: string;
  isCompleted: boolean;
  aiStudyMaterial?: string;
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
  // In a real app, fetch the roadmap data using the ID
  const [roadmap, setRoadmap] = useState<Roadmap>({
    topics: [
      {
        name: "Introduction to Database Management Systems",
        subtopics: [
          { name: "Purpose of Database Systems", isCompleted: false },
          { name: "Data Models", isCompleted: false },
          { name: "Database Languages", isCompleted: false },
          { name: "Transaction Management", isCompleted: false },
        ],
      },
      {
        name: "Advanced Database Concepts",
        subtopics: [
          { name: "Query Optimization", isCompleted: false },
          { name: "Concurrency Control", isCompleted: false },
          { name: "Database Recovery", isCompleted: false },
          { name: "Distributed Databases", isCompleted: false },
        ],
      },
    ],
    completion_time: 4,
    resources: [
      "Silberschatz, Korth and Sudarshan, 'Database System Concepts'",
      "Ramakrishnan and Gehrke, 'Database Management Systems'",
      "Garcia-Molina, Ullman, and Widom, 'Database Systems: The Complete Book'",
    ],
    youtube_link: "https://www.youtube.com/watch?v=6Iu45VZGQDk",
  });

  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAiContent, setShowAiContent] = useState<{ [key: string]: boolean }>({}); 

  const toggleSubtopic = (topicIndex: number, subtopicIndex: number) => {
    const updatedTopics = [...roadmap.topics];
    updatedTopics[topicIndex].subtopics[subtopicIndex].isCompleted = 
      !updatedTopics[topicIndex].subtopics[subtopicIndex].isCompleted;
    setRoadmap({ ...roadmap, topics: updatedTopics });
  };

  const handleTakeQuiz = (topicIndex: number) => {
    const completedSubtopics = roadmap.topics[topicIndex].subtopics
      .filter(subtopic => subtopic.isCompleted)
      .map(subtopic => subtopic.name);
    
    // Mock API call to generate quiz
    console.log('Generating quiz for completed topics:', completedSubtopics);
    alert('Quiz generation feature coming soon!');
  };

  const toggleAiContent = (topicIndex: number, subtopicIndex: number) => {
    const key = `${topicIndex}-${subtopicIndex}`;
    setShowAiContent(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

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
              <Button
                onClick={() => handleTakeQuiz(topicIndex)}
                className="bg-brand-logo-text text-white hover:bg-brand-logo-text/90"
              >
                Take Quiz
              </Button>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="flex flex-col gap-4">
                {topic.subtopics.map((subtopic, subtopicIndex) => (
                  <div key={subtopicIndex} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={subtopic.isCompleted}
                          onCheckedChange={() => toggleSubtopic(topicIndex, subtopicIndex)}
                        />
                        <span
                          className={`text-lg ${subtopic.isCompleted ? "text-gray-400 line-through" : ""}`}
                        >
                          {subtopic.name}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleAiContent(topicIndex, subtopicIndex)}
                      >
                        {showAiContent[`${topicIndex}-${subtopicIndex}`] ? "Hide Content" : "Learn More"}
                      </Button>
                    </div>
                    {showAiContent[`${topicIndex}-${subtopicIndex}`] && (
                      <div className="ml-10 rounded-lg bg-gray-50 p-4">
                        <p className="text-sm text-gray-600">
                          AI-generated study material for {subtopic.name} will appear here.
                          This content will include key concepts, examples, and practice questions.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-6">
                <div className="rounded-xl bg-gray-50 p-6">
                  <h3 className="mb-4 text-xl font-semibold">Recommended Resources</h3>
                  <ul className="list-inside list-disc space-y-2">
                    {roadmap.resources.map((resource, index) => (
                      <li key={index} className="text-lg">{resource}</li>
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
