
import { Subject, GradeLevel, Module } from '../types';
import { GRADE_6_SUBJECTS, GRADE_6_MODULES } from './grade6';
import { GRADE_5_SUBJECTS, GRADE_5_MODULES } from './grade5';
import { GRADE_3_SUBJECTS, GRADE_3_MODULES } from './grade3';
import { GRADE_TLE_SUBJECTS, GRADE_TLE_MODULES } from './gradetle';

// --- PLACEHOLDER DATA FOR OTHER GRADES (To ensure app doesn't crash) ---
const PLACEHOLDER_SUBJECTS: Subject[] = [
    { id: 'math', name: 'Mathématiques', icon: 'Calculator', progress: 0, color: 'bg-blue-500' },
    { id: 'fr', name: 'Français', icon: 'BookOpen', progress: 0, color: 'bg-pink-500' }
];
const PLACEHOLDER_MODULES: Record<string, Module[]> = {
    'math': [{ id: 'm1', title: 'Algèbre', units: [{ id: 'u1', title: 'Révisions', chapters: [] }] }]
};

// ============================================================================
// AGGREGATOR
// ============================================================================

export const CURRICULUM_SUBJECTS: Record<GradeLevel, Subject[]> = {
  '6eme': GRADE_6_SUBJECTS,
  '5eme': GRADE_5_SUBJECTS,
  '4eme': PLACEHOLDER_SUBJECTS,
  '3eme': GRADE_3_SUBJECTS,
  '2nde': PLACEHOLDER_SUBJECTS,
  '1ere': PLACEHOLDER_SUBJECTS,
  'tle':  GRADE_TLE_SUBJECTS,
};

export const CURRICULUM_MODULES: Record<GradeLevel, Record<string, Module[]>> = {
  '6eme': GRADE_6_MODULES,
  '5eme': GRADE_5_MODULES,
  '4eme': PLACEHOLDER_MODULES,
  '3eme': GRADE_3_MODULES,
  '2nde': PLACEHOLDER_MODULES,
  '1ere': PLACEHOLDER_MODULES,
  'tle':  GRADE_TLE_MODULES,
};
