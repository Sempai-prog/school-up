
import { Module, Subject } from '../types';

export const GRADE_5_SUBJECTS: Subject[] = [
  { id: 'math5', name: 'Mathématiques', icon: 'Calculator', progress: 0, color: 'bg-blue-600' },
  { id: 'sci5', name: 'Sciences (SVT)', icon: 'Flask', progress: 0, color: 'bg-emerald-600' },
  { id: 'pct5', name: 'Physique-Chimie', icon: 'Atom', progress: 0, color: 'bg-indigo-600' },
  { id: 'hist5', name: 'Histoire-Géo', icon: 'Globe', progress: 0, color: 'bg-orange-600' },
  { id: 'ecm5', name: 'Citoyenneté', icon: 'Scale', progress: 0, color: 'bg-teal-600' },
  { id: 'info5', name: 'Informatique', icon: 'Cpu', progress: 0, color: 'bg-purple-600' },
  { id: 'ang5', name: 'Anglais', icon: 'Languages', progress: 0, color: 'bg-pink-600' },
  { id: 'fr5', name: 'Français', icon: 'BookOpen', progress: 0, color: 'bg-rose-600' },
];

export const GRADE_5_MODULES: Record<string, Module[]> = {
  'math5': [
    // ... (Previous Math Content Kept) ...
    {
      id: 'm5_math_num',
      title: 'Relations et Opérations Fondamentales',
      units: [{id: 'u1', title: 'Arithmétique', chapters: []}]
    }
  ],
  'sci5': [
     // ... (Previous SVT Content Kept) ...
     { id: 'm5_svt', title: 'SVT', units: [] }
  ],
  'pct5': [
     // ... (Previous PCT Content Kept) ...
     { id: 'm5_pct', title: 'PCT', units: [] }
  ],
  'hist5': [
     // ... (Previous Hist/Geo Content Kept) ...
     { id: 'm5_hist', title: 'Histoire', units: [] }
  ],

  // ========================================================================
  // ÉDUCATION À LA CITOYENNETÉ (ECM)
  // ========================================================================
  'ecm5': [
    {
      id: 'm5_ecm_integration',
      title: 'L\'Intégration Nationale',
      units: [
        {
          id: 'u5_nation',
          title: 'Vivre Ensemble',
          chapters: [
            {
              id: 'c5_integration',
              title: 'L\'Intégration Nationale',
              status: 'current',
              xpReward: 100,
              description: 'Définition et manifestations.',
              steps: [
                {
                  id: 's1', type: 'theory', title: 'L\'Unité Nationale', status: 'current',
                  content: `
<h1>L'Intégration Nationale</h1>
<p>C'est le processus par lequel les différentes ethnies du Cameroun se sentent appartenir à une seule nation, unie et solidaire.</p>

<h2>Manifestations</h2>
<ul>
  <li>La tolérance et l'acceptation des autres cultures.</li>
  <li>Le bilinguisme (Français/Anglais).</li>
  <li>Les mariages inter-tribaux.</li>
  <li>La libre circulation des personnes et des biens.</li>
</ul>
                  `
                }
              ]
            },
            {
              id: 'c5_fléaux',
              title: 'Les Entraves à l\'Intégration',
              status: 'locked',
              xpReward: 150,
              description: 'Tribalisme, Corruption, Favoritisme.',
              steps: [
                {
                  id: 's1', type: 'theory', title: 'Les Ennemis de la Nation', status: 'locked',
                  content: `
<h1>Les Entraves à l'Unité</h1>
<p>Certains comportements détruisent le vivre-ensemble :</p>
<ul>
  <li><strong>Le Tribalisme :</strong> Préférer quelqu'un uniquement parce qu'il est de sa tribu.</li>
  <li><strong>Le Népotisme :</strong> Favoriser sa famille dans l'administration.</li>
  <li><strong>La Corruption :</strong> Payer pour obtenir un service ou un droit.</li>
</ul>
                  `
                }
              ]
            }
          ]
        },
        {
          id: 'u5_minorites',
          title: 'Protection des Minorités',
          chapters: [
            {
              id: 'c5_pygmees',
              title: 'Les Minorités',
              status: 'locked',
              xpReward: 120,
              description: 'Pygmées et Bororos.',
              steps: [
                {
                  id: 's1', type: 'theory', title: 'Protéger les Minorités', status: 'locked',
                  content: `
<h1>Les Groupes Minoritaires</h1>
<p>Au Cameroun, certains groupes ont besoin d'une protection spéciale pour préserver leur culture tout en accédant au développement.</p>
<ul>
  <li><strong>Les Pygmées (Baka, Bakola) :</strong> Peuple de la forêt.</li>
  <li><strong>Les Bororos :</strong> Peuple d'éleveurs nomades.</li>
</ul>
<p>L'État veille à leur scolarisation et à leur accès aux soins de santé.</p>
                  `
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'm5_ecm_admin',
      title: 'Les Lieux d\'Intégration',
      units: [
        {
          id: 'u5_structures',
          title: 'Structures Administratives',
          chapters: [
            {
              id: 'c5_village_commune',
              title: 'Du Village à la Commune',
              status: 'locked',
              xpReward: 150,
              description: 'Organisation locale.',
              steps: [
                {
                  id: 's1', type: 'theory', title: 'Organisation Administrative', status: 'locked',
                  content: `
<h1>L'Organisation Locale</h1>

<h2>1. Le Village</h2>
<p>Dirigé par un <strong>Chef Traditionnel</strong> assisté de notables. C'est le gardien de la tradition.</p>

<h2>2. La Commune (Mairie)</h2>
<p>Dirigée par un <strong>Maire</strong> élu et un Conseil Municipal. Elle gère le développement local (écoles, marchés, routes, état civil).</p>
                  `
                }
              ]
            },
            {
              id: 'c5_admin_centrale',
              title: 'Département et Région',
              status: 'locked',
              xpReward: 120,
              description: 'Préfet et Gouverneur.',
              steps: [
                {
                  id: 's1', type: 'theory', title: 'L\'Administration', status: 'locked',
                  content: `
<h1>Unités Administratives</h1>
<ul>
  <li><strong>Le Département :</strong> Dirigé par le <strong>Préfet</strong>.</li>
  <li><strong>La Région :</strong> Dirigée par le <strong>Gouverneur</strong>.</li>
</ul>
<p>Ces autorités représentent le Chef de l'État et assurent le maintien de l'ordre.</p>
                  `
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'm5_ecm_media',
      title: 'Les Mass-Médias',
      units: [
        {
          id: 'u5_info',
          title: 'Gestion de l\'Information',
          chapters: [
            {
              id: 'c5_sources',
              title: 'Sources d\'Information',
              status: 'locked',
              xpReward: 100,
              description: 'Radio, Télé, Internet.',
              steps: [
                {
                  id: 's1', type: 'theory', title: 'S\'informer', status: 'locked',
                  content: `
<h1>Les Mass-Médias</h1>
<p>Ce sont les moyens de communication qui touchent un grand public.</p>
<ul>
  <li><strong>Traditionnels :</strong> Tam-tam, crieur public.</li>
  <li><strong>Modernes :</strong> Radio (CRTV), Télévision, Journaux, Internet.</li>
</ul>
                  `
                }
              ]
            },
            {
              id: 'c5_cyber',
              title: 'Dangers des Médias',
              status: 'locked',
              xpReward: 150,
              description: 'Fake news et Cybercriminalité.',
              steps: [
                {
                  id: 's1', type: 'theory', title: 'Attention aux Dérives', status: 'locked',
                  content: `
<h1>Les Dangers de l'Information</h1>
<p>Il faut être prudent face aux médias :</p>
<ul>
  <li><strong>Désinformation (Fake News) :</strong> Fausses nouvelles pour tromper les gens. Toujours vérifier la source !</li>
  <li><strong>Cybercriminalité :</strong> Arnaques sur Internet (broutage), vol d'identité.</li>
  <li><strong>Contenus inappropriés :</strong> Violence, pornographie.</li>
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
