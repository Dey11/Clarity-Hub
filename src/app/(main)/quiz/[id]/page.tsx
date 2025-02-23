"use client";

import { useState } from "react";

import { H2 } from "@/components/typography/h2";
import { Para } from "@/components/typography/para";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface Quiz {
  topic: string;
  description: string;
  questions: Question[];
}

export default function QuizView({ params }: { params: { id: string } }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  // Mock quiz data - in a real app, this would be fetched based on the ID
  const [quiz] = useState<Quiz>({
    topic: "Database Management Systems",
    description: "Test your knowledge of basic database concepts",
    questions: [
      {
        id: 1,
        text: "What is the primary purpose of a Database Management System?",
        options: [
          "To store data only",
          "To manage and organize data efficiently",
          "To create backups",
          "To generate reports",
        ],
        correctAnswer: 1,
      },
      {
        id: 2,
        text: "Which of the following is NOT a type of database model?",
        options: [
          "Relational Model",
          "Network Model",
          "Linear Model",
          "Hierarchical Model",
        ],
        correctAnswer: 2,
      },
      {
        id: 3,
        text: "What is a primary key in a database?",
        options: [
          "The first column in a table",
          "A unique identifier for each record",
          "The most important data in a table",
          "A password for database access",
        ],
        correctAnswer: 1,
      },
    ],
  });

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    const totalQuestions = quiz.questions.length;
    let correctAnswers = 0;

    quiz.questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    setScore((correctAnswers / totalQuestions) * 100);
    setShowResults(true);
  };

  const question = quiz.questions[currentQuestion];

  return (
    <div className="p-10 pl-32">
      <div className="mb-10">
        <H2>{quiz.topic}</H2>
        <Para>{quiz.description}</Para>
      </div>

      {!showResults ? (
        <div className="rounded-xl bg-white p-6">
          <div className="mb-6">
            <div className="mb-2 flex justify-between">
              <span className="text-sm text-gray-500">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round((Object.keys(selectedAnswers).length / quiz.questions.length) * 100)}% Complete
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-brand-logo-text transition-all"
                style={{
                  width: `${(Object.keys(selectedAnswers).length / quiz.questions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="mb-8">
            <h3 className="mb-6 text-xl font-semibold">{question.text}</h3>
            <RadioGroup
              value={selectedAnswers[question.id]?.toString() || ""}
              onValueChange={(value) => handleAnswerSelect(question.id, parseInt(value))}
              className="flex flex-col gap-4"
            >
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <label
                    htmlFor={`option-${index}`}
                    className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            {currentQuestion === quiz.questions.length - 1 ? (
              <Button
                onClick={handleSubmit}
                className="bg-brand-logo-text text-white hover:bg-brand-logo-text/90"
                disabled={Object.keys(selectedAnswers).length !== quiz.questions.length}
              >
                Submit
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="bg-brand-logo-text text-white hover:bg-brand-logo-text/90"
                disabled={!selectedAnswers[question.id]}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="rounded-xl bg-white p-6">
          <div className="mb-6 text-center">
            <h3 className="mb-4 text-2xl font-bold">
              Quiz Complete!
            </h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-brand-logo-text">
                {Math.round(score)}%
              </span>
            </div>
            <Para>
              You got {Math.round((score / 100) * quiz.questions.length)} out of {quiz.questions.length} questions correct.
            </Para>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={() => {
                setShowResults(false);
                setCurrentQuestion(0);
                setSelectedAnswers({});
                setScore(0);
              }}
              className="bg-brand-logo-text text-white hover:bg-brand-logo-text/90"
            >
              Retake Quiz
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}