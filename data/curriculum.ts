
import { Module, Subject, GradeLevel, Chapter, Unit, LessonStep } from '../types';

// ============================================================================
// 1. FACTORY: The Chapter Generator
// ============================================================================

/**
 * Creates a robust chapter with the mandatory structure: Theory -> Checkpoint -> Exercise
 */
const createChapter = (
  id: string,
  title: string,
  topic: string,
  config: {
    status?: 'locked' | 'current' | 'completed',
    theoryContent: string,
    checkpointQuiz: { question: string, options: { id: string, text: string, isCorrect: boolean }[] },
    exerciseParsons: { id: string, content: string }[]
  }
): Chapter => ({
  id,
  title,
  status: config.status || 'locked',
  xpReward: 150,
  description: `Maîtriser : ${topic}`,
  steps: [
    {
      id: `${id}_theory`,
      type: 'theory',
      title: 'Comprendre',
      status: config.status === 'completed' ? 'completed' : config.status === 'current' ? 'current' : 'locked',
      content: config.theoryContent
    },
    {
      id: `${id}_quiz`,
      type: 'checkpoint',
      title: 'Vérifier',
      status: 'locked',
      quiz: {
        id: `${id}_q1`,
        question: config.checkpointQuiz.question,
        options: config.checkpointQuiz.options
      }
    },
    {
      id: `${id}_exo`,
      type: 'exercise',
      title: 'Appliquer',
      status: 'locked',
      parsons: config.exerciseParsons
    }
  ]
});

// ============================================================================
// 2. SUBJECTS
// ============================================================================
// Basic metadata for display
const SUB_MATH = { id: 'math', name: 'Mathématiques', icon: 'Calculator', progress: 0, color: 'bg-blue-500' };
const SUB_FR = { id: 'fr', name: 'Français', icon: 'BookOpen', progress: 0, color: 'bg-pink-500' };
const SUB_ENG = { id: 'eng', name: 'Anglais', icon: 'Languages', progress: 0, color: 'bg-rose-500' };
const SUB_HIST = { id: 'hist', name: 'Hist-Géo', icon: 'Globe', progress: 0, color: 'bg-orange-500' };
const SUB_SCI = { id: 'sci', name: 'Sciences (SVT/PCT)', icon: 'FlaskConical', progress: 0, color: 'bg-emerald-500' };
const SUB_PHYS = { id: 'phys', name: 'Physique-Chimie', icon: 'Atom', progress: 0, color: 'bg-indigo-600' };
const SUB_SVT = { id: 'svt', name: 'SVT', icon: 'Dna', progress: 0, color: 'bg-emerald-600' };
const SUB_INFO = { id: 'info', name: 'Informatique', icon: 'Cpu', progress: 0, color: 'bg-purple-500' };
const SUB_PHILO = { id: 'philo', name: 'Philosophie', icon: 'Feather', progress: 0, color: 'bg-amber-600' };

export const CURRICULUM_SUBJECTS: Record<GradeLevel, Subject[]> = {
  '6eme': [SUB_MATH, SUB_FR, SUB_ENG, SUB_SCI, SUB_HIST],
  '5eme': [SUB_MATH, SUB_FR, SUB_ENG, SUB_SCI, SUB_HIST],
  '4eme': [SUB_MATH, SUB_FR, SUB_ENG, SUB_PHYS, SUB_SVT, SUB_HIST],
  '3eme': [SUB_MATH, SUB_FR, SUB_ENG, SUB_PHYS, SUB_SVT, SUB_HIST],
  '2nde': [SUB_MATH, SUB_FR, SUB_ENG, SUB_PHYS, SUB_SVT, SUB_HIST],
  '1ere': [SUB_MATH, SUB_FR, SUB_ENG, SUB_PHYS, SUB_SVT, SUB_HIST],
  'tle':  [SUB_MATH, SUB_PHILO, SUB_ENG, SUB_PHYS, SUB_SVT, SUB_HIST],
};

// ============================================================================
// 3. CONTENT MODULES
// ============================================================================

