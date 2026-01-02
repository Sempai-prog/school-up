
import { Module, Subject } from '../types';

export const GRADE_1_SUBJECTS: Subject[] = [
  { id: 'math1', name: 'Mathématiques', icon: 'Calculator', progress: 0, color: 'bg-blue-600' },
  { id: 'fr1', name: 'Français', icon: 'BookOpen', progress: 0, color: 'bg-rose-600' },
  { id: 'svt1', name: 'SVT', icon: 'Dna', progress: 0, color: 'bg-emerald-600' },
  { id: 'phys1', name: 'Physique-Chimie', icon: 'Atom', progress: 0, color: 'bg-indigo-600' },
];

export const GRADE_1_MODULES: Record<string, Module[]> = {
  'math1': [
    {
      id: 'm1_proba',
      title: 'Probabilités',
      units: [
        {
          id: 'u1_var',
          title: 'Variables Aléatoires',
          chapters: [
            {
              id: 'c1_loi',
              title: 'Loi de probabilité',
              status: 'current',
              xpReward: 150,
              description: 'Espérance et Variance.',
              steps: [
                {
                  id: 's1', type: 'theory', title: 'Définition', status: 'current',
                  content: `# Loi de Probabilité\n\nSoit X une variable aléatoire. Définir la loi de X, c'est associer à chaque valeur xi la probabilité pi = P(X=xi).\n\nL'Espérance E(X) est la valeur moyenne attendue.`
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  'fr1': [
    {
      id: 'm1_roman',
      title: 'Le Roman',
      units: [
        {
          id: 'u1_realisme',
          title: 'Le Réalisme',
          chapters: [
            {
              id: 'c1_balzac',
              title: 'Balzac et la Comédie Humaine',
              status: 'current',
              xpReward: 200,
              description: 'Étude du Père Goriot.',
              steps: [
                {
                  id: 's1', type: 'theory', title: 'Le Père Goriot', status: 'current',
                  content: `# Le Père Goriot (1835)\n\nCe roman est la clé de voûte de la Comédie Humaine. Il introduit le principe du **retour des personnages**.\n\nThèmes clés :\n- L'ambition (Rastignac)\n- La paternité obsessionnelle (Goriot)\n- L'argent roi`
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  'svt1': [], 'phys1': []
};
