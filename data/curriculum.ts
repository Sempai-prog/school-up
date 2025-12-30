
import { Module, Subject, GradeLevel, Chapter, Unit, LessonStep, StepType } from '../types';

// ============================================================================
// 1. CONTENT FACTORY HELPERS
// ============================================================================

/**
 * Creates a standard pedagogical chapter with Theory, Quiz, and Exercise.
 */
const createChapter = (
  id: string, 
  title: string, 
  topic: string, 
  status: 'locked' | 'current' | 'completed' = 'locked',
  customContent?: string
): Chapter => ({
  id,
  title,
  status,
  xpReward: 100,
  description: `Module d'apprentissage sur : ${topic}.`,
  steps: [
    {
      id: `${id}_theory`,
      type: 'theory',
      title: 'Cours & Notions',
      status: status === 'completed' ? 'completed' : status === 'current' ? 'current' : 'locked',
      content: customContent || `
# ${title}

## Introduction
Bienvenue dans cette leçon consacrée à **${topic}**. Ce concept est fondamental pour la suite de votre parcours scolaire.

## Définition
${topic} se définit par un ensemble de règles et de propriétés que nous allons observer.

### Points Clés
1. **Observation** : Comprendre le contexte de ${topic}.
2. **Analyse** : Décomposer les éléments constitutifs.
3. **Application** : Utiliser ces notions dans des exercices types.

> "La connaissance s'acquiert par l'expérience, tout le reste n'est que de l'information." - Albert Einstein
      `
    },
    {
      id: `${id}_quiz`,
      type: 'checkpoint',
      title: 'Quiz Rapide',
      status: 'locked',
      quiz: {
        id: `${id}_q1`,
        question: `Quelle affirmation est vraie concernant ${topic} ?`,
        options: [
          { id: 'o1', text: `C'est une notion abstraite sans application.`, isCorrect: false },
          { id: 'o2', text: `C'est un concept clé du programme.`, isCorrect: true },
          { id: 'o3', text: `Cela ne s'applique qu'en laboratoire.`, isCorrect: false }
        ]
      }
    },
    {
      id: `${id}_exo`,
      type: 'exercise',
      title: 'Exercice d\'Application',
      status: 'locked',
      parsons: [
        { id: 'p1', content: `Lire attentivement l'énoncé sur ${topic}.` },
        { id: 'p2', content: `Identifier les données pertinentes.` },
        { id: 'p3', content: `Appliquer la formule ou la règle de ${topic}.` },
        { id: 'p4', content: `Vérifier la cohérence du résultat.` }
      ]
    }
  ]
});

/**
 * Creates a generic module with typical units for a subject.
 */
const createStandardModule = (idPrefix: string, title: string, topics: string[]): Module => {
  return {
    id: `mod_${idPrefix}`,
    title,
    units: topics.map((topic, idx) => ({
      id: `u_${idPrefix}_${idx}`,
      title: `Partie ${idx + 1}`,
      chapters: [
        createChapter(`c_${idPrefix}_${idx}_1`, `Introduction : ${topic}`, topic, idx === 0 ? 'locked' : 'locked'),
        createChapter(`c_${idPrefix}_${idx}_2`, `Approfondissement : ${topic}`, topic, 'locked'),
        createChapter(`c_${idPrefix}_${idx}_3`, `Travaux Pratiques : ${topic}`, topic, 'locked'),
      ]
    }))
  };
};

// ============================================================================
// 2. SUBJECT DEFINITIONS
// ============================================================================

const SUB_MATH = { id: 'math', name: 'Mathématiques', icon: 'Calculator', progress: 0, color: 'bg-blue-500' };
const SUB_FR = { id: 'fr', name: 'Français', icon: 'BookOpen', progress: 0, color: 'bg-pink-500' };
const SUB_ENG = { id: 'eng', name: 'Anglais', icon: 'Languages', progress: 0, color: 'bg-rose-500' };
const SUB_HIST = { id: 'hist', name: 'Hist-Géo', icon: 'Globe', progress: 0, color: 'bg-orange-500' };
const SUB_SCI = { id: 'sci', name: 'Sciences (SVT/PCT)', icon: 'FlaskConical', progress: 0, color: 'bg-emerald-500' }; // College
const SUB_SVT = { id: 'svt', name: 'SVT', icon: 'Dna', progress: 0, color: 'bg-emerald-600' }; // Lycée/4e-3e
const SUB_PHYS = { id: 'phys', name: 'Physique-Chimie', icon: 'Atom', progress: 0, color: 'bg-indigo-600' }; // Lycée/4e-3e
const SUB_INFO = { id: 'info', name: 'Informatique', icon: 'Cpu', progress: 0, color: 'bg-purple-500' };
const SUB_ECM = { id: 'ecm', name: 'ECM', icon: 'Users', progress: 0, color: 'bg-yellow-500' }; // College
const SUB_PHILO = { id: 'philo', name: 'Philosophie', icon: 'Feather', progress: 0, color: 'bg-amber-600' }; // Tle
const SUB_ESP = { id: 'esp', name: 'Espagnol', icon: 'Languages', progress: 0, color: 'bg-red-500' }; // 4e+

