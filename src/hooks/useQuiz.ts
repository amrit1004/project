import { useState, useEffect } from 'react';
import { QuizState, Quiz } from '../types/quiz';
import {data} from '../../data.ts'

export const useQuiz = () => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    answers: {},
    isComplete: false,
    streak: 0,
    timeSpent: 0,
    mistakeCount: 0,
  });

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch('https://api.jsonserve.com/Uw5CrX');
        if (!response.ok) throw new Error('Failed to fetch quiz data');
        const data = await response.json();
        setQuiz(data);
      } catch (err) {
        console.warn('Failed to fetch from API, using fallback data:', err);
        setQuiz(data);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, []);

  const submitAnswer = (answer: string) => {
    if (!quiz) return;

    const currentQuestion = quiz.questions[quizState.currentQuestionIndex];
    const selectedOption = currentQuestion.options.find(opt => opt.description === answer);
    const isCorrect = selectedOption?.is_correct ?? false;
    const newStreak = isCorrect ? quizState.streak + 1 : 0;
    const streakBonus = Math.floor(newStreak / 3) * 50;
    const correctPoints = parseFloat(quiz.correct_answer_marks);
    const negativePoints = parseFloat(quiz.negative_marks);

    setQuizState(prev => ({
      ...prev,
      answers: { ...prev.answers, [currentQuestion.id]: answer },
      score: prev.score + (isCorrect ? correctPoints + streakBonus : -negativePoints),
      currentQuestionIndex: prev.currentQuestionIndex + 1,
      isComplete: prev.currentQuestionIndex === quiz.questions.length - 1,
      streak: newStreak,
      mistakeCount: isCorrect ? prev.mistakeCount : prev.mistakeCount + 1,
    }));
  };

  const restartQuiz = () => {
    setQuizState({
      currentQuestionIndex: 0,
      score: 0,
      answers: {},
      isComplete: false,
      streak: 0,
      timeSpent: 0,
      mistakeCount: 0,
    });
  };

  return {
    quiz,
    questions: quiz?.questions ?? [],
    loading,
    error,
    quizState,
    submitAnswer,
    restartQuiz,
  };
};