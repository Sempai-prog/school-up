
import { Module, Subject } from '../types';

export const GRADE_6_SUBJECTS: Subject[] = [
  { id: 'math6', name: 'Mathématiques', icon: 'Calculator', progress: 0, color: 'bg-blue-600' },
  { id: 'sci6', name: 'Sciences (SVT)', icon: 'Flask', progress: 0, color: 'bg-emerald-600' },
  { id: 'pct6', name: 'Physique-Chimie', icon: 'Atom', progress: 0, color: 'bg-indigo-600' },
  { id: 'hist6', name: 'Histoire-Géo', icon: 'Globe', progress: 0, color: 'bg-orange-600' },
  { id: 'ecm6', name: 'Citoyenneté', icon: 'Scale', progress: 0, color: 'bg-teal-600' },
  { id: 'info6', name: 'Informatique', icon: 'Cpu', progress: 0, color: 'bg-purple-600' },
  { id: 'ang6', name: 'Anglais', icon: 'Languages', progress: 0, color: 'bg-pink-600' },
  { id: 'fr6', name: 'Français', icon: 'BookOpen', progress: 0, color: 'bg-rose-600' },
];

export const GRADE_6_MODULES: Record<string, Module[]> = {
  'math6': [
    // ... (Previous Math Content Kept) ...
    {
      id: 'm6_math_num',
      title: 'Relations et Opérations Fondamentales',
      units: [
        {
          id: 'u1_entiers',
          title: 'Nombres Entiers Naturels',
          chapters: [
            {
              id: 'c1_arithm',
              title: 'Écriture et Opérations',
              status: 'current',
              xpReward: 100,
              description: 'Lire, écrire et manipuler les grands nombres.',
              steps: [
                {
                  id: 's1_theorie',
                  type: 'theory',
                  title: 'Les Entiers Naturels',
                  status: 'current',
                  content: `<h1>Les Entiers Naturels</h1><p>Introduction aux grands nombres et opérations de base.</p>`
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  'sci6': [
     // ... (Previous SVT Content Kept) ...
     {
      id: 'm6_svt_vivant',
      title: 'Le Monde Vivant (Agriculture)',
      units: [{ id: 'u_placeholder', title: 'Introduction', chapters: [] }]
     }
  ],
  'pct6': [
     // ... (Previous PCT Content Kept) ...
     {
      id: 'm6_pct_matiere',
      title: 'La Matière',
      units: [{ id: 'u_placeholder_pct', title: 'Introduction', chapters: [] }]
     }
  ],
  'hist6': [
     // ... (Previous History/Geo Content Kept) ...
     {
      id: 'm6_geo_terre',
      title: 'GÉO - La Terre dans l\'Univers',
      units: [{ id: 'u_placeholder_geo', title: 'Introduction', chapters: [] }]
     }
  ],

  // ========================================================================
  // ÉDUCATION À LA CITOYENNETÉ (ECM)
  // ========================================================================
  'ecm6': [
    {
      id: 'm6_ecm_famille',
      title: 'La Vie Familiale et Scolaire',
      units: [
        {
          id: 'u6_famille',
          title: 'La Famille',
          chapters: [
            {
              id: 'c6_intro_ecm',
              title: 'Qu\'est-ce que l\'ECM ?',
              status: 'current',
              xpReward: 50,
              description: 'Définition et importance.',
              steps: [
                {
                  id: 's1', type: 'theory', title: 'Le Citoyen', status: 'current',
                  content: `
<h1>L'Éducation à la Citoyenneté</h1>
<p>C'est l'ensemble des enseignements qui visent à former un <strong>bon citoyen</strong>.</p>
<p>Un bon citoyen est celui qui :</p>
<ul>
  <li>Connaît ses droits et ses devoirs.</li>
  <li>Respecte les lois de son pays.</li>
  <li>Aime sa patrie (Patriotisme).</li>
  <li>Respecte les autres et le bien public.</li>
</ul>
                  `
                }
              ]
            },
            {
              id: 'c6_famille_types',
              title: 'La Famille',
              status: 'locked',
              xpReward: 100,
              description: 'Types et arbre généalogique.',
              steps: [
                {
                  id: 's1', type: 'theory', title: 'La Structure Familiale', status: 'locked',
                  content: `
<h1>La Famille</h1>
<p>La famille est la cellule de base de la société. Elle est constituée du père, de la mère et des enfants.</p>

<h2>Types de familles</h2>
<ul>
  <li><strong>Famille Nucléaire :</strong> Papa, Maman et les enfants.</li>
  <li><strong>Famille Élargie :</strong> Inclut les grands-parents, oncles, tantes, cousins. (Très fréquent en Afrique).</li>
  <li><strong>Famille Monoparentale :</strong> Un seul parent avec les enfants.</li>
</ul>
                  `
                }
              ]
            },
            {
              id: 'c6_mariage',
              title: 'Le Mariage',
              status: 'locked',
              xpReward: 150,
              description: 'Civil, Religieux, Traditionnel.',
              steps: [
                {
                  id: 's1', type: 'theory', title: 'L\'Union', status: 'locked',
                  content: `
<h1>Le Mariage</h1>
<p>C'est l'acte par lequel un homme et une femme s'unissent pour fonder une famille.</p>

<h2>Les Types de Mariage</h2>
<ul>
  <li><strong>Mariage Coutumier (Traditionnel) :</strong> Marqué par le versement de la <strong>Dot</strong>.</li>
  <li><strong>Mariage Civil :</strong> Célébré par le Maire (Officier d'état civil). C'est le seul reconnu par la loi.</li>
  <li><strong>Mariage Religieux :</strong> Célébré à l'église ou à la mosquée.</li>
</ul>
                  `
                },
                {
                  id: 's2', type: 'checkpoint', title: 'Quiz Dot', status: 'locked',
                  quiz: {
                    id: 'q_dot',
                    question: 'Quel élément symbolise le mariage coutumier au Cameroun ?',
                    options: [
                      { id: '1', text: 'La Dot', isCorrect: true },
                      { id: '2', text: 'La Mairie', isCorrect: false },
                      { id: '3', text: 'Le Tribunal', isCorrect: false }
                    ]
                  }
                }
              ]
            }
          ]
        },
        {
          id: 'u6_ecole',
          title: 'La Vie Scolaire',
          chapters: [
            {
              id: 'c6_route',
              title: 'Sécurité Routière',
              status: 'locked',
              xpReward: 120,
              description: 'De la maison à l\'école.',
              steps: [
                {
                  id: 's1', type: 'theory', title: 'Le Code de la Route', status: 'locked',
                  content: `
<h1>La Route de l'École</h1>
<p>Pour aller à l'école en sécurité, il faut respecter le code de la route.</p>
<ul>
  <li>Marcher sur le trottoir ou l'accotement, face au danger (côté gauche de la route).</li>
  <li>Traverser sur les passages piétons (les zébras).</li>
  <li>Regarder à gauche, puis à droite, puis encore à gauche avant de traverser.</li>
  <li>Ne pas jouer sur la route.</li>
</ul>
                  `
                }
              ]
            },
            {
              id: 'c6_reglement',
              title: 'Le Règlement Intérieur',
              status: 'locked',
              xpReward: 100,
              description: 'Droits et devoirs de l\'élève.',
              steps: [
                {
                  id: 's1', type: 'theory', title: 'L\'Élève Responsable', status: 'locked',
                  content: `
<h1>À l'École</h1>
<p>L'école est un lieu d'apprentissage et de vie commune.</p>
<h2>Devoirs de l'élève</h2>
<ul>
  <li>Être ponctuel et assidu.</li>
  <li>Porter sa tenue propre.</li>
  <li>Respecter les enseignants et les camarades.</li>
  <li>Ne pas tricher.</li>
  <li>Prendre soin du matériel scolaire (bancs, tableaux).</li>
</ul>
                  `
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'm6_ecm_conflits',
      title: 'Faire Face aux Conflits',
      units: [
        {
          id: 'u6_conflits_famille',
          title: 'Conflits Familiaux',
          chapters: [
            {
              id: 'c6_divorce',
              title: 'Divorce et Succession',
              status: 'locked',
              xpReward: 150,
              description: 'Causes et conséquences.',
              steps: [
                {
                  id: 's1', type: 'theory', title: 'Les Conflits', status: 'locked',
                  content: `
<h1>Les Conflits dans la Famille</h1>
<p>Parfois, la paix familiale est troublée.</p>
<ul>
  <li><strong>Le Divorce :</strong> Rupture officielle du mariage. Conséquences graves pour les enfants.</li>
  <li><strong>La Succession :</strong> Partage des biens après un décès. Source fréquente de disputes. Le <strong>Testament</strong> permet d'éviter ces conflits.</li>
</ul>
                  `
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'm6_ecm_droits',
      title: 'Droits de l\'Homme',
      units: [
        {
          id: 'u6_enfant',
          title: 'Protection de l\'Enfant',
          chapters: [
            {
              id: 'c6_abus',
              title: 'Exploitation des Enfants',
              status: 'locked',
              xpReward: 150,
              description: 'Travail forcé et maltraitance.',
              steps: [
                {
                  id: 's1', type: 'theory', title: 'Non à l\'Exploitation', status: 'locked',
                  content: `
<h1>Les Droits de l'Enfant</h1>
<p>Chaque enfant a droit à l'éducation, à la santé et à la protection.</p>
<h2>Formes d'abus à dénoncer</h2>
<ul>
  <li><strong>Travail des enfants :</strong> Faire travailler un enfant au lieu de l'envoyer à l'école.</li>
  <li><strong>Trafic d'enfants :</strong> Vente ou déplacement d'enfants.</li>
  <li><strong>Maltraitance :</strong> Coups, blessures, privation de nourriture.</li>
</ul>
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
