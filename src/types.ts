export type UserRole = "Student" | "Mentor" | "Admin" | "Others";

export interface VidyonProfile {
  id: string;
  email: string;
  name: string;
  avatar: string;
  role: UserRole;
  isVidyonSso: boolean;
  educationLevel: string;
  experienceLevel: string;
  goals: string[];
  preferredLanguage: string;
  interests?: string[];
}

export interface GamificationState {
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string;
  missions: DailyMission[];
  achievements: Achievement[];
  leaderboard: LeaderboardEntry[];
}

export interface DailyMission {
  id: string;
  description: string;
  target: number;
  current: number;
  rewardXp: number;
  completed: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  xp: number;
  avatar: string;
  isCurrentUser?: boolean;
}

export interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  status: "locked" | "available" | "completed";
  category: "frontend" | "backend" | "fullstack" | "python" | "ai" | "datascience" | "security";
  estimatedXp: number;
  lessonsCount: number;
  challengeText?: string;
  optionsAnswers?: string[];
  correctAnswer?: string;
}

export interface CodeFile {
  name: string;
  content: string;
  language: string;
}

export interface SandboxProject {
  id: string;
  title: string;
  files: CodeFile[];
  activeFile: string;
  language: "javascript" | "python" | "html" | "css" | "cpp";
}

export interface CodingChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  stubCode: string;
  starterCode: string;
  tests: {
    input: string;
    expected: string;
  }[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: string;
}

export interface ResumeAtsResult {
  score: number;
  feedback: string;
  matchingPercentage: number;
  missingSkills: string[];
  recommendedCourses: string[];
}
