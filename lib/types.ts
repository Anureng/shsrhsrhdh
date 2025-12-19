export interface MathProblem {
  id: string;
  title: string;
  description: string;
  question: string;
  problemType: 'algebra' | 'geometry' | 'calculus' | 'statistics' | 'arithmetic' | 'trigonometry';
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  category: string;
  subcategory: string;
  correctAnswer: number | string;
  explanation: string;
  hints: string[];
  tags: string[];
  author: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  attempts: number;
  successRate: number;
  averageTime: number;
  imageUrl?: string;
  formula?: string;
  relatedProblems: string[];
}

export interface Solution {
  id: string;
  problemId: string;
  userAnswer: number | string;
  isCorrect: boolean;
  timeSpent: number;
  steps: SolutionStep[];
  submittedAt: string;
  score: number;
}

export interface SolutionStep {
  stepNumber: number;
  description: string;
  calculation: string;
  result: string;
}

export interface QuizSession {
  id: string;
  userId: string;
  problemIds: string[];
  currentProblemIndex: number;
  startedAt: string;
  completedAt?: string;
  solutions: Solution[];
  totalScore: number;
  timeLimit?: number;
  isCompleted: boolean;
}

export interface UserStats {
  userId: string;
  totalAttempts: number;
  correctAnswers: number;
  accuracy: number;
  averageTime: number;
  totalTimeSpent: number;
  problemsSolved: string[];
  categoryStats: CategoryStat[];
  streakDays: number;
  lastActivityDate: string;
  preferredDifficulty: 'easy' | 'medium' | 'hard' | 'expert';
}

export interface CategoryStat {
  category: string;
  attempted: number;
  correct: number;
  accuracy: number;
  averageTime: number;
}

export interface MathCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  problemCount: number;
  subcategories: string[];
}

export interface DifficultyLevel {
  level: 'easy' | 'medium' | 'hard' | 'expert';
  minScore: number;
  maxScore: number;
  avgTimeMinutes: number;
  description: string;
}

export interface ProblemFilter {
  problemTypes?: string[];
  difficulties?: string[];
  categories?: string[];
  tags?: string[];
  author?: string;
  minSuccessRate?: number;
  maxAttempts?: number;
  dateRange?: {
    from: string;
    to: string;
  };
}

export interface ProblemSort {
  field: 'title' | 'difficulty' | 'createdAt' | 'views' | 'successRate' | 'averageTime';
  direction: 'asc' | 'desc';
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export interface ListViewState {
  problems: MathProblem[];
  filters: ProblemFilter;
  sort: ProblemSort;
  pagination: PaginationState;
  searchQuery: string;
  isLoading: boolean;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  layout: 'grid' | 'list' | 'compact';
  showHints: boolean;
  showExplanations: boolean;
  autoSubmit: boolean;
  soundEnabled: boolean;
  itemsPerPage: number;
  defaultDifficulty: 'easy' | 'medium' | 'hard' | 'expert';
}

export interface NavigationState {
  currentPage: 'dashboard' | 'list' | 'problem' | 'quiz' | 'settings';
  selectedProblemId: string | null;
  previousPage: 'dashboard' | 'list' | 'problem' | 'quiz' | 'settings' | null;
}

export interface DetailPageState {
  problem: MathProblem | null;
  relatedProblems: MathProblem[];
  userSolution?: Solution;
  author?: string;
  isLoading: boolean;
  error: string | null;
}

export interface DashboardMetrics {
  totalProblems: number;
  totalUsers: number;
  problemsSolvedToday: number;
  averageAccuracy: number;
  totalAttempts: number;
  topProblem: MathProblem | null;
  topCategory: MathCategory | null;
  recentActivity: UserStats[];
  problemsByDifficulty: {
    easy: number;
    medium: number;
    hard: number;
    expert: number;
  };
  categoryDistribution: CategoryStat[];
}

export interface AchievementBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: string;
  unlockedAt?: string;
}

export interface Leaderboard {
  rank: number;
  userId: string;
  userName: string;
  totalScore: number;
  accuracy: number;
  problemsSolved: number;
  streak: number;
}

export interface SearchResult {
  problems: MathProblem[];
  query: string;
  resultCount: number;
  executedAt: string;
}