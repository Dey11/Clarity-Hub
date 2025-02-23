"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { H2 } from "@/components/typography/h2";
import { Para } from "@/components/typography/para";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function GenerateRoadmap() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("intermediate");
  const [timeline, setTimeline] = useState("4");
  const [learningStyle, setLearningStyle] = useState("balanced");
  const [priorKnowledge, setPriorKnowledge] = useState("beginner");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/generate-roadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          difficulty,
          timeline,
          learningStyle,
          priorKnowledge,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/roadmap/${data.id}`);
      }
    } catch (error) {
      console.error("Error generating roadmap:", error);
    }
  };

  return (
    <div className="p-10 pl-32">
      <div>
        <H2>Generate Study Roadmaps</H2>
        <Para>
          AI-generated roadmap with a clear breakdown of topics & subtopics.
        </Para>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-10 flex max-w-2xl flex-col gap-6"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="topic" className="text-lg font-medium">
            Enter your study topic / syllabus
          </label>
          <Input
            id="topic"
            placeholder="Ex: Database management"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="h-32 resize-none rounded-xl bg-white p-4"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="difficulty" className="text-lg font-medium">
            Difficulty Level
          </label>
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger className="bg-white text-lg">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="timeline" className="text-lg font-medium">
            Target Completion Time (weeks)
          </label>
          <Select value={timeline} onValueChange={setTimeline}>
            <SelectTrigger className="bg-white text-lg">
              <SelectValue placeholder="Select timeline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2 weeks</SelectItem>
              <SelectItem value="4">4 weeks</SelectItem>
              <SelectItem value="8">8 weeks</SelectItem>
              <SelectItem value="12">12 weeks</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="learningStyle" className="text-lg font-medium">
            Preferred Learning Style
          </label>
          <Select value={learningStyle} onValueChange={setLearningStyle}>
            <SelectTrigger className="bg-white text-lg">
              <SelectValue placeholder="Select learning style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="visual">Visual (videos, diagrams, charts)</SelectItem>
              <SelectItem value="textual">Textual (books, articles, documentation)</SelectItem>
              <SelectItem value="practical">Practical (exercises, projects, hands-on)</SelectItem>
              <SelectItem value="balanced">Balanced Mix</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="priorKnowledge" className="text-lg font-medium">
            Prior Knowledge Level
          </label>
          <Select value={priorKnowledge} onValueChange={setPriorKnowledge}>
            <SelectTrigger className="bg-white text-lg">
              <SelectValue placeholder="Select prior knowledge level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No prior knowledge</SelectItem>
              <SelectItem value="beginner">Basic understanding</SelectItem>
              <SelectItem value="intermediate">Some experience</SelectItem>
              <SelectItem value="advanced">Significant experience</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-fit rounded-none text-lg">
          GENERATE
        </Button>
      </form>
    </div>
  );
}
