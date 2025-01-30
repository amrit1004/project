import React from 'react';
import { Brain } from 'lucide-react';
import { useQuiz } from './hooks/useQuiz';
import { Question } from './components/Question';
import { QuizProgress } from './components/QuizProgress';
import { QuizSummary } from './components/QuizSummary';

function App() {
  const { quiz, questions, loading, error, quizState, submitAnswer, restartQuiz } = useQuiz();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-12 h-12 border-4 border-purple-500 rounded-full animate-spin border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="mb-4 text-xl text-red-500">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!quiz || questions.length === 0) {
    return null;
  }

  if (!quizState.isComplete) {
    const currentQuestion = questions[quizState.currentQuestionIndex];

    return (
      <div className="min-h-screen px-4 py-8 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Brain className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-800">{quiz.title || 'QuizMaster'}</h1>
          </div>

          <QuizProgress
            currentQuestion={quizState.currentQuestionIndex}
            totalQuestions={questions.length}
            score={quizState.score}
            streak={quizState.streak}
            mistakeCount={quizState.mistakeCount}
            maxMistakes={quiz.max_mistake_count}
          />

          <Question
            question={currentQuestion}
            onAnswer={submitAnswer}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <QuizSummary
          questions={questions}
          answers={quizState.answers}
          score={quizState.score}
          onRestart={restartQuiz}
          showAnswers={quiz.show_answers}
        />
      </div>
    </div>
  );
}

export default App;