export const PILLAR_ACTIONS = {
  breathing: {
    action: "Nose Breathing",
    description: "Practiced 2 minutes of focused nose-only breathing.",
    icon: "air",
  },
  sleep: {
    action: "Digital Sunset",
    description: "Avoided all screens for 30 minutes before bed.",
    icon: "bedtime",
  },
  hydration: {
    action: "Morning Hydration",
    description: "Drank 500ml of water immediately upon waking.",
    icon: "water-drop",
  },
  nutrition: {
    action: "Protein First",
    description: "Included a quality protein source with breakfast.",
    icon: "restaurant",
  },
  movement: {
    action: "Daily 10",
    description: "Completed a brisk 10-minute walk or movement session.",
    icon: "directions-run",
  },
  environment: {
    action: "Light Exposure",
    description: "Spent 15 minutes outdoors in natural sunlight.",
    icon: "park",
  },
  mindfulness: {
    action: "Daily Gratitude",
    description: "Wrote down 3 things I am genuinely grateful for.",
    icon: "psychology",
  },
};

export const WORKOUTS = [
  {
    id: "1",
    title: "Morning Kickstart",
    duration: 10,
    level: "Beginner",
    type: "Bodyweight",
    image: "https://picsum.photos/400/300?random=1",
    category: "Cardio",
  },
  {
    id: "2",
    title: "Lunch Break Burn",
    duration: 15,
    level: "Intermediate",
    type: "Bodyweight",
    image: "https://picsum.photos/400/300?random=2",
    category: "Strength",
  },
  {
    id: "3",
    title: "Evening Unwind",
    duration: 20,
    level: "Beginner",
    type: "Mobility",
    image: "https://picsum.photos/400/300?random=3",
    category: "Mobility",
  },
];

export const PILLARS = [
  {
    name: "Breathing",
    id: "breathing",
    score: 3,
    target: 10,
    icon: "air",
    status: "Needs Focus",
  },
  {
    name: "Sleep",
    id: "sleep",
    score: 4,
    target: 10,
    icon: "bedtime",
    status: "Needs Focus",
  },
  {
    name: "Hydration",
    id: "hydration",
    score: 5,
    target: 10,
    icon: "water-drop",
    status: "Needs Focus",
  },
  {
    name: "Nutrition",
    id: "nutrition",
    score: 8,
    target: 10,
    icon: "restaurant",
    status: "On Track",
  },
  {
    name: "Movement",
    id: "movement",
    score: 6,
    target: 10,
    icon: "directions-run",
    status: "On Track",
  },
  {
    name: "Environment",
    id: "environment",
    score: 8,
    target: 10,
    icon: "park",
    status: "On Track",
  },
  {
    name: "Mindfulness",
    id: "mindfulness",
    score: 7,
    target: 10,
    icon: "psychology",
    status: "Going Strong",
  },
];

export const FAVORITE_MEALS = [
  {
    name: "Oatmeal & Berries",
    kcal: 350,
    image: "https://picsum.photos/200/200?random=10",
  },
  {
    name: "Chicken Salad",
    kcal: 420,
    image: "https://picsum.photos/200/200?random=11",
  },
];

