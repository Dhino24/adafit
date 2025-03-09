import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, Clock, Activity, X, ChevronRight, Search, ArrowUp, Dumbbell, Coffee, 
  BarChart2, Droplet, Save, PlusCircle, Download, Upload } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Données complètes des exercices
const exData = {
  poitrine: [
    { id: 1, name: "Développé couché", sets: 4, reps: "8-10", rest: "90s", muscles: ["Pectoraux", "Triceps"], description: "Le développé couché est un exercice composé qui cible principalement les pectoraux. Pour votre gabarit (1m95), assurez-vous d'avoir une prise légèrement plus large que la largeur des épaules pour maximiser l'activation des pectoraux.", difficulty: "Intermédiaire", equipment: "Barre, Banc", tempo: "3-1-2-0", image: "/api/placeholder/400/300" },
    { id: 2, name: "Écartés à la poulie", sets: 3, reps: "10-12", rest: "60s", muscles: ["Pectoraux", "Épaules"], description: "Les écartés à la poulie offrent une tension constante sur les pectoraux tout au long du mouvement.", difficulty: "Débutant", equipment: "Machine à poulie", tempo: "2-1-2-1", image: "/api/placeholder/400/300" },
    { id: 3, name: "Dips pour la poitrine", sets: 3, reps: "8-12", rest: "90s", muscles: ["Pectoraux", "Triceps", "Épaules"], description: "Les dips pour la poitrine ciblent la partie inférieure des pectoraux. Penchez-vous vers l'avant pour mieux cibler la poitrine.", difficulty: "Avancé", equipment: "Barres parallèles", tempo: "2-1-2-0", image: "/api/placeholder/400/300" },
    { id: 4, name: "Développé incliné", sets: 4, reps: "8-10", rest: "90s", muscles: ["Pectoraux (supérieurs)", "Triceps", "Épaules"], description: "Le développé incliné cible davantage la partie supérieure des pectoraux. Utilisez un angle d'inclinaison de 30-45 degrés pour un ciblage optimal.", difficulty: "Intermédiaire", equipment: "Barre, Banc incliné", tempo: "3-0-2-0", image: "/api/placeholder/400/300" },
    { id: 5, name: "Écartés avec haltères", sets: 3, reps: "10-12", rest: "60s", muscles: ["Pectoraux", "Épaules"], description: "Les écartés avec haltères permettent un étirement profond des pectoraux. Maintenez une légère flexion des coudes tout au long du mouvement.", difficulty: "Intermédiaire", equipment: "Haltères, Banc", tempo: "2-1-2-1", image: "/api/placeholder/400/300" }
  ],
  dos: [
    { id: 7, name: "Soulevé de terre", sets: 4, reps: "6-8", rest: "120s", muscles: ["Érecteurs", "Trapèzes", "Grand dorsal"], description: "Le soulevé de terre est un exercice fondamental pour développer la force du dos.", difficulty: "Avancé", equipment: "Barre", tempo: "2-0-2-1", image: "/api/placeholder/400/300" },
    { id: 8, name: "Tirage vertical", sets: 4, reps: "8-10", rest: "90s", muscles: ["Grand dorsal", "Biceps"], description: "Le tirage vertical prise large cible principalement le dos large.", difficulty: "Intermédiaire", equipment: "Machine", tempo: "3-0-2-0", image: "/api/placeholder/400/300" },
    { id: 9, name: "Rowing haltère", sets: 3, reps: "8-10", rest: "90s", muscles: ["Grand dorsal", "Rhomboïdes", "Biceps"], description: "Le rowing avec haltère permet de travailler un côté à la fois, corrigeant ainsi les éventuels déséquilibres musculaires.", difficulty: "Intermédiaire", equipment: "Haltère, Banc", tempo: "2-1-2-0", image: "/api/placeholder/400/300" },
    { id: 10, name: "Tirage horizontal", sets: 4, reps: "8-10", rest: "90s", muscles: ["Grand dorsal", "Rhomboïdes", "Biceps"], description: "Le tirage horizontal à la poulie cible l'épaisseur du dos. Serrez les omoplates à la fin du mouvement pour maximiser l'activation.", difficulty: "Intermédiaire", equipment: "Machine à poulie", tempo: "2-1-2-0", image: "/api/placeholder/400/300" },
    { id: 11, name: "Pull-over avec haltère", sets: 3, reps: "10-12", rest: "60s", muscles: ["Grand dorsal", "Pectoraux"], description: "Le pull-over avec haltère cible particulièrement le grand dorsal dans son étirement. Excellent pour développer l'amplitude de la cage thoracique.", difficulty: "Intermédiaire", equipment: "Haltère, Banc", tempo: "2-1-2-1", image: "/api/placeholder/400/300" }
  ],
  jambes: [
    { id: 13, name: "Squat", sets: 4, reps: "8-10", rest: "120s", muscles: ["Quadriceps", "Fessiers"], description: "Le squat est un exercice fondamental pour développer la force des jambes.", difficulty: "Intermédiaire", equipment: "Barre", tempo: "4-1-2-0", image: "/api/placeholder/400/300" },
    { id: 14, name: "Leg press", sets: 3, reps: "10-12", rest: "90s", muscles: ["Quadriceps", "Fessiers"], description: "La presse à cuisses est excellente pour développer la masse des jambes avec moins de stress sur le bas du dos.", difficulty: "Intermédiaire", equipment: "Machine", tempo: "3-1-2-0", image: "/api/placeholder/400/300" },
    { id: 15, name: "Extension des jambes", sets: 3, reps: "12-15", rest: "60s", muscles: ["Quadriceps"], description: "L'extension des jambes isole les quadriceps. Parfait comme exercice de finition après des mouvements composés.", difficulty: "Débutant", equipment: "Machine", tempo: "2-0-2-1", image: "/api/placeholder/400/300" },
    { id: 16, name: "Curl des jambes", sets: 3, reps: "10-12", rest: "60s", muscles: ["Ischio-jambiers"], description: "Le curl des jambes cible spécifiquement les ischio-jambiers, souvent négligés. Essentiel pour un développement équilibré.", difficulty: "Débutant", equipment: "Machine", tempo: "2-0-2-1", image: "/api/placeholder/400/300" },
    { id: 17, name: "Soulevé de terre roumain", sets: 3, reps: "8-10", rest: "90s", muscles: ["Ischio-jambiers", "Fessiers", "Bas du dos"], description: "Le soulevé de terre roumain développe la force et la masse des ischio-jambiers et des fessiers tout en renforçant le bas du dos.", difficulty: "Intermédiaire", equipment: "Barre ou Haltères", tempo: "3-0-3-0", image: "/api/placeholder/400/300" }
  ],
  epaules: [
    { id: 19, name: "Développé militaire", sets: 4, reps: "8-10", rest: "90s", muscles: ["Deltoïdes", "Triceps"], description: "Le développé militaire est un exercice composé qui cible principalement les épaules.", difficulty: "Intermédiaire", equipment: "Barre", tempo: "3-0-2-0", image: "/api/placeholder/400/300" },
    { id: 20, name: "Élévations latérales", sets: 3, reps: "12-15", rest: "60s", muscles: ["Deltoïdes latéraux"], description: "Les élévations latérales isolent parfaitement les deltoïdes latéraux.", difficulty: "Débutant", equipment: "Haltères", tempo: "2-0-2-1", image: "/api/placeholder/400/300" },
    { id: 21, name: "Élévations frontales", sets: 3, reps: "12-15", rest: "60s", muscles: ["Deltoïdes antérieurs"], description: "Les élévations frontales ciblent spécifiquement les deltoïdes antérieurs. Gardez les coudes légèrement fléchis pour réduire le stress articulaire.", difficulty: "Débutant", equipment: "Haltères ou Barre", tempo: "2-0-2-1", image: "/api/placeholder/400/300" },
    { id: 22, name: "Face pull", sets: 3, reps: "12-15", rest: "60s", muscles: ["Deltoïdes postérieurs", "Trapèzes"], description: "Le face pull est excellent pour les deltoïdes postérieurs et les muscles stabilisateurs des épaules. Important pour l'équilibre et la santé des épaules.", difficulty: "Intermédiaire", equipment: "Poulie", tempo: "2-1-2-1", image: "/api/placeholder/400/300" },
    { id: 23, name: "Rowing menton", sets: 3, reps: "10-12", rest: "60s", muscles: ["Deltoïdes", "Trapèzes"], description: "Le rowing menton active simultanément les deltoïdes et les trapèzes. Gardez les coudes plus hauts que les mains pour maximiser l'activation des épaules.", difficulty: "Intermédiaire", equipment: "Barre ou Haltères", tempo: "2-0-2-0", image: "/api/placeholder/400/300" }
  ],
  biceps: [
    { id: 25, name: "Curl haltères", sets: 3, reps: "10-12", rest: "60s", muscles: ["Biceps"], description: "Le curl haltères est un exercice de base pour les biceps.", difficulty: "Débutant", equipment: "Haltères", tempo: "2-0-2-1", image: "/api/placeholder/400/300" },
    { id: 26, name: "Curl barre EZ", sets: 3, reps: "10-12", rest: "60s", muscles: ["Biceps"], description: "Le curl avec barre EZ réduit la tension sur les poignets par rapport à une barre droite.", difficulty: "Débutant", equipment: "Barre EZ", tempo: "2-1-2-0", image: "/api/placeholder/400/300" },
    { id: 27, name: "Curl incliné", sets: 3, reps: "10-12", rest: "60s", muscles: ["Biceps (longue portion)"], description: "Le curl incliné étire davantage la longue portion du biceps en position de départ, ce qui favorise un meilleur développement.", difficulty: "Intermédiaire", equipment: "Haltères, Banc incliné", tempo: "3-0-2-1", image: "/api/placeholder/400/300" },
    { id: 28, name: "Curl marteau", sets: 3, reps: "10-12", rest: "60s", muscles: ["Biceps", "Brachiaux", "Avant-bras"], description: "Le curl marteau cible à la fois les biceps et les avant-bras, notamment le muscle brachial qui donne de l'épaisseur au bras.", difficulty: "Débutant", equipment: "Haltères", tempo: "2-0-2-1", image: "/api/placeholder/400/300" },
    { id: 29, name: "Curl concentré", sets: 3, reps: "10-12", rest: "60s", muscles: ["Biceps (pic)"], description: "Le curl concentré permet une concentration maximale sur le biceps et favorise le développement du pic. Idéal comme exercice de finition.", difficulty: "Débutant", equipment: "Haltère", tempo: "2-1-2-0", image: "/api/placeholder/400/300" }
  ],
  triceps: [
    { id: 31, name: "Extensions poulie", sets: 3, reps: "12-15", rest: "60s", muscles: ["Triceps"], description: "Les extensions à la poulie haute sont excellentes pour isoler les triceps.", difficulty: "Débutant", equipment: "Poulie", tempo: "2-1-2-0", image: "/api/placeholder/400/300" },
    { id: 32, name: "Extension nuque", sets: 3, reps: "10-12", rest: "60s", muscles: ["Triceps (longue)"], description: "Les extensions nuque ciblent particulièrement la longue portion du triceps.", difficulty: "Intermédiaire", equipment: "Haltère", tempo: "3-1-2-0", image: "/api/placeholder/400/300" },
    { id: 33, name: "Dips", sets: 3, reps: "8-12", rest: "90s", muscles: ["Triceps", "Pectoraux", "Épaules"], description: "Les dips sont excellents pour la masse des triceps. Gardez le corps droit pour cibler davantage les triceps plutôt que la poitrine.", difficulty: "Intermédiaire", equipment: "Barres parallèles", tempo: "2-1-2-0", image: "/api/placeholder/400/300" },
    { id: 34, name: "Extension overhead", sets: 3, reps: "10-12", rest: "60s", muscles: ["Triceps (longue)"], description: "L'extension overhead avec haltère ou corde sollicite fortement la longue portion du triceps. Gardez les bras près des oreilles.", difficulty: "Intermédiaire", equipment: "Haltère ou Poulie", tempo: "2-1-2-0", image: "/api/placeholder/400/300" },
    { id: 35, name: "Kick-back", sets: 3, reps: "12-15", rest: "60s", muscles: ["Triceps"], description: "Le kick-back est excellent pour le détail et la définition des triceps. Maintenez le bras parallèle au sol pendant tout le mouvement.", difficulty: "Intermédiaire", equipment: "Haltère", tempo: "2-0-2-1", image: "/api/placeholder/400/300" }
  ],
  abdominaux: [
    { id: 37, name: "Crunch", sets: 3, reps: "15-20", rest: "45s", muscles: ["Abdos supérieurs"], description: "Le crunch est un exercice de base pour les abdominaux.", difficulty: "Débutant", equipment: "Tapis", tempo: "2-0-2-0", image: "/api/placeholder/400/300" },
    { id: 38, name: "Relevé de jambes", sets: 3, reps: "10-15", rest: "60s", muscles: ["Abdos inférieurs"], description: "Les relevés de jambes suspendus ciblent principalement les abdominaux inférieurs.", difficulty: "Avancé", equipment: "Barre", tempo: "2-1-2-0", image: "/api/placeholder/400/300" },
    { id: 39, name: "Planche", sets: 3, reps: "30-60s", rest: "45s", muscles: ["Abdominaux", "Transverse"], description: "La planche est excellente pour renforcer le core et la stabilité abdominale. Maintenez une ligne droite de la tête aux pieds.", difficulty: "Débutant", equipment: "Tapis", tempo: "Hold", image: "/api/placeholder/400/300" },
    { id: 40, name: "Bicycle crunch", sets: 3, reps: "15-20", rest: "45s", muscles: ["Abdos", "Obliques"], description: "Le bicycle crunch active simultanément les abdominaux et les obliques. Touchez le coude au genou opposé en alternant.", difficulty: "Intermédiaire", equipment: "Tapis", tempo: "2-0-2-0", image: "/api/placeholder/400/300" },
    { id: 41, name: "Russian twist", sets: 3, reps: "15-20", rest: "45s", muscles: ["Obliques", "Abdominaux"], description: "Le Russian twist cible efficacement les obliques. Pour plus d'intensité, utilisez un medicine ball ou un poids léger.", difficulty: "Intermédiaire", equipment: "Medicine ball", tempo: "2-0-2-0", image: "/api/placeholder/400/300" }
  ]
};

