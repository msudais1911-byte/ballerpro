export type OnboardingStep = 
  | 'loading'
  | 'landing' 
  | 'name'
  | 'gender' 
  | 'birthday'
  | 'heightWeight'
  | 'position'
  | 'club'
  | 'teamTraining'
  | 'schedule'
  | 'referral' 
  | 'experience' 
  | 'graph' 
  | 'trust'
  | 'holdingBack'
  | 'improveMost'
  | 'goalDeadline'
  | 'benefitStatement'
  | 'potentialGraph'
  | 'trainingSetup'
  | 'activityLevel'
  | 'weightGoal'
  | 'nutrition'
  | 'accomplish'
  | 'fixPace'
  | 'twiceFast'
  | 'referralCode'
  | 'connectWatch'
  | 'testimonials'
  | 'generating'
  | 'planReady'
  | 'planResults'
  | 'trialIntro'
  | 'trialTimeline'
  | 'paywall'
  | 'dashboard'
  | 'aiCoach'
  | 'workoutDetail'
  | 'workoutPlayback'
  | 'workoutFeedback'
  | 'workoutHistory'
  | 'matchAdd'
  | 'matchChecklist';

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  rest: number;
  completedSets: number;
}

export interface Workout {
  id: string;
  name: string;
  type: string;
  duration: string;
  rpe: number;
  focus: string;
  exercises: Exercise[];
}

export interface Match {
  id: string;
  opponent: string;
  date: string;
  time: string;
  location?: string;
  type: 'League' | 'Cup' | 'Friendly';
  side: 'Home' | 'Away';
}

export interface ChecklistItem {
  id: string;
  label: string;
  sublabel?: string;
  completed: boolean;
  category: 'Equipment' | 'Nutrition' | 'Mental' | 'Physical' | 'Tactical';
}

export const INITIAL_CHECKLIST: ChecklistItem[] = [
  { id: '1', label: 'Check boots', sublabel: 'Ensure boots are clean and in good condition', completed: false, category: 'Equipment' },
  { id: '2', label: 'Pack match kit', sublabel: 'Jersey, shorts, socks, shin guards', completed: false, category: 'Equipment' },
  { id: '3', label: 'Pack water bottle', sublabel: 'Bring filled water bottle', completed: false, category: 'Equipment' },
  { id: '4', label: 'Pre-match meal', sublabel: 'Eat light meal 2-3 hours before match', completed: false, category: 'Nutrition' },
  { id: '5', label: 'Review match plan', sublabel: 'Go over tactical instructions', completed: false, category: 'Mental' },
  { id: '6', label: 'Visualize performance', sublabel: 'Mental rehearsal of key moments', completed: false, category: 'Mental' },
];

export const DUMMY_WORKOUT: Workout = {
  id: 'w1',
  name: 'Strength - Monday',
  type: 'STRENGTH',
  duration: '60 min',
  rpe: 7,
  focus: 'strength',
  exercises: [
    { id: 'e1', name: 'Barbell Back Squat', sets: 4, reps: 6, rest: 120, completedSets: 0 },
    { id: 'e2', name: 'Deadlift', sets: 4, reps: 3, rest: 120, completedSets: 0 },
    { id: 'e3', name: 'Bench Press', sets: 4, reps: 6, rest: 120, completedSets: 0 },
    { id: 'e4', name: 'Dumbbell Rows', sets: 3, reps: 8, rest: 120, completedSets: 0 },
  ]
};
