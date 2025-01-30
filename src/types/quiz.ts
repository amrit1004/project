export interface Option {
  id: number;
  description: string;
  is_correct: boolean;
  photo_url: string | null;
  unanswered: boolean;
}

export interface ReadingMaterial {
  id: number;
  keywords: string;
  content_sections: string[];
}

export interface Question {
  id: number;
  description: string;
  detailed_solution: string;
  options: Option[];
  topic: string;
  photo_url: string | null;
  photo_solution_url: string | null;
  reading_material?: ReadingMaterial;
}

export interface Quiz {
  id: number;
  title: string;
  description: string;
  topic: string;
  duration: number;
  negative_marks: string;
  correct_answer_marks: string;
  questions: Question[];
  questions_count: number;
  max_mistake_count: number;
  show_answers: boolean;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  answers: Record<number, string>;
  isComplete: boolean;
  streak: number;
  timeSpent: number;
  mistakeCount: number;
}