// Programme d'entraînement
const workoutProg = {
  day1: {
    title: "Jour 1 - Poitrine/Triceps",
    muscleGroups: [
      { muscle: "Poitrine", exercises: [
        { name: "Développé couché", sets: 4, reps: "8-10", rest: "90s", goal: "85kg", current: "60kg" },
        { name: "Développé incliné haltères", sets: 4, reps: "8-10", rest: "90s" },
        { name: "Écartés à la poulie", sets: 3, reps: "10-12", rest: "60s" },
        { name: "Dips pour la poitrine", sets: 3, reps: "8-12", rest: "90s" }
      ]},
      { muscle: "Triceps", exercises: [
        { name: "Extensions poulie", sets: 3, reps: "12-15", rest: "60s" },
        { name: "Extension nuque", sets: 3, reps: "10-12", rest: "60s" }
      ]}
    ]
  },
  day2: {
    title: "Jour 2 - Épaules/Jambes",
    muscleGroups: [
      { muscle: "Épaules", exercises: [
        { name: "Développé militaire", sets: 4, reps: "8-10", rest: "90s" },
        { name: "Élévations latérales", sets: 3, reps: "12-15", rest: "60s" }
      ]},
      { muscle: "Jambes", exercises: [
        { name: "Squat", sets: 4, reps: "8-10", rest: "120s", goal: "95kg", current: "50kg" },
        { name: "Leg press", sets: 3, reps: "10-12", rest: "90s" }
      ]}
    ]
  },
  day3: {
    title: "Jour 3 - Dos/Biceps",
    muscleGroups: [
      { muscle: "Dos", exercises: [
        { name: "Soulevé de terre", sets: 4, reps: "6-8", rest: "120s", goal: "105kg", current: "70kg" },
        { name: "Tirage vertical", sets: 4, reps: "8-10", rest: "90s" }
      ]},
      { muscle: "Biceps", exercises: [
        { name: "Curl haltères", sets: 3, reps: "10-12", rest: "60s" },
        { name: "Curl barre EZ", sets: 3, reps: "10-12", rest: "60s" }
      ]}
    ]
  }
};

