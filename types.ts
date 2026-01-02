
// ==========================================
// CORE CURRICULUM ARCHITECTURE (State Machine)
// ==========================================

export type GradeLevel = '6eme' | '5eme' | '4eme' | '3eme' | '2nde' | '1ere' | 'tle';
export type StepStatus = 'locked' | 'current' | 'completed';
export type ChapterStatus = 'locked' | 'current' | 'completed';
export type AppTheme = 'light' | 'dark' | 'neon'; // NEW: Theme definition

// --- ATOMIC CONTENT TYPES ---

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizContent {
  id: string;
  question: string;
  imageUrl?: string;
  options: QuizOption[];
}

export interface ParsonsItem {
  id: string;
  content: string;
}

// --- LESSON STEPS (DISCRIMINATED UNION) ---

interface BaseStep {
  id: string;
  title: string;
  status: StepStatus;
  description?: string;
}

export interface TheoryStep extends BaseStep {
  type: 'theory';
  content: string; // Markdown/HTML
  videoUrl?: string;
}

export interface CheckpointStep extends BaseStep {
  type: 'checkpoint';
  quiz: QuizContent;
}

export interface ExerciseStep extends BaseStep {
  type: 'exercise';
  parsons: ParsonsItem[];
}

export type LessonStep = TheoryStep | CheckpointStep | ExerciseStep;

// --- HIERARCHY ---

export interface Chapter {
  id: string;
  title: string;
  status: ChapterStatus;
  xpReward: number;
  description?: string;
  steps: LessonStep[];
}

export interface Unit {
  id: string;
  title: string;
  chapters: Chapter[];
}

export interface Module {
  id: string;
  title: string;
  units: Unit[];
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  progress: number; // calculated 0-100
  color: string; // Tailwind class e.g. 'bg-blue-500'
}

// The Root State Object
export type CurriculumState = Record<GradeLevel, Record<string, Module[]>>;


// ==========================================
// USER & PROFILE TYPES
// ==========================================

export interface MedicalInfo {
  bloodType: string;
  allergies: string[];
  conditions?: string[];
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
}

export interface AdminInfo {
  matricule: string;
  dob: string;
  birthPlace: string;
  entryYear: string;
  parents: {
    father: string;
    mother: string;
  };
  eligibility: boolean;
}

export interface DisciplineRecord {
  absences: number; // Hours
  lateness: number; // Count
  sanctions: Sanction[];
}

export interface Sanction {
  id: string;
  type: 'warning' | 'blame' | 'exclusion';
  title: string;
  date: string;
  reason: string;
  severity: 'low' | 'medium' | 'high';
}

export interface Quest {
  id: string;
  title: string;
  target: number;
  current: number;
  xpReward: number;
  icon: string; // Lucide icon name
  completed: boolean;
  claimed: boolean;
}

export interface User {
  id: string;
  name: string;
  grade: string;
  school: string;
  level: number;
  xp: number;
  streak: number;
  avatarUrl: string;
  role: 'student' | 'teacher';
  isPremium: boolean;
  theme: AppTheme; 
  quests: Quest[]; // NEW: Daily Quests
  medical?: MedicalInfo;
  admin?: AdminInfo;
  discipline?: DisciplineRecord;
}

// --- TEACHER SPECIFIC ---

export interface ClassGroup {
  id: string;
  name: string; // e.g. "Terminale C"
  studentCount: number;
  nextSession: string; // e.g. "10:00 - Salle 12"
  attendanceRate: number; // Percentage
  pendingHomeworks: number;
}

// ==========================================
// AUXILIARY FEATURES (SIS, SOCIAL, ETC.)
// ==========================================

export enum Tab {
  DASHBOARD = 'dashboard',
  LEARNING = 'learning',
  SIS = 'sis',
  SOCIAL = 'social',
  AGENDA = 'agenda',
  STORE = 'store',
  NOTIFICATIONS = 'notifications'
}

export interface Grade {
  subjectId: string;
  score: number;
  outOf: number;
  coefficient: number;
  rank?: string;
  teacherAppreciation?: string;
  classAverage?: number;
  isExam?: boolean;
}

export interface Attendance {
  id: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  justified: boolean;
  justificationReason?: string;
  justificationStatus?: 'pending' | 'approved' | 'rejected' | 'none';
}

export interface PaymentTransaction {
  id: string;
  date: string;
  amount: number;
  method: 'Orange Money' | 'MTN Momo' | 'Wave';
  status: 'completed' | 'pending' | 'failed';
  label: string;
}

export interface TimeSlot {
  id: string;
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';
  startTime: string; // HH:MM
  endTime: string;   // HH:MM
  subjectId: string;
  room: string;
}

export interface Homework {
  id: string;
  subjectId: string;
  title: string;
  dueDate: string;
  status: 'todo' | 'submitted' | 'graded';
  grade?: number;
}

// --- SOCIAL ---

export interface Post {
  id: string;
  author: string;
  role: 'Admin' | 'Teacher' | 'Student';
  content: string;
  date: string;
  likes: number;
  type: 'announcement' | 'question';
  imageUrl?: string;
}

export interface Thread {
  id: string;
  contactName: string;
  contactRole: string;
  avatarUrl?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
}

export interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlocked: boolean;
  color: string;
}

export interface ForumPost {
  id: string;
  author: string;
  avatar: string;
  subject: string;
  question: string;
  likes: number;
  repliesCount: number;
  timestamp: string;
  solved: boolean;
}

export interface BlogPost {
  id: string;
  author: string;
  title: string;
  snippet: string;
  image: string;
  category: string;
  date: string;
  likes: number;
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  date: string;
  rating: number;
}
