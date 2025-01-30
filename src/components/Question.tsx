import React from 'react';
import { Question as QuestionType } from '../types/quiz';

interface QuestionProps {
  question: QuestionType;
  onAnswer: (answer: string) => void;
}

export const Question: React.FC<QuestionProps> = ({ question, onAnswer }) => {
  return (
    <div className="space-y-6">
      <div className="w-full max-w-3xl p-8 mx-auto bg-white shadow-lg rounded-xl">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">{question.description}</h2>
        {question.photo_url && (
          <img 
            src={question.photo_url} 
            alt="Question" 
            className="h-auto max-w-full mb-6 rounded-lg"
          />
        )}
        <div className="grid gap-4">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => onAnswer(option.description)}
              className="w-full p-4 font-medium text-left transition-all duration-200 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50"
            >
              {option.photo_url ? (
                <img src={option.photo_url} alt={option.description} className="h-auto max-w-full" />
              ) : (
                option.description
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