// 30-Day Pillar Challenges
export const THIRTY_DAY_CHALLENGES = {
  breathing: {
    name: "Breathing",
    icon: "air",
    tasks: [
      {
        id: "morning_breath",
        name: "Morning Breath Check",
        description: "Take 5 deep belly breaths upon waking",
        unlockedDay: 1,
      },
      {
        id: "stress_reset",
        name: "Stress Reset",
        description:
          "4-7-8 breathing when stressed (inhale 4s, hold 7s, exhale 8s)",
        unlockedDay: 8,
      },
      {
        id: "box_breathing",
        name: "Box Breathing Break",
        description:
          "5-minute box breathing during lunch (4s inhale, 4s hold, 4s exhale, 4s hold)",
        unlockedDay: 15,
      },
      {
        id: "evening_wind",
        name: "Evening Wind-Down",
        description: "10 slow breaths before bed, extending exhale",
        unlockedDay: 22,
      },
    ],
  },
  sleep: {
    name: "Sleep",
    icon: "bedtime",
    tasks: [
      {
        id: "consistent_wake",
        name: "Consistent Wake Time",
        description: "Wake up at the same time every day (within 30 min)",
        unlockedDay: 1,
      },
      {
        id: "screen_curfew",
        name: "Screen Curfew",
        description: "No screens 30 minutes before bed",
        unlockedDay: 8,
      },
      {
        id: "cool_dark",
        name: "Cool & Dark",
        description: "Bedroom temp below 68°F, blackout conditions",
        unlockedDay: 15,
      },
      {
        id: "wind_down_ritual",
        name: "Wind-Down Ritual",
        description:
          "15-min relaxation routine (reading, stretching, journaling)",
        unlockedDay: 22,
      },
    ],
  },
  hydration: {
    name: "Hydration",
    icon: "water-drop",
    tasks: [
      {
        id: "morning_hydration",
        name: "Morning Hydration",
        description: "Drink 16oz water within 30 min of waking",
        unlockedDay: 1,
      },
      {
        id: "water_tracking",
        name: "Water Tracking",
        description: "Log and drink at least 64oz total daily",
        unlockedDay: 8,
      },
      {
        id: "electrolyte_balance",
        name: "Electrolyte Balance",
        description: "Add electrolytes or mineral-rich water once daily",
        unlockedDay: 15,
      },
      {
        id: "pre_meal_hydration",
        name: "Pre-Meal Hydration",
        description: "Drink 8oz water 15 min before each meal",
        unlockedDay: 22,
      },
    ],
  },
  nutrition: {
    name: "Nutrition",
    icon: "restaurant",
    tasks: [
      {
        id: "protein_first",
        name: "Protein First",
        description: "Eat protein within 1 hour of waking",
        unlockedDay: 1,
      },
      {
        id: "eat_rainbow",
        name: "Eat the Rainbow",
        description: "Include 3+ colors of vegetables daily",
        unlockedDay: 8,
      },
      {
        id: "mindful_eating",
        name: "Mindful Eating",
        description: "No screens during at least one meal, chew thoroughly",
        unlockedDay: 15,
      },
      {
        id: "fiber_focus",
        name: "Fiber Focus",
        description: "Aim for 25-30g fiber (track one day per week)",
        unlockedDay: 22,
      },
    ],
  },
  movement: {
    name: "Movement",
    icon: "directions-run",
    tasks: [
      {
        id: "daily_walk",
        name: "Daily Walk",
        description:
          "Walk for at least 10 minutes outdoors (15 min Week 2, 20 min Week 3+)",
        unlockedDay: 1,
      },
      {
        id: "movement_snacks",
        name: "Movement Snacks",
        description:
          "3 micro-movements throughout the day (squats, stretches, stairs)",
        unlockedDay: 8,
      },
      {
        id: "strength_session",
        name: "Strength Session",
        description: "2x per week bodyweight or resistance training (15+ min)",
        unlockedDay: 15,
      },
      {
        id: "mobility_work",
        name: "Mobility Work",
        description: "5-10 min daily stretching or yoga",
        unlockedDay: 22,
      },
    ],
  },
  environment: {
    name: "Environment",
    icon: "park",
    tasks: [
      {
        id: "morning_light",
        name: "Morning Light",
        description: "Get 10 min of natural sunlight within 1 hour of waking",
        unlockedDay: 1,
      },
      {
        id: "declutter_zone",
        name: "Declutter Zone",
        description: "Spend 5 min tidying one area of your space",
        unlockedDay: 8,
      },
      {
        id: "nature_time",
        name: "Nature Time",
        description: "Spend 20+ minutes in nature (park, garden, trail)",
        unlockedDay: 15,
      },
      {
        id: "digital_detox",
        name: "Digital Detox",
        description: "1 hour phone-free time in the evening",
        unlockedDay: 22,
      },
    ],
  },
  mindfulness: {
    name: "Mindfulness",
    icon: "psychology",
    tasks: [
      {
        id: "gratitude_moment",
        name: "Gratitude Moment",
        description: "Write or think of 3 things you're grateful for",
        unlockedDay: 1,
      },
      {
        id: "mindful_minute",
        name: "Mindful Minute",
        description:
          "1-5 minutes of present-moment awareness (Week 2: 1 min, Week 3+: 5 min)",
        unlockedDay: 8,
      },
      {
        id: "reflection_check",
        name: "Reflection Check",
        description: "End-of-day reflection: What went well? What to improve?",
        unlockedDay: 15,
      },
      {
        id: "intention_setting",
        name: "Intention Setting",
        description: "Set one clear intention each morning",
        unlockedDay: 22,
      },
    ],
  },
};

