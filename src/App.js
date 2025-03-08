import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Activity, X, ChevronRight, Search, ArrowUp, Dumbbell, Coffee, BarChart2, Droplet, Plus, Save, PlusCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Données condensées
const exData = {
  poitrine: [
    { id: 1, name: "Développé couché", sets: 4, reps: "8-10", rest: "90s", muscles: ["Pectoraux", "Triceps", "Épaules antérieures"], description: "Le développé couché est un exercice composé qui cible principalement les pectoraux. Pour votre gabarit (1m95), assurez-vous d'avoir une prise légèrement plus large que la largeur des épaules pour maximiser l'activation des pectoraux. Gardez les coudes à environ 45° par rapport au corps pour protéger vos épaules.", difficulty: "Intermédiaire", equipment: "Barre, Banc", tempo: "3-1-2-0", image: "/api/placeholder/400/300" },
    { id: 2, name: "Écartés à la poulie", sets: 3, reps: "10-12", rest: "60s", muscles: ["Pectoraux", "Épaules antérieures"], description: "Les écartés à la poulie offrent une tension constante sur les pectoraux tout au long du mouvement. Pour votre taille, réglez les poulies à hauteur de poitrine et maintenez une légère flexion des coudes pendant tout le mouvement pour éviter de surcharger l'articulation de l'épaule.", difficulty: "Débutant", equipment: "Machine à poulie", tempo: "2-1-2-1", image: "/api/placeholder/400/300" },
    { id: 3, name: "Développé incliné haltères", sets: 4, reps: "8-10", rest: "90s", muscles: ["Pectoraux supérieurs", "Épaules antérieures", "Triceps"], description: "Le développé incliné aux haltères cible davantage la partie supérieure des pectoraux. Pour votre morphologie, utilisez un banc incliné à 30° pour un maximum d'efficacité et moins de stress sur les épaules. Votre grande envergure est un avantage pour cet exercice.", difficulty: "Intermédiaire", equipment: "Haltères, Banc incliné", tempo: "3-0-2-1", image: "/api/placeholder/400/300" },
    { id: 4, name: "Dips pour la poitrine", sets: 3, reps: "8-12", rest: "90s", muscles: ["Pectoraux inférieurs", "Triceps", "Épaules antérieures"], description: "Les dips ciblent efficacement la partie inférieure des pectoraux. Avec votre grande taille, penchez-vous légèrement vers l'avant pour cibler davantage les pectoraux. Si nécessaire, utilisez une machine d'assistance jusqu'à ce que vous puissiez effectuer des répétitions complètes sans aide.", difficulty: "Avancé", equipment: "Barres parallèles ou machine à dips", tempo: "3-0-2-0", image: "/api/placeholder/400/300" },
    { id: 5, name: "Pull-over avec haltère", sets: 3, reps: "10-12", rest: "60s", muscles: ["Pectoraux", "Grand dorsal", "Dentelés"], description: "Le pull-over est excellent pour développer la cage thoracique et travailler la connexion entre les pectoraux et le dos. Votre grande taille vous donne un avantage pour cet exercice en permettant une plus grande amplitude de mouvement. Utilisez un banc perpendiculairement, avec seulement les omoplates en appui.", difficulty: "Intermédiaire", equipment: "Haltère, Banc", tempo: "3-1-3-0", image: "/api/placeholder/400/300" },
    { id: 6, name: "Développé décliné", sets: 3, reps: "8-10", rest: "90s", muscles: ["Pectoraux inférieurs", "Triceps"], description: "Le développé décliné cible spécifiquement la partie inférieure des pectoraux. Avec votre grande taille, prenez une prise légèrement plus large et assurez-vous que vos pieds sont bien fixés pour éviter de glisser du banc.", difficulty: "Intermédiaire", equipment: "Barre, Banc décliné", tempo: "3-0-2-0", image: "/api/placeholder/400/300" }
  ],
  dos: [
    { id: 7, name: "Soulevé de terre", sets: 4, reps: "6-8", rest: "120s", muscles: ["Érecteurs du rachis", "Trapèzes", "Grand dorsal", "Ischio-jambiers", "Fessiers"], description: "Le soulevé de terre est un exercice fondamental pour développer la force du dos. Avec votre grande taille (1m95), vous pourriez avoir besoin d'ajuster légèrement votre position. Commencez avec vos pieds écartés à la largeur des épaules ou légèrement plus larges, et vos orteils légèrement vers l'extérieur. Votre prise pourrait être plus large que la moyenne pour compenser votre grande taille.", difficulty: "Avancé", equipment: "Barre", tempo: "2-0-2-1", image: "/api/placeholder/400/300" },
    { id: 8, name: "Tirage vertical prise large", sets: 4, reps: "8-10", rest: "90s", muscles: ["Grand dorsal", "Biceps", "Avant-bras"], description: "Le tirage vertical prise large cible principalement le dos large. Avec votre taille, assurez-vous que la machine est bien ajustée pour vous permettre une extension complète des bras en position haute. Votre grande envergure est un avantage pour développer un dos en V impressionnant.", difficulty: "Intermédiaire", equipment: "Machine de tirage vertical", tempo: "3-0-2-0", image: "/api/placeholder/400/300" },
    { id: 9, name: "Tirage horizontal à la poulie", sets: 3, reps: "10-12", rest: "60s", muscles: ["Grand dorsal", "Rhomboïdes", "Trapèzes inférieurs", "Biceps"], description: "Le tirage horizontal à la poulie est excellent pour l'épaisseur du dos. Pour votre morphologie, prenez une position stable avec un bon ancrage des pieds pour maximiser la tension dans le dos plutôt que de compenser avec le bas du corps.", difficulty: "Intermédiaire", equipment: "Machine à poulie", tempo: "2-1-2-0", image: "/api/placeholder/400/300" },
    { id: 10, name: "Rowing haltère un bras", sets: 3, reps: "10-12", rest: "60s", muscles: ["Grand dorsal", "Rhomboïdes", "Trapèzes", "Biceps"], description: "Le rowing haltère permet un excellent travail unilatéral. Utilisez votre grande taille à votre avantage en maintenant une position stable avec une jambe et un bras sur le banc, permettant une rotation complète du torse à chaque répétition.", difficulty: "Intermédiaire", equipment: "Haltère, Banc", tempo: "2-1-2-0", image: "/api/placeholder/400/300" },
    { id: 11, name: "Pull-ups prise large", sets: 3, reps: "6-10", rest: "90s", muscles: ["Grand dorsal", "Biceps", "Avant-bras"], description: "Les tractions sont excellentes pour développer la largeur du dos. Avec votre taille, vous pourriez trouver cet exercice plus difficile initialement. Commencez avec des tractions assistées si nécessaire, puis progressez vers des tractions complètes. Votre grande envergure sera avantageuse une fois que vous maîtriserez l'exercice.", difficulty: "Avancé", equipment: "Barre de traction", tempo: "3-0-2-0", image: "/api/placeholder/400/300" }
  ],
  jambes: [
    { id: 13, name: "Squat", sets: 4, reps: "8-10", rest: "120s", muscles: ["Quadriceps", "Ischio-jambiers", "Fessiers", "Érecteurs du rachis"], description: "Le squat est un exercice fondamental pour développer la force des jambes. Avec votre grande taille (1m95), vous pourriez avoir besoin d'écarter davantage vos pieds et de pointer légèrement vos orteils vers l'extérieur. Assurez-vous que vos genoux suivent la direction de vos orteils. Votre longue structure osseuse signifie que vous devrez peut-être descendre moins bas que quelqu'un de plus petit pour maintenir une bonne forme.", difficulty: "Intermédiaire", equipment: "Barre, Rack à squat", tempo: "4-1-2-0", image: "/api/placeholder/400/300" },
    { id: 14, name: "Leg press", sets: 3, reps: "10-12", rest: "90s", muscles: ["Quadriceps", "Fessiers", "Ischio-jambiers"], description: "La presse à cuisses est excellente pour développer la masse des jambes avec moins de stress sur le bas du dos. Avec votre taille, placez vos pieds plus haut sur la plateforme pour cibler davantage les ischio-jambiers et les fessiers, tout en réduisant la pression sur les genoux.", difficulty: "Intermédiaire", equipment: "Machine leg press", tempo: "3-1-2-0", image: "/api/placeholder/400/300" },
    { id: 15, name: "Fentes avec haltères", sets: 3, reps: "10 par jambe", rest: "60s", muscles: ["Quadriceps", "Fessiers", "Ischio-jambiers", "Adducteurs"], description: "Les fentes sont excellentes pour le développement unilatéral des jambes. Avec votre grande taille, prenez des pas plus longs pour maintenir l'équilibre et assurer une activation correcte des muscles cibles. Gardez le torse droit et engagez votre centre pour la stabilité.", difficulty: "Intermédiaire", equipment: "Haltères", tempo: "2-1-2-0", image: "/api/placeholder/400/300" },
    { id: 16, name: "Extension de jambes", sets: 3, reps: "12-15", rest: "60s", muscles: ["Quadriceps"], description: "Les extensions de jambes isolent complètement les quadriceps. Avec vos longues jambes, assurez-vous que la machine est correctement ajustée à votre taille. Concentrez-vous sur une contraction complète au sommet de chaque répétition pour maximiser l'activation musculaire.", difficulty: "Débutant", equipment: "Machine d'extension", tempo: "2-1-3-1", image: "/api/placeholder/400/300" },
    { id: 17, name: "Curl de jambes allongé", sets: 3, reps: "12-15", rest: "60s", muscles: ["Ischio-jambiers"], description: "Le curl de jambes allongé cible spécifiquement les ischio-jambiers. Avec votre grande taille, assurez-vous que la machine est bien ajustée pour vous. Concentrez-vous sur une contraction complète et contrôlée plutôt que sur le poids.", difficulty: "Débutant", equipment: "Machine à curl de jambes", tempo: "2-1-2-1", image: "/api/placeholder/400/300" }
  ],
  epaules: [
    { id: 19, name: "Développé militaire", sets: 4, reps: "8-10", rest: "90s", muscles: ["Deltoïdes antérieurs", "Deltoïdes latéraux", "Triceps"], description: "Le développé militaire est un exercice composé qui cible principalement les épaules. Avec votre grande taille (1m95), vous devrez peut-être faire cet exercice assis pour éviter de cambrer excessivement le bas du dos. Gardez les coudes légèrement en avant de votre corps pour protéger vos articulations.", difficulty: "Intermédiaire", equipment: "Barre ou haltères", tempo: "3-0-2-0", image: "/api/placeholder/400/300" },
    { id: 20, name: "Élévations latérales", sets: 3, reps: "12-15", rest: "60s", muscles: ["Deltoïdes latéraux"], description: "Les élévations latérales isolent parfaitement les deltoïdes latéraux. Avec votre envergure, utilisez des haltères légèrement plus lourds que la moyenne, mais maintenez une technique stricte avec une légère flexion des coudes. Élevez jusqu'à hauteur d'épaules, pas plus haut.", difficulty: "Débutant", equipment: "Haltères", tempo: "2-0-2-1", image: "/api/placeholder/400/300" },
    { id: 21, name: "Élévations frontales", sets: 3, reps: "12-15", rest: "60s", muscles: ["Deltoïdes antérieurs"], description: "Les élévations frontales ciblent les deltoïdes antérieurs. Avec votre taille, gardez les coudes légèrement fléchis et soulevez les haltères jusqu'à hauteur d'épaules pour éviter toute tension excessive sur les épaules.", difficulty: "Débutant", equipment: "Haltères", tempo: "2-0-2-1", image: "/api/placeholder/400/300" },
    { id: 22, name: "Élévations postérieures", sets: 3, reps: "12-15", rest: "60s", muscles: ["Deltoïdes postérieurs", "Trapèzes moyens"], description: "Les élévations postérieures ciblent l'arrière des épaules, souvent négligé. Pour votre morphologie, penchez-vous légèrement vers l'avant à la taille et gardez le dos plat. Élevez les haltères en écartant les coudes pour maximiser l'activation musculaire.", difficulty: "Débutant", equipment: "Haltères", tempo: "2-1-2-0", image: "/api/placeholder/400/300" },
    { id: 23, name: "Face pull", sets: 3, reps: "12-15", rest: "60s", muscles: ["Deltoïdes postérieurs", "Trapèzes", "Rotateurs externes de l'épaule"], description: "Les face pulls sont excellents pour la santé des épaules et le développement de l'arrière de l'épaule. Avec votre taille, réglez la poulie à hauteur de visage et tirez vers votre visage en écartant les coudes, en gardant les pouces vers vous pour une rotation externe de l'épaule.", difficulty: "Intermédiaire", equipment: "Poulie", tempo: "2-1-2-1", image: "/api/placeholder/400/300" }
  ],
  biceps: [
    { id: 25, name: "Curl haltères", sets: 3, reps: "10-12", rest: "60s", muscles: ["Biceps"], description: "Le curl haltères est un exercice de base pour les biceps. Avec votre grande taille (1m95), vous avez probablement des bras longs, donc concentrez-vous sur une contraction complète au sommet et un étirement complet en bas. Alternez les bras pour permettre une récupération partielle entre les répétitions.", difficulty: "Débutant", equipment: "Haltères", tempo: "2-0-2-1", image: "/api/placeholder/400/300" },
    { id: 26, name: "Curl barre EZ", sets: 3, reps: "10-12", rest: "60s", muscles: ["Biceps"], description: "Le curl avec barre EZ réduit la tension sur les poignets par rapport à une barre droite. Avec vos longs bras, prenez une prise d'une largeur confortable et concentrez-vous sur l'isolation des biceps en évitant de balancer le corps.", difficulty: "Débutant", equipment: "Barre EZ", tempo: "2-1-2-0", image: "/api/placeholder/400/300" },
    { id: 27, name: "Curl incliné", sets: 3, reps: "10-12", rest: "60s", muscles: ["Biceps (longue portion)"], description: "Le curl incliné étire davantage la longue portion du biceps. Pour votre taille, réglez le banc à environ 45° et laissez vos bras pendre complètement à chaque répétition pour un étirement maximal. Gardez les coudes fixés sur le banc tout au long du mouvement.", difficulty: "Intermédiaire", equipment: "Haltères, Banc incliné", tempo: "2-1-2-0", image: "/api/placeholder/400/300" },
    { id: 28, name: "Curl marteau", sets: 3, reps: "10-12", rest: "60s", muscles: ["Biceps", "Brachial", "Avant-bras"], description: "Le curl marteau cible le brachial et les avant-bras en plus des biceps. Avec votre morphologie, gardez les coudes près du corps et effectuez un mouvement strict pour maximiser l'activation musculaire.", difficulty: "Débutant", equipment: "Haltères", tempo: "2-0-2-0", image: "/api/placeholder/400/300" },
    { id: 29, name: "Curl concentration", sets: 3, reps: "10-12", rest: "60s", muscles: ["Biceps (pic)"], description: "Le curl concentration permet une isolation maximale du biceps. Avec votre grande taille, écartez bien les jambes en position assise et appuyez fermement votre coude contre l'intérieur de votre cuisse pour stabiliser le mouvement.", difficulty: "Débutant", equipment: "Haltère", tempo: "2-1-3-0", image: "/api/placeholder/400/300" }
  ],
  triceps: [
    { id: 31, name: "Extensions à la poulie haute", sets: 3, reps: "12-15", rest: "60s", muscles: ["Triceps"], description: "Les extensions à la poulie haute sont excellentes pour isoler les triceps. Avec votre grande taille (1m95), gardez les coudes près de la tête et concentrez-vous sur une extension complète des avant-bras sans bouger les bras supérieurs. Utilisez une corde, une barre droite ou un V selon votre préférence.", difficulty: "Débutant", equipment: "Poulie haute", tempo: "2-1-2-0", image: "/api/placeholder/400/300" },
    { id: 32, name: "Extension nuque avec haltère", sets: 3, reps: "10-12", rest: "60s", muscles: ["Triceps (longue portion)"], description: "Les extensions nuque ciblent particulièrement la longue portion du triceps. Avec vos longs bras, gardez les coudes pointés vers le plafond et descendez l'haltère derrière la tête aussi bas que possible tout en maintenant les coudes immobiles.", difficulty: "Intermédiaire", equipment: "Haltère", tempo: "3-1-2-0", image: "/api/placeholder/400/300" },
    { id: 33, name: "Dips entre bancs", sets: 3, reps: "10-15", rest: "60s", muscles: ["Triceps", "Pectoraux inférieurs", "Épaules antérieures"], description: "Les dips entre bancs sont excellents pour les triceps. Avec votre grande taille, placez les bancs suffisamment écartés pour permettre une descente confortable. Gardez les coudes près du corps pour cibler davantage les triceps et moins les pectoraux.", difficulty: "Intermédiaire", equipment: "Bancs ou chaises", tempo: "2-0-2-0", image: "/api/placeholder/400/300" },
    { id: 34, name: "Extensions françaises", sets: 3, reps: "10-12", rest: "60s", muscles: ["Triceps"], description: "Les extensions françaises ciblent l'ensemble du triceps. Avec votre morphologie, vous pouvez utiliser une barre EZ ou des haltères. Gardez les coudes pointés vers le plafond tout au long du mouvement pour isoler efficacement les triceps.", difficulty: "Intermédiaire", equipment: "Barre EZ ou haltères", tempo: "2-1-2-0", image: "/api/placeholder/400/300" },
    { id: 35, name: "Kickback", sets: 3, reps: "12-15", rest: "60s", muscles: ["Triceps"], description: "Les kickbacks isolent parfaitement le triceps en position d'extension complète. Avec votre taille, penchez-vous bien en avant avec le dos plat et gardez le bras supérieur parallèle au sol pendant tout le mouvement pour maximiser l'efficacité.", difficulty: "Débutant", equipment: "Haltère", tempo: "2-1-2-0", image: "/api/placeholder/400/300" }
  ],
  abdominaux: [
    { id: 37, name: "Crunch", sets: 3, reps: "15-20", rest: "45s", muscles: ["Abdominaux supérieurs"], description: "Le crunch est un exercice de base pour les abdominaux. Avec votre grande taille (1m95), concentrez-vous sur un mouvement lent et contrôlé, en engageant activement les abdominaux pour soulever les épaules du sol.", difficulty: "Débutant", equipment: "Tapis", tempo: "2-0-2-0", image: "/api/placeholder/400/300" },
    { id: 38, name: "Relevé de jambes suspendu", sets: 3, reps: "10-15", rest: "60s", muscles: ["Abdominaux inférieurs", "Fléchisseurs des hanches"], description: "Les relevés de jambes suspendus ciblent principalement les abdominaux inférieurs. Avec votre grande taille, utilisez des supports pour bras si disponibles pour éviter l'inconfort aux épaules. Soulevez les jambes en gardant un léger pli aux genoux pour réduire la pression sur le bas du dos.", difficulty: "Avancé", equipment: "Barre de traction ou chaise romaine", tempo: "2-1-2-0", image: "/api/placeholder/400/300" },
    { id: 39, name: "Planche", sets: 3, reps: "30-60s", rest: "45s", muscles: ["Abdominaux", "Transverse", "Érecteurs du rachis"], description: "La planche est excellente pour renforcer l'ensemble du tronc. Avec votre taille, assurez-vous de maintenir une ligne droite de la tête aux talons, sans laisser le bas du dos s'affaisser. Engagez activement les abdominaux et les fessiers.", difficulty: "Débutant", equipment: "Tapis", tempo: "Isométrique", image: "/api/placeholder/400/300" },
    { id: 40, name: "Rotation russe", sets: 3, reps: "20 (10 de chaque côté)", rest: "45s", muscles: ["Obliques", "Abdominaux"], description: "Les rotations russes ciblent efficacement les obliques. Avec votre morphologie, maintenez une bonne posture pendant tout l'exercice et utilisez un poids approprié pour effectuer une rotation complète sans compromettre votre forme.", difficulty: "Intermédiaire", equipment: "Kettlebell ou disque", tempo: "2-0-2-0", image: "/api/placeholder/400/300" },
    { id: 41, name: "Mountain climber", sets: 3, reps: "30s", rest: "30s", muscles: ["Abdominaux", "Fléchisseurs des hanches", "Épaules"], description: "Les mountain climbers sont excellents pour travailler les abdominaux tout en ajoutant un élément cardio. Avec votre grande taille, prenez une position de planche légèrement plus large pour maintenir l'équilibre et engagez activement le core pendant tout l'exercice.", difficulty: "Intermédiaire", equipment: "Tapis", tempo: "Rapide et contrôlé", image: "/api/placeholder/400/300" }
  ]
};

