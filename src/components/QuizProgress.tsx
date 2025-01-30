import React, { useState, useEffect } from 'react';
import { Timer, Award, Zap, AlertTriangle } from 'lucide-react';
import { QuizSummary } from './QuizSummary'; // Import your QuizSummary component
import { Question } from '../types/quiz';

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  score: number;
  streak: number;
  mistakeCount: number;
  maxMistakes?: number;
  questions: Question[];
  answers: Record<number, string>;
  onRestart: () => void;
}

export const QuizProgress: React.FC<QuizProgressProps> = ({
  currentQuestion,
  totalQuestions,
  score,
  streak,
  mistakeCount,
  maxMistakes = 9,
  questions,
  answers,
  onRestart,
}) => {
  const progress = (currentQuestion / totalQuestions) * 100;

  // State to track the countdown
  const [timeLeft, setTimeLeft] = useState<number>(300); // 5 minutes in seconds
  const [timeUp, setTimeUp] = useState<boolean>(false); // State to track if time is up

  useEffect(() => {
    if (timeLeft === 0) {
      setTimeUp(true); // Set timeUp to true when time is up
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // If time is up, show the quiz summary
  if (timeUp) {
    return (
      <QuizSummary
        questions={questions}
        answers={answers}
        score={score}
        onRestart={onRestart}
      />
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-600" />
            <span className="font-semibold">{score} pts</span>
          </div>
          {streak > 0 && (
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold text-yellow-500">{streak}x Streak!</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <AlertTriangle className={`w-5 h-5 ${mistakeCount > maxMistakes / 2 ? 'text-red-500' : 'text-gray-400'}`} />
            <span className={`font-medium ${mistakeCount > maxMistakes / 2 ? 'text-red-500' : 'text-gray-600'}`}>
              {maxMistakes - mistakeCount} lives left
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Timer className="w-5 h-5 text-gray-600" />
          <span className="font-medium">
            Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </span>
        </div>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div
          className="h-full transition-all duration-300 bg-purple-600 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
