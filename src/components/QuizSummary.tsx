import React from 'react';
import { BookOpen } from 'lucide-react';
import { ReadingMaterial } from './ReadingMaterial';
import { Trophy, Award, RotateCcw } from 'lucide-react';
import { Question } from '../types/quiz';

interface QuizSummaryProps {
  questions: Question[];
  answers: Record<number, string>;
  score: number;
  onRestart: () => void;
  showAnswers?: boolean;
}

export const QuizSummary: React.FC<QuizSummaryProps> = ({
  questions,
  answers,
  score,
  onRestart,
  showAnswers = true,
}) => {
  const correctAnswers = questions.filter(
    (q) => q.options.find(opt => opt.description === answers[q.id])?.is_correct
  ).length;

  const percentage = Math.round((correctAnswers / questions.length) * 100);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="p-8 mb-8 text-center bg-white shadow-lg rounded-xl">
        <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
        <h2 className="mb-2 text-3xl font-bold">Quiz Complete!</h2>
        <div className="flex items-center justify-center gap-4 mb-8">
          <Award className="w-8 h-8 text-purple-600" />
          <span className="text-4xl font-bold text-purple-600">{score} points</span>
        </div>
        
        <div className="mb-8">
          <div className="mb-2 text-lg">
            You got <span className="font-bold text-green-600">{correctAnswers}</span> out of{' '}
            <span className="font-bold">{questions.length}</span> questions correct
          </div>
          <div className="text-2xl font-bold text-gray-800">
            {percentage}% Accuracy
          </div>
        </div>

        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white transition-colors duration-200 bg-purple-600 rounded-lg hover:bg-purple-700"
        >
          <RotateCcw className="w-5 h-5" />
          Try Again
        </button>
      </div>

      {showAnswers && (
        <div className="p-8 bg-white shadow-lg rounded-xl">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-6 h-6 text-purple-600" />
            <h3 className="text-2xl font-bold">Detailed Solutions</h3>
          </div>
          <div className="space-y-8">
            {questions.map((question) => {
              const selectedOption = question.options.find(opt => opt.description === answers[question.id]);
              const isCorrect = selectedOption?.is_correct;

              return (
                <div key={question.id} className="pb-6 border-b last:border-b-0">
                  <p className="mb-4 font-medium">{question.description}</p>
                  <div className={`p-4 rounded-lg mb-4 ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                    <p className="mb-2 font-medium">Your Answer:</p>
                    <p className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                      {answers[question.id] || 'Not answered'}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-purple-50">
                    <p className="mb-2 font-medium">Correct Answer:</p>
                    <p className="text-purple-600">
                      {question.options.find(opt => opt.is_correct)?.description}
                    </p>
                  </div>
                  {question.detailed_solution && (
                    <div className="mt-4">
                      <p className="mb-2 font-medium">Explanation:</p>
                      <p className="text-gray-600">{question.detailed_solution}</p>
                    </div>
                  )}
                  {question.reading_material && (
                    <div className="mt-6">
                      <p className="mb-2 text-lg font-semibold text-purple-600">Please refer to the reading material below for more insights:</p>
                      <ReadingMaterial 
                        content={question.reading_material.content_sections}
                        keywords={JSON.parse(question.reading_material.keywords)}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};