// Programme d'entraînement
const workoutProg = {
  day1: {
    title: "Jour 1 - Poitrine et Triceps",
    muscleGroups: [
      {
        muscle: "Poitrine",
        exercises: [
          { name: "Développé couché", sets: 4, reps: "8-10", rest: "90s", goal: "85kg", current: "60kg" },
          { name: "Développé incliné haltères", sets: 4, reps: "8-10", rest: "90s" },
          { name: "Écartés à la poulie", sets: 3, reps: "10-12", rest: "60s" },
          { name: "Dips pour la poitrine", sets: 3, reps: "8-12", rest: "90s" }
        ]
      },
      {
        muscle: "Triceps",
        exercises: [
          { name: "Extensions à la poulie haute", sets: 3, reps: "12-15", rest: "60s" },
          { name: "Extension nuque avec haltère", sets: 3, reps: "10-12", rest: "60s" }
        ]
      }
    ]
  },
  day2: {
    title: "Jour 2 - Épaules et Jambes",
    muscleGroups: [
      {
        muscle: "Épaules",
        exercises: [
          { name: "Développé militaire", sets: 4, reps: "8-10", rest: "90s" },
          { name: "Élévations latérales", sets: 3, reps: "12-15", rest: "60s" }
        ]
      },
      {
        muscle: "Jambes",
        exercises: [
          { name: "Squat", sets: 4, reps: "8-10", rest: "120s", goal: "95kg", current: "50kg" },
          { name: "Leg press", sets: 3, reps: "10-12", rest: "90s" }
        ]
      }
    ]
  },
  day3: {
    title: "Jour 3 - Dos et Biceps",
    muscleGroups: [
      {
        muscle: "Dos",
        exercises: [
          { name: "Soulevé de terre", sets: 4, reps: "6-8", rest: "120s", goal: "105kg", current: "70kg" },
          { name: "Tirage vertical prise large", sets: 4, reps: "8-10", rest: "90s" }
        ]
      },
      {
        muscle: "Biceps",
        exercises: [
          { name: "Curl haltères", sets: 3, reps: "10-12", rest: "60s" },
          { name: "Curl barre EZ", sets: 3, reps: "10-12", rest: "60s" }
        ]
      }
    ]
  }
};