// Générateur aléatoire de plats sénégalais
const genMeal = () => {
  const plats = [
    "Thieboudienne", "Mafé", "Yassa Poulet", "Yassa Poisson", "Poulet DG",
    "Domoda", "Thiou", "Caldou", "Soupe Kandia", "Thiakry", "Mbakhal Saloum",
    "Thiéré", "Ndambé", "Vermicelle au Poisson", "Salade Sombi"
  ];
  return plats[Math.floor(Math.random() * plats.length)];
};

// Plan nutritionnel
const nutrPlan = {
  dailyCalories: { trainingDay: 3800, restDay: 3200 },
  dailyProtein: 220,
  macros: {
    trainingDay: { protein: 220, carbs: 455, fats: 95 },
    restDay: { protein: 220, carbs: 345, fats: 85 }
  },
  meals: {
    trainingDay: [
      { name: "Petit-déj", foods: ["4 œufs entiers", "80g flocons d'avoine", "Banane"], calories: 850, protein: 45, timing: "7h00" },
      { name: "Collation", foods: ["Yaourt grec", "Granola", "Bissap"], calories: 450, protein: 20, timing: "10h00" },
      { name: "Déjeuner", foods: ["250g Thieboudienne", "Salade"], calories: 750, protein: 55, timing: "13h00" },
      { name: "Pré-entraînement", foods: ["200g Sombi", "Banane"], calories: 350, protein: 15, timing: "Avant" },
      { name: "Post-entraînement", foods: ["Shake protéiné", "Banane"], calories: 300, protein: 35, timing: "Après" },
      { name: "Dîner", foods: ["200g Yassa", "Riz", "Légumes"], calories: 800, protein: 50, timing: "20h00" }
    ],
    restDay: [
      { name: "Petit-déj", foods: ["Lakh protéiné", "3 œufs", "Thé"], calories: 650, protein: 35, timing: "7h00" },
      { name: "Collation", foods: ["Jus de bouye", "Noix"], calories: 350, protein: 15, timing: "10h00" },
      { name: "Déjeuner", foods: ["300g Mafé", "Riz"], calories: 650, protein: 45, timing: "13h00" },
      { name: "Collation", foods: ["Ngalakh protéiné", "Fruit"], calories: 250, protein: 25, timing: "16h00" },
      { name: "Dîner", foods: ["250g Domoda", "Légumes"], calories: 600, protein: 40, timing: "20h00" }
    ]
  },
  weeklyPlan: [
    { day: "Lun", type: "Repos", meal: genMeal() },
    { day: "Mar", type: "Entraînement", meal: genMeal() },
    { day: "Mer", type: "Repos", meal: genMeal() },
    { day: "Jeu", type: "Repos", meal: genMeal() },
    { day: "Ven", type: "Entraînement", meal: genMeal() },
    { day: "Sam", type: "Repos", meal: genMeal() },
    { day: "Dim", type: "Entraînement", meal: genMeal() }
  ],
  hydration: "4L d'eau par jour"
};

// Données initiales progression
const initProgData = [
  { week: 1, date: '2025-02-15', weight: 91.5, benchPress: 60, squat: 50, deadlift: 70 },
  { week: 2, date: '2025-02-22', weight: 92.2, benchPress: 62.5, squat: 55, deadlift: 75 },
  { week: 3, date: '2025-03-01', weight: 93, benchPress: 65, squat: 60, deadlift: 80 }
];

// Infos app et thèmes
const APP = {name: "AdaFiT", version: "1.1"};
const themes = {
  program: {
    primary: 'from-indigo-600 to-blue-500',
    hover: 'from-indigo-700 to-blue-600',
    light: 'from-indigo-50 to-blue-50',
    accent: 'from-violet-500 to-purple-600',
    header: 'from-indigo-600 via-blue-500 to-violet-600',
    headerLight: 'from-indigo-500/20 via-blue-400/20 to-violet-500/20',
    card: 'from-indigo-100 to-blue-100',
    button: 'from-indigo-500 to-blue-500',
    buttonHover: 'from-indigo-600 to-blue-600',
    action: 'from-rose-500 to-red-500',
    actionHover: 'from-rose-600 to-red-600'
  },
  nutrition: {
    primary: 'from-emerald-600 to-teal-500',
    hover: 'from-emerald-700 to-teal-600',
    light: 'from-emerald-50 to-teal-50',
    accent: 'from-green-500 to-emerald-600',
    header: 'from-emerald-600 via-teal-500 to-green-500',
    headerLight: 'from-emerald-500/20 via-teal-400/20 to-green-400/20',
    card: 'from-emerald-100 to-teal-100',
    button: 'from-emerald-500 to-teal-500',
    buttonHover: 'from-emerald-600 to-teal-600',
    action: 'from-amber-500 to-yellow-500',
    actionHover: 'from-amber-600 to-yellow-600'
  },
  progress: {
    primary: 'from-amber-500 to-orange-500',
    hover: 'from-amber-600 to-orange-600',
    light: 'from-amber-50 to-orange-50',
    accent: 'from-red-500 to-orange-500',
    header: 'from-amber-500 via-orange-500 to-red-500',
    headerLight: 'from-amber-400/20 via-orange-400/20 to-red-400/20',
    card: 'from-amber-100 to-orange-100',
    button: 'from-amber-500 to-orange-500',
    buttonHover: 'from-amber-600 to-orange-600',
    action: 'from-blue-500 to-indigo-500',
    actionHover: 'from-blue-600 to-indigo-600'
  },
  exercises: {
    primary: 'from-rose-500 to-pink-600',
    hover: 'from-rose-600 to-pink-700',
    light: 'from-rose-50 to-pink-50',
    accent: 'from-red-500 to-rose-500',
    header: 'from-rose-600 via-pink-600 to-purple-600',
    headerLight: 'from-rose-500/20 via-pink-500/20 to-purple-500/20',
    card: 'from-rose-100 to-pink-100',
    button: 'from-rose-500 to-pink-500',
    buttonHover: 'from-rose-600 to-pink-600',
    action: 'from-violet-500 to-purple-500',
    actionHover: 'from-violet-600 to-purple-600'
  }
};

