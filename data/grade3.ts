
import { Module, Subject } from '../types';

export const GRADE_3_SUBJECTS: Subject[] = [
  { id: 'math3', name: 'Mathématiques', icon: 'Calculator', progress: 0, color: 'bg-blue-600' },
  { id: 'svt3', name: 'SVT', icon: 'Dna', progress: 0, color: 'bg-emerald-600' },
  { id: 'hist3', name: 'Hist-Géo', icon: 'Globe', progress: 0, color: 'bg-orange-600' },
  { id: 'eng3', name: 'Anglais', icon: 'Languages', progress: 0, color: 'bg-pink-600' },
  { id: 'phys3', name: 'Physique-Chimie', icon: 'Atom', progress: 0, color: 'bg-indigo-600' },
];

export const GRADE_3_MODULES: Record<string, Module[]> = {
  'math3': [
    {
      id: 'm3_math_geo',
      title: 'Géométrie du Plan',
      units: [
        {
          id: 'u3_thal',
          title: 'Théorème de Thalès',
          chapters: [
            {
              id: 'c3_thal_dir',
              title: 'Théorème Direct',
              status: 'current',
              xpReward: 150,
              description: 'Calculer des longueurs.',
              steps: [
                {
                  id: 's1', type: 'theory', title: 'Le Théorème', status: 'current',
                  content: `# Théorème de Thalès\n\nDans un triangle ABC, si M ∈ [AB], N ∈ [AC] et si **(MN) // (BC)**, alors :\n\n**AM/AB = AN/AC = MN/BC**\n\nCe théorème permet de calculer des longueurs dans des figures agrandies ou réduites.`
                },
                {
                  id: 's2', type: 'checkpoint', title: 'Quiz', status: 'locked',
                  quiz: {
                    id: 'q1', question: 'Quelle est la condition essentielle ?',
                    options: [{ id: '1', text: 'Angle droit', isCorrect: false }, { id: '2', text: 'Parallélisme', isCorrect: true }]
                  }
                },
                {
                  id: 's3', type: 'exercise', title: 'Application', status: 'locked',
                  parsons: [{ id: '1', content: 'Identifier les triangles' }, { id: '2', content: 'Vérifier (MN)//(BC)' }, { id: '3', content: 'Écrire les rapports égaux' }]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'm3_math_alg',
      title: 'Calcul Algébrique',
      units: [
        {
          id: 'u3_rac',
          title: 'Racines Carrées',
          chapters: [
            { id: 'c3_rac_def', title: 'Définition', status: 'locked', xpReward: 100, steps: [] }
          ]
        }
      ]
    }
  ],
  'hist3': [
    {
      id: 'm3_hist_decolo',
      title: 'Décolonisation en Afrique',
      units: [
        {
          id: 'u3_indep',
          title: 'Accession à l\'indépendance',
          chapters: [
            {
              id: 'c3_hist_cam',
              title: 'Indépendance du Cameroun',
              status: 'current',
              xpReward: 200,
              description: 'Les étapes clés de 1948 à 1960.',
              steps: [
                {
                  id: 's1', type: 'theory', title: 'Histoire', status: 'current',
                  content: `# Vers l'Indépendance\n\nLe Cameroun a connu un processus complexe menant à son indépendance le **1er Janvier 1960**.\n\n## Acteurs Clés\n- **UPC** (Ruben Um Nyobé) : Lutte armée.\n- **Ahmadou Ahidjo** : Premier président.\n\nLe pays était sous tutelle de la France et du Royaume-Uni.`
                },
                {
                   id: 's2', type: 'checkpoint', title: 'Quiz Date', status: 'locked',
                   quiz: {
                       id: 'q1', question: 'Date de l\'indépendance du Cameroun Oriental ?',
                       options: [{id: 'a', text: '1960', isCorrect: true}, {id: 'b', text: '1958', isCorrect: false}]
                   }
                },
                {
                  id: 's3', type: 'exercise', title: 'Chronologie', status: 'locked',
                  parsons: [{id: '1', content: 'Fondation de l\'UPC (1948)'}, {id: '2', content: 'Loi Cadre Defferre (1956)'}, {id: '3', content: 'Proclamation Indépendance (1960)'}]
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  'svt3': [], 'eng3': [], 'phys3': []
};
