
import { TimeSlot, Homework } from '../types';

export const WEEKLY_SCHEDULE: TimeSlot[] = [
  // Monday
  { id: 's1', day: 'Mon', startTime: '08:00', endTime: '10:00', subjectId: 'Mathématiques', room: 'Salle 12' },
  { id: 's2', day: 'Mon', startTime: '10:00', endTime: '12:00', subjectId: 'Hist-Géo', room: 'Salle 04' },
  { id: 's3', day: 'Mon', startTime: '14:00', endTime: '16:00', subjectId: 'Anglais', room: 'Labo 2' },
  
  // Tuesday
  { id: 's4', day: 'Tue', startTime: '08:00', endTime: '10:00', subjectId: 'SVT', room: 'Salle Bio' },
  { id: 's5', day: 'Tue', startTime: '10:00', endTime: '12:00', subjectId: 'Sport', room: 'Terrain B' },
  { id: 's6', day: 'Tue', startTime: '14:00', endTime: '16:00', subjectId: 'Français', room: 'Salle 12' },

  // Wednesday
  { id: 's7', day: 'Wed', startTime: '08:00', endTime: '10:00', subjectId: 'Mathématiques', room: 'Salle 12' },
  { id: 's8', day: 'Wed', startTime: '10:00', endTime: '12:00', subjectId: 'Informatique', room: 'Salle Info' },
];

export const HOMEWORK_TASKS: Homework[] = [
  {
    id: 'hw1',
    subjectId: 'Mathématiques',
    title: 'Ex 4 page 22 (Algèbre)',
    dueDate: 'Demain',
    status: 'todo'
  },
  {
    id: 'hw2',
    subjectId: 'Hist-Géo',
    title: 'Dessiner la carte du Cameroun',
    dueDate: 'Dans 2 jours',
    status: 'submitted'
  },
  {
    id: 'hw3',
    subjectId: 'Anglais',
    title: 'Learn the irregular verbs',
    dueDate: 'Semaine prochaine',
    status: 'todo'
  },
  {
    id: 'hw4',
    subjectId: 'SVT',
    title: 'Schéma de la cellule',
    dueDate: 'Hier',
    status: 'graded',
    grade: 15
  }
];