// LocalStorage helpers
const store = k => ({
  get: () => JSON.parse(localStorage.getItem(k) || "null"),
  set: v => localStorage.setItem(k, JSON.stringify(v)),
  del: () => localStorage.removeItem(k)
});

// Suggestions de progression
const useProgSug = (data, key) => useMemo(() => {
  const last3 = data.slice(-3).map(d => d[key]).filter(Boolean);
  if (last3.length < 3) return null;
  
  const isPlat = last3[2] === last3[1] && last3[1] === last3[0];
  const isUp = last3[2] > last3[1] && last3[1] > last3[0];
  
  return isPlat ? {type: "plat", msg: "↗️ +2.5kg/+1rep"} : 
         isUp ? {type: "prog", msg: "🔥 Continue!"} : null;
}, [data, key]);

// Composant principal
const App = () => {
  // États
  const [t, setT] = useState('program'); // tab
  const [d, setD] = useState('day1'); // day
  const [m, setM] = useState(null); // muscle
  const [showDet, setShowDet] = useState(false); // showDetail
  const [ex, setEx] = useState(null); // exercise
  const [tmRun, setTmRun] = useState(false); // timerRunning
  const [tmSec, setTmSec] = useState(0); // timerSeconds
  const [tmPh, setTmPh] = useState('rest'); // timerPhase
  const [repCnt, setRepCnt] = useState(0); // repCount
  const [setCnt, setSetCnt] = useState(1); // setCount
  const [q, setQ] = useState(''); // search query
  const [fEx, setFEx] = useState([]); // filteredExercises
  const [all, setAll] = useState(true); // showAll
  const [meal, setMeal] = useState('training'); // mealType
  const [pData, setPData] = useState(initProgData); // progData
  const [showWt, setShowWt] = useState(false); // showWeightModal
  const [nWt, setNWt] = useState(''); // newWeight
  const [nBench, setNBench] = useState(''); // newBench
  const [nSq, setNSq] = useState(''); // newSquat
  const [nDl, setNDl] = useState(''); // newDeadlift
  const [showExp, setShowExp] = useState(false); // showExportModal
  
  // Stores locaux
  const pStore = store("ada_prog");
  const cStore = store("ada_cfg");
  
  // Get theme
  const th = useMemo(() => themes[t] || themes.program, [t]);
  
  // Init data
  useEffect(() => {
    const p = pStore.get();
    if(p) setPData(p);
    
    const c = cStore.get();
    if(c) {
      if(c.t) setT(c.t);
      if(c.d) setD(c.d);
      if(c.meal) setMeal(c.meal);
    }
  }, []);
  
  // Fix mobile height
  useEffect(() => {
    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';
    
    const fixH = () => {
      const h = window.innerHeight;
      const m = document.querySelector('main');
      if(m) m.style.height = `${h-120}px`;
    };
    
    fixH();
    window.addEventListener('resize', fixH);
    return () => window.removeEventListener('resize', fixH);
  }, []);
  
  // PWA setup
  useEffect(() => { 
    document.title = APP.name;
    if('serviceWorker' in navigator) 
      navigator.serviceWorker.register('/sw.js').catch(e => console.error('SW:', e));
  }, []);
  
  // Save config
  useEffect(() => {
    cStore.set({t, d, meal});
  }, [t, d, meal]);
  
  // Suggestions
  const bSug = useProgSug(pData, 'benchPress');
  const sSug = useProgSug(pData, 'squat');
  const dSug = useProgSug(pData, 'deadlift');
  
  // Add weight data
  const addWt = () => {
    if (!nWt) return;
    
    const entry = {
      week: pData.length + 1,
      date: new Date().toISOString().split('T')[0],
      weight: parseFloat(nWt),
      benchPress: nBench ? parseFloat(nBench) : pData[pData.length-1].benchPress,
      squat: nSq ? parseFloat(nSq) : pData[pData.length-1].squat,
      deadlift: nDl ? parseFloat(nDl) : pData[pData.length-1].deadlift
    };
    
    const newD = [...pData, entry];
    setPData(newD);
    pStore.set(newD);
    
    setNWt('');
    setNBench('');
    setNSq('');
    setNDl('');
    setShowWt(false);
  };
  
  // Export data
  const expData = () => {
    const data = {
      v: APP.version,
      date: new Date().toISOString(),
      prog: pData,
      weight: pData[pData.length-1].weight,
      cfg: {t, d, meal}
    };
    
    const blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fittrack_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    setShowExp(false);
  };
  
  // Import data
  const impData = e => {
    const f = e.target.files[0];
    if(!f) return;
    
    const r = new FileReader();
    r.onload = ev => {
      try {
        const data = JSON.parse(ev.target.result);
        
        if(data.prog && Array.isArray(data.prog)) {
          setPData(data.prog);
          pStore.set(data.prog);
          
          if(data.cfg) {
            if(data.cfg.t) setT(data.cfg.t);
            if(data.cfg.d) setD(data.cfg.d);
            if(data.cfg.meal) setMeal(data.cfg.meal);
            cStore.set(data.cfg);
          }
          
          alert('Import OK!');
        } else {
          alert('Format invalide');
        }
      } catch(e) {
        console.error('Import:', e);
        alert('Erreur import');
      }
    };
    r.readAsText(f);
  };
  
  // Timer exercise
  useEffect(() => {
    if (!tmRun || !ex) return;
    
    const intv = setInterval(() => {
      if (tmSec > 0) {
        setTmSec(s => s - 1);
      } else {
        // Phase transitions
        if (tmPh === 'descent') {
          setTmPh('pauseBottom');
          setTmSec(1);
        } else if (tmPh === 'pauseBottom') {
          setTmPh('ascent');
          setTmSec(2);
        } else if (tmPh === 'ascent') {
          const maxRep = ex.reps ? parseInt(ex.reps.split('-')[1] || 10) : 10;
          
          if (repCnt + 1 >= maxRep) {
            setTmPh('rest');
            const rest = ex.rest ? parseInt(ex.rest.replace('s', '') || 60) : 60;
            setTmSec(rest);
            setRepCnt(0);
            setSetCnt(s => s + 1);
            
            const maxSet = ex.sets || 3;
            if (setCnt + 1 > maxSet) stopTm();
          } else {
            setTmPh('descent');
            setTmSec(3);
            setRepCnt(r => r + 1);
          }
        } else if (tmPh === 'rest') {
          setTmPh('descent');
          setTmSec(3);
        }
      }
    }, 1000);
    
    return () => clearInterval(intv);
  }, [tmRun, tmSec, tmPh, repCnt, setCnt, ex]);

  // UI helpers
  const openDet = x => { setEx(x); setShowDet(true); };
  const closeDet = () => { setShowDet(false); setEx(null); };
  const startTm = x => {
    const full = Object.values(exData).flat().find(e => e.name === x.name) || x;
    setEx(full);
    setTmRun(true);
    setTmPh('descent');
    setTmSec(3);
    setRepCnt(0);
    setSetCnt(1);
  };
  const stopTm = () => { setTmRun(false); setTmSec(0); setTmPh('rest'); };
  const search = q => {
    setQ(q);
    if (!q) return setFEx([]);
    setFEx(Object.values(exData).flat().filter(x => 
      x.name.toLowerCase().includes(q.toLowerCase()) ||
      x.muscles.some(m => m.toLowerCase().includes(q.toLowerCase()))
    ));
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-100 touch-manipulation">
      {/* Header */}
      <header className={`bg-gradient-to-r ${th.header} text-white p-3 sm:p-4 shadow-lg`}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="flex items-center space-x-2 mb-2 sm:mb-0">
            <Dumbbell className="w-5 h-5 sm:w-6 sm:h-6" />
            <h1 className="text-lg sm:text-xl font-bold">{APP.name}</h1>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto">
            <span className={`bg-gradient-to-r ${th.accent} px-2 py-1 text-xs sm:text-sm rounded-full font-medium`}>
              Semaine 3/12
            </span>
            <span className="bg-gradient-to-r from-red-500 to-pink-500 px-2 py-1 text-xs sm:text-sm rounded-full font-medium">
              Objectif: 100kg
            </span>
          </div>
        </div>
        <div className={`mt-3 sm:mt-4 flex flex-wrap sm:flex-nowrap items-center bg-gradient-to-r ${th.headerLight} p-2 rounded-lg backdrop-blur-sm`}>
          <div className="flex-1 min-w-[33%] mb-2 sm:mb-0">
            <div className="text-xs uppercase font-medium">Poids actuel</div>
            <div className="text-base sm:text-lg font-bold flex items-center">
              <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-green-300" />
              {pData[pData.length-1]?.weight || 93}kg
            </div>
          </div>
          <div className="flex-1 min-w-[33%] mb-2 sm:mb-0">
            <div className="text-xs uppercase font-medium">Développé</div>
            <div className="text-base sm:text-lg font-bold flex items-center">
              <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-green-300" />
              {pData[0]?.benchPress || 60}→{pData[pData.length-1]?.benchPress || 65}kg
              {bSug && <span className="ml-1 text-xs">{bSug.msg}</span>}
            </div>
          </div>
          <div className="flex-1 min-w-[33%]">
            <div className="text-xs uppercase font-medium">Squat</div>
            <div className="text-base sm:text-lg font-bold flex items-center">
              <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-green-300" />
              {pData[0]?.squat || 50}→{pData[pData.length-1]?.squat || 60}kg
              {sSug && <span className="ml-1 text-xs">{sSug.msg}</span>}
            </div>
          </div>
        </div>
      </header>

      {/* Recherche */}
      <div className="px-2 sm:px-4 py-2 bg-white shadow-md sticky top-0 z-10">
        <div className="relative max-w-xl mx-auto">
          <Search size={16} className="absolute left-3 top-3 text-indigo-400" />
          <input 
            type="text" 
            placeholder="Rechercher un exercice..." 
            className="w-full p-2 pl-9 sm:pl-10 border border-indigo-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={q}
            onChange={e => search(e.target.value)}
          />
        </div>
      </div>

      {/* Résultats recherche */}
      {q && fEx.length > 0 && (
        <div className="p-3 sm:p-4 bg-white shadow-md max-h-64 overflow-y-auto">
          <h3 className="text-sm font-semibold mb-2 text-indigo-600">Résultats</h3>
          <div className="grid grid-cols-1 gap-2">
            {fEx.map(e => (
              <div 
                key={e.id} 
                className="p-3 rounded-lg border border-indigo-100 hover:bg-indigo-50 active:bg-indigo-100 cursor-pointer touch-manipulation"
                onClick={() => openDet(e)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-indigo-800">{e.name}</div>
                    <div className="text-xs text-indigo-500">{e.muscles.join(', ')}</div>
                  </div>
                  <ChevronRight size={16} className="text-indigo-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contenu principal */}
      <main className="flex-1 overflow-y-auto px-2 sm:px-4 pb-4 -webkit-overflow-scrolling:touch">
        {/* Onglets */}
        <div className="sticky top-0 z-30 pt-3 sm:pt-4 pb-2 bg-gray-50 bg-opacity-95 backdrop-blur-sm">
          <div className="flex justify-between bg-white rounded-xl p-1 shadow-md max-w-6xl mx-auto">
            {['program', 'nutrition', 'progress', 'exercises'].map(tab => (
              <div 
                key={tab}
                className={`flex-1 py-2 sm:py-3 px-0 sm:px-1 text-center rounded-lg cursor-pointer transition touch-manipulation ${t === tab ? 
                  'bg-gradient-to-r ' + themes[tab].primary + ' text-white font-medium shadow-md' : 
                  'text-gray-600 hover:bg-' + (tab === 'program' ? 'indigo' : tab === 'nutrition' ? 'emerald' : tab === 'progress' ? 'amber' : 'rose') + '-50'}`}
                onClick={() => setT(tab)}
              >
                {tab === 'program' ? <Calendar size={16} className="inline sm:mr-1" /> :
                 tab === 'nutrition' ? <Coffee size={16} className="inline sm:mr-1" /> :
                 tab === 'progress' ? <BarChart2 size={16} className="inline sm:mr-1" /> :
                 <Dumbbell size={16} className="inline sm:mr-1" />}
                <span className="hidden xs:inline">{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-3 sm:space-y-4 max-w-6xl mx-auto">
          {/* Programme */}
          {t === 'program' && (
            <div className="space-y-6">
              {/* Jours */}
              <div className="flex space-x-2 overflow-x-auto py-2 scrollbar-hide -webkit-overflow-scrolling:touch">
                {Object.entries(workoutProg).map(([day, data]) => (
                  <div 
                    key={day}
                    onClick={() => setD(day)} 
                    className={`whitespace-nowrap px-2 sm:px-3 py-2 text-xs sm:text-sm rounded-lg cursor-pointer flex items-center transition touch-manipulation ${d === day ? 
                      'bg-gradient-to-r ' + th.primary + ' text-white font-medium shadow-sm' : 
                      'bg-white text-gray-700 shadow-sm hover:bg-indigo-50 active:bg-indigo-100'}`}
                  >
                    <Calendar size={12} className="mr-1" />
                    {day === 'day1' ? 'Dim - Poitrine/Triceps' :
                     day === 'day2' ? 'Mar - Épaules/Jambes' :
                     'Ven - Dos/Biceps'}
                  </div>
                ))}
              </div>
              
              {/* Programme du jour */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-xl font-bold mb-6 text-indigo-800 border-b pb-2">{workoutProg[d].title}</h2>
                <div className="space-y-8">
                  {workoutProg[d].muscleGroups.map((mg, i) => (
                    <div key={i}>
                      <h3 className={`text-lg font-semibold mb-4 px-3 py-2 bg-gradient-to-r ${th.card} rounded-lg text-indigo-800 flex items-center`}>
                        <Dumbbell size={18} className="mr-2 text-indigo-600" />{mg.muscle}
                      </h3>
                      <div className="space-y-4">
                        {mg.exercises.map((e, j) => (
                          <div key={j} className="bg-white rounded-xl border border-indigo-100 shadow-sm hover:shadow-md p-3 sm:p-4">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                              <div className="flex-1">
                                <h4 className="font-semibold text-indigo-800 text-base sm:text-lg mb-1">{e.name}</h4>
                                <p className="text-xs sm:text-sm text-indigo-500 mb-2">{e.sets} séries × {e.reps} reps • {e.rest}</p>
                                {e.goal && e.current && (
                                  <div className="mt-2 sm:mt-3">
                                    <div className="flex justify-between text-xs mb-1 text-gray-600">
                                      <span>Actuel: <span className="font-semibold text-indigo-600">{e.current}</span></span>
                                      <span>Objectif: <span className="font-semibold text-indigo-800">{e.goal}</span></span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                      <div 
                                        className={`h-full bg-gradient-to-r ${th.primary} rounded-full`}
                                        style={{width: `${(parseInt(e.current) / parseInt(e.goal)) * 100}%`}}
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className="flex justify-between sm:flex-col sm:space-y-2 sm:ml-4 mt-3 sm:mt-0">
                                <button 
                                  className={`flex-1 sm:flex-auto bg-gradient-to-r ${th.action} hover:${th.actionHover} text-white px-3 sm:px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition flex items-center text-xs sm:text-sm justify-center sm:justify-start touch-manipulation`}
                                  onClick={() => startTm(e)}
                                >
                                  <Clock size={14} className="mr-1 sm:mr-2" />Démarrer
                                </button>
                                <button 
                                  className={`flex-1 sm:flex-auto bg-gradient-to-r ${th.button} hover:${th.buttonHover} text-white px-3 sm:px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition flex items-center text-xs sm:text-sm justify-center sm:justify-start ml-2 sm:ml-0 touch-manipulation`}
                                  onClick={() => {
                                    const full = Object.values(exData).flat().find(x => x.name === e.name);
                                    openDet(full || e);
                                  }}
                                >
                                  <ChevronRight size={14} className="mr-1 sm:mr-2" />Détails
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Nutrition */}
          {t === 'nutrition' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-emerald-800">Plan (60% cuisine sénégalaise)</h2>
                  <div className="flex space-x-2">
                    <div className="bg-emerald-100 text-emerald-800 text-sm px-3 py-2 rounded-lg font-medium">
                      Entraînement: {nutrPlan.dailyCalories.trainingDay} cal
                    </div>
                    <div className="bg-green-100 text-green-800 text-sm px-3 py-2 rounded-lg font-medium">
                      Repos: {nutrPlan.dailyCalories.restDay} cal
                    </div>
                  </div>
                </div>
                
                {/* Plan hebdo - version horizontale */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-4 text-emerald-800 flex items-center">
                    <Calendar size={18} className="mr-2 text-emerald-600" />Planning hebdomadaire
                  </h3>
                  <div className="overflow-x-auto -mx-4 px-4">
                    <div className="flex space-x-2 min-w-max">
                      {nutrPlan.weeklyPlan.map((day, i) => (
                        <div 
                          key={i} 
                          className={`p-3 rounded-xl shadow-sm w-32 ${day.type === 'Entraînement' ? 'bg-emerald-100 text-emerald-800' : 'bg-green-100 text-green-800'}`}
                        >
                          <div className="font-medium">{day.day}</div>
                          <div className="text-xs mt-1">{day.type}</div>
                          <div className="text-xs mt-2 font-medium bg-white p-2 rounded-lg text-center shadow-sm">{day.meal}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Macros */}
                <div className="flex justify-between mb-6 bg-emerald-50 p-4 rounded-xl">
                  <div className="space-y-1">
                    <div className="text-emerald-800 font-semibold">Protéines: {nutrPlan.dailyProtein}g/jour</div>
                    <div className="text-xs text-emerald-500">(~2.2g/kg pour votre poids)</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-emerald-800 font-semibold">Objectif: 100kg</div>
                    <div className="text-xs text-emerald-500">
                      Actuel: {pData[pData.length-1]?.weight || 93}kg (+{(100-(pData[pData.length-1]?.weight || 93)).toFixed(1)}kg)
                    </div>
                  </div>
                </div>

                {/* Sélection jour */}
                <div className="mb-6">
                  <div className="flex rounded-xl overflow-hidden shadow-md mb-6">
                    <div 
                      onClick={() => setMeal('training')} 
                      className={`flex-1 py-3 text-center cursor-pointer touch-manipulation ${meal === 'training' ? 'bg-emerald-600 text-white font-medium' : 'bg-gray-100 text-gray-700 hover:bg-emerald-50'}`}
                    >
                      <Dumbbell size={18} className="inline mr-2" />Entraînement
                    </div>
                    <div 
                      onClick={() => setMeal('rest')} 
                      className={`flex-1 py-3 text-center cursor-pointer touch-manipulation ${meal === 'rest' ? 'bg-green-600 text-white font-medium' : 'bg-gray-100 text-gray-700 hover:bg-green-50'}`}
                    >
                      <Coffee size={18} className="inline mr-2" />Repos
                    </div>
                  </div>

                  {/* Repas */}
                  <div className="space-y-4">
                    {(meal === 'training' ? nutrPlan.meals.trainingDay : nutrPlan.meals.restDay).map((m, i) => (
                      <div key={i} className="bg-white border border-emerald-100 rounded-xl p-4 shadow-sm hover:shadow-md">
                        <div className="flex justify-between items-center mb-3 pb-2 border-b border-emerald-100">
                          <h3 className="font-semibold text-lg text-emerald-800">{m.name}</h3>
                          <div className="flex items-center space-x-3 text-sm">
                            <div className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">{m.timing}</div>
                            <div className="text-rose-600 bg-rose-50 px-2 py-1 rounded-lg">{m.calories} cal</div>
                            <div className="text-green-600 bg-green-50 px-2 py-1 rounded-lg">{m.protein}g prot</div>
                          </div>
                        </div>
                        <ul className="text-sm text-gray-700 space-y-2">
                          {m.foods.map((f, j) => (
                            <li key={j} className="flex items-center">
                              <div className="w-2 h-2 rounded-full bg-emerald-500 mr-3"></div>
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hydratation */}
                <div className="bg-sky-50 p-4 rounded-xl mb-6 shadow-sm">
                  <h3 className="font-semibold text-sky-800 mb-2 flex items-center">
                    <Droplet size={18} className="mr-2 text-sky-600" />Hydratation
                  </h3>
                  <p className="text-sky-700">{nutrPlan.hydration}</p>
                </div>
              </div>
            </div>
          )}

          {/* Progrès */}
          {t === 'progress' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                  <h2 className="text-xl font-bold text-amber-800 flex items-center">
                    <Activity size={24} className="mr-2 text-amber-600" />Évolution
                  </h2>
                  <div className="flex gap-2">
                    {/* Export/Import */}
                    <button
                      onClick={() => setShowExp(true)}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg shadow-sm flex items-center touch-manipulation"
                    >
                      <Download size={16} className="mr-1" />Export
                    </button>
                    <label className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg shadow-sm flex items-center cursor-pointer touch-manipulation">
                      <Upload size={16} className="mr-1" />Import
                      <input type="file" accept=".json" className="hidden" onChange={impData} />
                    </label>
                    <button
                      onClick={() => setShowWt(true)}
                      className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-3 py-2 rounded-lg shadow-sm flex items-center touch-manipulation"
                    >
                      <PlusCircle size={16} className="mr-1" />Ajouter
                    </button>
                  </div>
                </div>
                <div className="h-64 bg-amber-50 p-4 rounded-xl">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={pData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                      <XAxis dataKey="week" label={{ value: 'Semaine', position: 'insideBottom', offset: -5, fill: '#f59e0b' }} />
                      <YAxis domain={[Math.floor(Math.min(...pData.map(d => d.weight)) - 1), Math.ceil(Math.max(...pData.map(d => d.weight)) + 1)]} 
                        label={{ value: 'Poids (kg)', angle: -90, position: 'insideLeft', fill: '#f59e0b' }} />
                      <Tooltip labelFormatter={(val) => `Semaine ${val}`} formatter={(val) => [`${val} kg`, 'Poids']} />
                      <Line type="monotone" dataKey="weight" stroke="#f59e0b" strokeWidth={3} 
                        dot={{ r: 6, fill: '#f59e0b', strokeWidth: 2, stroke: '#fff' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-xl font-bold mb-4 text-amber-800 flex items-center">
                  <Activity size={24} className="mr-2 text-amber-600" />Charges
                </h2>
                <div className="h-64 bg-amber-50 p-4 rounded-xl">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={pData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                      <XAxis dataKey="week" label={{ value: 'Semaine', position: 'insideBottom', offset: -5, fill: '#f59e0b' }} />
                      <YAxis domain={[40, Math.max(110, ...pData.map(d => Math.max(d.benchPress, d.squat, d.deadlift))) + 10]} 
                        label={{ value: 'kg', angle: -90, position: 'insideLeft', fill: '#f59e0b' }} />
                      <Tooltip labelFormatter={(val) => `Semaine ${val}`} formatter={(val, name) => [`${val} kg`, name]} />
                      <Line type="monotone" dataKey="benchPress" name="Développé" stroke="#ef4444" strokeWidth={3} 
                        dot={{ r: 6, fill: '#ef4444', strokeWidth: 2, stroke: '#fff' }} />
                      <Line type="monotone" dataKey="squat" name="Squat" stroke="#3b82f6" strokeWidth={3} 
                        dot={{ r: 6, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} />
                      <Line type="monotone" dataKey="deadlift" name="Soulevé" stroke="#10b981" strokeWidth={3} 
                        dot={{ r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Suggestions */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className={`p-3 rounded-lg ${bSug ? bSug.type === 'plat' ? 'bg-amber-100' : 'bg-green-100' : 'bg-gray-100'}`}>
                    <div className="text-xs font-medium">Développé</div>
                    <div className="text-sm mt-1">{bSug ? bSug.msg : 'Données insuffisantes'}</div>
                  </div>
                  <div className={`p-3 rounded-lg ${sSug ? sSug.type === 'plat' ? 'bg-amber-100' : 'bg-green-100' : 'bg-gray-100'}`}>
                    <div className="text-xs font-medium">Squat</div>
                    <div className="text-sm mt-1">{sSug ? sSug.msg : 'Données insuffisantes'}</div>
                  </div>
                  <div className={`p-3 rounded-lg ${dSug ? dSug.type === 'plat' ? 'bg-amber-100' : 'bg-green-100' : 'bg-gray-100'}`}>
                    <div className="text-xs font-medium">Soulevé</div>
                    <div className="text-sm mt-1">{dSug ? dSug.msg : 'Données insuffisantes'}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Exercices */}
          {t === 'exercises' && (
            <div className="space-y-6">
              {/* Ciblage */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-xl font-bold mb-4 text-rose-800 flex items-center">
                  <Dumbbell size={24} className="mr-2 text-rose-600" />Ciblage
                </h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {['poitrine', 'dos', 'epaules', 'biceps', 'triceps', 'jambes', 'abdominaux'].map(mm => (
                    <button 
                      key={mm}
                      onClick={() => { setM(mm); setAll(false); }}
                      className={`text-sm py-3 px-2 rounded-xl shadow-sm touch-manipulation ${m === mm ? 'bg-rose-600 text-white font-medium' : 'bg-rose-50 text-rose-800 hover:bg-rose-100'}`}
                    >
                      {mm.charAt(0).toUpperCase() + mm.slice(1)}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => { setM(null); setAll(true); }}
                  className="bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-xl shadow-sm hover:shadow-md flex items-center justify-center mt-3 w-full touch-manipulation"
                >
                  <Dumbbell size={18} className="mr-2" />Tous les exercices
                </button>
              </div>

              {/* Affichage exercices */}
              {all ? (
                Object.entries(exData).map(([mm, exs]) => (
                  <div key={mm} className="bg-white rounded-xl p-6 shadow-md">
                    <h2 className="text-xl font-bold mb-4 text-rose-800 flex items-center">
                      <Dumbbell size={24} className="mr-2 text-rose-600" />
                      {mm.charAt(0).toUpperCase() + mm.slice(1)}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {exs.slice(0, 2).map(e => (
                        <div 
                          key={e.id} 
                          className="p-4 rounded-xl border border-rose-100 hover:border-rose-300 bg-rose-50 hover:bg-rose-100 cursor-pointer shadow-sm hover:shadow-md touch-manipulation"
                          onClick={() => openDet(e)}
                        >
                          <div className="font-medium text-rose-800 text-lg">{e.name}</div>
                          <div className="flex justify-between mt-2">
                            <div className="text-xs text-rose-600 bg-white px-2 py-1 rounded-lg shadow-sm">{e.difficulty}</div>
                            <div className="text-xs text-rose-600 bg-white px-2 py-1 rounded-lg shadow-sm">{e.equipment}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {exs.length > 2 && (
                      <button 
                        className="w-full mt-4 bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-xl shadow-sm hover:shadow-md touch-manipulation"
                        onClick={() => { setM(mm); setAll(false); }}
                      >
                        Voir plus ({exs.length - 2} autres)
                      </button>
                    )}
                  </div>
                ))
              ) : (
                m && (
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h2 className="text-xl font-bold mb-4 text-rose-800 flex items-center">
                      <Dumbbell size={24} className="mr-2 text-rose-600" />
                      Exercices: {m.charAt(0).toUpperCase() + m.slice(1)}
                    </h2>
                    <div className="space-y-4">
                      {exData[m].map(e => (
                        <div 
                          key={e.id} 
                          className="p-4 rounded-xl border border-rose-100 hover:border-rose-300 bg-rose-50 hover:bg-rose-100 cursor-pointer shadow-sm hover:shadow-md touch-manipulation"
                          onClick={() => openDet(e)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium text-rose-800 text-lg">{e.name}</div>
                              <div className="text-xs text-rose-600 mt-1">{e.muscles.join(', ')}</div>
                            </div>
                            <div className="text-xs bg-white text-rose-600 px-3 py-1 rounded-lg shadow-sm">
                              {e.difficulty}
                            </div>
                          </div>
                          <div className="mt-3 text-sm text-rose-700 bg-white px-3 py-2 rounded-lg shadow-sm">
                            Équipement: {e.equipment}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className={`bg-gradient-to-r ${th.header} text-white p-3 shadow-inner`}>
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center">
            <div className="w-5 h-5 bg-gradient-to-br from-amber-500 to-red-600 rounded-md flex items-center justify-center text-white shadow-sm overflow-hidden mr-2">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none">
                <path d="M12,4 C13.5,4 15,5 15,8 C15,9 16,10 17,10 C18,10 19,9 20,8" strokeLinecap="round" strokeWidth="1.2"/>
                <path d="M12,4 C10.5,4 9,5 9,8 C9,9 8,10 7,10 C6,10 5,9 4,8" strokeLinecap="round" strokeWidth="1.2"/>
                <circle cx="9" cy="6.5" r=".8" fill="white" />
                <circle cx="15" cy="6.5" r=".8" fill="white" />
                <path d="M9,9 C9,9 10,10.5 12,10.5 C14,10.5 15,9 15,9" stroke="white" strokeWidth=".8" />
                <path d="M7,11 C5,12 6,14 7,14" strokeLinecap="round" strokeWidth="1"/>
                <path d="M17,11 C19,12 18,14 17,14" strokeLinecap="round" strokeWidth="1"/>
              </svg>
            </div>
            <span className="text-xs sm:text-sm font-medium">{APP.name} v{APP.version}</span>
          </div>
          <div className="text-xs text-white/70 hidden sm:block">
            1m95 • Objectif: 100kg
          </div>
          <div className="text-xs bg-white/20 px-2 sm:px-3 py-1 rounded-full">
            Poids: {pData[pData.length-1]?.weight || 93}kg
          </div>
        </div>
      </footer>
      
      {/* Modal ajout poids */}
      {showWt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-amber-800">Ajouter mesure</h3>
              <button onClick={() => setShowWt(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Poids (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={nWt}
                  onChange={(e) => setNWt(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Ex: 93.5"
                  required
                />
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Développé</label>
                  <input
                    type="number"
                    step="2.5"
                    value={nBench}
                    onChange={(e) => setNBench(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder={`${pData[pData.length-1]?.benchPress}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Squat</label>
                  <input
                    type="number"
                    step="2.5"
                    value={nSq}
                    onChange={(e) => setNSq(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder={`${pData[pData.length-1]?.squat}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Soulevé</label>
                  <input
                    type="number"
                    step="2.5"
                    value={nDl}
                    onChange={(e) => setNDl(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder={`${pData[pData.length-1]?.deadlift}`}
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 pt-2">
                <button
                  onClick={() => setShowWt(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg"
                >
                  Annuler
                </button>
                <button
                  onClick={addWt}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-lg flex items-center justify-center"
                  disabled={!nWt}
                >
                  <Save size={16} className="mr-1" />
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal Export/Import */}
      {showExp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl p-5 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Export/Import</h3>
              <button onClick={() => setShowExp(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                  <Download size={16} className="mr-2" />Exporter données
                </h4>
                <button
                  onClick={expData}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center"
                >
                  <Download size={16} className="mr-2" />
                  Télécharger
                </button>
              </div>
              
              <div className="bg-emerald-50 p-4 rounded-lg">
                <h4 className="font-medium text-emerald-800 mb-2 flex items-center">
                  <Upload size={16} className="mr-2" />Importer données
                </h4>
                <label className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg flex items-center justify-center cursor-pointer">
                  <Upload size={16} className="mr-2" />
                  Sélectionner fichier
                  <input type="file" accept=".json" className="hidden" onChange={impData} />
                </label>
              </div>
              
              <button
                onClick={() => setShowExp(false)}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg mt-2"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal détails exercice */}
      {showDet && ex && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-auto overflow-hidden">
            <div className={`sticky top-0 z-10 bg-gradient-to-r ${th.header} text-white flex justify-between items-center p-5`}>
              <h2 className="text-xl font-bold">{ex.name}</h2>
              <button onClick={closeDet} className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 max-h-96 overflow-y-auto">
              {/* Image */}
              <div className="aspect-video bg-indigo-100 rounded-xl mb-6 overflow-hidden flex items-center justify-center">
                <img 
                  src={ex.image || "/api/placeholder/400/300"} 
                  alt={ex.name}
                  className="w-full h-full object-cover" 
                />
              </div>
              
              {/* Muscles */}
              <div className="mb-6">
                <h3 className={`font-semibold mb-3 text-${t}-800`}>Muscles ciblés</h3>
                <div className="flex flex-wrap gap-2">
                  {ex.muscles.map((mm, i) => (
                    <span key={i} className={`text-sm bg-gradient-to-r ${th.light} text-${t}-800 px-3 py-1 rounded-lg shadow-sm`}>
                      {mm}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Description */}
              <div className="mb-6">
                <h3 className={`font-semibold mb-3 text-${t}-800`}>Description</h3>
                <p className={`text-gray-700 bg-gradient-to-r ${th.light} p-4 rounded-xl shadow-sm`}>{ex.description}</p>
              </div>
              
              {/* Caractéristiques */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  {title: 'Difficulté', value: ex.difficulty},
                  {title: 'Équipement', value: ex.equipment},
                  {title: 'Tempo', value: ex.tempo},
                  {title: 'Séries/Répétitions', value: `${ex.sets} × ${ex.reps}`}
                ].map((item, i) => (
                  <div key={i} className={`bg-gradient-to-r ${th.light} p-4 rounded-xl shadow-sm`}>
                    <h3 className={`font-semibold mb-2 text-${t}-800`}>{item.title}</h3>
                    <p className={`text-${t}-700`}>{item.value}</p>
                  </div>
                ))}
              </div>
              
              {/* Boutons */}
              <div className="mb-6">
                <button 
                  className={`w-full bg-gradient-to-r ${th.action} hover:${th.actionHover} text-white py-4 rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center`}
                  onClick={() => {
                    closeDet();
                    startTm(ex);
                  }}
                >
                  <Clock size={20} className="mr-2" />Démarrer l'exercice
                </button>
              </div>
              
              <button 
                onClick={closeDet} 
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-xl shadow-md hover:shadow-lg transition"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Timer exercice */}
      {tmRun && ex && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-indigo-900 bg-opacity-95 backdrop-blur-lg">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-md mx-0 sm:mx-4 overflow-hidden">
            {/* Indicateur swipe mobile */}
            <div className="w-12 h-1 bg-gray-300 rounded mx-auto mt-2 mb-1 sm:hidden"></div>
            <div className="bg-indigo-600 text-white p-4 sm:p-5">
              <div className="flex justify-between items-center">
                <h2 className="text-lg sm:text-xl font-bold">{ex.name}</h2>
                <button 
                  onClick={stopTm} 
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-full touch-manipulation"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="text-xs sm:text-sm mt-2 bg-white/20 px-3 py-2 rounded-lg">
                Série {setCnt}/{ex.sets || 3} • Rep {repCnt}/{ex.reps ? ex.reps.split('-')[1] : 10}
              </div>
            </div>
            
            <div className="p-6 flex flex-col items-center">
              <div className="text-7xl font-bold mb-6 text-indigo-800">{tmSec}</div>
              
              <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden shadow-inner mb-8">
                <div 
                  className={`h-full rounded-full ${
                    tmPh === 'descent' ? 'bg-indigo-500' : 
                    tmPh === 'pauseBottom' ? 'bg-rose-500' : 
                    tmPh === 'ascent' ? 'bg-green-500' : 
                    tmPh === 'pauseTop' ? 'bg-amber-500' : 
                    'bg-gray-500'
                  }`}
                  style={{ width: `${tmSec * 100 / 
                    (tmPh === 'descent' ? 3 : 
                     tmPh === 'pauseBottom' ? 1 : 
                     tmPh === 'ascent' ? 2 : 
                     tmPh === 'pauseTop' ? 0 : 90)}%` }}
                ></div>
              </div>
              
              <div className="text-2xl font-medium mb-8 px-6 py-3 rounded-xl bg-indigo-50 text-indigo-800 shadow-md">
                {tmPh === 'descent' ? 'DESCENTE' : 
                 tmPh === 'pauseBottom' ? 'PAUSE BAS' : 
                 tmPh === 'ascent' ? 'MONTÉE' : 
                 tmPh === 'pauseTop' ? 'PAUSE HAUT' : 
                 'REPOS'}
              </div>
              
              <div className="flex gap-4 w-full">
                <button 
                  className="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-4 rounded-xl shadow-md hover:shadow-lg flex items-center justify-center"
                  onClick={stopTm}
                >
                  Terminer
                </button>
                
                <button 
                  className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white py-4 rounded-xl shadow-md hover:shadow-lg flex items-center justify-center"
                  onClick={() => {
                    const maxRep = parseInt(ex.reps ? ex.reps.split('-')[1] : 10);
                    const maxSet = ex.sets || 3;
                    
                    if (repCnt < maxRep) {
                      setRepCnt(repCnt + 1);
                      setTmPh('descent');
                      setTmSec(3);
                    } else if (setCnt < maxSet) {
                      setSetCnt(setCnt + 1);
                      setRepCnt(1);
                      setTmPh('rest');
                      setTmSec(90);
                    } else {
                      stopTm();
                    }
                  }}
                >
                  <ArrowUp size={20} className="mr-2" />Suivant
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;