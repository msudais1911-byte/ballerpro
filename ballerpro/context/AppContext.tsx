import React, { createContext, useState, useCallback } from 'react';
import type { OnboardingStep, Workout, Match, ChecklistItem } from '../types';

interface AppContextType {
  // Onboarding state
  currentStep: OnboardingStep;
  setCurrentStep: (step: OnboardingStep) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  
  // User data
  userData: {
    name: string;
    gender: string;
    birthday: string;
    height: string;
    weight: string;
    position: string;
    club: string;
  };
  setUserData: (data: Partial<AppContextType['userData']>) => void;
  
  // Workout data
  currentWorkout: Workout | null;
  setCurrentWorkout: (workout: Workout) => void;
  
  // Match data
  matches: Match[];
  addMatch: (match: Match) => void;
  removeMatch: (matchId: string) => void;
  
  // Checklist data
  checklist: ChecklistItem[];
  toggleChecklistItem: (itemId: string) => void;
  
  // Auth state
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

const STEP_ORDER: OnboardingStep[] = [
  'loading', 'landing', 'name', 'gender', 'birthday', 'heightWeight', 'position',
  'club', 'teamTraining', 'schedule', 'referral', 'experience', 'graph', 'trust',
  'holdingBack', 'improveMost', 'goalDeadline', 'benefitStatement', 'potentialGraph',
  'trainingSetup', 'activityLevel', 'weightGoal', 'nutrition', 'accomplish', 'fixPace',
  'twiceFast', 'referralCode', 'connectWatch', 'testimonials', 'generating', 'planReady',
  'planResults', 'trialIntro', 'trialTimeline', 'paywall', 'dashboard'
];

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('loading');
  const [userData, setUserDataState] = useState({
    name: '',
    gender: '',
    birthday: '',
    height: '',
    weight: '',
    position: '',
    club: '',
  });
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const setUserData = useCallback((data: Partial<typeof userData>) => {
    setUserDataState(prev => ({ ...prev, ...data }));
  }, []);
  
  const goToNextStep = useCallback(() => {
    const currentIndex = STEP_ORDER.indexOf(currentStep);
    if (currentIndex < STEP_ORDER.length - 1) {
      setCurrentStep(STEP_ORDER[currentIndex + 1]);
    }
  }, [currentStep]);
  
  const goToPreviousStep = useCallback(() => {
    const currentIndex = STEP_ORDER.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(STEP_ORDER[currentIndex - 1]);
    }
  }, [currentStep]);
  
  const addMatch = useCallback((match: Match) => {
    setMatches(prev => [...prev, match]);
  }, []);
  
  const removeMatch = useCallback((matchId: string) => {
    setMatches(prev => prev.filter(m => m.id !== matchId));
  }, []);
  
  const toggleChecklistItem = useCallback((itemId: string) => {
    setChecklist(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    );
  }, []);
  
  const value: AppContextType = {
    currentStep,
    setCurrentStep,
    goToNextStep,
    goToPreviousStep,
    userData,
    setUserData,
    currentWorkout,
    setCurrentWorkout,
    matches,
    addMatch,
    removeMatch,
    checklist,
    toggleChecklistItem,
    isAuthenticated,
    setIsAuthenticated,
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
