
import { Module, Subject } from '../types';

export const GRADE_4_SUBJECTS: Subject[] = [
  { id: 'math4', name: 'Mathématiques', icon: 'Calculator', progress: 0, color: 'bg-blue-600' },
  { id: 'esp4', name: 'Espagnol', icon: 'MessageCircle', progress: 0, color: 'bg-yellow-500' },
  { id: 'pct4', name: 'Physique-Chimie', icon: 'Atom', progress: 0, color: 'bg-indigo-600' },
  { id: 'hist4', name: 'Hist-Géo', icon: 'Globe', progress: 0, color: 'bg-orange-600' },
  { id: 'ang4', name: 'Anglais', icon: 'Languages', progress: 0, color: 'bg-pink-600' },
  { id: 'fr4', name: 'Français', icon: 'BookOpen', progress: 0, color: 'bg-rose-600' },
];

export const GRADE_4_MODULES: Record<string, Module[]> = {
  'math4': [
    {
      id: 'm4_alg',
      title: 'Calcul Littéral',
      units: [
        {
          id: 'u4_dev',
          title: 'Développement',
          chapters: [
            { id: 'c4_dist', title: 'Distributivité simple', status: 'current', xpReward: 100, steps: [] }
          ]
        }
      ]
    }
  ],
  'esp4': [
    {
      id: 'm4_esp_intro',
      title: '¡Hola! Introducción',
      units: [
        {
          id: 'u4_saludos',
          title: 'Les Salutations',
          chapters: [
            {
              id: 'c4_hola',
              title: 'Se présenter',
              status: 'current',
              xpReward: 100,
              description: 'Apprendre à dire bonjour et se présenter.',
              steps: [
                {
                  id: 's1', type: 'theory', title: 'Vocabulaire', status: 'current',
                  content: `# Saludos y Presentaciones\n\n- **Hola** : Salut\n- **Buenos días** : Bonjour\n- **¿Cómo te llamas?** : Comment t'appelles-tu ?\n- **Me llamo...** : Je m'appelle...`
                },
                {
                  id: 's2', type: 'checkpoint', title: 'Quiz', status: 'locked',
                  quiz: {
                    id: 'q_esp1', question: 'Comment dit-on "Bonjour" le matin ?',
                    options: [{id:'1', text:'Buenas noches', isCorrect:false}, {id:'2', text:'Buenos días', isCorrect:true}]
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  'pct4': [
    {
      id: 'm4_elec',
      title: 'Électricité',
      units: [
        {
          id: 'u4_circuits',
          title: 'Circuits Simples',
          chapters: [
            {
              id: 'c4_serie',
              title: 'Montage en Série',
              status: 'current',
              xpReward: 150,
              description: 'Comprendre la boucle unique.',
              steps: [
                {
                  id: 's1', type: 'theory', title: 'Le Circuit Série', status: 'current',
                  content: `# Circuit en Série\n\nDans un circuit en série, les dipôles sont branchés les uns à la suite des autres. Il n'y a qu'une seule boucle de courant.\n\n**Propriété:** Si une lampe grille, toutes les autres s'éteignent.`
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  'hist4': [], 'ang4': [], 'fr4': []
};