// Données nutritionnelles
const nutrPlan = {
  dailyCalories: { trainingDay: 3800, restDay: 3200 },
  dailyProtein: 220,
  macros: {
    trainingDay: { protein: 220, carbs: 455, fats: 95 },
    restDay: { protein: 220, carbs: 345, fats: 85 }
  },
  meals: {
    trainingDay: [
      {
        name: "Petit-déjeuner",
        foods: ["4 œufs entiers brouillés", "80g flocons d'avoine avec lait entier", "1 banane", "30g de beurre de cacahuète", "Thé Kinkeliba sénégalais"],
        calories: 850, protein: 45, timing: "7h00"
      },
      {
        name: "Collation matinale",
        foods: ["1 yaourt grec (200g)", "40g de granola", "30g de noix mélangées", "Bissap frais sans sucre"],
        calories: 450, protein: 20, timing: "10h00"
      },
      {
        name: "Déjeuner",
        foods: ["250g de Thieboudienne allégé", "Salade de légumes croquants", "1 cuillère à soupe d'huile d'olive"],
        calories: 750, protein: 55, timing: "13h00"
      },
      {
        name: "Pré-entraînement",
        foods: ["200g de Sombi protéiné", "1 banane", "1 café noir"],
        calories: 350, protein: 15, timing: "1h avant l'entraînement"
      },
      {
        name: "Post-entraînement",
        foods: ["Shake protéiné (40g de whey)", "1 banane", "20g de miel de fleurs sauvages sénégalaises"],
        calories: 300, protein: 35, timing: "Immédiatement après"
      },
      {
        name: "Dîner",
        foods: ["200g de poulet Yassa allégé", "200g de riz brun", "Légumes cuits à la vapeur"],
        calories: 800, protein: 50, timing: "20h00"
      }
    ],
    restDay: [
      {
        name: "Petit-déjeuner",
        foods: ["Lakh protéiné", "3 œufs entiers en omelette", "1 banane", "Thé Kinkeliba sénégalais"],
        calories: 650, protein: 35, timing: "7h00"
      },
      {
        name: "Collation matinale",
        foods: ["Jus de bouye frais", "30g de noix mélangées", "1 pomme"],
        calories: 350, protein: 15, timing: "10h00"
      },
      {
        name: "Déjeuner",
        foods: ["300g de Mafé allégé", "150g de riz complet", "Salade de légumes frais"],
        calories: 650, protein: 45, timing: "13h00"
      },
      {
        name: "Collation après-midi",
        foods: ["Ngalakh protéiné", "1 fruit", "Thé à la menthe sans sucre"],
        calories: 250, protein: 25, timing: "16h00"
      },
      {
        name: "Dîner",
        foods: ["250g de Domoda allégé", "Légumes sautés et fonio", "1 cuillère à café d'huile d'olive"],
        calories: 600, protein: 40, timing: "20h00"
      }
    ]
  },
  weeklyPlan: [
    { day: "Lundi", type: "Repos", meal: "Thiou poulet" },
    { day: "Mardi", type: "Entraînement", meal: "Yassa poisson" },
    { day: "Mercredi", type: "Repos", meal: "Suppu Kanja" },
    { day: "Jeudi", type: "Repos", meal: "Mbakhal Saloum" },
    { day: "Vendredi", type: "Entraînement", meal: "Thieboudienne" },
    { day: "Samedi", type: "Repos", meal: "Mafé bœuf" },
    { day: "Dimanche", type: "Entraînement", meal: "Poulet DG" }
  ],
  hydration: "Au moins 4L d'eau par jour",
  specialIngredients: [
    { name: "Dakhine", benefits: "Riche en protéines et fer" },
    { name: "Mbuum", benefits: "Apport en calcium et vitamine C" },
    { name: "Bissap", benefits: "Antioxydant naturel" },
    { name: "Netetu", benefits: "Probiotiques naturels" },
    { name: "Huile de palme rouge", benefits: "Vitamine E et antioxydants" }
  ]
};

