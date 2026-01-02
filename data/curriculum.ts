
import { Subject, GradeLevel, Module } from '../types';
import { GRADE_6_SUBJECTS, GRADE_6_MODULES } from './grade6';
import { GRADE_5_SUBJECTS, GRADE_5_MODULES } from './grade5';
import { GRADE_4_SUBJECTS, GRADE_4_MODULES } from './grade4';
import { GRADE_3_SUBJECTS, GRADE_3_MODULES } from './grade3';
import { GRADE_1_SUBJECTS, GRADE_1_MODULES } from './grade1';
import { GRADE_TLE_SUBJECTS, GRADE_TLE_MODULES } from './gradetle';

// --- PLACEHOLDER DATA FOR 2nde (Still minimal, but structured) ---
const GRADE_2_SUBJECTS: Subject[] = [
    { id: 'math2', name: 'Mathématiques', icon: 'Calculator', progress: 0, color: 'bg-blue-600' },
    { id: 'fr2', name: 'Français', icon: 'BookOpen', progress: 0, color: 'bg-rose-600' }
];
const GRADE_2_MODULES: Record<string, Module[]> = {
    'math2': [{ id: 'm2_vect', title: 'Vecteurs', units: [{ id: 'u2_col', title: 'Colinéarité', chapters: [] }] }]
};

// ============================================================================
// AGGREGATOR
// ============================================================================

export const CURRICULUM_SUBJECTS: Record<GradeLevel, Subject[]> = {
  '6eme': GRADE_6_SUBJECTS,
  '5eme': GRADE_5_SUBJECTS,
  '4eme': GRADE_4_SUBJECTS,
  '3eme': GRADE_3_SUBJECTS,
  '2nde': GRADE_2_SUBJECTS,
  '1ere': GRADE_1_SUBJECTS,
  'tle':  GRADE_TLE_SUBJECTS,
};

export const CURRICULUM_MODULES: Record<GradeLevel, Record<string, Module[]>> = {
  '6eme': GRADE_6_MODULES,
  '5eme': GRADE_5_MODULES,
  '4eme': GRADE_4_MODULES,
  '3eme': GRADE_3_MODULES,
  '2nde': GRADE_2_MODULES,
  '1ere': GRADE_1_MODULES,
  'tle':  GRADE_TLE_MODULES,
};