// Helper function to get current week from day
export const getWeekFromDay = (day) => {
  if (day <= 7) return 1;
  if (day <= 14) return 2;
  if (day <= 21) return 3;
  return 4;
};

// Helper function to get available tasks for a given day
export const getAvailableTasks = (pillarId, currentDay) => {
  const challenge = THIRTY_DAY_CHALLENGES[pillarId];
  if (!challenge) return [];
  return challenge.tasks.filter((task) => task.unlockedDay <= currentDay);
};

// Book Content - "Burnt Out and Ready to Feel Great" by Al Cummings
export const BOOK_CHAPTERS = [
  {
    id: "intro",
    title: "Introduction",
    subtitle: "Why Wellness Matters for Busy Professionals",
    icon: "menu-book",
    readTime: 5,
    sections: [
      {
        heading: "The Burnout Epidemic",
        content:
          "You're exhausted. Not just tired—deeply, fundamentally depleted. You've tried everything: more coffee, productivity hacks, weekend catch-up sleep. Nothing sticks. Welcome to burnout, the silent epidemic affecting millions of busy professionals and parents.\n\nBut here's what nobody tells you: burnout isn't about working too hard. It's about neglecting the fundamental pillars that keep your body and mind functioning optimally. This book will show you a different path.",
      },
      {
        heading: "The 7 Pillars Philosophy",
        content:
          "After years of coaching busy professionals, I discovered that sustainable energy and vitality come down to seven interconnected pillars: Breathing, Sleep, Hydration, Nutrition, Movement, Environment, and Mindfulness.\n\nNeglect one, and the others suffer. Master all seven, and you'll experience a transformation that no amount of coffee or willpower could ever provide. The best part? Each pillar requires just minutes a day to maintain.",
      },
      {
        heading: "How to Use This Book",
        content:
          "Each chapter focuses on one pillar, giving you the science behind why it matters and practical actions you can implement today. Don't try to change everything at once. Start with the pillar that resonates most, master it, then move to the next.\n\nThis isn't about perfection—it's about progress. Small, consistent improvements compound into remarkable transformations.",
      },
    ],
  },
  {
    id: "breathing",
    title: "Breathing",
    subtitle: "The Forgotten Foundation",
    icon: "air",
    readTime: 8,
    sections: [
      {
        heading: "Why Breathing Matters",
        content:
          "You take approximately 20,000 breaths per day. Most of them are unconscious, shallow, and working against you. Poor breathing patterns trigger your stress response, reduce oxygen delivery, and keep you in a constant state of low-grade anxiety.\n\nThe good news? Breathing is the one autonomic function you can consciously control. Master your breath, and you gain a powerful tool for managing stress, energy, and focus.",
      },
      {
        heading: "The Science of Breath",
        content:
          "When you breathe through your nose, air is filtered, humidified, and warmed. Nasal breathing produces nitric oxide, which improves oxygen absorption by 15-20%. Mouth breathing, by contrast, activates your sympathetic nervous system—the fight-or-flight response.\n\nDeep diaphragmatic breathing stimulates the vagus nerve, triggering your parasympathetic response. This lowers cortisol, reduces heart rate, and shifts you into a calm, focused state.",
      },
      {
        heading: "Practical Techniques",
        content:
          "Start with nose breathing awareness. Simply notice when you're breathing through your mouth and gently shift to nasal breathing. This alone can transform your baseline stress levels.\n\nFor acute stress, try 4-7-8 breathing: Inhale for 4 counts, hold for 7, exhale for 8. This activates your relaxation response within 60 seconds.\n\nBox breathing (4-4-4-4) is perfect for focus: inhale 4 counts, hold 4, exhale 4, hold 4. Navy SEALs use this technique before high-stakes operations.",
      },
      {
        heading: "Your Daily Practice",
        content:
          "Morning: 5 deep belly breaths before getting out of bed. This sets a calm tone for the day.\n\nMidday: When you feel stressed, pause for 3 cycles of 4-7-8 breathing.\n\nEvening: 10 slow breaths before sleep, extending your exhale longer than your inhale.\n\nThese small practices, totaling less than 5 minutes daily, will fundamentally shift your nervous system regulation.",
      },
    ],
  },
  {
    id: "sleep",
    title: "Sleep",
    subtitle: "Your Recovery Superpower",
    icon: "bedtime",
    readTime: 10,
    sections: [
      {
        heading: "Sleep Debt is Real",
        content:
          "Every hour of sleep you miss accumulates as 'sleep debt.' And unlike financial debt, you can't easily pay it back with a weekend sleep-in. Chronic sleep deprivation impairs cognitive function equivalent to being legally drunk, weakens your immune system, and accelerates aging.\n\nYet sleep is often the first thing busy professionals sacrifice. This is backwards—quality sleep is the force multiplier that makes everything else more effective.",
      },
      {
        heading: "The Architecture of Sleep",
        content:
          "Sleep isn't passive unconsciousness. Your brain cycles through distinct stages: light sleep, deep sleep, and REM. Deep sleep handles physical recovery—tissue repair, immune function, hormone regulation. REM sleep processes emotions and consolidates memories.\n\nDisrupt these cycles with alcohol, screens, or irregular schedules, and you miss critical recovery even if you're 'sleeping' for eight hours.",
      },
      {
        heading: "The Sleep Environment",
        content:
          "Your bedroom should be a sleep sanctuary. Temperature matters: 65-68°F is optimal for most people. Darkness signals melatonin production—invest in blackout curtains or a sleep mask.\n\nRemove screens from your bedroom. The blue light suppresses melatonin, but more importantly, the bedroom should be psychologically associated only with sleep and intimacy.",
      },
      {
        heading: "Building Better Sleep Habits",
        content:
          "Consistency trumps duration. Waking at the same time every day (including weekends) regulates your circadian rhythm more effectively than any supplement.\n\nCreate a wind-down ritual: 30-60 minutes before bed, dim lights, avoid screens, and engage in relaxing activities like reading, stretching, or journaling.\n\nLimit caffeine after 2pm and alcohol close to bedtime. Both disrupt sleep architecture even if you fall asleep easily.",
      },
    ],
  },
  {
    id: "hydration",
    title: "Hydration",
    subtitle: "Fuel Your Engine",
    icon: "water-drop",
    readTime: 6,
    sections: [
      {
        heading: "The Dehydration Trap",
        content:
          "By the time you feel thirsty, you're already 1-2% dehydrated—enough to impair cognitive function, mood, and energy. Most people walk around chronically dehydrated, attributing the symptoms (fatigue, brain fog, headaches) to other causes.\n\nYour body is roughly 60% water. Every cellular process depends on adequate hydration. This is the simplest pillar to fix, yet one of the most commonly neglected.",
      },
      {
        heading: "Quality Matters",
        content:
          "Not all water is created equal. Tap water quality varies dramatically by location. Consider a quality filter if your local water is heavily chlorinated or contains contaminants.\n\nElectrolytes—sodium, potassium, magnesium—are essential for water absorption and cellular function. Plain water without minerals can actually flush electrolytes from your system. A pinch of sea salt or a quality electrolyte supplement makes hydration more effective.",
      },
      {
        heading: "Strategic Hydration",
        content:
          "Front-load your hydration. Drink 16-20oz of water within 30 minutes of waking. You've been fasting from fluids for 6-8 hours—your body needs replenishment.\n\nDrink water 15-20 minutes before meals, not during. Large amounts of liquid with food can dilute digestive enzymes.\n\nMatch your intake to your activity level. Exercise, heat, and stress all increase water needs. If your urine is dark yellow, you need more water.",
      },
      {
        heading: "Daily Hydration Protocol",
        content:
          "Aim for half your body weight in ounces as a baseline (150 lbs = 75oz). Adjust up for exercise and heat.\n\nSet phone reminders if needed. Keep a water bottle visible at all times. Track your intake for one week to establish awareness.\n\nNotice how you feel when properly hydrated: more energy, clearer thinking, better mood. Let these benefits motivate consistency.",
      },
    ],
  },
  {
    id: "nutrition",
    title: "Nutrition",
    subtitle: "Eat for Energy",
    icon: "restaurant",
    readTime: 12,
    sections: [
      {
        heading: "Beyond Calories",
        content:
          "Nutrition isn't just about weight—it's about energy, mental clarity, and disease prevention. The food you eat literally becomes your body's building blocks. Eat processed junk, and you're building a body from inferior materials.\n\nForget complicated diets. Focus on real, whole foods that your great-grandmother would recognize. The closer food is to its natural state, the more nutrients it retains.",
      },
      {
        heading: "Protein: The Priority",
        content:
          "Protein is essential for muscle maintenance, hormone production, and satiety. Most people under-eat protein, especially at breakfast.\n\nAim for 0.7-1g per pound of body weight daily, spread across meals. Prioritize protein at breakfast—it stabilizes blood sugar and reduces cravings throughout the day.\n\nQuality sources: eggs, fish, poultry, lean meats, legumes, Greek yogurt. For plant-based eaters, combine sources to get complete amino acid profiles.",
      },
      {
        heading: "The Rainbow Approach",
        content:
          "Different colored vegetables contain different phytonutrients. Eating a variety of colors ensures a broad spectrum of antioxidants, vitamins, and minerals.\n\nAim for 3+ colors at each meal. Greens (spinach, broccoli), reds (tomatoes, peppers), oranges (carrots, sweet potatoes), purples (beets, eggplant). Each color fights different forms of cellular damage.",
      },
      {
        heading: "Practical Nutrition Strategies",
        content:
          "Meal prep reduces decision fatigue. Spend 1-2 hours on Sunday preparing proteins and vegetables for the week.\n\nRead labels. If you can't pronounce the ingredients, reconsider eating it. Added sugars hide under 50+ different names.\n\nEat mindfully. No screens during meals. Chew thoroughly. Notice hunger and fullness cues. This simple practice improves digestion and naturally regulates intake.",
      },
    ],
  },
  {
    id: "movement",
    title: "Movement",
    subtitle: "Built to Move",
    icon: "directions-run",
    readTime: 9,
    sections: [
      {
        heading: "The Sitting Disease",
        content:
          "Humans evolved to move—walking miles daily, squatting, climbing, carrying. Modern life has us sitting for 10+ hours a day. This sedentary existence is linked to heart disease, diabetes, depression, and early death, even if you exercise regularly.\n\nThe solution isn't just gym sessions—it's integrating movement throughout your day. Your body craves variety and frequent motion.",
      },
      {
        heading: "Exercise vs. Movement",
        content:
          "Exercise is structured physical activity. Movement is everything else—walking, taking stairs, standing, stretching. Both matter, but daily movement may matter more.\n\n10,000 steps isn't a magic number, but it represents the general activity level our bodies expect. Track your steps for a week. Most desk workers are shocked to find they barely hit 3,000.",
      },
      {
        heading: "The Minimum Effective Dose",
        content:
          "You don't need hour-long gym sessions. Research shows significant benefits from just 20-30 minutes of moderate activity daily. A brisk walk counts. So does playing with your kids or gardening.\n\nFor strength, 2-3 sessions per week of 20-30 minutes maintains muscle mass and bone density. Bodyweight exercises—push-ups, squats, lunges—require no equipment and can be done anywhere.",
      },
      {
        heading: "Movement Snacks",
        content:
          "Break up sitting with 'movement snacks'—brief bouts of activity throughout the day. Every 30-60 minutes, stand up, stretch, walk for 2 minutes.\n\nSet a timer. Do 10 squats every hour. Take walking meetings. Park far from entrances. Use a standing desk part of the day.\n\nThese micro-movements add up. They also reset your posture, improve circulation, and boost mental clarity.",
      },
    ],
  },
  {
    id: "environment",
    title: "Environment",
    subtitle: "Design Your Space",
    icon: "park",
    readTime: 7,
    sections: [
      {
        heading: "Your Environment Shapes You",
        content:
          "You are a product of your environment more than you realize. The spaces you inhabit influence your mood, focus, stress levels, and behavior. A cluttered, dark, noisy environment works against you. A clean, bright, natural space supports you.\n\nInstead of relying on willpower, design your environment to make healthy choices easy and unhealthy choices hard.",
      },
      {
        heading: "Light: The Master Regulator",
        content:
          "Natural light regulates your circadian rhythm, affecting sleep, mood, and energy. Morning light exposure is particularly important—it signals your brain to be alert and sets your internal clock.\n\nGet outside within an hour of waking for 10-15 minutes. If that's impossible, sit by a window or use a light therapy lamp. In the evening, dim artificial lights to prepare for sleep.",
      },
      {
        heading: "Nature Deficit Disorder",
        content:
          "Humans evolved in nature, not offices. Studies show that time in natural environments reduces stress hormones, lowers blood pressure, and improves mood and creativity.\n\nEven brief nature exposure helps. A 20-minute walk in a park. Lunch outside. Plants in your workspace. Views of greenery from your window. These aren't luxuries—they're requirements for optimal function.",
      },
      {
        heading: "Environmental Design",
        content:
          "Audit your spaces. Is your bedroom optimized for sleep (cool, dark, quiet)? Is your workspace organized and distraction-free? Is healthy food visible and accessible?\n\nRemove friction from good choices. Put your workout clothes out the night before. Keep water bottles filled and visible. Place fruit on the counter, not cookies.\n\nAdd friction to bad choices. Delete social media apps. Keep junk food out of the house. Charge your phone outside the bedroom.",
      },
    ],
  },
  {
    id: "mindfulness",
    title: "Mindfulness",
    subtitle: "Master Your Mind",
    icon: "psychology",
    readTime: 8,
    sections: [
      {
        heading: "The Busy Mind",
        content:
          "Your mind generates 60,000+ thoughts daily. Most are repetitive, negative, and about the past or future. This constant mental chatter drains energy, creates anxiety, and prevents you from fully experiencing life.\n\nMindfulness isn't about stopping thoughts—it's about changing your relationship with them. It's the practice of present-moment awareness without judgment.",
      },
      {
        heading: "The Science of Mindfulness",
        content:
          "Meditation physically changes your brain. Regular practice increases gray matter in areas responsible for emotional regulation, focus, and self-awareness. It decreases activity in the amygdala, your brain's fear center.\n\nStudies show mindfulness reduces stress, anxiety, and depression while improving immune function, sleep quality, and cognitive performance. These aren't placebo effects—they're measurable physiological changes.",
      },
      {
        heading: "Starting Simple",
        content:
          "You don't need to sit in lotus position for an hour. Start with one minute. Seriously—one minute of focused breathing, noticing thoughts without following them.\n\nThe goal isn't to clear your mind. It's to notice when your mind wanders and gently return to the present. This mental rep—wandering and returning—is the exercise that builds the skill.",
      },
      {
        heading: "Daily Mindfulness Practices",
        content:
          "Gratitude: Each morning, think of 3 specific things you're grateful for. This rewires your brain to notice positives instead of negatives.\n\nPresent moments: Choose one daily activity to do with full attention—drinking coffee, showering, walking. Notice sensations without multitasking.\n\nEvening reflection: Before sleep, review your day. What went well? What would you do differently? This conscious processing improves sleep and decision-making.",
      },
    ],
  },
  {
    id: "conclusion",
    title: "Putting It Together",
    subtitle: "Your 30-Day Transformation",
    icon: "emoji-events",
    readTime: 5,
    sections: [
      {
        heading: "The Compound Effect",
        content:
          "Each pillar reinforces the others. Better sleep improves your food choices. Proper hydration enhances your workouts. Mindfulness reduces stress, improving sleep. Movement boosts mood, making mindfulness easier.\n\nWhen you address all seven pillars, you don't get 7x improvement—you get exponential results. The whole becomes far greater than the sum of its parts.",
      },
      {
        heading: "Start Where You Are",
        content:
          "Don't try to perfect all seven pillars at once. That's a recipe for overwhelm and failure. Instead, identify your weakest pillar—the one causing the most problems—and focus there first.\n\nMaster one pillar for 2-3 weeks until it becomes automatic, then add the next. This progressive approach builds sustainable habits rather than temporary motivation.",
      },
      {
        heading: "The 30-Day Challenge",
        content:
          "Use the 30-Day Challenges in this app to systematically improve each pillar. Week 1 introduces one simple habit. Each subsequent week adds complexity as the foundation solidifies.\n\nBy day 30, you'll have integrated 4 habits per pillar that work together synergistically. Complete all seven challenges, and you'll have transformed every aspect of your health.",
      },
      {
        heading: "Your New Life Awaits",
        content:
          "Imagine waking up energized without an alarm. Moving through your day with sustained focus and calm energy. Handling stress without falling apart. Sleeping deeply and waking refreshed.\n\nThis isn't a fantasy—it's the natural result of honoring your body's fundamental needs. The 7 Pillars aren't complicated. They don't require expensive supplements or extreme measures. They just require consistency.\n\nYou've been running on empty for too long. It's time to fill your tank. Start today. Your future self will thank you.",
      },
    ],
  },
];