export const CURRICULUM_MODULES: Record<GradeLevel, Record<string, Module[]>> = {

  // --- 6EME ---
  '6eme': {
    'math': [
      {
        id: 'm_6_math_num',
        title: 'Nombres et Calculs',
        units: [
          {
            id: 'u_6_math_entiers',
            title: 'Les Grands Nombres',
            chapters: [
              createChapter('c_6_math_entiers', 'Écriture des Entiers', 'Numération', {
                status: 'current',
                theoryContent: `# Les Nombres Entiers\n\nPour lire facilement les grands nombres, on regroupe les chiffres par **tranches de trois** en partant de la droite.\n\n### Classes de nombres\n- Unités simples\n- Milliers\n- Millions\n- Milliards\n\n*Exemple :* 12 345 678 se lit "Douze millions trois cent quarante-cinq mille six cent soixante-dix-huit".`,
                checkpointQuiz: {
                  question: "Dans le nombre 54 123, quel est le chiffre des milliers ?",
                  options: [
                    { id: 'o1', text: '5', isCorrect: false },
                    { id: 'o2', text: '4', isCorrect: true },
                    { id: 'o3', text: '1', isCorrect: false }
                  ]
                },
                exerciseParsons: [
                  { id: 'p1', content: 'Soit le nombre : 205' },
                  { id: 'p2', content: 'Je le multiplie par 10' },
                  { id: 'p3', content: 'Je trouve 2050' },
                  { id: 'p4', content: 'Le chiffre des unités est 0' }
                ]
              })
            ]
          },
          {
            id: 'u_6_math_geo',
            title: 'Géométrie de base',
            chapters: [
              createChapter('c_6_math_droites', 'Droites et Segments', 'Géométrie', {
                theoryContent: `# Droites, Segments et Demi-droites\n\n- **La Droite (d)** : Illimitée des deux côtés.\n- **Le Segment [AB]** : Limité par deux points A et B.\n- **La Demi-droite [Ax)** : Limitée d'un côté par A, illimitée de l'autre.`,
                checkpointQuiz: {
                  question: "Combien d'extrémités possède une droite ?",
                  options: [
                    { id: 'o1', text: '0', isCorrect: true },
                    { id: 'o2', text: '1', isCorrect: false },
                    { id: 'o3', text: '2', isCorrect: false }
                  ]
                },
                exerciseParsons: [
                  { id: 'p1', content: 'Tracer une droite (d)' },
                  { id: 'p2', content: 'Placer deux points A et B sur (d)' },
                  { id: 'p3', content: 'La portion entre A et B est le segment [AB]' }
                ]
              })
            ]
          }
        ]
      }
    ],
    // Fillers for other subjects to prevent crash
    'fr': [], 'eng': [], 'sci': [], 'hist': []
  },

  // --- 3EME ---
  '3eme': {
    'math': [
      {
        id: 'm_3_math_geo',
        title: 'Géométrie Avancée',
        units: [
          {
            id: 'u_3_math_thal',
            title: 'Théorème de Thalès',
            chapters: [
              createChapter('c_3_thal_1', 'Le Théorème Direct', 'Proportionnalité', {
                status: 'current',
                theoryContent: `# Théorème de Thalès\n\nSoit un triangle ABC. Si M appartient à [AB], N appartient à [AC] et si les droites **(MN) et (BC) sont parallèles**, alors on a l'égalité des rapports :\n\n**AM / AB = AN / AC = MN / BC**\n\nCe théorème sert à calculer des longueurs manquantes.`,
                checkpointQuiz: {
                  question: "Quelle est la condition obligatoire pour utiliser Thalès ?",
                  options: [
                    { id: 'o1', text: 'Avoir un angle droit', isCorrect: false },
                    { id: 'o2', text: 'Avoir deux droites parallèles', isCorrect: true },
                    { id: 'o3', text: 'Avoir un triangle isocèle', isCorrect: false }
                  ]
                },
                exerciseParsons: [
                  { id: 'p1', content: 'Dans le triangle ABC' },
                  { id: 'p2', content: 'M sur [AB] et N sur [AC]' },
                  { id: 'p3', content: 'On sait que (MN) // (BC)' },
                  { id: 'p4', content: 'Donc d\'après Thalès : AM/AB = AN/AC' }
                ]
              }),
              createChapter('c_3_thal_2', 'Réciproque de Thalès', 'Parallélisme', {
                theoryContent: `# Réciproque de Thalès\n\nLa réciproque permet de prouver que deux droites sont parallèles.\n\nSi les points A, M, B et A, N, C sont alignés dans le même ordre et si **AM/AB = AN/AC**, alors **(MN) // (BC)**.`,
                checkpointQuiz: {
                  question: "À quoi sert la réciproque de Thalès ?",
                  options: [
                    { id: 'o1', text: 'Calculer une longueur', isCorrect: false },
                    { id: 'o2', text: 'Prouver que deux droites sont parallèles', isCorrect: true },
                    { id: 'o3', text: 'Calculer une aire', isCorrect: false }
                  ]
                },
                exerciseParsons: [
                  { id: 'p1', content: 'On calcule les rapports AM/AB et AN/AC séparément' },
                  { id: 'p2', content: 'On constate que les résultats sont identiques' },
                  { id: 'p3', content: 'Les points sont alignés dans le même ordre' },
                  { id: 'p4', content: 'Donc les droites sont parallèles' }
                ]
              })
            ]
          }
        ]
      }
    ],
    'fr': [
      {
        id: 'm_3_fr_gram',
        title: 'Grammaire du Brevet',
        units: [
          {
            id: 'u_3_fr_pp',
            title: 'Le Participe Passé',
            chapters: [
              createChapter('c_3_fr_pp', 'Accord du Participe Passé', 'Grammaire', {
                status: 'current',
                theoryContent: `# Les Règles d'Accord\n\n1. **Avec Être** : On accorde toujours avec le sujet.\n*Ex: Elle est allée.*\n\n2. **Avec Avoir** : On n'accorde jamais avec le sujet, mais avec le COD si celui-ci est placé **avant** le verbe.\n*Ex: Les pommes que j'ai mangées.*`,
                checkpointQuiz: {
                  question: "Dans 'Ils ont mangé', comment s'écrit 'mangé' ?",
                  options: [
                    { id: 'o1', text: 'mangés', isCorrect: false },
                    { id: 'o2', text: 'mangé', isCorrect: true },
                    { id: 'o3', text: 'mangée', isCorrect: false }
                  ]
                },
                exerciseParsons: [
                  { id: 'p1', content: 'La lettre' },
                  { id: 'p2', content: 'que j\'ai' },
                  { id: 'p3', content: 'écrite' },
                  { id: 'p4', content: 'est longue.' }
                ]
              })
            ]
          }
        ]
      }
    ],
    'phys': [], 'svt': [], 'eng': [], 'hist': []
  },

  // --- TERMINALE ---
  'tle': {
    'philo': [
      {
        id: 'm_tle_philo_sujet',
        title: 'Le Sujet',
        units: [
          {
            id: 'u_tle_cons',
            title: 'La Conscience',
            chapters: [
              createChapter('c_tle_cons_1', 'Définition et Descartes', 'Le Cogito', {
                status: 'current',
                theoryContent: `# La Conscience\n\nLa conscience est la connaissance immédiate que l'homme a de ses propres pensées et actes.\n\n### René Descartes (XVIIe siècle)\nIl cherche une vérité absolue. Il doute de tout (doute méthodique). Mais pour douter, il faut penser. Et pour penser, il faut être.\n\n**"Cogito ergo sum"** (Je pense, donc je suis). La conscience est le socle de toute vérité.`,
                checkpointQuiz: {
                  question: "Que signifie 'Cogito ergo sum' ?",
                  options: [
                    { id: 'o1', text: 'Je doute donc je sais', isCorrect: false },
                    { id: 'o2', text: 'Je pense donc je suis', isCorrect: true },
                    { id: 'o3', text: 'Je suis ce que je pense', isCorrect: false }
                  ]
                },
                exerciseParsons: [
                  { id: 'p1', content: 'Je décide de douter de tout' },
                  { id: 'p2', content: 'Or, douter c\'est penser' },
                  { id: 'p3', content: 'Si je pense, il faut bien que j\'existe' },
                  { id: 'p4', content: 'Donc je suis une chose pensante' }
                ]
              })
            ]
          }
        ]
      }
    ],
    'math': [], 'eng': [], 'phys': [], 'svt': [], 'hist': []
  },

  // Fillers for unused grades
  '5eme': { 'math': [], 'fr': [], 'eng': [], 'sci': [], 'hist': [] },
  '4eme': { 'math': [], 'fr': [], 'eng': [], 'phys': [], 'svt': [], 'hist': [] },
  '2nde': { 'math': [], 'fr': [], 'eng': [], 'phys': [], 'svt': [], 'hist': [] },
  '1ere': { 'math': [], 'fr': [], 'eng': [], 'phys': [], 'svt': [], 'hist': [] }
};
