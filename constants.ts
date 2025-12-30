
import { User, Subject, Grade, PaymentTransaction, Post, ParsonsItem, Module, QuizContent, Attendance, Thread, Message, Badge } from './types';

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Kouamé Junior',
  grade: 'Terminale C',
  school: 'Lycée Classique d\'Abidjan',
  level: 5,
  xp: 12450,
  streak: 14,
  avatarUrl: 'https://picsum.photos/id/64/200/200',
  role: 'student',
  isPremium: false,
};

export const SUBJECTS: Subject[] = [
  { id: 'math', name: 'Mathématiques', icon: 'Calculator', progress: 75, color: 'bg-blue-500' },
  { id: 'phys', name: 'Physique-Chimie', icon: 'Atom', progress: 60, color: 'bg-indigo-500' },
  { id: 'svt', name: 'SVT', icon: 'Dna', progress: 45, color: 'bg-emerald-500' },
  { id: 'eng', name: 'Anglais', icon: 'Languages', progress: 80, color: 'bg-rose-500' },
];

export const GRADES: Grade[] = [
  { subjectId: 'Mathématiques', score: 16.5, outOf: 20, coefficient: 5, rank: '3ème', teacherAppreciation: 'Excellent travail, continuez ainsi.', classAverage: 11.2, isExam: true },
  { subjectId: 'Physique-Chimie', score: 14, outOf: 20, coefficient: 5, rank: '8ème', teacherAppreciation: 'Bonne compréhension des concepts.', classAverage: 10.5, isExam: true },
  { subjectId: 'Philosophie', score: 11, outOf: 20, coefficient: 2, rank: '15ème', teacherAppreciation: 'Des efforts à fournir en méthodologie.', classAverage: 9.8, isExam: false },
  { subjectId: 'SVT', score: 13.5, outOf: 20, coefficient: 4, rank: '6ème', teacherAppreciation: 'Bonne participation.', classAverage: 12.0, isExam: true },
  { subjectId: 'Anglais', score: 18, outOf: 20, coefficient: 2, rank: '1er', teacherAppreciation: 'Perfect mastery of the language.', classAverage: 13.5, isExam: false },
];

export const ATTENDANCE_DATA: Attendance[] = [
  { id: 'a1', date: '2023-10-25', status: 'present', justified: true, justificationStatus: 'none' },
  { id: 'a2', date: '2023-10-24', status: 'present', justified: true, justificationStatus: 'none' },
  { id: 'a3', date: '2023-10-23', status: 'late', justified: false, justificationReason: 'Retard bus scolaire', justificationStatus: 'none' },
  { id: 'a4', date: '2023-10-22', status: 'present', justified: true, justificationStatus: 'none' },
  { id: 'a5', date: '2023-10-21', status: 'absent', justified: true, justificationReason: 'Maladie (Certificat médical)', justificationStatus: 'approved' },
  { id: 'a6', date: '2023-10-18', status: 'absent', justified: false, justificationStatus: 'none' }, // Unjustified absence for testing flow
];

export const TRANSACTIONS: PaymentTransaction[] = [
  { id: 'tx1', date: '2023-10-01', amount: 50000, method: 'Wave', status: 'completed', label: 'Scolarité Trimestre 1' },
  { id: 'tx2', date: '2023-11-15', amount: 5000, method: 'Orange Money', status: 'completed', label: 'Frais Cantine' },
];

export const FEED_POSTS: Post[] = [
  { id: 'p1', author: 'Administration', role: 'Admin', content: '📅 Rappel: Les examens blancs débutent le 15 Décembre. Veuillez régulariser votre scolarité.', date: 'Il y a 2h', likes: 45, type: 'announcement', imageUrl: 'https://picsum.photos/seed/exam/400/200' },
  { id: 'p2', author: 'M. Touré', role: 'Teacher', content: '💡 Astuce du jour: Revisez les nombres complexes pour le quiz de demain.', date: 'Il y a 5h', likes: 28, type: 'announcement' },
];

export const PARSONS_DATA: ParsonsItem[] = [
  { id: 'step1', content: 'Soit f(x) = x² + 2x + 1 defined on ℝ' },
  { id: 'step2', content: 'We recognize a remarkable identity: (a+b)² = a² + 2ab + b²' },
  { id: 'step3', content: 'Here a=x and b=1' },
  { id: 'step4', content: 'Thus, f(x) = (x + 1)²' },
  { id: 'step5', content: 'Therefore, f(x) ≥ 0 for all x ∈ ℝ' },
];