// Screen names for navigation
export const SCREENS = {
  WELCOME: "WELCOME",
  INTAKE_PERSONAL: "INTAKE_PERSONAL",
  INTAKE_DEMOGRAPHICS: "INTAKE_DEMOGRAPHICS",
  INTAKE_GOALS: "INTAKE_GOALS",
  INTAKE_MOVEMENT: "INTAKE_MOVEMENT",
  INTAKE_NUTRITION: "INTAKE_NUTRITION",
  INTAKE_BREATHING_SLEEP: "INTAKE_BREATHING_SLEEP",
  INTAKE_MINDFULNESS: "INTAKE_MINDFULNESS",
  INTAKE_RISK: "INTAKE_RISK",
  SAFETY_NOTICE: "SAFETY_NOTICE",
  DASHBOARD: "DASHBOARD",
  WORKOUT_LIST: "WORKOUT_LIST",
  WORKOUT_DETAIL: "WORKOUT_DETAIL",
  NUTRITION_LOG: "NUTRITION_LOG",
  NUTRITION_SUMMARY: "NUTRITION_SUMMARY",
  PROGRESS_SUMMARY: "PROGRESS_SUMMARY",
  PILLARS_OVERVIEW: "PILLARS_OVERVIEW",
  SETTINGS: "SETTINGS",
  CHALLENGE_PROGRESS: "CHALLENGE_PROGRESS",
  CHALLENGE_DETAIL: "CHALLENGE_DETAIL",
};
