
import { Module, Subject } from '../types';

export const GRADE_6_SUBJECTS: Subject[] = [
  { id: 'math6', name: 'Mathématiques', icon: 'Calculator', progress: 15, color: 'bg-blue-500' },
  { id: 'sci6', name: 'Sciences (SVT/PCT)', icon: 'Flask', progress: 30, color: 'bg-emerald-500' },
  { id: 'hist6', name: 'Hist-Géo', icon: 'Globe', progress: 50, color: 'bg-orange-500' },
  { id: 'info6', name: 'Informatique', icon: 'Cpu', progress: 10, color: 'bg-purple-500' },
];

export const GRADE_6_MODULES: Record<string, Module[]> = {
  'math6': [
    {
      id: 'm1_nb_calc',
      title: 'Nombres et Calculs',
      units: [
        {
          id: 'u1',
          title: 'Introduction',
          chapters: [
            {
              id: 'c1_entiers',
              title: 'Les Entiers Naturels',
              status: 'completed',
              xpReward: 50,
              description: 'Comprendre les chiffres et les nombres.',
              steps: [
                {
                  id: 's1',
                  type: 'theory',
                  title: 'Les Entiers Naturels',
                  status: 'completed',
                  content: `
# Les Entiers Naturels

Les nombres que nous utilisons pour compter les objets (une pomme, deux chaises, dix élèves) sont appelés les **entiers naturels**.

## 1. Chiffres et Nombres
Il est important de faire la différence entre un chiffre et un nombre :
- Les **chiffres** sont des symboles : 0, 1, 2, 3, 4, 5, 6, 7, 8, 9. Il n'y en a que dix.
- Les **nombres** représentent une quantité. Ils s'écrivent avec un ou plusieurs chiffres.

*Exemple :* Dans le nombre 153, il y a trois chiffres (1, 5 et 3).

## 2. La Position des Chiffres
La valeur d'un chiffre dépend de sa position dans le nombre :
- Unités
- Dizaines
- Centaines
- Milliers

Dans le nombre **4 521** :
- 1 est le chiffre des unités.
- 2 est le chiffre des dizaines (20).
- 5 est le chiffre des centaines (500).
- 4 est le chiffre des milliers (4000).
                `
                }
              ]
            },
            {
              id: 'c2_fractions',
              title: 'Les Fractions Simples',
              status: 'current',
              xpReward: 100,
              description: 'Ordonner la définition d\'une fraction.',
              steps: [
                {
                  id: 's2',
                  type: 'exercise',
                  title: 'Fractions',
                  status: 'current',
                  parsons: [
                    { id: 'p1', content: 'Une fraction est un nombre.' },
                    { id: 'p2', content: 'Elle représente une partie d\'un tout.' },
                    { id: 'p3', content: 'Le nombre du haut est le numérateur.' },
                    { id: 'p4', content: 'Le nombre du bas est le dénominateur.' }
                  ]
                }
              ]
            },
            {
              id: 'c3_decimaux',
              title: 'Quiz: Nombres Décimaux',
              status: 'locked',
              xpReward: 100,
              description: 'Identifier la partie entière et décimale.',
              steps: [
                {
                  id: 's3',
                  type: 'checkpoint',
                  title: 'Quiz Décimaux',
                  status: 'locked',
                  quiz: {
                    id: 'q1',
                    question: 'Dans 12,5 le chiffre 5 représente :',
                    options: [
                      { id: 'o1', text: 'Les dixièmes', isCorrect: true },
                      { id: 'o2', text: 'Les unités', isCorrect: false },
                      { id: 'o3', text: 'Les dizaines', isCorrect: false }
                    ]
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'm2_geo_plane',
      title: 'Géométrie Plane',
      units: [
        {
          id: 'u2',
          title: 'Formes de base',
          chapters: [
            {
              id: 'c1_droites',
              title: 'Droites et Segments',
              status: 'locked',
              xpReward: 50,
              description: 'Identifier les droites parallèles.',
              steps: [
                {
                  id: 's1',
                  type: 'checkpoint',
                  title: 'Quiz Droites',
                  status: 'locked',
                  quiz: {
                    id: 'q1',
                    question: 'Deux droites qui ne se croisent jamais sont :',
                    options: [
                      { id: 'o1', text: 'Parallèles', isCorrect: true },
                      { id: 'o2', text: 'Sécantes', isCorrect: false },
                      { id: 'o3', text: 'Perpendiculaires', isCorrect: false }
                    ]
                  }
                }
              ]
            },
            {
              id: 'c2_cercle',
              title: 'Le Cercle',
              status: 'locked',
              xpReward: 50,
              description: 'Rayon, diamètre et centre.',
              steps: [
                {
                  id: 's2',
                  type: 'theory',
                  title: 'Le Cercle',
                  status: 'locked',
                  content: 'Un cercle est l\'ensemble des points situés à égale distance d\'un point central.'
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  'sci6': [
    {
      id: 'm1_vivant',
      title: 'Le Monde Vivant',
      units: [
        {
          id: 'u3',
          title: 'La vie végétale',
          chapters: [
            {
              id: 'c1_prod_veg',
              title: 'La production végétale',
              status: 'current',
              xpReward: 50,
              description: 'De quoi une plante a-t-elle besoin pour grandir ?',
              steps: [
                {
                  id: 's1',
                  type: 'theory',
                  title: 'La production végétale',
                  status: 'current',
                  content: `
# La Production de Matière par les Végétaux

Les végétaux verts sont des êtres vivants capables de produire leur propre matière à partir d'éléments minéraux.

## Les besoins des plantes vertes
Pour grandir et produire de la matière (tiges, feuilles, racines, fruits), une plante verte a besoin de :
1. **Lumière** (Soleil)
2. **Eau**
3. **Sels minéraux** (puisés dans le sol)
4. **Dioxyde de carbone** (CO2, puisé dans l'air)

C'est ce qu'on appelle la **photosynthèse**.
                  `
                }
              ]
            },
            {
              id: 'c2_repro_plantes',
              title: 'Reproduction des plantes',
              status: 'locked',
              xpReward: 100,
              steps: [
                {
                  id: 's2',
                  type: 'checkpoint',
                  title: 'Quiz Reproduction',
                  status: 'locked',
                  quiz: {
                    id: 'q1',
                    question: 'Quel organe permet la reproduction chez la plupart des plantes ?',
                    options: [
                      { id: 'o1', text: 'La fleur', isCorrect: true },
                      { id: 'o2', text: 'La racine', isCorrect: false },
                      { id: 'o3', text: 'La feuille', isCorrect: false }
                    ]
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'm2_matiere',
      title: 'La Matière',
      units: [
        {
          id: 'u4',
          title: 'Propriétés',
          chapters: [
            {
              id: 'c1_eau_etats',
              title: 'Les 3 états de l\'eau',
              status: 'locked',
              xpReward: 50,
              steps: [
                {
                  id: 's1',
                  type: 'checkpoint',
                  title: 'États de l\'eau',
                  status: 'locked',
                  quiz: {
                    id: 'q1',
                    question: 'La glace est de l\'eau à l\'état :',
                    options: [
                      { id: 'o1', text: 'Solide', isCorrect: true },
                      { id: 'o2', text: 'Liquide', isCorrect: false },
                      { id: 'o3', text: 'Gazeux', isCorrect: false }
                    ]
                  }
                }
              ]
            },
            {
              id: 'c2_melanges',
              title: 'Mélanges et Solutions',
              status: 'locked',
              xpReward: 150,
              description: 'Reconstituer une expérience de décantation.',
              steps: [
                {
                  id: 's2',
                  type: 'exercise',
                  title: 'Décantation',
                  status: 'locked',
                  parsons: [
                    { id: 'p1', content: 'Mélanger l\'eau boueuse.' },
                    { id: 'p2', content: 'Laisser reposer le mélange.' },
                    { id: 'p3', content: 'La terre tombe au fond.' },
                    { id: 'p4', content: 'Récupérer l\'eau claire en surface.' }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  'hist6': [
    {
      id: 'm1_univers',
      title: 'La Terre dans l\'Univers',
      units: [
        {
          id: 'u5',
          title: 'Astronomie',
          chapters: [
            {
              id: 'c1_sys_solaire',
              title: 'Le Système Solaire',
              status: 'current',
              xpReward: 100,
              description: 'Reconnaître les planètes.',
              steps: [
                {
                  id: 's1',
                  type: 'checkpoint',
                  title: 'Planètes',
                  status: 'current',
                  quiz: {
                    id: 'q1',
                    question: 'Quelle est la planète la plus proche du Soleil ?',
                    options: [
                      { id: 'o1', text: 'Mercure', isCorrect: true },
                      { id: 'o2', text: 'Vénus', isCorrect: false },
                      { id: 'o3', text: 'Terre', isCorrect: false }
                    ]
                  }
                }
              ]
            },
            {
              id: 'c2_mouv_terre',
              title: 'Mouvements de la Terre',
              status: 'locked',
              xpReward: 50,
              description: 'Rotation et Révolution.',
              steps: [
                {
                  id: 's2',
                  type: 'theory',
                  title: 'Mouvements',
                  status: 'locked',
                  content: 'La Terre tourne sur elle-même (rotation) et autour du Soleil (révolution).'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'm2_env',
      title: 'L\'Homme et l\'Environnement',
      units: [
        {
           id: 'u6',
           title: 'Climats',
           chapters: [
            { id: 'c1_climats', title: 'Les climats', status: 'locked', xpReward: 50, steps: [] }
           ]
        }
      ]
    }
  ],
  'info6': [
    {
      id: 'm1_env_info',
      title: 'Environnement Informatique',
      units: [
        {
          id: 'u7',
          title: 'Les Bases',
          chapters: [
            {
              id: 'c1_hardware',
              title: 'Matériel (Hardware)',
              status: 'completed',
              xpReward: 50,
              description: 'Identifier l\'Unité Centrale et les périphériques.',
              steps: [
                {
                  id: 's1',
                  type: 'checkpoint',
                  title: 'Hardware Quiz',
                  status: 'completed',
                  quiz: {
                    id: 'q1',
                    question: 'Quel composant est le "cerveau" de l\'ordinateur ?',
                    options: [
                      { id: 'o1', text: 'Processeur (CPU)', isCorrect: true },
                      { id: 'o2', text: 'Disque Dur', isCorrect: false },
                      { id: 'o3', text: 'Écran', isCorrect: false }
                    ]
                  }
                }
              ]
            },
            {
              id: 'c2_software',
              title: 'Logiciel (Software)',
              status: 'current',
              xpReward: 50,
              steps: [
                {
                  id: 's2',
                  type: 'theory',
                  title: 'Logiciel (Software)',
                  status: 'current',
                  content: `
# Qu'est-ce un Logiciel ?

Un ordinateur sans programmes ne sert à rien. Le matériel (Hardware) a besoin d'instructions pour fonctionner.

## Définition
Un **logiciel** (Software) est un ensemble de programmes qui permettent à un ordinateur d'effectuer des tâches spécifiques.

## Les deux types de logiciels
1. **Le Système d'Exploitation (OS)** : C'est le chef d'orchestre. Il gère le matériel.
   *Exemples : Windows, Android, macOS.*
2. **Les Logiciels d'Application** : Ce sont les outils pour l'utilisateur.
   *Exemples : Word (écrire), Paint (dessiner), Chrome (naviguer sur internet).*
                  `
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