export const CURRICULUM_SUBJECTS: Record<GradeLevel, Subject[]> = {
  '6eme': [SUB_MATH, SUB_FR, SUB_ENG, SUB_SCI, SUB_HIST, SUB_INFO, SUB_ECM],
  '5eme': [SUB_MATH, SUB_FR, SUB_ENG, SUB_SCI, SUB_HIST, SUB_INFO, SUB_ECM],
  '4eme': [SUB_MATH, SUB_FR, SUB_ENG, SUB_ESP, SUB_PHYS, SUB_SVT, SUB_HIST, SUB_INFO],
  '3eme': [SUB_MATH, SUB_FR, SUB_ENG, SUB_ESP, SUB_PHYS, SUB_SVT, SUB_HIST, SUB_INFO],
  '2nde': [SUB_MATH, SUB_FR, SUB_ENG, SUB_PHYS, SUB_SVT, SUB_HIST, SUB_INFO],
  '1ere': [SUB_MATH, SUB_FR, SUB_ENG, SUB_PHYS, SUB_SVT, SUB_HIST, SUB_INFO],
  'tle':  [SUB_MATH, SUB_PHILO, SUB_ENG, SUB_PHYS, SUB_SVT, SUB_HIST, SUB_INFO],
};

// ============================================================================
// 3. CURRICULUM CONTENT POPULATION
// ============================================================================

