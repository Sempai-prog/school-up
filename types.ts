
export type GradeLevel = '6eme' | '5eme' | '4eme' | '3eme' | '2nde' | '1ere' | 'tle';

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
  eligibility: boolean; // Exam eligibility
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
  // Extended Profile
  medical?: MedicalInfo;
  admin?: AdminInfo;
  discipline?: DisciplineRecord;
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  date: string;
  rating: number;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  progress: number;
  color: string;
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
  justificationStatus?: 'none' | 'pending' | 'approved' | 'rejected';
  justificationReason?: string;
}

export interface PaymentTransaction {
  id: string;
  date: string;
  amount: number;
  method: 'Orange Money' | 'MTN Momo' | 'Wave';
  status: 'completed' | 'pending' | 'failed';
  label: string;
}

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

// --- NEW SOCIAL TYPES ---

export interface ForumPost {
  id: string;
  author: string;
  avatar: string;
  subject: string; // e.g., 'Maths', 'SVT'
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
  category: string; // e.g., 'Sport', 'Culture'
  date: string;
  likes: number;
}

export enum Tab {
  DASHBOARD = 'dashboard',
  LEARNING = 'learning',
  SIS = 'sis',
  SOCIAL = 'social',
  AGENDA = 'agenda',
}

// --- AGENDA & HOMEWORK TYPES ---

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
  dueDate: string; // ISO date string or description like "Tomorrow" for UI simplicity in mock
  rawDate?: Date; // Optional for sorting
  status: 'todo' | 'submitted' | 'graded';
  grade?: number;
}

// --- STRICT PEDAGOGICAL TYPES ---

export type StepType = 'theory' | 'checkpoint' | 'exercise';

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

// A single step in the learning flow
export interface LessonStep {
  id: string;
  type: StepType;
  title: string;
  description?: string;
  status: 'locked' | 'current' | 'completed';
  // Payloads
  content?: string; // Markdown for Theory
  videoUrl?: string; // Video for Theory
  quiz?: QuizContent; // For Checkpoint/Exercise
  parsons?: ParsonsItem[]; // For Exercise
}

// The "Lesson Node" on the map
export interface Chapter {
  id: string;
  title: string;
  status: 'locked' | 'current' | 'completed';
  xpReward: number;
  description?: string;
  steps: LessonStep[];
}

// The "Pedagogical Unit"
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

// Chat & Social Types
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