export const MATH_MODULES: Module[] = [
  {
    id: 'mod1',
    title: 'Nombres Complexes',
    units: [
      {
        id: 'u1',
        title: 'Bases',
        chapters: [
          { 
            id: 'c1', 
            title: 'Introduction Imaginaire', 
            status: 'completed', 
            xpReward: 50, 
            description: 'Découverte de i et des nombres imaginaires.',
            steps: [
              {
                id: 's1',
                type: 'theory',
                title: 'Introduction',
                status: 'completed',
                videoUrl: 'https://www.youtube.com/embed/SP-YJe7Vldo',
                content: `
# L'Origine des Nombres Imaginaires

Historiquement, les mathématiciens ont été confrontés à des équations qui semblaient impossibles à résoudre, comme :
**x² + 1 = 0**

Si l'on essaie de résoudre cette équation dans l'ensemble des réels, on obtient x² = -1. Or, le carré d'un nombre réel est toujours positif. C'est une impasse.

## L'invention de "i"

Au 16ème siècle, pour surmonter cet obstacle, les mathématiciens italiens comme Cardan et Bombelli ont osé imaginer un nouveau nombre.

Ils ont défini l'unité imaginaire, notée **i**, telle que :
**i² = -1**

Cela ouvre la porte à un tout nouvel univers : l'ensemble des Nombres Complexes (noté ℂ).

## Définition d'un Nombre Complexe

Un nombre complexe z s'écrit sous la forme algébrique :
**z = a + ib**

Où :
- **a** est la partie réelle, notée Re(z)
- **b** est la partie imaginaire, notée Im(z)

Exemple : Si z = 3 + 4i, alors Re(z) = 3 et Im(z) = 4.
                `
              }
            ]
          },
          { 
            id: 'c2', 
            title: 'Démonstration Algébrique', 
            status: 'current', 
            xpReward: 150, 
            description: 'Reconstruire la preuve de la formule de Moivre.',
            steps: [
              {
                id: 's2',
                type: 'exercise',
                title: 'Preuve de Moivre',
                status: 'current',
                parsons: [
                  { id: 'p1', content: 'Initialisation: (cos x + i sin x)^0 = 1' },
                  { id: 'p2', content: 'Hérédité: Supposons la propriété vraie pour n.' },
                  { id: 'p3', content: '(cos x + i sin x)^(n+1) = (cos nx + i sin nx)(cos x + i sin x)' },
                  { id: 'p4', content: '= cos(nx+x) + i sin(nx+x)' }
                ]
              }
            ]
          },
          { 
            id: 'c3', 
            title: 'Quiz Argument & Module', 
            status: 'locked', 
            xpReward: 100, 
            description: 'Test visuel sur le plan complexe.',
            steps: [
              {
                id: 's3',
                type: 'checkpoint',
                title: 'Quiz Visuel',
                status: 'locked',
                quiz: {
                    id: 'q1',
                    question: 'Où se situe le nombre i dans le plan complexe ?',
                    options: [
                        { id: 'o1', text: 'Sur l\'axe des ordonnées (0, 1)', isCorrect: true },
                        { id: 'o2', text: 'Sur l\'axe des abscisses (1, 0)', isCorrect: false },
                        { id: 'o3', text: 'À l\'origine (0, 0)', isCorrect: false }
                    ]
                }
              }
            ]
          },
        ]
      }
    ]
  },
  {
    id: 'mod2',
    title: 'Probabilités Conditionnelles',
    units: [
      {
        id: 'u2',
        title: 'Conditionnement',
        chapters: [
          { id: 'c4', title: 'Arbres de probabilité', status: 'locked', xpReward: 50, steps: [] },
          { id: 'c5', title: 'Théorème de Bayes', status: 'locked', xpReward: 150, steps: [] },
        ]
      }
    ]
  }
];

export const MOCK_GEO_QUIZ: QuizContent = {
  id: 'q1',
  question: 'Quelle zone climatique est représentée par la couleur verte sur cette carte du Cameroun ?',
  imageUrl: 'https://picsum.photos/id/237/600/400', // Placeholder
  options: [
    { id: 'opt1', text: 'Domaine Équatorial', isCorrect: true },
    { id: 'opt2', text: 'Domaine Soudanien', isCorrect: false },
    { id: 'opt3', text: 'Domaine Sahélien', isCorrect: false },
    { id: 'opt4', text: 'Zone Montagneuse', isCorrect: false },
  ]
};

// --- NEW CONSTANTS ---

export const BADGES: Badge[] = [
  { id: 'b1', name: 'Génie Maths', icon: 'Calculator', description: 'Top 10% en Mathématiques', unlocked: true, color: 'bg-blue-500' },
  { id: 'b2', name: 'Lève-tôt', icon: 'Sun', description: 'Leçon complétée avant 8h', unlocked: true, color: 'bg-orange-400' },
  { id: 'b3', name: 'Social', icon: 'MessageCircle', description: '5 questions posées', unlocked: false, color: 'bg-pink-500' },
  { id: 'b4', name: 'Invincible', icon: 'Flame', description: 'Série de 30 jours', unlocked: false, color: 'bg-red-500' },
];

export const MOCK_THREADS: Thread[] = [
  { 
    id: 't1', 
    contactName: 'M. Touré', 
    contactRole: 'Teacher', 
    lastMessage: 'N\'oublie pas l\'exercice 3 pour demain.', 
    lastMessageTime: '10:30', 
    unreadCount: 2, 
    isOnline: true,
    avatarUrl: 'https://ui-avatars.com/api/?name=M+Toure&background=0D8ABC&color=fff'
  },
  { 
    id: 't2', 
    contactName: 'SkoolBot', 
    contactRole: 'AI Assistant', 
    lastMessage: 'Je peux t\'aider avec ta démonstration.', 
    lastMessageTime: 'Hier', 
    unreadCount: 0, 
    isOnline: true,
    avatarUrl: 'https://ui-avatars.com/api/?name=Skool+Bot&background=6366f1&color=fff'
  }
];

export const MOCK_CHAT_HISTORY: Message[] = [
  { id: 'm1', text: 'Monsieur, je ne comprends pas la question 2 du devoir.', sender: 'me', timestamp: '10:15' },
  { id: 'm2', text: 'Regarde le cours sur les modules, page 42.', sender: 'other', timestamp: '10:20' },
  { id: 'm3', text: 'Ah oui, la propriété triangulaire ! Merci.', sender: 'me', timestamp: '10:25' },
  { id: 'm4', text: 'Exactement. N\'oublie pas l\'exercice 3 pour demain.', sender: 'other', timestamp: '10:30' },
];