export const CURRICULUM_MODULES: Record<GradeLevel, Record<string, Module[]>> = {
  
  // ==========================================================================
  // GRADE 6ème (Cycle Observation)
  // ==========================================================================
  '6eme': {
    'math': [
      {
        id: 'm_6_math_1',
        title: 'Arithmétique',
        units: [
          {
            id: 'u_6_math_1',
            title: 'Nombres Entiers',
            chapters: [
              createChapter('c_6_math_1', 'Les Entiers Naturels', 'l\'écriture des nombres', 'current', `# Les Nombres Entiers\n\nPour lire et écrire les grands nombres, on regroupe les chiffres par tranches de trois.\n\nExemple: **12 345** se lit *douze mille trois cent quarante-cinq*.`),
              createChapter('c_6_math_2', 'Opérations : Addition/Soustraction', 'le calcul posé'),
              createChapter('c_6_math_3', 'Multiplication', 'les tables de multiplication'),
            ]
          }
        ]
      },
      createStandardModule('6_math_geo', 'Géométrie de Base', ['Droite et Segment', 'Le Cercle', 'Les Angles']),
    ],
    'fr': [ createStandardModule('6_fr_gram', 'Grammaire', ['La Phrase', 'Le Nom et le Groupe Nominal', 'Le Verbe']) ],
    'eng': [ createStandardModule('6_eng_voc', 'Vocabulary Basics', ['Greetings', 'Family & Friends', 'Colors and Numbers']) ],
    'sci': [ createStandardModule('6_sci_viv', 'Le Vivant', ['Découverte de l\'environnement', 'Le cycle de vie', 'La matière']) ],
    'hist': [ createStandardModule('6_hist_pre', 'La Préhistoire', ['Les premiers hommes', 'Le Néolithique', 'L\'Égypte Antique']) ],
    'info': [ createStandardModule('6_info_hw', 'L\'Ordinateur', ['L\'Unité Centrale', 'Clavier et Souris', 'Le Bureau Windows']) ],
    'ecm': [ createStandardModule('6_ecm_cit', 'Le Citoyen', ['L\'Identité', 'Les Symboles de la République', 'La Famille']) ]
  },

  // ==========================================================================
  // GRADE 5ème (Cycle Observation)
  // ==========================================================================
  '5eme': {
    'math': [
      createStandardModule('5_math_num', 'Nombres et Calculs', ['Priorités opératoires', 'Nombres relatifs', 'Fractions']),
      createStandardModule('5_math_geo', 'Géométrie', ['Symétrie centrale', 'Triangles', 'Aires et Périmètres']),
    ],
    'fr': [ createStandardModule('5_fr_conj', 'Conjugaison', ['Le Présent de l\'Indicatif', 'Le Passé Composé', 'L\'Imparfait']) ],
    'eng': [ createStandardModule('5_eng_daily', 'Daily Life', ['My House', 'Time and Schedule', 'Food and Drink']) ],
    'sci': [ createStandardModule('5_sci_corps', 'Corps Humain', ['La Digestion', 'La Respiration', 'La Circulation Sanguine']) ],
    'hist': [ createStandardModule('5_hist_moy', 'Moyen Âge', ['La féodalité', 'L\'Islam médiéval', 'Les royaumes africains']) ],
    'info': [ createStandardModule('5_info_word', 'Traitement de Texte', ['Saisir du texte', 'Mise en forme', 'Insertion d\'images']) ],
    'ecm': [ createStandardModule('5_ecm_droit', 'Droits et Devoirs', ['Les droits de l\'enfant', 'La solidarité', 'L\'égalité']) ]
  },

  // ==========================================================================
  // GRADE 4ème (Cycle Orientation)
  // ==========================================================================
  '4eme': {
    'math': [
      createStandardModule('4_math_alg', 'Algèbre', ['Puissances de 10', 'Calcul littéral', 'Équations simples']),
      createStandardModule('4_math_geo', 'Théorème de Pythagore', ['Le triangle rectangle', 'Calculer une longueur', 'Réciproque de Pythagore']),
    ],
    'fr': [ createStandardModule('4_fr_litt', 'Littérature', ['La nouvelle réaliste', 'Le lyrisme', 'La presse']) ],
    'eng': [ createStandardModule('4_eng_us', 'Culture USA', ['American History', 'School in the USA', 'Past Simple vs Continuous']) ],
    'esp': [ createStandardModule('4_esp_base', 'Bases Espagnol', ['Saluer et se présenter', 'La famille', 'Gustar']) ],
    'phys': [ createStandardModule('4_phys_elec', 'Électricité', ['Intensité et Tension', 'Loi d\'Ohm', 'Circuits en série/dérivation']) ],
    'svt': [ createStandardModule('4_svt_repro', 'Reproduction', ['Puberté', 'Appareils reproducteurs', 'Contraception']) ],
    'hist': [ createStandardModule('4_hist_revo', 'Les Révolutions', ['La traite négrière', 'La Révolution Française', 'L\'Europe industrielle']) ],
    'info': [ createStandardModule('4_info_web', 'Internet', ['Le Web', 'Les Moteurs de recherche', 'Dangers d\'Internet']) ]
  },

  // ==========================================================================
  // GRADE 3ème (Exam Class - BEPC)
  // ==========================================================================
  '3eme': {
    'math': [
      {
        id: 'm_3_math_thal',
        title: 'Théorème de Thalès',
        units: [
          {
            id: 'u_3_thal',
            title: 'Propriété de Thalès',
            chapters: [
              createChapter('c_3_thal_1', 'Théorème Direct', 'la proportionnalité dans le triangle', 'current', `# Théorème de Thalès\n\nDans un triangle ABC, si M appartient à [AB], N à [AC] et si (MN) est parallèle à (BC), alors :\n\n**AM/AB = AN/AC = MN/BC**`),
              createChapter('c_3_thal_2', 'Réciproque de Thalès', 'prouver que deux droites sont parallèles'),
              createChapter('c_3_thal_3', 'Agrandissement et Réduction', 'l\'échelle et les coefficients')
            ]
          }
        ]
      },
      createStandardModule('3_math_rac', 'Racines Carrées', ['Définition', 'Opérations sur les racines', 'Équations x² = a']),
      createStandardModule('3_math_aff', 'Fonctions Affines', ['Fonction linéaire', 'Fonction affine', 'Représentation graphique']),
    ],
    'phys': [
      createStandardModule('3_phys_mec', 'Mécanique', ['Poids et Masse', 'Forces', 'Équilibre d\'un solide']),
      createStandardModule('3_phys_chim', 'Solutions Aqueuses', ['pH d\'une solution', 'Acides et Bases', 'Réaction chimique']),
    ],
    'svt': [
      createStandardModule('3_svt_imm', 'Immunologie', ['Le système immunitaire', 'Les microbes', 'Vaccination et Sérum']),
      createStandardModule('3_svt_gen', 'Génétique', ['Chromosomes', 'ADN', 'Hérédité']),
    ],
    'fr': [ createStandardModule('3_fr_brevet', 'Préparation BEPC', ['Dictée et Réécriture', 'Analyse de texte', 'Rédaction']) ],
    'eng': [ createStandardModule('3_eng_world', 'English Speaking World', ['UK & Commonwealth', 'Environment', 'Future Career']) ],
    'esp': [ createStandardModule('3_esp_vida', 'Vida Cotidiana', ['La maison', 'La ville', 'L\'heure et la date']) ],
    'hist': [ createStandardModule('3_hist_guer', 'Guerres Mondiales', ['Première Guerre Mondiale', 'Seconde Guerre Mondiale', 'Indépendances Africaines']) ],
    'info': [ createStandardModule('3_info_algo', 'Algorithmique', ['Variables', 'Boucles', 'Scratch']) ]
  },

  // ==========================================================================
  // GRADE 2nde (Lycée)
  // ==========================================================================
  '2nde': {
    'math': [
      createStandardModule('2_math_vect', 'Vecteurs', ['Translation et Vecteur', 'Coordonnées', 'Colinéarité']),
      createStandardModule('2_math_fonc', 'Généralités Fonctions', ['Image et Antécédent', 'Variations', 'Fonction Carré et Inverse']),
    ],
    'phys': [
      createStandardModule('2_phys_mouv', 'Mouvement et Force', ['Référentiels', 'Vitesse', 'Principe d\'Inertie']),
      createStandardModule('2_phys_chim', 'La Mole', ['Quantité de matière', 'Masse molaire', 'Concentration']),
    ],
    'svt': [
      createStandardModule('2_svt_cell', 'La Cellule', ['Unité du vivant', 'Métabolisme', 'ADN']),
      createStandardModule('2_svt_bio', 'Biodiversité', ['Échelles de biodiversité', 'Sélection naturelle', 'Évolution']),
    ],
    'fr': [ createStandardModule('2_fr_genre', 'Genres Littéraires', ['Le Roman', 'La Poésie', 'Le Théâtre']) ],
    'eng': [ createStandardModule('2_eng_soc', 'Society', ['Social Media', 'Education', 'Technology']) ],
    'hist': [ createStandardModule('2_hist_anc', 'L\'Antiquité à l\'Âge Moderne', ['Citoyenneté à Athènes', 'La Renaissance', 'L\'État Royal']) ],
    'info': [ createStandardModule('2_info_py', 'Python', ['Types de données', 'Conditions', 'Fonctions']) ]
  },

  // ==========================================================================
  // GRADE 1ère (Lycée)
  // ==========================================================================
  '1ere': {
    'math': [
      createStandardModule('1_math_bary', 'Barycentres', ['Barycentre de 2 points', 'Barycentre de 3 points', 'Lignes de niveau']),
      createStandardModule('1_math_trigo', 'Trigonométrie', ['Cercle trigonométrique', 'Formules d\'addition', 'Équations trigo']),
      createStandardModule('1_math_deriv', 'Dérivation', ['Nombre dérivé', 'Fonction dérivée', 'Étude de fonctions']),
    ],
    'phys': [
      createStandardModule('1_phys_en', 'Énergie', ['Énergie Cinétique', 'Énergie Potentielle', 'Conservation de l\'énergie']),
      createStandardModule('1_phys_redox', 'Oxydoréduction', ['Couples Redox', 'Dosages', 'Tableau d\'avancement']),
    ],
    'svt': [
      createStandardModule('1_svt_nerv', 'Système Nerveux', ['Le neurone', 'Le réflexe myotatique', 'Cerveau et mouvement']),
      createStandardModule('1_svt_eco', 'Écosystèmes', ['Flux d\'énergie', 'Cycle de la matière', 'Services écosystémiques']),
    ],
    'fr': [ createStandardModule('1_fr_bac', 'Prépa BAC Français', ['Le texte argumentatif', 'La dissertation', 'Le commentaire composé']) ],
    'eng': [ createStandardModule('1_eng_glob', 'Global Issues', ['Migration', 'Climate Change', 'Power and Influence']) ],
    'hist': [ createStandardModule('1_hist_19', 'Le XIXème Siècle', ['Révolutions industrielles', 'Colonisation', 'La IIIème République']) ],
    'info': [ createStandardModule('1_info_web', 'Web & Données', ['HTML/CSS Avancé', 'Bases de données', 'Réseaux sociaux']) ]
  },

  // ==========================================================================
  // GRADE Terminale (Exam Class - BAC)
  // ==========================================================================
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
              createChapter('c_tle_cons_1', 'La Conscience', 'la définition du Moi', 'current', `# La Conscience\n\nLa conscience est la connaissance immédiate de son existence et de ses actes.\n\n### Descartes\n"Je pense, donc je suis." (Cogito ergo sum). La conscience est le fondement de toute vérité.`),
              createChapter('c_tle_inc_1', 'L\'Inconscient', 'Freud et la psychanalyse'),
              createChapter('c_tle_autrui', 'Autrui', 'la relation aux autres')
            ]
          }
        ]
      },
      createStandardModule('tle_philo_cult', 'La Culture', ['L\'Art', 'Le Travail', 'La Religion']),
      createStandardModule('tle_philo_rais', 'La Raison et le Réel', ['La Vérité', 'La Démonstration', 'La Matière et l\'Esprit']),
    ],
    'math': [
      {
        id: 'm_tle_math_an',
        title: 'Analyse',
        units: [
          {
            id: 'u_tle_ln',
            title: 'Fonction Logarithme',
            chapters: [
              createChapter('c_tle_ln_1', 'Logarithme Népérien', 'la fonction ln(x)', 'current', `# La Fonction Ln\n\nLa fonction logarithme népérien est la primitive de la fonction inverse $x \\mapsto 1/x$ sur $]0, +\\infty[$ qui s'annule en 1.\n\n**Propriétés :**\n- ln(a*b) = ln(a) + ln(b)\n- ln(1) = 0\n- ln(e) = 1`),
              createChapter('c_tle_exp', 'Fonction Exponentielle', 'la fonction exp(x)'),
              createChapter('c_tle_lim', 'Limites et Continuité', 'le théorème des valeurs intermédiaires'),
              createChapter('c_tle_int', 'Intégrales', 'le calcul d\'aires')
            ]
          }
        ]
      },
      createStandardModule('tle_math_prob', 'Probabilités', ['Probabilités conditionnelles', 'Loi Binomiale', 'Lois à densité']),
      createStandardModule('tle_math_geo', 'Géométrie Espace', ['Droites et Plans', 'Produit Scalaire', 'Vecteur normal']),
    ],
    'phys': [
      {
        id: 'm_tle_phys_newt',
        title: 'Mécanique de Newton',
        units: [
          {
            id: 'u_tle_newt',
            title: 'Lois de Newton',
            chapters: [
              createChapter('c_tle_newt_1', '2ème Loi de Newton', 'F = ma', 'current', `# Principe Fondamental de la Dynamique\n\nDans un référentiel galiléen, la somme des forces extérieures appliquées à un solide est égale au produit de sa masse par l'accélération de son centre d'inertie.\n\n$$\\sum \\vec{F}_{ext} = m \\cdot \\vec{a}$$`),
              createChapter('c_tle_sat', 'Mouvement des Satellites', 'la gravitation universelle'),
              createChapter('c_tle_chute', 'Chute Libre', 'le mouvement parabolique')
            ]
          }
        ]
      },
      createStandardModule('tle_phys_nucl', 'Physique Nucléaire', ['Radioactivité', 'Fission et Fusion', 'Énergie nucléaire']),
      createStandardModule('tle_phys_onde', 'Ondes', ['Ondes lumineuses', 'Diffraction', 'Interférences']),
    ],
    'svt': [
      createStandardModule('tle_svt_gen', 'Génétique et Évolution', ['Méiose et Fécondation', 'Brassage génétique', 'Plantes domestiquées']),
      createStandardModule('tle_svt_clim', 'Le Climat', ['Reconstitution climatique', 'Effet de serre', 'Modèles climatiques']),
      createStandardModule('tle_svt_nerf', 'Corps Humain', ['Réflexes', 'Contraction musculaire', 'ATP']),
    ],
    'eng': [ createStandardModule('tle_eng_myth', 'Myths and Heroes', ['Modern Heroes', 'Anti-heroes', 'Myths in Pop Culture']) ],
    'hist': [ createStandardModule('tle_hist_monde', 'Le Monde depuis 1945', ['Guerre Froide', 'Décolonisation', 'Nouvel Ordre Mondial']) ],
    'info': [ createStandardModule('tle_info_proj', 'Projet Informatique', ['Algorithmes complexes', 'Bases de données SQL', 'Architecture réseau']) ]
  }
};