// Données de progression
const initProgData = [
  { week: 1, date: '2025-02-15', weight: 91.5, benchPress: 60, squat: 50, deadlift: 70 },
  { week: 2, date: '2025-02-22', weight: 92.2, benchPress: 62.5, squat: 55, deadlift: 75 },
  { week: 3, date: '2025-03-01', weight: 93, benchPress: 65, squat: 60, deadlift: 80 }
];

// App info et thèmes
const APP = {name: "AdaFiT", version: "1.0"};
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

const App = () => {
  // États (version optimisée)
  const [activeTab, setActiveTab] = useState('program');
  const [curDay, setCurDay] = useState('day1');
  const [selMuscle, setSelMuscle] = useState(null);
  const [showExDetail, setShowExDetail] = useState(false);
  const [selExercise, setSelExercise] = useState(null);
  const [timRunning, setTimRunning] = useState(false);
  const [timSeconds, setTimSeconds] = useState(0);
  const [timPhase, setTimPhase] = useState('rest');
  const [curRepCount, setCurRepCount] = useState(0);
  const [curSetCount, setCurSetCount] = useState(1);
  const [searchQ, setSearchQ] = useState('');
  const [filteredEx, setFilteredEx] = useState([]);
  const [showAllMuscles, setShowAllMuscles] = useState(true);
  const [mealType, setMealType] = useState('training');
  const [progData, setProgData] = useState(initProgData);
  const [showWtModal, setShowWtModal] = useState(false);
  const [newWeight, setNewWeight] = useState('');
  const [newBench, setNewBench] = useState('');
  const [newSquat, setNewSquat] = useState('');
  const [newDeadlift, setNewDeadlift] = useState('');
  
  // Effet pour page title et autres effets
  useEffect(() => { document.title = APP.name; }, []);
  
  const getTheme = () => themes[activeTab] || themes.program;
  
  // Ajouter entrée poids
  const addWeightEntry = () => {
    if (!newWeight) return;
    
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    const newEntry = {
      week: progData.length + 1,
      date: dateStr,
      weight: parseFloat(newWeight),
      benchPress: newBench ? parseFloat(newBench) : progData[progData.length-1].benchPress,
      squat: newSquat ? parseFloat(newSquat) : progData[progData.length-1].squat,
      deadlift: newDeadlift ? parseFloat(newDeadlift) : progData[progData.length-1].deadlift
    };
    
    setProgData([...progData, newEntry]);
    setNewWeight('');
    setNewBench('');
    setNewSquat('');
    setNewDeadlift('');
    setShowWtModal(false);
  };
  
  // Timer exercices
  useEffect(() => {
    if (!timRunning || !selExercise) return;
    
    const interval = setInterval(() => {
      if (timSeconds > 0) {
        setTimSeconds(s => s - 1);
      } else {
        // Gestion phases timer
        if (timPhase === 'descent') {
          setTimPhase('pauseBottom');
          setTimSeconds(1);
        } else if (timPhase === 'pauseBottom') {
          setTimPhase('ascent');
          setTimSeconds(2);
        } else if (timPhase === 'ascent') {
          const repMax = selExercise.reps ? parseInt(selExercise.reps.split('-')[1] || 10) : 10;
          
          if (curRepCount + 1 >= repMax) {
            setTimPhase('rest');
            const restTime = selExercise.rest ? parseInt(selExercise.rest.replace('s', '') || 60) : 60;
            setTimSeconds(restTime);
            setCurRepCount(0);
            setCurSetCount(prev => prev + 1);
            
            const setMax = selExercise.sets || 3;
            if (curSetCount + 1 > setMax) stopTimer();
          } else {
            setTimPhase('descent');
            setTimSeconds(3);
            setCurRepCount(r => r + 1);
          }
        } else if (timPhase === 'rest') {
          setTimPhase('descent');
          setTimSeconds(3);
        }
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [timRunning, timSeconds, timPhase, curRepCount, curSetCount, selExercise]);

  // Fonctions UI
  const openExDetail = (ex) => {
    setSelExercise(ex);
    setShowExDetail(true);
  };

  const closeExDetail = () => {
    setShowExDetail(false);
    setSelExercise(null);
  };

  const startTimer = (ex) => {
    const fullEx = Object.values(exData).flat().find(e => e.name === ex.name) || ex;
    setSelExercise(fullEx);
    setTimRunning(true);
    setTimPhase('descent');
    setTimSeconds(3);
    setCurRepCount(0);
    setCurSetCount(1);
  };

  const stopTimer = () => {
    setTimRunning(false);
    setTimSeconds(0);
    setTimPhase('rest');
  };

  const handleSearch = (q) => {
    setSearchQ(q);
    if (!q) {
      setFilteredEx([]);
      return;
    }
    
    const results = Object.values(exData).flat().filter(ex => 
      ex.name.toLowerCase().includes(q.toLowerCase()) ||
      ex.muscles.some(m => m.toLowerCase().includes(q.toLowerCase()))
    );
    
    setFilteredEx(results);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className={`bg-gradient-to-r ${getTheme().header} text-white p-3 sm:p-4 shadow-lg transition-all duration-300`}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="flex items-center space-x-2 mb-2 sm:mb-0">
            <Dumbbell className="w-5 h-5 sm:w-6 sm:h-6" />
            <h1 className="text-lg sm:text-xl font-bold">FitTrack Diaspora</h1>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto">
            <span className={`bg-gradient-to-r ${getTheme().accent} px-2 py-1 text-xs sm:text-sm rounded-full font-medium`}>Semaine 3/12</span>
            <span className="bg-gradient-to-r from-red-500 to-pink-500 px-2 py-1 text-xs sm:text-sm rounded-full font-medium">Objectif: 100kg</span>
          </div>
        </div>
        <div className={`mt-3 sm:mt-4 flex flex-wrap sm:flex-nowrap items-center bg-gradient-to-r ${getTheme().headerLight} p-2 rounded-lg backdrop-blur-sm`}>
          <div className="flex-1 min-w-[33%] mb-2 sm:mb-0">
            <div className="text-xs uppercase font-medium">Poids actuel</div>
            <div className="text-base sm:text-lg font-bold flex items-center">
              <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-green-300" />93kg
            </div>
          </div>
          <div className="flex-1 min-w-[33%] mb-2 sm:mb-0">
            <div className="text-xs uppercase font-medium">Progression développé</div>
            <div className="text-base sm:text-lg font-bold flex items-center">
              <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-green-300" />60kg → 65kg (+5kg)
            </div>
          </div>
          <div className="flex-1 min-w-[33%]">
            <div className="text-xs uppercase font-medium">Progression squat</div>
            <div className="text-base sm:text-lg font-bold flex items-center">
              <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-green-300" />50kg → 60kg (+10kg)
            </div>
          </div>
        </div>
      </header>

      {/* Barre recherche */}
      <div className="px-2 sm:px-4 py-2 bg-white shadow-md sticky top-0 z-10">
        <div className="relative max-w-xl mx-auto">
          <Search size={16} className="absolute left-3 top-3 text-indigo-400" />
          <input 
            type="text" 
            placeholder="Rechercher un exercice..." 
            className="w-full p-2 pl-9 sm:pl-10 border border-indigo-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchQ}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Résultats recherche */}
      {searchQ && filteredEx.length > 0 && (
        <div className="p-3 sm:p-4 bg-white shadow-md max-h-64 overflow-y-auto">
          <h3 className="text-sm font-semibold mb-2 text-indigo-600">Résultats de recherche</h3>
          <div className="grid grid-cols-1 gap-2">
            {filteredEx.map(ex => (
              <div 
                key={ex.id} 
                className="p-3 rounded-lg border border-indigo-100 hover:bg-indigo-50 active:bg-indigo-100 cursor-pointer touch-manipulation"
                onClick={() => openExDetail(ex)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-indigo-800">{ex.name}</div>
                    <div className="text-xs text-indigo-500">{ex.muscles.join(', ')}</div>
                  </div>
                  <ChevronRight size={16} className="text-indigo-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contenu principal */}
      <main className="flex-1 overflow-y-auto px-2 sm:px-4 pb-4">
        {/* Onglets principaux */}
        <div className="sticky top-0 z-30 pt-3 sm:pt-4 pb-2 bg-gray-50 bg-opacity-95 backdrop-blur-sm">
          <div className="flex justify-between bg-white rounded-xl p-1 shadow-md max-w-6xl mx-auto">
            {['program', 'nutrition', 'progress', 'exercises'].map(tab => (
              <div 
                key={tab}
                className={`flex-1 py-2 sm:py-3 px-0 sm:px-1 text-center rounded-lg cursor-pointer transition touch-manipulation ${activeTab === tab ? 
                  'bg-gradient-to-r ' + themes[tab].primary + ' text-white font-medium shadow-md' : 
                  'text-gray-600 hover:bg-' + (tab === 'program' ? 'indigo' : tab === 'nutrition' ? 'emerald' : tab === 'progress' ? 'amber' : 'rose') + '-50'}`}
                onClick={() => setActiveTab(tab)}
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

          {/* Onglet Programme */}
          {activeTab === 'program' && (
            <div className="space-y-6">
              {/* Jours d'entraînement */}
              <div className="flex space-x-2 overflow-x-auto py-2 scrollbar-hide">
                {Object.entries(workoutProg).map(([day, data]) => (
                  <div 
                    key={day}
                    onClick={() => setCurDay(day)} 
                    className={`whitespace-nowrap px-2 sm:px-3 py-2 text-xs sm:text-sm rounded-lg cursor-pointer flex items-center transition touch-manipulation ${curDay === day ? 
                      'bg-gradient-to-r ' + getTheme().primary + ' text-white font-medium shadow-sm' : 
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
                <h2 className="text-xl font-bold mb-6 text-indigo-800 border-b pb-2">{workoutProg[curDay].title}</h2>
                <div className="space-y-8">
                  {workoutProg[curDay].muscleGroups.map((mg, idx) => (
                    <div key={idx}>
                      <h3 className={`text-lg font-semibold mb-4 px-3 py-2 bg-gradient-to-r ${getTheme().card} rounded-lg text-indigo-800 flex items-center`}>
                        <Dumbbell size={18} className="mr-2 text-indigo-600" />{mg.muscle}
                      </h3>
                      <div className="space-y-4">
                        {mg.exercises.map((ex, exIdx) => (
                          <div key={exIdx} className="bg-white rounded-xl border border-indigo-100 shadow-sm hover:shadow-md p-3 sm:p-4">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                              <div className="flex-1">
                                <h4 className="font-semibold text-indigo-800 text-base sm:text-lg mb-1">{ex.name}</h4>
                                <p className="text-xs sm:text-sm text-indigo-500 mb-2">{ex.sets} séries × {ex.reps} reps • repos {ex.rest}</p>
                                {ex.goal && ex.current && (
                                  <div className="mt-2 sm:mt-3">
                                    <div className="flex justify-between text-xs mb-1 text-gray-600">
                                      <span>Actuel: <span className="font-semibold text-indigo-600">{ex.current}</span></span>
                                      <span>Objectif: <span className="font-semibold text-indigo-800">{ex.goal}</span></span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                      <div 
                                        className={`h-full bg-gradient-to-r ${getTheme().primary} rounded-full`}
                                        style={{width: `${(parseInt(ex.current) / parseInt(ex.goal)) * 100}%`}}
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className="flex justify-between sm:flex-col sm:space-y-2 sm:ml-4 mt-3 sm:mt-0">
                                <button 
                                  className={`flex-1 sm:flex-auto bg-gradient-to-r ${getTheme().action} hover:${getTheme().actionHover} text-white px-3 sm:px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition flex items-center text-xs sm:text-sm justify-center sm:justify-start touch-manipulation`}
                                  onClick={() => startTimer(ex)}
                                >
                                  <Clock size={14} className="mr-1 sm:mr-2" />Démarrer
                                </button>
                                <button 
                                  className={`flex-1 sm:flex-auto bg-gradient-to-r ${getTheme().button} hover:${getTheme().buttonHover} text-white px-3 sm:px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition flex items-center text-xs sm:text-sm justify-center sm:justify-start ml-2 sm:ml-0 touch-manipulation`}
                                  onClick={() => {
                                    const fullEx = Object.values(exData).flat().find(e => e.name === ex.name);
                                    openExDetail(fullEx || ex);
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

          {/* Onglet Nutrition */}
          {activeTab === 'nutrition' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-emerald-800">Plan nutritionnel personnalisé (60% cuisine sénégalaise)</h2>
                  <div className="flex space-x-2">
                    <div className="bg-emerald-100 text-emerald-800 text-sm px-3 py-2 rounded-lg font-medium">
                      Entraînement: {nutrPlan.dailyCalories.trainingDay} cal
                    </div>
                    <div className="bg-green-100 text-green-800 text-sm px-3 py-2 rounded-lg font-medium">
                      Repos: {nutrPlan.dailyCalories.restDay} cal
                    </div>
                  </div>
                </div>
                
                {/* Macros et Objectifs */}
                <div className="flex justify-between mb-6 bg-emerald-50 p-4 rounded-xl">
                  <div className="space-y-1">
                    <div className="text-emerald-800 font-semibold">Protéines: {nutrPlan.dailyProtein}g/jour</div>
                    <div className="text-xs text-emerald-500">(~2.2g/kg pour votre poids)</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-emerald-800 font-semibold">Objectif: 100kg</div>
                    <div className="text-xs text-emerald-500">Actuel: 93kg (+7kg à prendre)</div>
                  </div>
                </div>

                {/* Planning hebdomadaire */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 text-emerald-800">Planning hebdomadaire de cuisine sénégalaise</h3>
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {nutrPlan.weeklyPlan.map((day, idx) => (
                      <div 
                        key={idx} 
                        className={`text-center p-3 rounded-xl shadow-sm ${day.type === 'Entraînement' ? 'bg-emerald-100 text-emerald-800' : 'bg-green-100 text-green-800'}`}
                      >
                        <div className="font-medium">{day.day.slice(0, 3)}</div>
                        <div className="text-xs mt-1">{day.type}</div>
                        <div className="text-xs mt-1 font-medium bg-white p-1 rounded-lg">{day.meal}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sélection type jour */}
                <div className="mb-6">
                  <div className="flex rounded-xl overflow-hidden shadow-md mb-6">
                    <div 
                      onClick={() => setMealType('training')} 
                      className={`flex-1 py-3 text-center cursor-pointer ${mealType === 'training' ? 'bg-emerald-600 text-white font-medium' : 'bg-gray-100 text-gray-700 hover:bg-emerald-50'}`}
                    >
                      <Dumbbell size={18} className="inline mr-2" />Jours d'entraînement
                    </div>
                    <div 
                      onClick={() => setMealType('rest')} 
                      className={`flex-1 py-3 text-center cursor-pointer ${mealType === 'rest' ? 'bg-green-600 text-white font-medium' : 'bg-gray-100 text-gray-700 hover:bg-green-50'}`}
                    >
                      <Coffee size={18} className="inline mr-2" />Jours de repos
                    </div>
                  </div>

                  {/* Plan repas */}
                  <div className="space-y-4">
                    {(mealType === 'training' ? nutrPlan.meals.trainingDay : nutrPlan.meals.restDay).map((meal, idx) => (
                      <div key={idx} className="bg-white border border-emerald-100 rounded-xl p-4 shadow-sm hover:shadow-md">
                        <div className="flex justify-between items-center mb-3 pb-2 border-b border-emerald-100">
                          <h3 className="font-semibold text-lg text-emerald-800">{meal.name}</h3>
                          <div className="flex items-center space-x-3 text-sm">
                            <div className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">{meal.timing}</div>
                            <div className="text-rose-600 bg-rose-50 px-2 py-1 rounded-lg">{meal.calories} cal</div>
                            <div className="text-green-600 bg-green-50 px-2 py-1 rounded-lg">{meal.protein}g prot</div>
                          </div>
                        </div>
                        <ul className="text-sm text-gray-700 space-y-2">
                          {meal.foods.map((food, fidx) => (
                            <li key={fidx} className="flex items-center">
                              <div className="w-2 h-2 rounded-full bg-emerald-500 mr-3"></div>
                              {food}
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
                
                {/* Ingrédients spéciaux */}
                <div className="border-t border-emerald-100 pt-6">
                  <h3 className="font-semibold mb-4 text-emerald-800">Ingrédients spéciaux sénégalais</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {nutrPlan.specialIngredients.map((ingr, idx) => (
                      <div key={idx} className="bg-gradient-to-r from-emerald-50 to-teal-50 p-3 rounded-xl shadow-sm">
                        <div className="font-medium text-emerald-800">{ingr.name}</div>
                        <div className="text-xs text-emerald-600">{ingr.benefits}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Onglet Progrès */}
          {activeTab === 'progress' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-amber-800 flex items-center">
                    <Activity size={24} className="mr-2 text-amber-600" />Évolution du poids
                  </h2>
                  <button
                    onClick={() => setShowWtModal(true)}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-3 py-2 rounded-lg shadow-sm flex items-center"
                  >
                    <PlusCircle size={16} className="mr-1" />
                    Ajouter poids
                  </button>
                </div>
                <div className="h-64 bg-amber-50 p-4 rounded-xl">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={progData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                      <XAxis dataKey="week" label={{ value: 'Semaine', position: 'insideBottom', offset: -5, fill: '#f59e0b' }} />
                      <YAxis domain={[Math.floor(Math.min(...progData.map(d => d.weight)) - 1), Math.ceil(Math.max(...progData.map(d => d.weight)) + 1)]} 
                        label={{ value: 'Poids (kg)', angle: -90, position: 'insideLeft', fill: '#f59e0b' }} />
                      <Tooltip labelFormatter={(val) => `Semaine ${val}`} formatter={(val) => [`${val} kg`, 'Poids']} />
                      <Line type="monotone" dataKey="weight" stroke="#f59e0b" strokeWidth={3} 
                        dot={{ r: 6, fill: '#f59e0b', strokeWidth: 2, stroke: '#fff' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 bg-amber-50 p-4 rounded-xl overflow-auto max-h-40">
                  <table className="w-full text-sm">
                    <thead className="text-amber-800 border-b border-amber-200">
                      <tr>
                        <th className="py-2 text-left">Semaine</th>
                        <th className="py-2 text-left">Date</th>
                        <th className="py-2 text-right">Poids</th>
                        <th className="py-2 text-right">Variation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {progData.map((entry, idx) => (
                        <tr key={idx} className="border-b border-amber-100">
                          <td className="py-2">{entry.week}</td>
                          <td className="py-2">{entry.date}</td>
                          <td className="py-2 text-right font-medium text-amber-800">{entry.weight} kg</td>
                          <td className="py-2 text-right">
                            {idx > 0 ? 
                              <span className={entry.weight > progData[idx-1].weight ? 'text-green-600' : entry.weight < progData[idx-1].weight ? 'text-red-600' : 'text-gray-600'}>
                                {(entry.weight - progData[idx-1].weight).toFixed(1)} kg
                              </span> : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-xl font-bold mb-4 text-amber-800 flex items-center">
                  <Activity size={24} className="mr-2 text-amber-600" />Progression des charges
                </h2>
                <div className="h-64 bg-amber-50 p-4 rounded-xl">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={progData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                      <XAxis dataKey="week" label={{ value: 'Semaine', position: 'insideBottom', offset: -5, fill: '#f59e0b' }} />
                      <YAxis domain={[40, Math.max(110, ...progData.map(d => Math.max(d.benchPress, d.squat, d.deadlift))) + 10]} 
                        label={{ value: 'Charge (kg)', angle: -90, position: 'insideLeft', fill: '#f59e0b' }} />
                      <Tooltip labelFormatter={(val) => `Semaine ${val}`} formatter={(val, name) => [`${val} kg`, name]} />
                      <Line type="monotone" dataKey="benchPress" name="Développé couché" stroke="#ef4444" strokeWidth={3} 
                        dot={{ r: 6, fill: '#ef4444', strokeWidth: 2, stroke: '#fff' }} />
                      <Line type="monotone" dataKey="squat" name="Squat" stroke="#3b82f6" strokeWidth={3} 
                        dot={{ r: 6, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} />
                      <Line type="monotone" dataKey="deadlift" name="Soulevé de terre" stroke="#10b981" strokeWidth={3} 
                        dot={{ r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-xl font-bold mb-6 text-amber-800 flex items-center">
                  <Activity size={24} className="mr-2 text-amber-600" />Progression vers les objectifs
                </h2>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="font-medium text-gray-700">Poids: <span className="text-amber-700 font-semibold">93kg</span></span>
                      <span className="font-medium text-gray-700">Objectif: <span className="text-amber-700 font-semibold">100kg</span></span>
                    </div>
                    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                      <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" style={{ width: `${(93-90)/10*100}%` }}></div>
                    </div>
                    <div className="text-right text-xs text-amber-700 mt-1 font-medium">{((93-90)/10*100).toFixed(1)}%</div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="font-medium text-gray-700">Soulevé de terre: <span className="text-green-700 font-semibold">80kg</span></span>
                      <span className="font-medium text-gray-700">Objectif: <span className="text-green-700 font-semibold">105kg</span></span>
                    </div>
                    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                      <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: `${80/105*100}%` }}></div>
                    </div>
                    <div className="text-right text-xs text-green-700 mt-1 font-medium">{(80/105*100).toFixed(1)}%</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Onglet Exercices */}
          {activeTab === 'exercises' && (
            <div className="space-y-6">
              {/* Sélection groupes musculaires */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-xl font-bold mb-4 text-rose-800 flex items-center">
                  <Dumbbell size={24} className="mr-2 text-rose-600" />Ciblage musculaire
                </h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {['poitrine', 'dos', 'epaules', 'biceps', 'triceps', 'jambes', 'abdominaux'].map(m => (
                    <button 
                      key={m}
                      onClick={() => { setSelMuscle(m); setShowAllMuscles(false); }}
                      className={`text-sm py-3 px-2 rounded-xl shadow-sm ${selMuscle === m ? 'bg-rose-600 text-white font-medium' : 'bg-rose-50 text-rose-800 hover:bg-rose-100'}`}
                    >
                      {m.charAt(0).toUpperCase() + m.slice(1)}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => { setSelMuscle(null); setShowAllMuscles(true); }}
                  className="bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-xl shadow-sm hover:shadow-md flex items-center justify-center mt-3 w-full"
                >
                  <Dumbbell size={18} className="mr-2" />Tous les exercices
                </button>
              </div>

              {/* Affichage exercices */}
              {showAllMuscles ? (
                Object.entries(exData).map(([muscle, exercises]) => (
                  <div key={muscle} className="bg-white rounded-xl p-6 shadow-md">
                    <h2 className="text-xl font-bold mb-4 text-rose-800 flex items-center">
                      <Dumbbell size={24} className="mr-2 text-rose-600" />
                      {muscle === 'poitrine' ? 'Poitrine' : muscle === 'dos' ? 'Dos' : 
                       muscle === 'jambes' ? 'Jambes' : muscle === 'epaules' ? 'Épaules' : 
                       muscle === 'biceps' ? 'Biceps' : muscle === 'triceps' ? 'Triceps' : 'Abdominaux'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {exercises.slice(0, 2).map(ex => (
                        <div 
                          key={ex.id} 
                          className="p-4 rounded-xl border border-rose-100 hover:border-rose-300 bg-rose-50 hover:bg-rose-100 cursor-pointer shadow-sm hover:shadow-md"
                          onClick={() => openExDetail(ex)}
                        >
                          <div className="font-medium text-rose-800 text-lg">{ex.name}</div>
                          <div className="flex justify-between mt-2">
                            <div className="text-xs text-rose-600 bg-white px-2 py-1 rounded-lg shadow-sm">{ex.difficulty}</div>
                            <div className="text-xs text-rose-600 bg-white px-2 py-1 rounded-lg shadow-sm">{ex.equipment}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {exercises.length > 2 && (
                      <button 
                        className="w-full mt-4 bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-xl shadow-sm hover:shadow-md"
                        onClick={() => { setSelMuscle(muscle); setShowAllMuscles(false); }}
                      >
                        Voir plus ({exercises.length - 2} autres exercices)
                      </button>
                    )}
                  </div>
                ))
              ) : (
                selMuscle && (
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h2 className="text-xl font-bold mb-4 text-rose-800 flex items-center">
                      <Dumbbell size={24} className="mr-2 text-rose-600" />
                      Exercices de {selMuscle.charAt(0).toUpperCase() + selMuscle.slice(1)}
                    </h2>
                    <div className="space-y-4">
                      {exData[selMuscle].map(ex => (
                        <div 
                          key={ex.id} 
                          className="p-4 rounded-xl border border-rose-100 hover:border-rose-300 bg-rose-50 hover:bg-rose-100 cursor-pointer shadow-sm hover:shadow-md"
                          onClick={() => openExDetail(ex)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium text-rose-800 text-lg">{ex.name}</div>
                              <div className="text-xs text-rose-600 mt-1">{ex.muscles.join(', ')}</div>
                            </div>
                            <div className="text-xs bg-white text-rose-600 px-3 py-1 rounded-lg shadow-sm">
                              {ex.difficulty}
                            </div>
                          </div>
                          <div className="mt-3 text-sm text-rose-700 bg-white px-3 py-2 rounded-lg shadow-sm">
                            Équipement: {ex.equipment}
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
      <footer className={`bg-gradient-to-r ${getTheme().header} text-white p-3 shadow-inner transition-all duration-300`}>
        <div className="flex flex-wrap justify-between items-center max-w-6xl mx-auto">
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
            Créé pour vous • 1m95 • Objectif: 100kg
          </div>
          <div className="text-xs bg-white/20 px-2 sm:px-3 py-1 rounded-full">
            Poids: {progData[progData.length-1].weight}kg
          </div>
        </div>
      </footer>
      
      {/* Modal ajout poids */}
      {showWtModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-amber-800">Ajouter une mesure</h3>
              <button onClick={() => setShowWtModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Poids (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Ex: 93.5"
                  required
                />
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Développé (kg)</label>
                  <input
                    type="number"
                    step="2.5"
                    value={newBench}
                    onChange={(e) => setNewBench(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder={`${progData[progData.length-1].benchPress}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Squat (kg)</label>
                  <input
                    type="number"
                    step="2.5"
                    value={newSquat}
                    onChange={(e) => setNewSquat(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder={`${progData[progData.length-1].squat}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Soulevé (kg)</label>
                  <input
                    type="number"
                    step="2.5"
                    value={newDeadlift}
                    onChange={(e) => setNewDeadlift(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder={`${progData[progData.length-1].deadlift}`}
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 pt-2">
                <button
                  onClick={() => setShowWtModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg"
                >
                  Annuler
                </button>
                <button
                  onClick={addWeightEntry}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-lg flex items-center justify-center"
                  disabled={!newWeight}
                >
                  <Save size={16} className="mr-1" />
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal détails exercice */}
      {showExDetail && selExercise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-auto overflow-hidden">
            <div className={`sticky top-0 z-10 bg-gradient-to-r ${getTheme().header} text-white flex justify-between items-center p-5`}>
              <h2 className="text-xl font-bold">{selExercise.name}</h2>
              <button onClick={closeExDetail} className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 max-h-96 overflow-y-auto">
              {/* Image */}
              <div className="aspect-video bg-indigo-100 rounded-xl mb-6 overflow-hidden flex items-center justify-center">
                <img 
                  src={selExercise.image || "/api/placeholder/400/300"} 
                  alt={selExercise.name}
                  className="w-full h-full object-cover" 
                />
              </div>
              
              {/* Muscles ciblés */}
              <div className="mb-6">
                <h3 className={`font-semibold mb-3 text-${activeTab}-800`}>Muscles ciblés</h3>
                <div className="flex flex-wrap gap-2">
                  {selExercise.muscles.map((m, idx) => (
                    <span key={idx} className={`text-sm bg-gradient-to-r ${getTheme().light} text-${activeTab}-800 px-3 py-1 rounded-lg shadow-sm`}>
                      {m}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Description */}
              <div className="mb-6">
                <h3 className={`font-semibold mb-3 text-${activeTab}-800`}>Description</h3>
                <p className={`text-gray-700 bg-gradient-to-r ${getTheme().light} p-4 rounded-xl shadow-sm`}>{selExercise.description}</p>
              </div>
              
              {/* Caractéristiques */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  {title: 'Difficulté', value: selExercise.difficulty},
                  {title: 'Équipement', value: selExercise.equipment},
                  {title: 'Tempo', value: selExercise.tempo},
                  {title: 'Séries/Répétitions', value: `${selExercise.sets} séries × ${selExercise.reps}`}
                ].map((item, idx) => (
                  <div key={idx} className={`bg-gradient-to-r ${getTheme().light} p-4 rounded-xl shadow-sm`}>
                    <h3 className={`font-semibold mb-2 text-${activeTab}-800`}>{item.title}</h3>
                    <p className={`text-${activeTab}-700`}>{item.value}</p>
                  </div>
                ))}
              </div>
              
              {/* Boutons */}
              <div className="mb-6">
                <button 
                  className={`w-full bg-gradient-to-r ${getTheme().action} hover:${getTheme().actionHover} text-white py-4 rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center`}
                  onClick={() => {
                    closeExDetail();
                    startTimer(selExercise);
                  }}
                >
                  <Clock size={20} className="mr-2" />Démarrer l'exercice
                </button>
              </div>
              
              <button 
                onClick={closeExDetail} 
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-xl shadow-md hover:shadow-lg transition"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Minuteur exercice */}
      {timRunning && selExercise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-indigo-900 bg-opacity-95 backdrop-blur-lg">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-md mx-0 sm:mx-4 overflow-hidden">
            {/* Indicateur de swipe pour mobile */}
            <div className="w-12 h-1 bg-gray-300 rounded mx-auto mt-2 mb-1 sm:hidden"></div>
            <div className="bg-indigo-600 text-white p-4 sm:p-5">
              <div className="flex justify-between items-center">
                <h2 className="text-lg sm:text-xl font-bold">{selExercise.name}</h2>
                <button 
                  onClick={stopTimer} 
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-full touch-manipulation"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="text-xs sm:text-sm mt-2 bg-white/20 px-3 py-2 rounded-lg">
                Série {curSetCount}/{selExercise.sets || 3} • Rep {curRepCount}/{selExercise.reps ? selExercise.reps.split('-')[1] : 10}
              </div>
            </div>
            
            <div className="p-6 flex flex-col items-center">
              <div className="text-7xl font-bold mb-6 text-indigo-800">{timSeconds}</div>
              
              <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden shadow-inner mb-8">
                <div 
                  className={`h-full rounded-full ${
                    timPhase === 'descent' ? 'bg-indigo-500' : 
                    timPhase === 'pauseBottom' ? 'bg-rose-500' : 
                    timPhase === 'ascent' ? 'bg-green-500' : 
                    timPhase === 'pauseTop' ? 'bg-amber-500' : 
                    'bg-gray-500'
                  }`}
                  style={{ width: `${timSeconds * 100 / 
                    (timPhase === 'descent' ? 3 : 
                     timPhase === 'pauseBottom' ? 1 : 
                     timPhase === 'ascent' ? 2 : 
                     timPhase === 'pauseTop' ? 0 : 90)}%` }}
                ></div>
              </div>
              
              <div className="text-2xl font-medium mb-8 px-6 py-3 rounded-xl bg-indigo-50 text-indigo-800 shadow-md">
                {timPhase === 'descent' ? 'DESCENTE' : 
                 timPhase === 'pauseBottom' ? 'PAUSE BAS' : 
                 timPhase === 'ascent' ? 'MONTÉE' : 
                 timPhase === 'pauseTop' ? 'PAUSE HAUT' : 
                 'REPOS'}
              </div>
              
              <div className="flex gap-4 w-full">
                <button 
                  className="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-4 rounded-xl shadow-md hover:shadow-lg flex items-center justify-center"
                  onClick={stopTimer}
                >
                  Terminer
                </button>
                
                <button 
                  className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white py-4 rounded-xl shadow-md hover:shadow-lg flex items-center justify-center"
                  onClick={() => {
                    const repMax = parseInt(selExercise.reps ? selExercise.reps.split('-')[1] : 10);
                    const setMax = selExercise.sets || 3;
                    
                    if (curRepCount < repMax) {
                      setCurRepCount(curRepCount + 1);
                      setTimPhase('descent');
                      setTimSeconds(3);
                    } else if (curSetCount < setMax) {
                      setCurSetCount(curSetCount + 1);
                      setCurRepCount(1);
                      setTimPhase('rest');
                      setTimSeconds(90);
                    } else {
                      stopTimer();
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