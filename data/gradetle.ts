
import { Module, Subject } from '../types';

export const GRADE_TLE_SUBJECTS: Subject[] = [
  { id: 'philo', name: 'Philosophie', icon: 'Feather', progress: 10, color: 'bg-amber-600' },
  { id: 'math_tle', name: 'Mathématiques', icon: 'Calculator', progress: 5, color: 'bg-blue-600' },
  { id: 'phys_tle', name: 'Physique-Chimie', icon: 'Atom', progress: 0, color: 'bg-indigo-600' },
  { id: 'svt_tle', name: 'SVT', icon: 'Dna', progress: 0, color: 'bg-emerald-600' },
];

export const GRADE_TLE_MODULES: Record<string, Module[]> = {
  'philo': [
    {
      id: 'm_tle_philo_sujet',
      title: 'Le Sujet',
      units: [
        {
          id: 'u_tle_cons',
          title: 'La Conscience',
          chapters: [
            {
              id: 'c_tle_cons_1',
              title: 'Le Cogito Cartésien',
              status: 'current',
              xpReward: 200,
              description: 'Je pense, donc je suis.',
              steps: [
                {
                  id: 's1', type: 'theory', title: 'Descartes', status: 'current',
                  content: `# René Descartes (Méditations Métaphysiques)\n\nPour trouver une vérité indubitable, Descartes décide de douter de tout. C'est le **doute méthodique**.\n\nIl peut douter du monde, de son corps, mais il ne peut pas douter qu'il doute. Or, douter c'est penser.\n\n**"Cogito ergo sum"** (Je pense, donc je suis). La conscience est le socle de la vérité.`
                },
                {
                  id: 's2', type: 'checkpoint', title: 'Analyse', status: 'locked',
                  quiz: {
                    id: 'q1', question: 'Quelle est la première certitude de Descartes ?',
                    options: [
                      { id: '1', text: 'Dieu existe', isCorrect: false },
                      { id: '2', text: 'Je suis une chose qui pense', isCorrect: true },
                      { id: '3', text: 'Le monde est réel', isCorrect: false }
                    ]
                  }
                },
                {
                  id: 's3', type: 'exercise', title: 'Logique', status: 'locked',
                  parsons: [
                    { id: '1', content: 'Je doute de toutes les choses sensibles' },
                    { id: '2', content: 'Mais si je doute, je pense' },
                    { id: '3', content: 'Pour penser, il faut être' },
                    { id: '4', content: 'Donc je suis' }
                  ]
                }
              ]
            },
            {
              id: 'c_tle_cons_2',
              title: 'Marx et la Conscience',
              status: 'locked',
              xpReward: 200,
              description: 'La conscience déterminée par les conditions matérielles.',
              steps: [
                {
                  id: 's4', type: 'theory', title: 'Matérialisme', status: 'locked',
                  content: 'Pour Marx, "Ce n\'est pas la conscience des hommes qui détermine leur existence, c\'est au contraire leur existence sociale qui détermine leur conscience."'
                }
              ]
            }
          ]
        },
        {
            id: 'u_tle_inc',
            title: 'L\'Inconscient',
            chapters: [
                { id: 'c_freud', title: 'Freud et la Psychanalyse', status: 'locked', xpReward: 200, steps: [] }
            ]
        }
      ]
    }
  ],
  'math_tle': [
    {
      id: 'm_tle_math_analyse',
      title: 'Analyse',
      units: [
        {
          id: 'u_lim',
          title: 'Limites et Continuité',
          chapters: [
            {
              id: 'c_lim_1',
              title: 'Limites de fonctions',
              status: 'current',
              xpReward: 150,
              description: 'Formes indéterminées et opérations.',
              steps: [
                { id: 's1', type: 'theory', title: 'Cours', status: 'current', content: '# Limites\n\nDéfinitions des limites en l\'infini et en un point.' },
                { id: 's2', type: 'checkpoint', title: 'Quiz', status: 'locked', quiz: { id: 'q', question: 'lim 1/x en +inf ?', options: [{id:'1', text:'0', isCorrect:true}, {id:'2', text:'Infini', isCorrect:false}] } },
                { id: 's3', type: 'exercise', title: 'Exo', status: 'locked', parsons: [{id:'1', content:'Identifier la FI'}, {id:'2', content:'Factoriser par le terme dominant'}] }
              ]
            }
          ]
        }
      ]
    }
  ],
  'phys_tle': [], 'svt_tle': []
};
