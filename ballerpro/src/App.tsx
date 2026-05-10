import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, ArrowRight, ChevronDown, Clock, Instagram, Facebook, Youtube, 
  MessageCircle, MoreHorizontal, Info, User, Shield, Lock, Trophy, Target, 
  Dumbbell, CircleCheck, Check, Bell, Calendar, Home, Star, AlertCircle,
  Droplets, Scan, ChevronRight, Search, Heart, Moon, MessageSquare, Share2,
  CheckSquare, Edit3, Box, Lightbulb, Activity, Watch, ShoppingBag, Gift,
  HelpCircle, Zap, Users, Settings, Utensils, LayoutGrid, Sparkles, Plus, 
  AlertTriangle, Filter, Edit2, Copy, Trash2, LogOut, CheckCircle2
} from 'lucide-react';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import type { ReactNode } from 'react';

// --- Types ---
type OnboardingStep = 
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

// --- Types ---
interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  rest: number;
  completedSets: number;
}

interface Workout {
  id: string;
  name: string;
  type: string;
  duration: string;
  rpe: number;
  focus: string;
  exercises: Exercise[];
}

interface Match {
  id: string;
  opponent: string;
  date: string;
  time: string;
  location?: string;
  type: 'League' | 'Cup' | 'Friendly';
  side: 'Home' | 'Away';
}

interface ChecklistItem {
  id: string;
  label: string;
  sublabel?: string;
  completed: boolean;
  category: 'Equipment' | 'Nutrition' | 'Mental' | 'Physical' | 'Tactical';
}

const INITIAL_CHECKLIST: ChecklistItem[] = [
  { id: '1', label: 'Check boots', sublabel: 'Ensure boots are clean and in good condition', completed: false, category: 'Equipment' },
  { id: '2', label: 'Pack match kit', sublabel: 'Jersey, shorts, socks, shin guards', completed: false, category: 'Equipment' },
  { id: '3', label: 'Pack water bottle', sublabel: 'Bring filled water bottle', completed: false, category: 'Equipment' },
  { id: '4', label: 'Pre-match meal', sublabel: 'Eat light meal 2-3 hours before match', completed: false, category: 'Nutrition' },
  { id: '5', label: 'Review match plan', sublabel: 'Go over tactical instructions', completed: false, category: 'Mental' },
  { id: '6', label: 'Visualize performance', sublabel: 'Mental rehearsal of key moments', completed: false, category: 'Mental' },
];

const DUMMY_POSTS = [
  { id: 'p1', author: 'Anonymous', time: 'Yesterday', text: 'test', stats: { load: '0 AU', recovery: '0%', sleep: '0' } },
  { id: 'p2', author: 'Anonymous', time: 'Yesterday', text: 'Another workout done!', stats: { load: '120 AU', recovery: '85%', sleep: '8' } },
];

const DUMMY_WORKOUT: Workout = {
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

// --- Utils ---
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

// --- Components ---
const ProjectBallerLogo = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={cn("text-white", className)} fill="currentColor">
    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="4" />
    <symbol id="player" viewBox="0 0 100 100">
      <path d="M48 38 C52 35, 55 35, 58 38 L65 42 L75 38 L78 41 L68 51 L62 51 L58 58 L65 73 L60 75 L53 61 L45 65 L38 78 L33 75 L42 58 L40 53 L48 38 Z" />
      <circle cx="30" cy="44" r="6" />
    </symbol>
    <use href="#player" />
  </svg>
);

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex-1 bg-[#0D121D] flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <div className="w-32 h-32 mb-8 relative">
          <ProjectBallerLogo className="w-full h-full" />
          <div className="absolute -inset-4 bg-white/5 rounded-full -z-10 blur-xl" />
        </div>
        <h1 className="text-4xl font-black text-white tracking-tight mb-12">ProjectBaller</h1>
        
        {/* Spinner */}
        <div className="relative w-12 h-12">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-full h-full rounded-full border-2 border-red-500/20 border-t-red-500"
          />
        </div>
      </motion.div>
    </div>
  );
};
const NameView = ({ onComplete }: { onComplete: (name: string) => void }) => {
  const [name, setName] = useState('');

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 p-8">
        <h2 className="text-[28px] font-bold leading-tight mb-2 text-white font-sans">
          What should we call you?
        </h2>
        <p className="text-gray-400 text-sm mb-12 font-medium">
          This will be used to personalise your experience.
        </p>

        <div className="relative group">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none transition-colors group-focus-within:text-white text-gray-500">
            <User className="w-5 h-5" />
          </div>
          <input
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Muhammad"
            className="w-full bg-[#121826] border border-white/5 p-6 pl-16 rounded-[1.5rem] text-lg font-bold text-white transition-all focus:border-[#E53E3E] focus:outline-none placeholder:text-gray-700"
          />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-1 bg-[#E53E3E] rounded-full scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-center" />
        </div>
      </div>
      <div className="p-8 pt-0">
        <Button disabled={!name} onClick={() => onComplete(name)} className="w-full">
          Continue <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

const WheelPicker = ({ 
  items, 
  onSelect, 
  selectedItem,
  unit = "" 
}: { 
  items: (string | number)[], 
  onSelect: (item: any) => void, 
  selectedItem: any,
  unit?: string
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const index = items.indexOf(selectedItem);
    if (scrollRef.current && index !== -1) {
      scrollRef.current.scrollTop = index * 48;
    }
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const index = Math.round(scrollRef.current.scrollTop / 48);
      if (items[index] !== undefined && items[index] !== selectedItem) {
        onSelect(items[index]);
      }
    }
  };

  return (
    <div className="relative h-64 w-full flex flex-col items-center overflow-hidden">
      <div className="absolute top-1/2 -translate-y-1/2 w-full h-12 bg-[#1A202C]/40 border-y border-white/5 pointer-events-none rounded-xl" />
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="w-full h-full overflow-y-scroll scroll-smooth no-scrollbar snap-y snap-mandatory py-[108px]"
      >
        {items.map((item, i) => (
          <div 
            key={i}
            className={`h-12 flex items-center justify-center snap-center transition-all duration-200 ${
              item === selectedItem ? 'text-white text-xl font-bold' : 'text-gray-600 text-sm font-medium'
            }`}
          >
            {item}{unit}
          </div>
        ))}
      </div>
    </div>
  );
};

const BirthdayView = ({ onComplete }: { onComplete: (date: string) => void }) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - 10 - i);

  const [date, setDate] = useState({ month: 'July', day: 8, year: 1995 });

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 p-8">
        <h2 className="text-[28px] font-bold leading-tight mb-2 text-white font-sans">
          When were you born?
        </h2>
        <p className="text-gray-400 text-sm mb-12 font-medium">
          This will be used to calibrate your custom plan.
        </p>

        <div className="flex gap-2">
          <div className="flex-[1.5] flex flex-col items-center">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-4">Month</span>
            <WheelPicker items={months} selectedItem={date.month} onSelect={(m) => setDate(d => ({ ...d, month: m }))} />
          </div>
          <div className="flex-1 flex flex-col items-center">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-4">Day</span>
            <WheelPicker items={days} selectedItem={date.day} onSelect={(day) => setDate(d => ({ ...d, day }))} />
          </div>
          <div className="flex-1 flex flex-col items-center">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-4">Year</span>
            <WheelPicker items={years} selectedItem={date.year} onSelect={(year) => setDate(d => ({ ...d, year }))} />
          </div>
        </div>
      </div>
      <div className="p-8 pt-0">
        <Button onClick={() => onComplete(`${date.month} ${date.day}, ${date.year}`)} className="w-full">
          Continue <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

const HeightWeightView = ({ onComplete }: { onComplete: (data: any) => void }) => {
  const [isImperial, setIsImperial] = useState(false);
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);

  const heights = isImperial 
    ? Array.from({ length: 48 }, (_, i) => i + 48) // 4ft to 8ft in inches
    : Array.from({ length: 100 }, (_, i) => i + 130); // 130cm to 230cm

  const weights = isImperial
    ? Array.from({ length: 200 }, (_, i) => i + 80) // 80lb to 280lb
    : Array.from({ length: 100 }, (_, i) => i + 40); // 40kg to 140kg

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 p-8">
        <h2 className="text-[28px] font-bold leading-tight mb-2 text-white font-sans">
          Height & weight
        </h2>
        <p className="text-gray-400 text-sm mb-12 font-medium">
          This will be used to calibrate your custom plan.
        </p>

        <div className="flex justify-center mb-16">
          <div className="bg-[#121826] p-1.5 rounded-full flex items-center border border-white/5">
            <button 
              onClick={() => setIsImperial(false)}
              className={`px-8 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${!isImperial ? 'bg-white text-[#05080D]' : 'text-gray-500'}`}
            >
              Metric
            </button>
            <button 
              onClick={() => setIsImperial(true)}
              className={`px-8 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${isImperial ? 'bg-white text-[#05080D]' : 'text-gray-500'}`}
            >
              Imperial
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="flex-1 flex flex-col items-center">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-4">Height</span>
            <WheelPicker items={heights} unit={isImperial ? " in" : " cm"} selectedItem={height} onSelect={setHeight} />
          </div>
          <div className="flex-1 flex flex-col items-center">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-4">Weight</span>
            <WheelPicker items={weights} unit={isImperial ? " lb" : " kg"} selectedItem={weight} onSelect={setWeight} />
          </div>
        </div>
      </div>
      <div className="p-8 pt-0">
        <Button onClick={() => onComplete({ height, weight, isImperial })} className="w-full">
          Continue <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

const ClubView = ({ onComplete }: { onComplete: (club: string) => void }) => {
  const [club, setClub] = useState('');

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 p-8">
        <h2 className="text-[28px] font-bold leading-tight mb-2 text-white font-sans">
          What's your current club?
        </h2>
        <p className="text-gray-400 text-sm mb-12 font-medium">
          This helps us tailor your plan to your team context.
        </p>

        <div className="relative group">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none transition-colors group-focus-within:text-white text-gray-500">
            <Shield className="w-5 h-5" />
          </div>
          <input
            autoFocus
            type="text"
            value={club}
            onChange={(e) => setClub(e.target.value)}
            placeholder="Riders"
            className="w-full bg-[#121826] border border-white/5 p-6 pl-16 rounded-[1.5rem] text-lg font-bold text-white transition-all focus:border-[#E53E3E] focus:outline-none placeholder:text-gray-700"
          />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-1 bg-[#E53E3E] rounded-full scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-center" />
        </div>
      </div>
      <div className="p-8 pt-0 flex flex-col gap-4">
        <Button disabled={!club} onClick={() => onComplete(club)} className="w-full">
          Continue <ArrowRight className="w-5 h-5" />
        </Button>
        <button 
          onClick={() => onComplete('None')}
          className="text-gray-500 font-bold py-2 text-sm hover:text-white transition-colors"
        >
          Skip
        </button>
      </div>
    </div>
  );
};

const TrustView = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
        {/* Orbit Animation Overlay */}
        <div className="relative w-64 h-64 mb-12">
          {/* Orbits */}
          <div className="absolute inset-0 border border-white/5 rounded-full" />
          <div className="absolute inset-4 border border-white/5 rounded-full" />
          <div className="absolute inset-8 border border-white/5 rounded-full" />
          
          {/* Animated Icons */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#0D121D] p-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
            </div>
          </motion.div>

          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4"
          >
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 bg-[#0D121D] p-2">
              <div className="w-5 h-5 rounded-full border-2 border-white/20 flex items-center justify-center p-0.5">
                <div className="w-full h-full rounded-full bg-white/40" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ rotate: 180 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute inset-8"
          >
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#0D121D] p-2">
              <Dumbbell className="w-5 h-5 text-red-500" />
            </div>
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 bg-[#0D121D] p-2">
              <Target className="w-5 h-5 text-blue-500" />
            </div>
          </motion.div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full border-4 border-blue-500 flex items-center justify-center bg-blue-500/10 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
              <CircleCheck className="w-10 h-10 text-blue-500" />
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-extrabold mb-4 text-white font-sans leading-tight">
          Thank you for trusting us
        </h2>
        <p className="text-gray-400 font-medium mb-12">
          Let's start to customize everything just for you!
        </p>

        <div className="flex flex-col items-center gap-4">
          <Lock className="w-5 h-5 text-gray-700" />
          <p className="text-[11px] text-gray-600 font-medium max-w-[280px] leading-relaxed">
            Your privacy and security matter to us. We promise to always keep your personal information private and secure.
          </p>
        </div>
      </div>
      <div className="p-8 pt-0">
        <Button onClick={onComplete} className="w-full">
          Continue <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

const BenefitStatementView = ({ onComplete }: { onComplete: () => void }) => (
  <div className="flex-1 flex flex-col p-8 items-center justify-center text-center">
    <h2 className="text-4xl font-extrabold mb-12 text-white font-sans leading-tight">
      You will be <br />
      <span className="text-[#E53E3E]">able to improve</span> <br />
      your match fitness <br />
      with consistent training
    </h2>
    <p className="text-gray-500 text-sm max-w-[280px] leading-relaxed font-medium mb-12">
      90% of ProjectBaller athletes say that the change is obvious after using our personalized training and load management tools.
    </p>
    <div className="w-full mt-auto">
      <Button onClick={onComplete} className="w-full">
        Continue <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </div>
  </div>
);

const FixPaceView = ({ onComplete }: { onComplete: () => void }) => (
  <div className="flex-1 flex flex-col p-8 items-center justify-center text-center">
    <h2 className="text-4xl font-extrabold mb-12 text-white font-sans leading-tight">
      We will fix <span className="text-orange-400">lack of pace</span> with ProjectBaller!
    </h2>
    <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-[300px] mb-12">
      Baller gives you customized training plans and helps you build all the other habits outside the pitch, making living like the pros easy.
    </p>
    <Button onClick={onComplete} className="w-full mt-auto">
      Continue <ArrowRight className="w-5 h-5 ml-2" />
    </Button>
  </div>
);

const TwiceFastView = ({ onComplete }: { onComplete: () => void }) => (
  <div className="flex-1 flex flex-col p-8">
    <h2 className="text-3xl font-extrabold mb-8 text-white font-sans leading-tight">
      Develop twice as fast with ProjectBaller
    </h2>
    <div className="flex-1 flex flex-col items-center justify-center gap-12">
      <div className="flex items-end gap-8 w-full max-w-[280px]">
        <div className="flex-1 flex flex-col items-center gap-4">
          <span className="text-gray-500 font-bold">Without</span>
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center mb-2">
            <span className="text-white text-xs">⚽️</span>
          </div>
          <motion.div initial={{ height: 0 }} animate={{ height: 60 }} className="w-full bg-gray-400/20 rounded-xl" />
        </div>
        <div className="flex-1 flex flex-col items-center gap-4">
          <span className="text-white font-bold">With</span>
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center mb-2">
            <span className="text-white text-xs">⚽️</span>
          </div>
          <motion.div initial={{ height: 0 }} animate={{ height: 160 }} className="w-full bg-[#38A169] rounded-xl flex items-center justify-center">
            <span className="text-white font-black text-xl">2X</span>
          </motion.div>
        </div>
      </div>
      <p className="text-gray-400 font-medium text-center max-w-[200px]">
        Project makes it easy and holds you accountable.
      </p>
    </div>
    <Button onClick={onComplete} className="w-full mt-auto">
      Continue <ArrowRight className="w-5 h-5 ml-2" />
    </Button>
  </div>
);

const NotificationsView = ({ onBack }: { onBack: () => void }) => {
  const [prefs, setPrefs] = useState({
    workout: true,
    goal: true,
    friend: true,
    coach: true,
    ai: false,
    readiness: true
  });

  const toggle = (key: keyof typeof prefs) => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex-1 flex flex-col bg-[#05080D]">
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <button onClick={onBack} className="text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-white font-bold text-lg">Notifications</h2>
        <div className="w-6" />
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-8">
        {/* In-App Inbox */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-black text-xl">In-App Inbox</h3>
            <span className="text-gray-600 text-xs font-bold uppercase tracking-widest">0 unread</span>
          </div>
          <div className="bg-[#121826] border border-white/5 rounded-2xl p-6">
            <p className="text-gray-500 font-medium text-sm">No in-app notifications right now.</p>
          </div>
        </div>

        {/* Broadcasts */}
        <div className="mb-8">
          <h3 className="text-white font-black text-xl mb-4">Broadcasts</h3>
          <div className="bg-[#121826] border border-white/5 rounded-2xl p-6">
            <p className="text-gray-500 font-medium text-sm">No active broadcasts.</p>
          </div>
        </div>

        {/* Preferences */}
        <div>
          <h3 className="text-white font-black text-xl mb-4">Preferences</h3>
          <div className="bg-[#121826] border border-white/5 rounded-3xl p-2">
            {[
              { id: 'workout', label: 'Workout Complete' },
              { id: 'goal', label: 'Goal Achievement' },
              { id: 'friend', label: 'Friend Request' },
              { id: 'coach', label: 'Coach Message' },
              { id: 'ai', label: 'AI Plan Ready' },
              { id: 'readiness', label: 'Readiness Alert' }
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between p-5 border-b border-white/5 last:border-0">
                <span className="text-gray-300 font-medium">{item.label}</span>
                <button 
                  onClick={() => toggle(item.id as keyof typeof prefs)}
                  className={cn(
                    "w-12 h-6 rounded-full transition-all relative",
                    prefs[item.id as keyof typeof prefs] ? "bg-red-500" : "bg-gray-800"
                  )}
                >
                  <div className={cn(
                    "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                    prefs[item.id as keyof typeof prefs] ? "right-1" : "left-1"
                  )} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MainLayout = ({ children, activeTab, onTabChange, onNotify, onAiCoach, onCalendar }: { 
  children: ReactNode, 
  activeTab: string, 
  onTabChange: (tab: string) => void,
  onNotify: () => void,
  onAiCoach: () => void,
  onCalendar?: () => void
}) => {
  return (
    <div className="flex-1 flex flex-col h-full bg-[#060B14] relative">
      {/* Top Bar */}
      <div className="p-6 pt-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
            <ProjectBallerLogo className="w-6 h-6" />
          </div>
          <span className="text-white font-bold text-lg">ProjectBaller</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onCalendar}
            className="w-12 h-12 rounded-2xl bg-[#121826] border border-white/5 flex items-center justify-center text-gray-400"
          >
            <Calendar className="w-6 h-6" />
          </button>
          <button 
            onClick={onNotify}
            className="w-12 h-12 rounded-2xl bg-[#121826] border border-white/5 flex items-center justify-center text-gray-400"
          >
            <Bell className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24 scrollbar-none">
        {children}
      </div>

      {/* Floating AI Button */}
      <div className="absolute right-6 bottom-32 z-[100]">
        <button 
          onClick={onAiCoach}
          className="w-16 h-16 rounded-full bg-[#E53E3E] shadow-[0_0_30px_rgba(229,62,62,0.4)] flex items-center justify-center text-white border border-white/20"
        >
          <div className="relative">
            <Sparkles className="w-8 h-8" />
            <span className="absolute -bottom-1 -right-1 text-[9px] font-black bg-white text-[#E53E3E] px-1 rounded-sm">AI</span>
          </div>
        </button>
      </div>

      {/* Bottom Nav */}
      <div className="absolute bottom-0 inset-x-0 bg-[#0D121D]/90 backdrop-blur-xl border-t border-white/5 px-4 py-4 flex items-center justify-between pb-8">
        {[
          { icon: Home, label: 'Home', id: 'home' },
          { icon: Dumbbell, label: 'Train', id: 'train' },
          { icon: Utensils, label: 'Fuel', id: 'fuel' },
          { icon: Users, label: 'Social', id: 'social' },
          { icon: Trophy, label: 'Match', id: 'match' },
          { icon: LayoutGrid, label: 'More', id: 'more' },
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="flex flex-col items-center gap-1 min-w-[50px]"
          >
            <div className={cn(
              "p-2 rounded-xl transition-all",
              activeTab === tab.id ? "bg-red-500/10 text-red-500" : "text-gray-500"
            )}>
              <tab.icon className="w-6 h-6" />
            </div>
            <span className={cn(
              "text-[10px] font-bold",
              activeTab === tab.id ? "text-white" : "text-gray-600"
            )}>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const WorkoutsView = ({ onStart, onHistory }: { onStart: () => void, onHistory: () => void }) => {
  const [activeDay, setActiveDay] = useState('WED');
  const [showSettings, setShowSettings] = useState(false);

  const weekDays = [
    { day: 'TUE', date: '28', type: 'WORK' },
    { day: 'WED', date: '29', type: 'REST' },
    { day: 'FRI', date: '1', type: 'REST' },
    { day: 'SAT', date: '2', type: 'WORK' },
    { day: 'SUN', date: '3', type: 'MATCH' },
  ];

  const selectedDayIdx = weekDays.findIndex(d => d.day === activeDay) !== -1 ? weekDays.findIndex(d => d.day === activeDay) : 1;
  const dayFull: Record<string, string> = { TUE: "Tuesday's", WED: "Wednesday's", FRI: "Friday's", SAT: "Saturday's" };

  return (
    <div className="p-6 h-full relative">
      {/* Settings Overlay */}
      {showSettings && (
        <div className="absolute inset-0 z-50 bg-[#05080D] flex flex-col p-6 animate-in fade-in slide-in-from-right duration-300">
           <div className="flex items-center justify-between mb-8">
             <h2 className="text-2xl font-black text-white">Training Settings</h2>
             <button onClick={() => setShowSettings(false)} className="text-gray-500 font-bold">Done</button>
           </div>
           <div className="flex-1 overflow-y-auto">
              <TrainingSetupView onComplete={() => setShowSettings(false)} />
           </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-extrabold text-white font-sans">Workouts</h1>
        <div className="flex gap-3">
          <button 
            onClick={() => onStart()} // Reuse a view or open details
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setShowSettings(true)}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 text-gray-500 font-bold mb-8 cursor-pointer">
        <span>Apr 26 - May 2</span>
        <ChevronDown className="w-4 h-4" />
      </div>

      {/* Week Calendar */}
      <div className="flex gap-3 mb-10 overflow-x-auto pb-2 scrollbar-none">
        {weekDays.map((item, idx) => (
          <div 
            key={idx}
            onClick={() => setActiveDay(item.day)}
            className={cn(
              "flex-shrink-0 w-20 py-5 rounded-2xl flex flex-col items-center gap-1 transition-all border-2 cursor-pointer",
              item.day === activeDay ? "bg-[#121826] border-red-500" : "bg-[#121826]/40 border-transparent text-gray-600"
            )}
          >
            <span className="text-[10px] font-black uppercase tracking-widest">{item.day}</span>
            <span className={cn("text-2xl font-black", item.day === activeDay ? "text-white" : "text-gray-500")}>
              {item.date}
            </span>
            <span className={cn("text-[10px] font-black uppercase tracking-widest", item.day === activeDay ? "text-red-500" : "text-gray-700")}>
              {item.type}
            </span>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h2 className="text-3xl font-black text-white mb-1">{dayFull[activeDay] || activeDay + "'s"} Focus</h2>
        <span className="text-gray-500 font-bold uppercase tracking-widest text-sm">
          {weekDays[selectedDayIdx].type === 'WORK' ? 'strength' : weekDays[selectedDayIdx].type === 'MATCH' ? 'gameday' : 'recovery'}
        </span>
      </div>

      <p className="text-gray-600 mb-6">
        {weekDays[selectedDayIdx].type === 'REST' ? 'Rest and light mobility session planned.' : 'Intense training session scheduled.'}
      </p>

      {/* Workout Card */}
      <div 
        onClick={onStart}
        className="relative overflow-hidden group cursor-pointer"
      >
        <div className="absolute inset-0 bg-red-500/5 rounded-[2rem] border-2 border-red-500/20 group-hover:border-red-500/40 transition-colors" />
        <div className="relative p-8 flex items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-[#0D121D] border border-white/10 flex items-center justify-center text-gray-400">
            {weekDays[selectedDayIdx].type === 'MATCH' ? <Trophy className="w-7 h-7" /> : <Dumbbell className="w-7 h-7" />}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded border border-red-500/20 flex items-center gap-1">
                <Zap className="w-3 h-3 fill-current" /> {weekDays[selectedDayIdx].type === 'MATCH' ? 'MATCH' : 'UP NEXT'}
              </span>
            </div>
            <h3 className="text-2xl font-black text-white mb-1">
              {weekDays[selectedDayIdx].type === 'REST' ? 'Mobility Session' : weekDays[selectedDayIdx].type === 'MATCH' ? 'Match Day Hub' : 'Full Body Strength'}
            </h3>
            <p className="text-gray-500 font-bold">
               {weekDays[selectedDayIdx].type === 'REST' ? 'Light recovery' : weekDays[selectedDayIdx].type === 'MATCH' ? 'Match preparation' : 'Compound movements'}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-4">
        <Button onClick={onStart} className="w-full">
           <ArrowRight className="w-5 h-5 mr-2" fill="currentColor" /> Start Workout
        </Button>
        <button 
          onClick={onHistory}
          className="w-full py-4 text-gray-500 font-bold hover:text-white transition-colors"
        >
          View History
        </button>
      </div>
    </div>
  );
};

const WorkoutDetailsView = ({ workout, onBack, onStart }: { workout: any, onBack: () => void, onStart: () => void }) => {
  const [showExercises, setShowExercises] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="flex-1 flex flex-col bg-[#05080D] relative">
      <div className="p-6 flex items-center justify-between mb-4 z-10">
        <button onClick={onBack} className="text-white hover:opacity-70 transition-opacity">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
          
          <AnimatePresence>
            {showMenu && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-48 bg-[#121826] border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2"
              >
                {[
                  { label: 'Share Workout', icon: Share2 },
                  { label: 'Edit Exercises', icon: Edit2 },
                  { label: 'Save as Template', icon: Copy },
                  { label: 'Delete', icon: Trash2, color: 'text-red-500' },
                ].map((item) => (
                  <button 
                    key={item.label}
                    onClick={() => setShowMenu(false)}
                    className={cn(
                      "w-full px-4 py-3 flex items-center gap-3 text-sm font-bold hover:bg-white/5 transition-colors",
                      item.color || "text-gray-300"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-24">
        <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden bg-[#121826] border border-white/5 mb-10 flex items-center justify-center group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onStart}
            className="w-20 h-20 rounded-full bg-[#E53E3E] shadow-2xl shadow-red-500/30 flex items-center justify-center text-white z-10"
          >
            <ArrowRight className="w-10 h-10 ml-1" fill="currentColor" />
          </motion.button>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-black text-white">Full Body Strength</h1>
          <button 
            onClick={() => setIsFavorite(!isFavorite)}
            className={cn(
              "w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300",
              isFavorite ? "bg-red-500/10 border-red-500 text-red-500" : "bg-white/5 border-white/10 text-gray-400"
            )}
          >
            <Star className={cn("w-5 h-5", isFavorite && "fill-current")} />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <span className="px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500" /> STRENGTH
          </span>
          <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> 60 min
          </span>
          <span className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
            <Target className="w-4 h-4" /> RPE 7
          </span>
        </div>

        <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6 mb-10 flex items-center gap-4">
          <Info className="w-6 h-6 text-blue-500" />
          <p className="text-gray-400 font-medium">moderate</p>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-black text-white mb-6">Exercises (4)</h3>
          <div className="space-y-3">
            {DUMMY_WORKOUT.exercises.map((ex, idx) => (
              <div key={ex.id} className="bg-[#121826] border border-white/5 rounded-2xl p-6 flex items-center gap-6">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 font-black text-xl">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-bold text-lg mb-1">{ex.name}</h4>
                  <p className="text-gray-500 font-medium text-sm">
                    {ex.sets} sets • {ex.reps} reps • {ex.rest}s
                  </p>
                </div>
                <ChevronDown className="w-6 h-6 text-gray-700 -rotate-90" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 pb-10 absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#05080D] via-[#05080D] to-transparent">
        <Button onClick={onStart} className="w-full">
          <ArrowRight className="w-5 h-5 mr-2" fill="currentColor" /> Start Workout
        </Button>
      </div>
    </div>
  );
};

const SessionPlaybackView = ({ workout, onFinish }: { workout: Workout, onFinish: (workout: Workout) => void }) => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [time, setTime] = useState(1);
  const [currentReps, setCurrentReps] = useState(workout.exercises[0].reps);
  const [restSeconds, setRestSeconds] = useState(120);

  const exercise = workout.exercises[currentExercise];

  useEffect(() => {
    setCurrentReps(workout.exercises[currentExercise].reps);
  }, [currentExercise]);

  useEffect(() => {
    if (!isResting) { setRestSeconds(exercise.rest || 120); return; }
    const interval = setInterval(() => {
      setRestSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsResting(false);
          setCurrentSet(s => s + 1);
          return exercise.rest || 120;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isResting, exercise.rest]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isResting) {
        setTime(prev => prev + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isResting]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCompleteSet = () => {
    if (currentSet < exercise.sets) {
       setRestSeconds(exercise.rest || 120);
       setIsResting(true);
    } else if (currentExercise < workout.exercises.length - 1) {
       setCurrentExercise(prev => prev + 1);
       setCurrentSet(1);
    } else {
       onFinish({ ...workout, duration: formatTime(time), rpe: 7 });
    }
  };

  if (isResting) {
    return (
      <div className="flex-1 flex flex-col bg-[#05080D]">
        <div className="p-6 flex items-center justify-between">
          <button onClick={() => onFinish(workout)} className="text-white"><Plus className="w-6 h-6 rotate-45" /></button>
          <span className="text-white font-bold">Rest Period</span>
          <span className="text-red-500 font-bold">{currentExercise + 1}/{workout.exercises.length}</span>
        </div>

        <div className="flex-1 p-6 flex flex-col items-center justify-center">
           <div className="w-64 h-64 rounded-full border-8 border-white/5 flex flex-col items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border-8 border-red-500 border-t-transparent animate-spin-slow" />
              <span className="text-6xl font-black text-white">{formatTime(restSeconds)}</span>
              <span className="text-gray-500 font-bold uppercase tracking-widest mt-2">Rest</span>
           </div>
           
           <h3 className="text-2xl font-black text-white mt-12 mb-2">Next up: Set {currentSet + 1}</h3>
           <p className="text-gray-500 font-medium mb-12">{exercise.name}</p>

           <div className="flex gap-4 w-full max-w-sm">
             <button 
               onClick={() => { setRestSeconds(exercise.rest || 120); setIsResting(false); setCurrentSet(prev => prev + 1); }} 
               className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold"
             >
               Skip Rest
             </button>
             <button 
               onClick={() => setRestSeconds(prev => prev + 30)}
               className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold"
             >
               +30s
             </button>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#05080D]">
      <div className="p-6 flex items-center justify-between">
        <button onClick={() => onFinish(workout)} className="text-white"><Plus className="w-6 h-6 rotate-45" /></button>
        <span className="text-white font-bold">Session Playback</span>
        <span className="text-red-500 font-bold">{currentExercise + 1}/{workout.exercises.length}</span>
      </div>

      <div className="flex-1 overflow-y-auto px-6">
        <div className="bg-[#121826] border-l-4 border-red-500 rounded-[2.5rem] p-8 mb-4">
          <div className="flex items-center justify-between mb-8">
            <span className="text-red-500 font-black text-xl">0{currentExercise + 1} {exercise.name}</span>
            <span className="text-gray-500 text-xs font-bold uppercase tracking-widest flex items-center gap-1">
              <Clock className="w-3 h-3" /> History
            </span>
          </div>

          <div className="bg-[#1A202C] rounded-3xl p-8 mb-6">
            <div className="flex items-center justify-between mb-8">
              <span className="text-white font-bold uppercase tracking-widest text-sm">SET {currentSet} of {exercise.sets}</span>
              <span className="bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-full">Current</span>
            </div>

            <div className="flex flex-col items-center mb-10">
              <span className="text-gray-600 font-bold text-[10px] uppercase tracking-widest mb-4">Reps</span>
              <div className="flex items-center gap-12">
                <button 
                  onClick={() => setCurrentReps(prev => Math.max(1, prev - 1))}
                  className="w-14 h-14 rounded-full bg-[#2D3748] flex items-center justify-center text-white"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <span className="text-7xl font-black text-white">{currentReps}</span>
                <button 
                  onClick={() => setCurrentReps(prev => prev + 1)}
                  className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-white"
                >
                  <Plus className="w-6 h-6" />
                </button>
              </div>
            </div>

            <button 
              onClick={handleCompleteSet}
              className="w-full h-16 bg-[#E53E3E] rounded-2xl text-white font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-red-500/20"
            >
              <Check className="w-6 h-6" strokeWidth={4} /> Complete Set
            </button>
          </div>

          <div className="space-y-4">
             {Array.from({ length: exercise.sets - currentSet }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 text-gray-800 font-bold opacity-30">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-800" />
                  <span>Set {currentSet + i + 1}</span>
                </div>
             ))}
          </div>
        </div>

        <div className="space-y-3 opacity-40 grayscale pointer-events-none mb-10">
          {workout.exercises.slice(currentExercise + 1).map((ex, idx) => (
             <div key={ex.id} className="bg-[#121826] border border-white/5 rounded-2xl p-6 flex items-center justify-between">
                <div>
                  <h4 className="text-white font-bold mb-1">0{currentExercise + idx + 2} {ex.name}</h4>
                  <p className="text-gray-500 text-xs">{ex.sets} sets x {ex.reps} reps</p>
                </div>
                <Info className="w-5 h-5 text-gray-600" />
             </div>
          ))}
        </div>
      </div>

      <div className="p-8 pb-10 bg-[#0D121D] flex items-center justify-between border-t border-white/5">
        <div className="flex items-center gap-12">
          <div>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Total Time</p>
            <p className="text-white font-black text-2xl font-mono">{formatTime(time)}</p>
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Exercise</p>
            <p className="text-white font-black text-2xl">{currentExercise + 1}/{workout.exercises.length}</p>
          </div>
        </div>
        <Button onClick={() => onFinish(workout)} className="px-10 h-14 rounded-full bg-[#E53E3E] text-white font-black">Finish Early</Button>
      </div>
    </div>
  );
};

const WorkoutFeedbackView = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState<'success' | 'form'>('success');
  const [rpe, setRpe] = useState(7);
  const [difficulty, setDifficulty] = useState('Just Right');
  const [enjoyment, setEnjoyment] = useState(3);

  useEffect(() => {
    if (step === 'success') {
      const timer = setTimeout(() => setStep('form'), 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  if (step === 'success') {
    return (
      <div className="flex-1 bg-[#05080D] flex flex-col items-center justify-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-24 h-24 rounded-full bg-[#38A169] flex items-center justify-center mb-8">
          <Check className="w-12 h-12 text-white" strokeWidth={4} />
        </motion.div>
        <h2 className="text-3xl font-black text-white mb-6">Workout Complete!</h2>
        <div className="w-12 h-12 relative">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-full h-full rounded-full border-2 border-red-500/20 border-t-red-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#05080D] p-6 lg:p-12 overflow-y-auto">
      <div className="flex flex-col items-center text-center mt-8 mb-12">
        <div className="w-20 h-20 rounded-full bg-[#38A169]/10 flex items-center justify-center mb-8">
           <Check className="w-10 h-10 text-[#38A169]" strokeWidth={4} />
        </div>
        <h2 className="text-4xl font-black text-white mb-3">Session Complete</h2>
        <p className="text-gray-500 font-medium">Add a quick rating for this completed session.</p>
      </div>

      <div className="bg-[#121826] border border-white/5 rounded-3xl p-8 mb-10">
        <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-4 block">Session Feedback</span>
        <p className="text-gray-400 font-medium leading-relaxed">
          We will save your RPE, session difficulty, enjoyment, and notes to the workout log.
        </p>
      </div>

      <div className="space-y-12">
        <div>
          <h4 className="text-white font-bold text-lg mb-6">Rate Difficulty (RPE)</h4>
          <div className="flex flex-col items-center">
            <span className="text-7xl font-black text-white mb-8">{rpe}</span>
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={rpe} 
              onChange={(e) => setRpe(parseInt(e.target.value))}
              className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer accent-red-500"
            />
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold text-lg mb-6">Difficulty</h4>
          <div className="flex gap-3">
            {['Too Easy', 'Just Right', 'Too Hard'].map((opt) => (
              <button
                key={opt}
                onClick={() => setDifficulty(opt)}
                className={`flex-1 py-4 rounded-2xl font-bold transition-all border ${
                  opt === difficulty
                    ? 'bg-red-500/10 border-red-500 text-red-500'
                    : 'bg-[#121826] border-white/10 text-gray-400'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-white font-bold text-lg">Enjoyment</h4>
            <span className="text-red-500 font-bold">{enjoyment}/5</span>
          </div>
          <input
            type="range"
            min={1} max={5} step={1}
            value={enjoyment}
            onChange={(e) => setEnjoyment(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
            style={{ accentColor: '#E53E3E' }}
          />
        </div>

        <div>
          <h4 className="text-white font-bold text-lg mb-6">Notes (optional)</h4>
          <textarea 
            placeholder="How did the session feel?"
            className="w-full bg-[#121826] border border-white/10 rounded-2xl p-6 text-white font-medium placeholder:text-gray-600 focus:outline-none focus:border-red-500/50 min-h-[120px]"
          />
        </div>
      </div>

      <div className="mt-16 space-y-6 pb-12">
        <Button onClick={onComplete} className="w-full">Save & Continue</Button>
        <button onClick={onComplete} className="w-full text-gray-600 font-bold hover:text-white">Skip</button>
      </div>
    </div>
  );
};

const WorkoutHistoryView = ({ history, onBack }: { history: Workout[], onBack: () => void }) => {
  return (
    <div className="flex-1 flex flex-col bg-[#05080D] h-full overflow-hidden">
      <div className="p-6 flex items-center justify-between border-b border-white/5">
        <button onClick={onBack} className="text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-white font-bold text-xl">Workout History</h2>
        <div className="w-6" />
      </div>

      <div className="flex-1 overflow-y-auto p-6 pb-24 space-y-4">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
              <Clock className="w-10 h-10 text-gray-700" />
            </div>
            <h3 className="text-white font-bold text-xl mb-2">No Workouts Yet</h3>
            <p className="text-gray-500 px-10">Your completed sessions will appear here.</p>
          </div>
        ) : (
          history.map((workout, i) => (
            <div key={i} className="bg-[#121826] border border-white/5 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 blur-3xl" />
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-white">{workout.name}</h3>
                <span className="text-red-500 text-[10px] font-black uppercase tracking-widest">{workout.type}</span>
              </div>
              <div className="flex items-center gap-6">
                 <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-white font-bold text-sm">{workout.duration}</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-orange-500" />
                    <span className="text-white font-bold text-sm">RPE {workout.rpe}</span>
                 </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const FuelView = ({ hydration, setHydration, onCalendar, loggedMeals, setLoggedMeals }: { 
  hydration: number, 
  setHydration: React.Dispatch<React.SetStateAction<number>>,
  onCalendar?: () => void,
  loggedMeals: any[],
  setLoggedMeals: React.Dispatch<React.SetStateAction<any[]>>
}) => {
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [activeMealType, setActiveMealType] = useState('Breakfast');
  const [mealForm, setMealForm] = useState({ name: '', cals: '', protein: '', carbs: '', fat: '' });

  const totalCals = loggedMeals.reduce((acc, m) => acc + Number(m.cals || 0), 0);
  const totalProtein = loggedMeals.reduce((acc, m) => acc + Number(m.protein || 0), 0);
  const totalCarbs = loggedMeals.reduce((acc, m) => acc + Number(m.carbs || 0), 0);
  const totalFat = loggedMeals.reduce((acc, m) => acc + Number(m.fat || 0), 0);

  const handleAddMeal = () => {
    if (!mealForm.name || !mealForm.cals) return;
    setLoggedMeals(prev => [...prev, { ...mealForm, type: activeMealType, id: Date.now().toString() }]);
    setMealForm({ name: '', cals: '', protein: '', carbs: '', fat: '' });
    setShowQuickAdd(false);
  };

  return (
    <div className="p-6 h-full overflow-y-auto scrollbar-none pb-32">
      <div className="flex items-center justify-between mb-8">
        <div>
           <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mb-1">Projectballer fuel</p>
           <h1 className="text-4xl font-extrabold text-white">Nutrition</h1>
           <p className="text-gray-500 font-bold mt-1">Today, Apr 29</p>
        </div>
        <button 
          onClick={onCalendar}
          className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400"
        >
           <Calendar className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-[#121826] border border-white/5 rounded-[2.5rem] p-8 mb-6">
        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Calories Consumed</p>
        <div className="flex items-baseline gap-2 mb-10">
          <span className="text-6xl font-black text-white">{totalCals}</span>
          <span className="text-gray-600 text-2xl font-black">/2400</span>
          <div className="ml-auto bg-red-500/10 text-red-500 text-[10px] font-black px-3 py-1.5 rounded-full border border-red-500/20">
            {2400 - totalCals} Left ↓
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
           {[
             { label: 'Protein', val: totalProtein, target: 160, unit: 'g' },
             { label: 'Carbs', val: totalCarbs, target: 280, unit: 'g' },
             { label: 'Fats', val: totalFat, target: 75, unit: 'g' }
           ].map((macro) => (
             <div key={macro.label} className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full border-[6px] border-white/5 flex items-center justify-center mb-4 relative overflow-hidden">
                   <div 
                     className="absolute bottom-0 left-0 w-full bg-red-500/20 transition-all duration-500" 
                     style={{ height: `${Math.min(100, (macro.val/macro.target)*100)}%` }} 
                   />
                   <span className="text-white font-black z-10">{Math.round((macro.val/macro.target)*100)}%</span>
                </div>
                <p className="text-[10px] font-black text-white uppercase tracking-widest mb-1">{macro.label}</p>
                <p className="text-[10px] text-gray-600 font-bold">{macro.val}/{macro.target}{macro.unit}</p>
             </div>
           ))}
        </div>
      </div>

      <div className="bg-[#121826] border border-white/5 rounded-[2.5rem] p-8 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Hydration</p>
            <h3 className="text-2xl font-black text-white">Water Intake</h3>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black text-white">{hydration}</span>
            <span className="text-gray-600 font-black text-xl">/8</span>
            <p className="text-[10px] text-gray-600 font-bold mt-1">glasses</p>
          </div>
        </div>

        <div className="flex gap-2 mb-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ scale: i < hydration ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.2 }}
              className={`flex-1 h-10 rounded-xl transition-all duration-300 ${
                i < hydration
                  ? 'bg-blue-500 shadow-lg shadow-blue-500/30'
                  : 'bg-white/5 border border-white/10'
              }`}
            />
          ))}
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setHydration(prev => Math.max(0, prev - 1))}
            className="flex-1 h-14 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-xl active:scale-95 transition-transform"
          >−</button>
          <button
            onClick={() => setHydration(prev => Math.min(8, prev + 1))}
            className="flex-1 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 font-black text-xl active:scale-95 transition-transform"
          >+ Glass</button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black text-white">Daily Fuel</h2>
        <button 
          onClick={() => alert('Viewing Nutrition Plan')} 
          className="text-red-500 font-bold text-sm flex items-center gap-1"
        >
          View Plan <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {['Breakfast', 'Lunch', 'Snack', 'Dinner'].map((type, i) => {
          const meals = loggedMeals.filter(m => m.type === type);
          return (
            <div key={type} className="bg-[#121826] border border-white/5 rounded-3xl overflow-hidden">
              <div className="p-6 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-4">
                   <div className={cn("w-2 h-2 rounded-full", i === 0 ? "bg-orange-500" : i === 1 ? "bg-emerald-500" : i === 2 ? "bg-blue-500" : "bg-purple-500")} />
                   <span className="text-white text-xl font-bold">{type}</span>
                </div>
                <button 
                  onClick={() => {
                    setActiveMealType(type);
                    setShowQuickAdd(true);
                  }}
                  className="text-red-500/60 font-black text-[10px] uppercase tracking-widest hover:text-red-500 transition-colors"
                >
                  Log Meal
                </button>
              </div>
              {meals.length > 0 && (
                <div className="px-6 py-4 space-y-3 bg-black/10">
                  {meals.map((m) => (
                    <div key={m.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-bold">{m.name}</p>
                        <p className="text-gray-500 text-xs">{m.cals} cals • P: {m.protein}g C: {m.carbs}g F: {m.fat}g</p>
                      </div>
                      <button 
                        onClick={() => setLoggedMeals(prev => prev.filter(item => item.id !== m.id))}
                        className="text-gray-700 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="fixed bottom-32 right-6">
        <button onClick={() => setShowQuickAdd(true)} className="w-16 h-16 rounded-2xl bg-[#E53E3E] shadow-2xl shadow-red-500/30 flex items-center justify-center text-white">
          <Scan className="w-8 h-8" />
        </button>
      </div>

      {showQuickAdd && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-[#0F172A] rounded-[2.5rem] p-8 pb-12 animate-in slide-in-from-bottom duration-300">
             <div className="w-12 h-1 bg-white/10 rounded-full mx-auto mb-8" />
             <div className="flex items-center gap-4 mb-2">
                <span className="text-4xl text-white">✏️</span>
                <h3 className="text-2xl font-black text-white">Quick Add to {activeMealType}</h3>
             </div>
             <p className="text-gray-500 font-medium mb-10">Manually enter food details</p>

             <div className="space-y-6">
                <div>
                   <label className="text-gray-400 font-bold text-sm mb-3 block">Food Name *</label>
                   <input 
                     type="text" 
                     value={mealForm.name}
                     onChange={(e) => setMealForm({ ...mealForm, name: e.target.value })}
                     placeholder="e.g. Grilled Chicken Breast" 
                     className="w-full h-16 bg-[#1E293B] border border-red-500/50 rounded-2xl px-6 text-white text-lg font-medium outline-none focus:border-red-500" 
                   />
                </div>
                <div>
                   <label className="text-gray-400 font-bold text-sm mb-3 block">Calories *</label>
                   <input 
                     type="number" 
                     value={mealForm.cals}
                     onChange={(e) => setMealForm({ ...mealForm, cals: e.target.value })}
                     placeholder="e.g. 250" 
                     className="w-full h-16 bg-[#1E293B] border border-white/5 rounded-2xl px-6 text-white text-lg font-medium outline-none focus:border-blue-500" 
                   />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                   {[
                     { label: 'Protein', key: 'protein', color: 'bg-orange-500' },
                     { label: 'Carbs', key: 'carbs', color: 'bg-blue-500' },
                     { label: 'Fat', key: 'fat', color: 'bg-yellow-500' }
                   ].map((m) => (
                     <div key={m.label}>
                        <label className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-3 block flex items-center gap-2">
                           <div className={cn("w-2 h-2 rounded-full", m.color)} />
                           {m.label}
                        </label>
                        <input 
                          type="number" 
                          value={(mealForm as any)[m.key]}
                          onChange={(e) => setMealForm({ ...mealForm, [m.key]: e.target.value })}
                          placeholder="0" 
                          className="w-full h-14 bg-[#1E293B] border border-white/5 rounded-2xl text-center text-white font-black" 
                        />
                     </div>
                   ))}
                </div>
             </div>

             <div className="mt-12 space-y-4">
                <Button onClick={handleAddMeal} className="w-full">Add to {activeMealType}</Button>
                <button onClick={() => setShowQuickAdd(false)} className="w-full text-gray-500 font-bold">Cancel</button>
             </div>
           </div>
         </div>
       )}
    </div>
  );
};

const SocialView = ({ posts, setPosts }: { posts: any[], setPosts: React.Dispatch<React.SetStateAction<any[]>> }) => {
  const [newPostText, setNewPostText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [activeCommentPost, setActiveCommentPost] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');

  const handleLike = (id: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, liked: !p.liked, likes: (p.likes || 0) + (p.liked ? -1 : 1) };
      }
      return p;
    }));
  };

  const handleAddPost = () => {
    if (!newPostText) return;
    const newPost = {
      id: Math.random().toString(36).substr(2, 9),
      author: 'You',
      time: 'Just now',
      text: newPostText,
      stats: { load: '0 AU', recovery: '100%', sleep: '8h' },
      likes: 0,
      liked: false,
      comments: []
    };
    setPosts([newPost, ...posts]);
    setNewPostText('');
  };

  const handleAddComment = (postId: string) => {
    if (!commentText) return;
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { 
          ...p, 
          comments: [...(p.comments || []), { id: Date.now().toString(), author: 'You', text: commentText }] 
        };
      }
      return p;
    }));
    setCommentText('');
    setActiveCommentPost(null);
  };

  const filteredPosts = posts.filter(p => 
    p.text.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full overflow-y-auto scrollbar-none pb-32">
      <div className="p-6 flex items-center justify-between">
        <h1 className="text-4xl font-extrabold text-white font-sans">Community</h1>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowSearch(!showSearch)}
            className={cn("w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-colors", showSearch ? "text-red-500 border-red-500/30" : "text-white")}
          >
            <Search className="w-5 h-5" />
          </button>
          <button 
            onClick={() => alert('Filter posts by type: Training, Match, Nutrition')}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white"
          >
             <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {showSearch && (
        <div className="px-6 mb-6">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts or ballers..." 
            className="w-full h-12 bg-[#121826] border border-white/10 rounded-2xl px-6 text-white font-medium outline-none focus:border-red-500"
          />
        </div>
      )}

      <div className="px-6 mb-8">
        <div className="bg-[#121826] border border-white/5 rounded-3xl p-6 flex gap-4">
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 font-bold shrink-0">
            ME
          </div>
          <div className="flex-1">
             <textarea 
               value={newPostText}
               onChange={(e) => setNewPostText(e.target.value)}
               placeholder="Share your progress..." 
               className="w-full bg-transparent text-white font-medium placeholder:text-gray-600 outline-none resize-none h-12"
             />
             <div className="flex justify-end mt-4">
                <button 
                  onClick={handleAddPost}
                  className="px-6 py-2 bg-red-500 rounded-full text-white font-bold text-sm disabled:opacity-50"
                  disabled={!newPostText}
                >
                  Post
                </button>
             </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 px-4">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-[#121826] border border-white/5 rounded-[2.5rem] overflow-hidden">
            <div className="p-8">
               <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                     <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white font-black text-xl">
                        {post.author[0]}
                     </div>
                     <div>
                        <h4 className="text-white font-bold text-lg">{post.author}</h4>
                        <p className="text-gray-500 text-sm font-medium">{post.time}</p>
                     </div>
                  </div>
                  <button className="text-gray-500"><MoreHorizontal className="w-6 h-6" /></button>
               </div>
               <p className="text-white font-medium text-lg leading-relaxed mb-8">{post.text}</p>
               
               {/* Activity Summary Mockup */}
               <div className="grid grid-cols-3 gap-3 mb-8">
                  <div className="bg-[#0D121D] rounded-2xl p-4 border border-white/5">
                     <div className="flex items-center gap-2 mb-2">
                        <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                        <span className="text-[10px] font-black text-gray-500 uppercase">Load</span>
                     </div>
                     <p className="text-white font-black text-sm">{post.stats.load}</p>
                  </div>
                  <div className="bg-[#0D121D] rounded-2xl p-4 border border-white/5">
                     <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-3 h-3 text-emerald-500 fill-emerald-500" />
                        <span className="text-[10px] font-black text-gray-500 uppercase">Recovery</span>
                     </div>
                     <p className="text-white font-black text-sm">{post.stats.recovery}</p>
                  </div>
                  <div className="bg-[#0D121D] rounded-2xl p-4 border border-white/5">
                     <div className="flex items-center gap-2 mb-2">
                        <Moon className="w-3 h-3 text-blue-500 fill-blue-500" />
                        <span className="text-[10px] font-black text-gray-500 uppercase">Sleep</span>
                     </div>
                     <p className="text-white font-black text-sm">{post.stats.sleep}</p>
                  </div>
               </div>

               <div className="flex items-center gap-8 pt-6 border-t border-white/5 mb-6">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className={cn(
                      "flex items-center gap-2 font-bold transition-colors",
                      post.liked ? "text-red-500" : "text-gray-500 hover:text-white"
                    )}
                  >
                     <Heart className={cn("w-5 h-5", post.liked && "fill-current")} /> {post.likes || 0}
                  </button>
                  <button 
                    onClick={() => setActiveCommentPost(activeCommentPost === post.id ? null : post.id)}
                    className="flex items-center gap-2 text-gray-500 font-bold hover:text-white transition-colors"
                  >
                     <MessageSquare className="w-5 h-5" /> {post.comments?.length || 0} Comments
                  </button>
                  <button className="flex items-center gap-2 text-gray-500 font-bold hover:text-white transition-colors ml-auto">
                     <Share2 className="w-5 h-5" />
                  </button>
               </div>

               {/* Comments Section */}
               {(activeCommentPost === post.id || (post.comments && post.comments.length > 0)) && (
                 <div className="space-y-4 pt-4 border-t border-white/5">
                    {post.comments?.map((c: any) => (
                      <div key={c.id} className="flex gap-3">
                         <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {c.author[0]}
                         </div>
                         <div className="bg-white/5 rounded-2xl px-4 py-2 flex-1">
                            <p className="text-white text-sm font-bold">{c.author}</p>
                            <p className="text-gray-400 text-sm">{c.text}</p>
                         </div>
                      </div>
                    ))}
                    {activeCommentPost === post.id && (
                      <div className="flex gap-2 items-center mt-4">
                         <input 
                           type="text" 
                           value={commentText}
                           onChange={(e) => setCommentText(e.target.value)}
                           onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                           placeholder="Add a comment..."
                           className="flex-1 h-10 bg-white/5 border border-white/10 rounded-full px-4 text-white text-sm outline-none focus:border-red-500"
                         />
                         <button 
                           onClick={() => handleAddComment(post.id)}
                           className="text-red-500 font-bold text-sm"
                         >
                            Post
                         </button>
                      </div>
                    )}
                 </div>
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MatchView = ({ match, onAdd, onChecklist, onNotify, countdown }: { 
  match: Match | null, 
  onAdd: () => void, 
  onChecklist: () => void,
  onNotify?: () => void,
  countdown: { hours: number, mins: number, secs: number }
}) => {

  if (!match) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#05080D]">
        <div className="p-4 bg-white/5 rounded-2xl mb-8">
           <Trophy className="w-12 h-12 text-gray-600" />
        </div>
        <h1 className="text-3xl font-black text-white mb-3">No Match Scheduled</h1>
        <p className="text-gray-500 font-medium mb-10 text-center max-w-[240px]">
          Add a match to start your prep
        </p>
        <Button onClick={onAdd} className="px-10">Add Match</Button>

        <div className="fixed bottom-32 right-6">
           <button onClick={onAdd} className="w-14 h-14 rounded-2xl bg-red-500/80 shadow-2xl flex items-center justify-center text-white">
              <Plus className="w-7 h-7" />
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 h-full overflow-y-auto scrollbar-none pb-32">
       <div className="flex items-center justify-between mb-12">
          <h1 className="text-white font-black text-xl tracking-widest uppercase mx-auto">Match Day Hub</h1>
          <button 
            onClick={onNotify}
            className="absolute right-6 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white"
          >
             <Bell className="w-5 h-5" />
          </button>
       </div>

       <div className="flex flex-col items-center text-center">
          <div className="bg-white/5 px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 mb-8">
             <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
             <span className="text-[10px] font-black text-white uppercase tracking-widest">Upcoming Match</span>
          </div>
          
          <h2 className="text-5xl font-black text-white mb-4">vs. {match.opponent}</h2>
          <div className="flex items-center gap-2 text-gray-500 font-bold mb-12">
             <Clock className="w-4 h-4 text-red-500" />
             <span>Kick-off: {match.date} • {match.time}</span>
          </div>
       </div>

       {/* Countdown Card */}
       <div className="bg-[#121826] border border-blue-500/20 rounded-[2.5rem] p-10 mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 text-gray-700">
             <Clock className="w-6 h-6" />
          </div>
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-10">Time to Kick-off</p>
          
          <div className="flex items-center justify-center gap-4">
             <div className="flex flex-col items-center">
                <span className="text-6xl font-black text-white tracking-widest">{countdown.hours}</span>
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mt-2">Hours</span>
             </div>
             <span className="text-4xl font-black text-gray-700">:</span>
             <div className="flex flex-col items-center">
                <span className="text-6xl font-black text-white tracking-widest">{countdown.mins}</span>
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mt-2">Mins</span>
             </div>
             <span className="text-4xl font-black text-gray-700">:</span>
             <div className="flex flex-col items-center">
                <span className="text-6xl font-black text-red-500 tracking-widest">{countdown.secs}</span>
                <span className="text-[10px] font-black text-red-500/50 uppercase tracking-widest mt-2">Secs</span>
             </div>
          </div>
       </div>

       <h3 className="text-3xl font-black text-white mb-6">Match Prep</h3>
       
       <div className="space-y-4">
          <div onClick={onChecklist} className="bg-[#121826] border border-white/5 rounded-3xl p-6 flex items-center gap-6 cursor-pointer group">
             <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                <CheckSquare className="w-7 h-7" />
             </div>
             <div className="flex-1">
                <h4 className="text-white font-bold text-xl mb-1">Pre-match Checklist</h4>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">Equipment, nutrition, mental, physical and tactical prep</p>
             </div>
             <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-600 group-hover:text-white transition-colors">
                <ChevronRight className="w-5 h-5" />
             </div>
          </div>

          <div className="bg-[#121826] border border-white/5 rounded-3xl p-6">
             <div className="flex items-center gap-6 mb-8">
                <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                   <Utensils className="w-7 h-7" />
                </div>
                <div className="flex-1">
                   <h4 className="text-white font-bold text-xl mb-1">Pre-match Meal</h4>
                   <p className="text-gray-500 text-sm font-medium">Recommended: 3 hrs before kick-off</p>
                </div>
                <div className="w-8 h-8 rounded-lg border-4 border-gray-800" />
             </div>
             <button 
              onClick={() => alert('Meal logged!')}
              className="w-full py-4 bg-[#1E293B] rounded-full text-white font-bold flex items-center justify-center gap-2 border border-white/5"
             >
                <Edit3 className="w-5 h-5" /> Log Intake
             </button>
          </div>

          <div className="relative overflow-hidden bg-gradient-to-br from-[#1A202C] to-[#0D121D] border border-white/5 rounded-[2.5rem] p-10">
             <div className="flex items-center gap-6 mb-8">
                <div className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center text-white">
                   <RunningIcon className="w-8 h-8" />
                </div>
                <div>
                   <h4 className="text-white font-bold text-xl mb-1">Warm-up Protocol</h4>
                   <p className="text-gray-500 text-sm font-medium">Duration: 20 min</p>
                </div>
             </div>
             <button 
              onClick={() => alert('Starting Warm-up Session...')}
              className="w-full py-5 bg-red-500 rounded-full text-white font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-red-500/20"
             >
                <ArrowRight className="w-6 h-6" fill="currentColor" /> Start Session
             </button>
          </div>
       </div>

       <div className="fixed bottom-6 left-6 right-6 z-10 animate-in slide-in-from-bottom duration-500">
          <div className="bg-[#38A169] text-white px-8 py-5 rounded-2xl font-bold shadow-2xl flex items-center justify-between">
             <span>Match added successfully</span>
             <Check className="w-6 h-6" strokeWidth={4} />
          </div>
       </div>
    </div>
  );
};

const RunningIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 4v.01"/><path d="M4 15a4 4 0 1 0 8 0 4 4 0 0 0-8 0"/><path d="M12 15h.01"/><path d="M15 15h.01"/><path d="M18 15h.01"/><path d="M21 15h.01"/><path d="M5 20h14"/><path d="M19 15a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z"/>
  </svg>
);

const MatchAddView = ({ onBack, onComplete }: { onBack: () => void, onComplete: (match: Match) => void }) => {
  const [opponent, setOpponent] = useState('');
  const [date, setDate] = useState('Thu, Apr 30');
  const [time, setTime] = useState('3:00 PM');
  const [type, setType] = useState<'League' | 'Cup' | 'Friendly'>('League');
  const [side, setSide] = useState<'Home' | 'Away'>('Home');

  const handleSave = () => {
    if (!opponent) return;
    onComplete({
      id: Math.random().toString(36).substr(2, 9),
      opponent,
      date,
      time,
      type,
      side
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-[#05080D]">
      <div className="p-6 flex items-center justify-between mb-8">
        <button onClick={onBack} className="text-gray-400 font-bold">Cancel</button>
        <h2 className="text-white font-black text-xl">New Match</h2>
        <button onClick={handleSave} className="text-white">
           <Check className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-32">
        <h3 className="text-2xl font-black text-white mb-8">Match Details</h3>
        
        <div className="space-y-10">
           <div>
              <label className="text-gray-600 font-bold block mb-4">Opponent *</label>
              <input 
                type="text" 
                value={opponent}
                onChange={(e) => setOpponent(e.target.value)}
                placeholder="Opponent" 
                className="w-full h-20 bg-[#121826] border border-blue-500/20 rounded-2xl px-8 text-white text-xl font-bold placeholder:text-gray-700 outline-none focus:border-red-500" 
              />
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div>
                 <label className="text-gray-600 font-bold block mb-4">Date & Time *</label>
                 <div className="h-20 bg-[#121826] border border-blue-500/20 rounded-2xl px-8 flex items-center justify-between text-gray-500">
                    <span className="font-bold">{date}</span>
                    <Calendar className="w-6 h-6" />
                 </div>
              </div>
              <div className="mt-10">
                 <div className="h-20 bg-[#121826] border border-blue-500/20 rounded-2xl px-8 flex items-center justify-between text-gray-500">
                    <span className="font-bold">{time}</span>
                    <Clock className="w-6 h-6" />
                 </div>
              </div>
           </div>

           <div>
              <input type="text" placeholder="Location (optional)" className="w-full h-20 bg-[#121826] border border-blue-500/20 rounded-2xl px-8 text-white text-xl font-bold placeholder:text-gray-700 outline-none" />
           </div>

           <div>
              <label className="text-gray-600 font-bold block mb-4">Match Type</label>
              <div className="grid grid-cols-3 gap-3">
                 {['League', 'Cup', 'Friendly'].map(t => (
                    <button 
                      key={t} 
                      onClick={() => setType(t as any)}
                      className={cn(
                       "h-16 rounded-2xl font-bold transition-all border",
                       type === t ? "bg-red-500/10 border-red-500 text-red-500" : "bg-[#121826] border-white/5 text-gray-500"
                    )}>{t}</button>
                 ))}
              </div>
           </div>

           <div>
              <label className="text-gray-600 font-bold block mb-4">Home / Away</label>
              <div className="grid grid-cols-2 gap-4">
                 {['Home', 'Away'].map(s => (
                    <button 
                      key={s} 
                      onClick={() => setSide(s as any)}
                      className={cn(
                       "h-16 rounded-2xl font-bold transition-all border text-lg",
                       side === s ? "bg-red-500/10 border-red-500 text-red-500" : "bg-[#121826] border-white/5 text-gray-500"
                    )}>{s}</button>
                 ))}
              </div>
           </div>

           <div>
              <input type="text" placeholder="Competition (optional)" className="w-full h-20 bg-[#121826] border border-blue-500/20 rounded-2xl px-8 text-white font-bold placeholder:text-gray-700 outline-none" />
           </div>
        </div>

        <div className="mt-16 space-y-6">
           <Button onClick={handleSave} className="w-full">Save Match</Button>
           <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-6 flex items-center gap-6">
              <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                 <Info className="w-5 h-5 text-yellow-500" />
              </div>
              <p className="text-gray-400 font-medium text-sm">Your weekly training plan will automatically adjust around this match</p>
           </div>
        </div>
      </div>
    </div>
  );
};

const MatchChecklistView = ({ match, items, setItems, onBack }: { match: Match | null, items: ChecklistItem[], setItems: React.Dispatch<React.SetStateAction<ChecklistItem[]>>, onBack: () => void }) => {
  const completedCount = items.filter(i => i.completed).length;
  const totalCount = items.length;
  const percent = Math.round((completedCount / totalCount) * 100);

  const toggleItem = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  return (
    <div className="flex-1 flex flex-col bg-[#05080D]">
      <div className="p-6 flex items-center gap-8 mb-4">
        <button onClick={onBack} className="text-white"><ArrowLeft className="w-6 h-6" /></button>
        <h2 className="text-white font-bold text-xl">Pre-Match Checklist</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-32">
        <div className="bg-[#121826] border border-white/5 rounded-3xl p-6 mb-8 flex items-center gap-6">
           <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-red-500 flex items-center justify-center">
                 <div className="w-4 h-4 bg-red-500 rounded-full" />
              </div>
           </div>
           <div>
              <h3 className="text-white font-black text-xl mb-1">vs. {match?.opponent || 'N/A'}</h3>
              <p className="text-gray-500 font-bold mb-1">{match?.date || 'N/A'} • {match?.time || 'N/A'}</p>
              <p className="text-red-500/80 font-black text-[10px] uppercase">1d 17h</p>
           </div>
        </div>

        {/* Progress Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#1A202C] to-[#0D121D] border border-white/5 rounded-[2.5rem] p-10 mb-10 flex items-center gap-10">
           <div className="relative w-28 h-28 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-[6px] border-white/5" />
              <div className="absolute inset-0 rounded-full border-[6px] border-red-500/50 clip-path-half animate-pulse" style={{ clipPath: 'inset(0 0 50% 0)' }} />
              <div className="flex flex-col items-center">
                 <AlertTriangle className="w-4 h-4 text-orange-500 mb-1" />
                 <span className="text-3xl font-black text-white">{completedCount}</span>
                 <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">items</span>
              </div>
           </div>
           <div>
              <h4 className="text-white font-black text-2xl mb-2">Preparation: {percent}% Complete</h4>
              <p className="text-gray-500 font-bold mb-2">{completedCount} of {totalCount} items completed</p>
              <p className="text-yellow-500 font-bold text-sm">1 unsaved changes</p>
           </div>
        </div>

        <div className="flex gap-3 mb-10">
           <button onClick={() => setItems(items.map(i => ({...i, completed: true})))} className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold flex items-center justify-center gap-2">
              <Check className="w-4 h-4" /> Mark all done
           </button>
           <button onClick={() => setItems(items.map(i => ({...i, completed: false})))} className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold flex items-center justify-center gap-2">
              <Plus className="w-4 h-4 rotate-45" /> Clear all
           </button>
        </div>

        {/* Categories */}
        {['Equipment', 'Nutrition', 'Mental', 'Physical', 'Tactical'].map(cat => (
           <div key={cat} className="bg-[#121826] border border-white/5 rounded-[2.5rem] p-8 mb-6">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                       {cat === 'Equipment' ? <Box className="w-5 h-5" /> :
                        cat === 'Nutrition' ? <Utensils className="w-5 h-5" /> :
                        cat === 'Mental' ? <Lightbulb className="w-5 h-5" /> :
                        cat === 'Physical' ? <Activity className="w-5 h-5" /> :
                        <Activity className="w-5 h-5" />}
                    </div>
                    <h5 className="text-white font-black text-2xl">{cat}</h5>
                 </div>
                 <span className="text-gray-600 font-black">{items.filter(i => i.category === cat && i.completed).length}/{items.filter(i => i.category === cat).length}</span>
              </div>

              <div className="space-y-8">
                 {items.filter(item => item.category === cat).map(item => (
                    <div key={item.id} onClick={() => toggleItem(item.id)} className="flex gap-6 cursor-pointer group">
                       <div className={cn(
                          "w-8 h-8 rounded-xl border-4 transition-all flex items-center justify-center flex-shrink-0 mt-1",
                          item.completed ? "bg-red-500 border-red-500" : "bg-transparent border-gray-800"
                       )}>
                          {item.completed && <Check className="w-5 h-5 text-white" strokeWidth={4} />}
                       </div>
                       <div>
                          <h6 className={cn("text-xl font-bold transition-all", item.completed ? "text-gray-600 line-through" : "text-white")}>{item.label}</h6>
                          {item.sublabel && <p className="text-gray-500 font-medium text-sm mt-1">{item.sublabel}</p>}
                       </div>
                    </div>
                 ))}
                 {items.filter(item => item.category === cat).length === 0 && <p className="text-gray-700 italic font-medium">Coming soon...</p>}
              </div>
           </div>
        ))}
      </div>
    </div>
  );
};

const MoreView = ({ profile, stats, onLogout, onAiCoach, userName }: { profile: any, stats: Workout[], onLogout: () => void, onAiCoach: () => void, userName: string }) => {
  const avgRpe = stats.length > 0 ? (stats.reduce((acc, s) => acc + (s.rpe || 0), 0) / stats.length).toFixed(1) : '--';
  const [toast, setToast] = useState<string | null>(null);
  const showToast = (label: string) => { setToast(label); setTimeout(() => setToast(null), 2000); };

  return (
    <div className="p-6 h-full overflow-y-auto scrollbar-none pb-32">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-extrabold text-white font-sans">Profile</h1>
        <button 
          onClick={onLogout}
          className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-[#121826] border border-white/5 rounded-[2.5rem] p-10 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 blur-3xl opacity-50" />
        <div className="flex items-center gap-8 mb-10">
           <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white font-black text-4xl shadow-2xl">
              {userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'PB'}
           </div>
           <div>
              <h2 className="text-3xl font-black text-white mb-2">{userName}</h2>
              <p className="text-gray-500 font-bold mb-1">{userName.toLowerCase().replace(/\s+/g, '.') + '@projectballer.com'}</p>
              <p className="text-gray-600 text-sm font-medium">Member since Apr 2026</p>
           </div>
        </div>
        <button 
          onClick={() => showToast('Edit Profile')}
          className="w-full text-red-500 font-black uppercase text-xs tracking-widest hover:text-red-600 transition-colors"
        >
          Edit Profile
        </button>
      </div>

      {/* Trial Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1A202C] to-[#0D121D] border border-red-500/20 rounded-3xl p-8 mb-8">
        <div className="absolute top-0 right-0 p-8 text-gray-700">
           <Star className="w-6 h-6 text-red-500 fill-red-500" />
        </div>
        <div className="flex items-center gap-6">
           <div className="p-4 bg-red-500/10 rounded-2xl flex items-center justify-center">
              <Star className="w-6 h-6 text-red-500" fill="currentColor" />
           </div>
           <div className="flex-1">
              <h3 className="text-white font-black text-xl mb-1">Pro Trial</h3>
              <p className="text-gray-500 font-medium text-sm">Trial ends in 13 days</p>
           </div>
           <button 
            onClick={() => alert('Managing Subscription Settings...')}
            className="text-white font-bold text-sm bg-white/5 px-6 py-2 rounded-full border border-white/10"
           >
            Manage
           </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-12">
         {[
           { val: stats.length, lab: 'Workouts' },
           { val: '0', lab: 'Matches' },
           { val: avgRpe, lab: 'Avg RPE' }
         ].map(s => (
           <div key={s.lab} className="bg-[#121826] border border-white/5 rounded-3xl p-6 text-center">
              <p className="text-4xl font-black text-white mb-2">{s.val}</p>
              <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{s.lab}</p>
           </div>
         ))}
      </div>

      <h3 className="text-2xl font-black text-white mb-8">Menu</h3>
      
      <div className="bg-[#121826] border border-white/5 rounded-[2.5rem] overflow-hidden mb-12">
         {[
           { icon: Dumbbell, label: 'Exercise Library' },
           { icon: Trophy, label: 'Challenges' },
           { icon: Activity, label: 'Progress & Insights' },
           { icon: Watch, label: 'Health Connections' },
           { icon: Users, label: 'Community Feed' },
           { icon: ShoppingBag, label: 'Merch Shop' },
           { icon: Plus, label: 'Recovery & Rehab' },
           { icon: MessageSquare, label: 'AI Chat' },
           { icon: Gift, label: 'Referrals' },
         ].map((item, i) => (
           <div 
            key={item.label} 
            onClick={() => item.label === 'AI Chat' ? onAiCoach() : showToast(item.label)}
            className={cn(
             "p-8 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors group",
             i !== 8 && "border-b border-white/5"
           )}>
              <div className="flex items-center gap-6">
                 <item.icon className="w-6 h-6 text-gray-500 group-hover:text-white transition-colors" />
                 <span className="text-white font-bold text-xl">{item.label}</span>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-700" />
           </div>
         ))}
      </div>

      <h3 className="text-2xl font-black text-white mb-8">Support & Legal</h3>
       <div className="bg-[#121826] border border-white/5 rounded-[2.5rem] overflow-hidden mb-8">
          <div className="p-8 flex items-center justify-between cursor-pointer hover:bg-white/5">
             <div className="flex items-center gap-6">
                <HelpCircle className="w-6 h-6 text-gray-500" />
                <span className="text-white font-bold text-xl">Help Center</span>
             </div>
             <ChevronRight className="w-6 h-6 text-gray-700" />
          </div>
       </div>

        <button 
          onClick={onLogout}
          className="w-full py-8 bg-[#1A202C] border border-white/5 rounded-[2.5rem] text-red-500 font-black uppercase text-sm tracking-[0.2em] mb-12 flex items-center justify-center gap-3 hover:bg-red-500/5 transition-all"
        >
          <LogOut className="w-5 h-5" /> Log Out
        </button>

        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-36 left-1/2 -translate-x-1/2 bg-white text-[#0D121D] px-6 py-3 rounded-full font-bold text-sm shadow-2xl z-50 whitespace-nowrap"
          >
            {toast} — Coming Soon
          </motion.div>
        )}
    </div>
  );
};

const DashboardView = ({ profile, stats, onStartWorkout, onCalendar }: { profile: any, stats: Workout[], onStartWorkout: () => void, onCalendar?: () => void }) => {
  const avgRecovery = stats.length > 0 ? Math.round(stats.reduce((acc, s) => acc + (s.rpe * 10), 0) / stats.length) : 0;
  const totalLoad = stats.reduce((acc, s) => acc + (s.exercises.length * 10), 0);

  return (
    <div className="flex-1 flex flex-col bg-[#060B14] scrollbar-none pb-40">
      <div className="px-6 mb-8 mt-4">
        <h1 className="text-5xl font-black text-white leading-tight">
          {new Date().toLocaleDateString('en-US', { weekday: 'long' })}, <span className="text-gray-500">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        </h1>
      </div>

      {/* 1. RECOVERY RING */}
      <div className="flex flex-col items-center justify-center py-6 relative">
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Outer atmospheric glow — pulsing red radial gradient */}
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(229,62,62,0.25) 0%, rgba(229,62,62,0.08) 50%, transparent 70%)' }}
          />
          {/* Outer ring — subtle, with glow */}
          <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-60 h-60 rounded-full border border-[#E53E3E]/20"
            style={{ boxShadow: '0 0 30px rgba(229,62,62,0.15), inset 0 0 30px rgba(229,62,62,0.05)' }}
          />
          {/* Middle ring */}
          <motion.div
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute w-48 h-48 rounded-full border border-[#E53E3E]/30"
            style={{ boxShadow: '0 0 20px rgba(229,62,62,0.2)' }}
          />
          {/* Inner ring — brightest */}
          <motion.div
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            className="absolute w-36 h-36 rounded-full border-2 border-[#E53E3E]/50"
            style={{ boxShadow: '0 0 25px rgba(229,62,62,0.35), inset 0 0 15px rgba(229,62,62,0.1)' }}
          />
          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center">
            <AlertTriangle className="w-6 h-6 text-[#E53E3E] mb-1" />
            <motion.span
              animate={{ textShadow: ['0 0 10px rgba(229,62,62,0.5)', '0 0 25px rgba(229,62,62,0.9)', '0 0 10px rgba(229,62,62,0.5)'] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-7xl font-black text-[#E53E3E] leading-none"
            >0</motion.span>
            <div className="flex items-center gap-2 mt-1">
              <div className="h-px w-6 bg-[#E53E3E]/40"/>
              <span className="text-[#E53E3E]/60 text-xs font-bold">%</span>
              <div className="h-px w-6 bg-[#E53E3E]/40"/>
            </div>
            <div className="mt-2 px-4 py-1.5 rounded-full border border-[#E53E3E]/40 bg-[#E53E3E]/10">
              <span className="text-[#E53E3E] text-[10px] font-black tracking-[0.15em] uppercase">Recovery Needed</span>
            </div>
          </div>
        </div>
        <p className="text-[#E53E3E] text-sm font-bold mt-2">Consider Recovery</p>
      </div>

      {/* 2. STATS ROW */}
      <div className="px-5 grid grid-cols-3 gap-3 mb-8">
        <div className="bg-[#121826] border border-white/5 rounded-2xl p-4">
          <Heart className="w-5 h-5 text-red-500 mb-2" />
          <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-1">Load</p>
          <p className="text-white font-black text-lg">{totalLoad} <span className="text-[10px]">AU</span></p>
        </div>
        <div className="bg-[#121826] border border-white/5 rounded-2xl p-4">
          <Zap className="w-5 h-5 text-teal-400 mb-2" />
          <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-1">Recovery</p>
          <p className="text-white font-black text-lg">{avgRecovery}%</p>
        </div>
        <div className="bg-[#121826] border border-white/5 rounded-2xl p-4">
          <Moon className="w-5 h-5 text-blue-500 mb-2" />
          <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-1">Sleep</p>
          <p className="text-white font-black text-lg">0</p>
        </div>
      </div>

      {/* 3. TODAY'S FOCUS CARD */}
      <div className="mx-4 mb-4 rounded-[2rem] overflow-hidden relative" style={{
        background: 'linear-gradient(135deg, #1C0808 0%, #2D0E0E 40%, #1C0808 100%)',
        boxShadow: '0 8px 32px rgba(229,62,62,0.2), inset 0 0 40px rgba(229,62,62,0.05)'
      }}>
        {/* Red glow blob top-right */}
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full" style={{
          background: 'radial-gradient(circle, rgba(229,62,62,0.3) 0%, transparent 70%)',
          transform: 'translate(30%,-30%)'
        }}/>
        <div className="relative z-10 p-6">
          <div className="flex items-center gap-2 mb-3">
            <motion.div animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-2 h-2 rounded-full bg-[#E53E3E]"/>
            <span className="text-[#E53E3E] text-[10px] font-black uppercase tracking-widest">Today's Focus</span>
          </div>
          <h3 className="text-white text-2xl font-black mb-1">No Session Today</h3>
          <p className="text-gray-400 text-sm mb-4">Check back later for your training plan.</p>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {[1,2,3].map(i=>(
                <div key={i} className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-500"/>
                </div>
              ))}
            </div>
            <button onClick={onStartWorkout} className="bg-[#E53E3E] px-5 py-2.5 rounded-xl font-black text-white text-sm shadow-lg shadow-red-500/30 flex items-center gap-2">
              Start Session <ArrowRight className="w-4 h-4"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AiCoachView = ({ onBack }: { onBack: () => void }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'coach'; text: string }[]>([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const QUICK_REPLIES = ['Swap an exercise', 'Pre-match meal ideas', 'Reduce training soreness', 'Improve first touch']
  const COACH_REPLIES = [
    "Great question! Based on your current training load, I recommend focusing on recovery today. Prioritise 8 hours of sleep and a high-protein meal post-session.",
    "For your position, explosive short sprints (10-20m) 3x per week will significantly improve your pace. Make sure to rest 48h before match day.",
    "Pre-match nutrition: 2-3 hours before kick-off, eat complex carbs and lean protein. Avoid high-fat or high-fibre foods that could cause discomfort.",
    "Soreness after training is normal. Ice bath for 10 minutes, foam roll the quads and hamstrings, and ensure you're hitting your protein target (1.6-2g per kg bodyweight).",
  ]

  const send = (text: string) => {
    if (!text.trim()) return
    const userMsg = { role: 'user' as const, text: text.trim() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      const reply = COACH_REPLIES[Math.floor(Math.random() * COACH_REPLIES.length)]
      setMessages(prev => [...prev, { role: 'coach', text: reply }])
      setTyping(false)
    }, 1200)
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  return (
    <div className="flex-1 flex flex-col bg-[#05080D]">
      <div className="p-6 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-white"><ArrowLeft className="w-6 h-6" /></button>
          <div className="flex flex-col">
            <h2 className="text-white font-bold text-xl">AI Coach</h2>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Online</span>
            </div>
          </div>
        </div>
        <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400">
          <Info className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full -mt-12">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="w-32 h-32 rounded-full bg-[#1A202C] border-4 border-white/5 flex items-center justify-center mb-8">
              <Sparkles className="w-14 h-14 text-red-500" />
            </motion.div>
            <h3 className="text-2xl font-black text-white mb-8 text-center">What can I help you with?</h3>
            <div className="grid grid-cols-2 gap-3 w-full">
              {QUICK_REPLIES.map(text => (
                <button key={text} onClick={() => send(text)}
                  className="bg-[#121826] border border-white/5 rounded-2xl p-4 text-gray-300 font-bold text-sm text-center hover:bg-white/5 hover:border-white/10 transition-all active:scale-95">
                  {text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4 pt-4">
            {messages.map((msg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-3`}>
                {msg.role === 'coach' && (
                  <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Sparkles className="w-4 h-4 text-red-500" />
                  </div>
                )}
                <div className={`max-w-[80%] px-5 py-4 rounded-2xl text-sm font-medium leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#E53E3E] text-white rounded-br-sm'
                    : 'bg-[#1A202C] border border-white/5 text-gray-200 rounded-bl-sm'
                }`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
            {typing && (
              <div className="flex justify-start gap-3">
                <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-red-500" />
                </div>
                <div className="bg-[#1A202C] border border-white/5 px-5 py-4 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                  {[0,1,2].map(i => (
                    <motion.div key={i} className="w-2 h-2 rounded-full bg-gray-500"
                      animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <div className="p-6 pb-10 flex items-center gap-3 flex-shrink-0 border-t border-white/5">
        <div className="flex-1 relative">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send(input)}
            placeholder="Ask about your training..."
            className="w-full h-14 bg-[#121826] border border-white/10 rounded-2xl px-6 text-white font-medium placeholder:text-gray-600 focus:outline-none focus:border-red-500/50 transition-all"
          />
        </div>
        <button onClick={() => send(input)}
          className="w-14 h-14 rounded-full bg-[#E53E3E] shadow-xl shadow-red-500/20 flex items-center justify-center text-white active:scale-95 transition-transform">
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

const ReferralCodeView = ({ onComplete }: { onComplete: () => void }) => (
  <div className="flex-1 flex flex-col p-8">
    <div className="mb-8">
      <span className="text-[10px] font-black tracking-widest text-[#E53E3E] bg-[#E53E3E]/10 px-3 py-1 rounded-full uppercase">Optional</span>
    </div>
    <h2 className="text-3xl font-extrabold mb-4 text-white font-sans leading-tight">
      Got a referral code?
    </h2>
    <p className="text-gray-400 font-medium mb-8">
      If a friend, coach, or club shared one with you, paste it here and we will attach it to your profile.
    </p>
    
    <div className="relative mb-8">
      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        <Trophy className="w-5 h-5 text-gray-500" />
      </div>
      <input 
        type="text" 
        placeholder="Referral Code" 
        className="w-full bg-[#121826] border border-white/5 rounded-2xl py-5 px-12 text-white font-bold placeholder:text-gray-600 focus:outline-none focus:border-[#E53E3E]/50 transition-all"
      />
    </div>

    <p className="text-gray-500 text-sm font-medium mb-auto">
      No code? You can continue without it.
    </p>

    <div className="space-y-4">
      <Button onClick={onComplete} className="w-full">
        Continue <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
      <button onClick={onComplete} className="w-full text-gray-500 font-black text-sm uppercase tracking-widest py-2">
        Skip
      </button>
    </div>
  </div>
);

const ConnectWatchView = ({ onComplete }: { onComplete: () => void }) => {
  const [connected, setConnected] = useState<string | null>(null);
  return (
    <div className="flex-1 flex flex-col p-8">
      <div className="bg-white rounded-3xl p-6 mb-8 flex flex-col items-center justify-center text-center">
        <div className="relative w-24 h-24 mb-4">
          <div className="absolute inset-0 bg-red-500 opacity-20 animate-ping rounded-full" />
          <div className="absolute inset-0 flex items-center justify-center bg-black rounded-3xl border border-white/10">
            <CircleCheck className="w-12 h-12 text-white" />
          </div>
        </div>
        <h3 className="text-black font-black text-xl mb-2">Connect Your Watch Data</h3>
      </div>

      <h2 className="text-3xl font-extrabold mb-4 text-white font-sans leading-tight">
        Connect Your Watch
      </h2>
      <p className="text-gray-400 font-medium mb-8">
        Sync metrics from your watch to influence readiness scoring and personalise your plan further.
      </p>

      {connected !== 'Samsung' && (
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4 mb-6">
          <p className="text-orange-400 text-sm font-medium">
            Health Connect is not installed or outdated. Tap Samsung Watch to install/update.
          </p>
        </div>
      )}

      <div className="space-y-3 mb-auto">
        {[
          { name: 'Apple Watch', sub: 'Available on iPhone only', status: 'Unavailable', icon: '🍎' },
          { name: 'Samsung Watch', sub: 'Via Health Connect', status: 'Connect', icon: '⌚️' }
        ].map((watch) => (
          <div key={watch.name} className="flex items-center justify-between p-5 bg-[#121826] border border-white/5 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <span className="text-xl">{watch.icon}</span>
              </div>
              <div>
                <div className="text-white font-bold">{watch.name}</div>
                <div className="text-gray-500 text-xs font-medium">{watch.sub}</div>
              </div>
            </div>
            {watch.name === 'Samsung Watch' ? (
              <button
                onClick={() => setConnected(connected === 'Samsung' ? null : 'Samsung')}
                className={`font-bold text-sm transition-colors ${connected === 'Samsung' ? 'text-green-400' : 'text-blue-400'}`}
              >
                {connected === 'Samsung' ? '✓ Connected' : 'Connect'}
              </button>
            ) : (
              <div className="text-blue-400 font-bold text-sm">{watch.status}</div>
            )}
          </div>
        ))}
        <div className="flex items-center justify-between p-5 opacity-50">
          <div className="flex items-center gap-4">
            <Clock className="w-5 h-5 text-gray-500" />
            <span className="text-gray-500 text-sm font-medium italic">No sync yet. Connect a watch to get started</span>
          </div>
          <span className="text-red-500 font-bold text-sm">Sync</span>
        </div>
      </div>

      <div className="space-y-4">
        <Button onClick={onComplete} className="w-full">
          Continue <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        <button onClick={onComplete} className="w-full text-gray-500 font-black text-sm uppercase tracking-widest py-2">
          Skip
        </button>
      </div>
    </div>
  );
};

const TestimonialsView = ({ onComplete }: { onComplete: () => void }) => (
  <div className="flex-1 flex flex-col p-8">
    <h2 className="text-3xl font-extrabold mb-8 text-white font-sans leading-tight">
      ProjectBaller was made for players like you
    </h2>
    
    <div className="flex justify-center gap-1 mb-8">
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.span 
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="text-orange-400 text-2xl"
        >
          ★
        </motion.span>
      ))}
    </div>

    <div className="space-y-4 mb-auto">
      {[
        { name: 'Rebecca V.', text: "I've been injury-free ever since I started using ProjectBaller's load management tools! It's been amazing so far and I feel better than ever on the pitch." },
        { name: 'Alex C.', text: "My coach says my performance has improved dramatically. The training plans are spot on for my position." },
        { name: 'Marcus T.', text: "Finally an app that actually understands football training. Way better than generic fitness apps." }
      ].map((rev, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.2 }}
          className="bg-[#121826] border border-white/5 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 font-black">
                {rev.name[0]}
              </div>
              <span className="text-white font-bold">{rev.name}</span>
            </div>
            <div className="text-orange-400 text-xs">★★★★★</div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed font-medium italic">
            {rev.text}
          </p>
        </motion.div>
      ))}
    </div>

    <Button onClick={onComplete} className="w-full mt-8">
      Continue <ArrowRight className="w-5 h-5 ml-2" />
    </Button>
  </div>
);

const GeneratingView = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <div className="flex-1 flex flex-col bg-black">
      <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-black text-white mb-8 text-center leading-tight">
          Time to generate your<br />Customized Profile!
        </h2>

        <div className="relative w-80 h-80 mx-auto my-8">
          {/* Orbit Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 border-2 border-dashed border-[#E53E3E]/40 rounded-full"
          />

          {/* Center Logo Pulse */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-28 h-28 bg-[#E53E3E] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(229,62,62,0.6)]"
            >
              <ProjectBallerLogo className="w-14 h-14 text-white" />
            </motion.div>
          </div>

          {/* Orbiting Pills */}
          {[
            { label: 'Nutrition', icon: '🍴', pos: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2', delay: 0 },
            { label: 'Recovery', icon: '❤️', pos: 'left-0 top-1/2 -translate-y-1/2 -translate-x-1/2', delay: 0.5 },
            { label: 'Performance', icon: '↑', pos: 'right-0 top-1/2 -translate-y-1/2 translate-x-1/2', delay: 1.0 },
            { label: 'Strength', icon: '💪', pos: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2', delay: 1.5 },
          ].map((pill, i) => (
            <div key={i} className={`absolute ${pill.pos}`}>
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: pill.delay }}
                className="bg-[#1A202C] border border-white/10 rounded-full px-4 py-2 text-white font-bold text-sm flex items-center gap-2 whitespace-nowrap shadow-xl"
              >
                <span className="text-sm">{pill.icon}</span>
                {pill.label}
              </motion.div>
            </div>
          ))}
        </div>

        <p className="text-gray-400 text-center text-sm px-8 mt-4">
          We'll use all your responses to craft the perfect personalised experience just for you!
        </p>
      </div>

      <div className="p-8 pt-0">
        <Button 
          onClick={onComplete} 
          className="w-full h-16 rounded-full bg-[#E53E3E] text-white font-black text-lg flex items-center justify-center gap-2 shadow-2xl hover:bg-[#D43737] transition-all active:scale-95"
        >
          Generate My Plan <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

const PlanReadyView = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(timer);
  }, []);

  const items = [
    "Your personalized profile",
    "Scheduling around your match days",
    "Planning your strength and conditioning",
    "Sleep & recovery",
    "Configuring nutrition for peak performance",
    "Performance milestones",
    "Finalising your plan"
  ];

  return (
    <div className="flex-1 flex flex-col p-8">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-black text-white mb-4">{progress}%</h1>
        <h2 className="text-2xl font-bold text-white">Your plan is ready!</h2>
      </div>

      <div className="w-full h-1 bg-white/10 rounded-full mb-8 relative overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
          className="absolute inset-y-0 left-0 bg-[#E53E3E]"
        />
      </div>

      <p className="text-[#E53E3E] font-bold text-center text-sm mb-12">Tap below to view your plan</p>

      <div className="mb-8">
        <p className="text-gray-600 text-[10px] font-black tracking-widest uppercase mb-6">Your personalised recommendations</p>
        <div className="space-y-4">
          {items.map((item, i) => {
            const isDone = progress >= ((i + 1) / items.length) * 100;
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-1 h-1 bg-gray-500 rounded-full" />
                  <span className="text-white font-medium text-sm">{item}</span>
                </div>
                <div className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300",
                  isDone ? "bg-red-500 scale-110" : "bg-white/5 border border-white/10 scale-100"
                )}>
                  {isDone && <Check className="w-3 h-3 text-white" />}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <Button onClick={onComplete} className="w-full mt-auto" disabled={progress < 100}>
        Let's get started! <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </div>
  );
};

const PlanResultsView = ({ onComplete }: { onComplete: () => void }) => (
  <div className="flex-1 flex flex-col p-8">
    <div className="flex flex-col items-center text-center gap-4 mb-8">
      <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.3)]">
        <Check className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-2xl font-black text-white leading-tight">
        Congratulations<br />your custom plan is ready!
      </h2>
    </div>

    <div className="flex flex-col items-center gap-2 mb-8">
      <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Estimated target weight</p>
      <div className="bg-[#121826] border border-white/5 rounded-3xl py-4 px-12 flex flex-col items-center">
        <span className="text-white text-3xl font-black">62 kg</span>
      </div>
      <p className="text-gray-600 text-[10px] font-bold">Range 61.5-62.5 kg</p>
    </div>

    <div className="bg-[#121826] border border-white/5 rounded-3xl p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-black">Estimated recommendation</h3>
      </div>
      <p className="text-gray-500 text-[10px] italic mb-6">Live values will replace this automatically when available</p>
      
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Calories', val: '2727', unit: '', color: 'border-white', icon: '🔥' },
          { label: 'Carbs', val: '399', unit: 'g', color: 'border-orange-400', icon: '🌾' },
          { label: 'Protein', val: '112', unit: 'g', color: 'border-red-500', icon: '🥩' },
          { label: 'Fats', val: '76', unit: 'g', color: 'border-blue-400', icon: '💧' }
        ].map((stat) => (
          <div key={stat.label} className="bg-black/20 rounded-2xl p-4 flex flex-col items-center justify-center border border-white/5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs">{stat.icon}</span>
              <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{stat.label}</span>
            </div>
            <div className={cn("w-16 h-16 rounded-full border-4 flex items-center justify-center", stat.color)}>
              <span className="text-white font-bold">{stat.val}<span className="text-[10px]">{stat.unit}</span></span>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="flex items-center gap-4 p-4 bg-[#121826] rounded-2xl mb-auto border border-white/5">
      <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
        <Clock className="w-5 h-5 text-red-500" />
      </div>
      <div>
        <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Timeline</p>
        <p className="text-white font-bold text-sm">6 months target window</p>
      </div>
    </div>

    <Button onClick={onComplete} className="w-full mt-8">
      Let's get started! <ArrowRight className="w-5 h-5 ml-2" />
    </Button>
  </div>
);

const TrialIntroView = ({ onComplete }: { onComplete: () => void }) => (
  <div className="flex-1 flex flex-col bg-[#060B14] relative h-full">
    {/* Header Section */}
    <div className="absolute top-12 left-6 flex items-center gap-2 z-30">
      <div className="w-8 h-2 bg-red-500 rounded-full" />
      <div className="w-2 h-2 bg-gray-600 rounded-full" />
      <div className="w-2 h-2 bg-gray-600 rounded-full" />
    </div>
    <button 
      onClick={onComplete}
      className="absolute top-12 right-6 text-gray-500 text-xl font-bold z-30 hover:text-white transition-colors"
    >
      ✕
    </button>

    <div className="pt-16 pb-0 text-center px-6">
      <h2 className="text-white text-[32px] font-black leading-tight mb-3">
        We want you to try<br />ProjectBaller for free
      </h2>
      <p className="text-gray-400 text-sm px-8">
        See how the app helps you train, recover, and improve every day.
      </p>
    </div>

    <div className="relative flex items-center justify-center mt-10 h-[380px] overflow-hidden">
      {/* Left phone - Nutrition screen */}
      <div className="absolute left-0 w-44 h-[300px] rounded-[2rem] bg-[#0D121D] border-2 border-white/10 overflow-hidden -rotate-6 -translate-x-6 opacity-70 z-10" style={{boxShadow:'0 20px 40px rgba(0,0,0,0.5)'}}>
        <div className="p-3">
          <p className="text-[#E53E3E] text-[8px] font-black tracking-widest">BALLERPRO FUEL</p>
          <p className="text-white text-sm font-black">Nutrition</p>
          <p className="text-gray-500 text-[8px]">Today, Mar 29</p>
          <div className="mt-2 bg-[#121826] rounded-xl p-2">
            <p className="text-gray-500 text-[7px] uppercase tracking-wider">CALORIES CONSUMED</p>
            <div className="flex items-baseline gap-1">
              <span className="text-white text-lg font-black">375</span>
              <span className="text-gray-500 text-[8px]">/2400</span>
            </div>
            <div className="flex gap-2 mt-2">
              {[{v:'141%',c:'#F97316',l:'PROTEIN'},{v:'80%',c:'#3B82F6',l:'CARBS'},{v:'1096%',c:'#EAB308',l:'FATS'}].map(m=>(
                <div key={m.l} className="flex-1 flex flex-col items-center">
                  <div className="relative w-10 h-10">
                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                      <circle cx="18" cy="18" r="15" fill="none" stroke="#1A202C" strokeWidth="3"/>
                      <circle cx="18" cy="18" r="15" fill="none" stroke={m.c} strokeWidth="3" strokeDasharray="94" strokeDashoffset="20"/>
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[7px] font-black" style={{color:m.c}}>{m.v}</span>
                  </div>
                  <p className="text-gray-600 text-[6px] mt-0.5">{m.l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-2 bg-[#121826] rounded-xl p-2 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-400 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-200"/>
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <p className="text-white text-[7px] font-bold">Hydration</p>
                <p className="text-gray-400 text-[7px]">1000 / 2500ml</p>
              </div>
              <div className="h-1 bg-[#1A202C] rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{width:'40%'}}/>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Center phone - Dashboard screen (MAIN, larger) */}
      <div className="relative w-52 h-[360px] rounded-[2.5rem] bg-[#0D121D] border-2 border-white/10 overflow-hidden z-20" style={{boxShadow:'0 30px 60px rgba(0,0,0,0.7)'}}>
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full border border-white/50"/>
              </div>
              <span className="text-white text-[8px] font-bold">ProjectBaller</span>
            </div>
            <div className="flex gap-1">
              <div className="w-5 h-5 rounded-lg bg-white/10 flex items-center justify-center">
                <Calendar className="w-2.5 h-2.5 text-gray-400"/>
              </div>
              <div className="w-5 h-5 rounded-lg bg-white/10 flex items-center justify-center">
                <Bell className="w-2.5 h-2.5 text-gray-400"/>
              </div>
            </div>
          </div>
          <p className="text-white text-xs font-black">Thursday, <span className="text-gray-400">Apr 16</span></p>
          
          {/* Mini recovery ring */}
          <div className="flex justify-center my-3">
            <div className="relative w-20 h-20">
              <svg viewBox="0 0 80 80" className="w-full h-full">
                <defs>
                  <radialGradient id="ringGlow2" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="#E53E3E" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#E53E3E" stopOpacity="0"/>
                  </radialGradient>
                </defs>
                <circle cx="40" cy="40" r="38" fill="url(#ringGlow2)"/>
                <circle cx="40" cy="40" r="32" fill="none" stroke="#E53E3E" strokeWidth="2" opacity="0.3"/>
                <circle cx="40" cy="40" r="24" fill="none" stroke="#E53E3E" strokeWidth="1.5" opacity="0.2"/>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[#E53E3E] text-[8px]">⚠</span>
                <span className="text-[#E53E3E] text-2xl font-black leading-none">0</span>
                <span className="text-gray-500 text-[6px]">%</span>
                <div className="bg-[#E53E3E]/20 border border-[#E53E3E]/40 rounded-full px-2 py-0.5 mt-0.5">
                  <span className="text-[#E53E3E] text-[5px] font-black tracking-widest">RECOVERY NEEDED</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-gray-500 text-[7px] text-center mb-2">Next match in 2 days</p>
          
          {/* Stats row */}
          <div className="flex gap-1 mb-2">
            {[{icon:'❤️',label:'LOAD',val:'0 AU'},{icon:'⚡',label:'RECOVERY',val:'0%'},{icon:'🌙',label:'SLEEP',val:'0'}].map(s=>(
              <div key={s.label} className="flex-1 bg-[#121826] rounded-lg p-1.5">
                <span className="text-[8px]">{s.icon}</span>
                <p className="text-gray-500 text-[5px] uppercase tracking-wider mt-0.5">{s.label}</p>
                <p className="text-white text-[8px] font-black">{s.val}</p>
              </div>
            ))}
          </div>
          
          {/* Today's Focus card */}
          <div className="rounded-xl overflow-hidden" style={{background:'linear-gradient(135deg,#1a0a0a,#2d0f0f,#1a0a0a)'}}>
            <div className="p-2">
              <div className="flex items-center gap-1 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500"/>
                <span className="text-red-500 text-[6px] font-black uppercase tracking-wider">TODAY'S FOCUS</span>
              </div>
              <p className="text-white text-[9px] font-black">MD-3 Strength (Lower)</p>
              <p className="text-gray-400 text-[6px] mb-2">Built from your constraints and match schedule.</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {[1,2,3].map(i=><div key={i} className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center"><User className="w-2 h-2 text-gray-400"/></div>)}
                </div>
                <div className="bg-[#E53E3E] rounded-lg px-2 py-1">
                  <span className="text-white text-[6px] font-black">Start Session ▶</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mini AI button */}
          <div className="flex justify-end mt-1">
            <div className="w-7 h-7 rounded-full bg-[#E53E3E] shadow-lg flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white"/>
            </div>
          </div>
        </div>
        
        {/* Bottom nav */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#0D121D] border-t border-white/5 flex">
          {['Home','Train','Fuel','Social','Match','More'].map((t,i)=>(
            <div key={t} className={`flex-1 py-1.5 flex flex-col items-center gap-0.5 ${i===0?'text-[#E53E3E]':'text-gray-600'}`}>
              <div className={`w-3 h-3 rounded-sm ${i===0?'bg-[#E53E3E]/20':''}`}/>
              <span className="text-[5px] font-bold">{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right phone - Match Day Hub */}
      <div className="absolute right-0 w-44 h-[300px] rounded-[2rem] bg-[#0D121D] border-2 border-white/10 overflow-hidden rotate-6 translate-x-6 opacity-70 z-10" style={{boxShadow:'0 20px 40px rgba(0,0,0,0.5)'}}>
        <div className="p-3">
          <p className="text-gray-500 text-[7px] font-black text-center tracking-widest">MATCH DAY HUB</p>
          <div className="flex justify-center mt-1 mb-1">
            <div className="flex items-center gap-1 bg-red-500/20 border border-red-500/30 rounded-full px-2 py-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"/>
              <span className="text-red-500 text-[7px] font-black">MATCH TODAY</span>
            </div>
          </div>
          <p className="text-white text-sm font-black text-center">vs. City fav</p>
          <p className="text-gray-500 text-[7px] text-center">⏱ Kick-off: Mon, Mar 30 • 3:00 PM</p>
          <div className="mt-2 bg-[#121826] rounded-xl p-2">
            <p className="text-gray-500 text-[6px] uppercase tracking-wider mb-1">TIME TO KICK-OFF</p>
            <div className="flex items-center justify-center gap-1">
              <span className="text-white text-lg font-black">23</span>
              <span className="text-gray-500 text-sm font-black">:</span>
              <span className="text-white text-lg font-black">01</span>
              <span className="text-gray-500 text-sm font-black">:</span>
              <span className="text-[#E53E3E] text-lg font-black">08</span>
            </div>
            <div className="flex justify-center gap-4">
              {['HOURS','MINS','SECS'].map(l=><span key={l} className="text-gray-600 text-[5px] uppercase">{l}</span>)}
            </div>
          </div>
          <p className="text-white text-[8px] font-bold mt-2 mb-1">Match Prep</p>
          <div className="bg-[#121826] rounded-lg p-2 mb-1 flex items-center gap-2">
            <div className="w-5 h-5 rounded-lg bg-white/10 flex items-center justify-center">
              <span className="text-[8px]">🍴</span>
            </div>
            <div className="flex-1">
              <p className="text-white text-[7px] font-bold">Pre-match Meal</p>
              <p className="text-gray-500 text-[6px]">Recommended: 3 hrs before kick-off</p>
            </div>
            <div className="w-3.5 h-3.5 border border-white/20 rounded-sm"/>
          </div>
          <div className="bg-[#1A0A0A] border border-red-500/20 rounded-lg p-2 flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#E53E3E] flex items-center justify-center">
              <span className="text-white text-[7px]">🏃</span>
            </div>
            <div className="flex-1">
              <p className="text-white text-[7px] font-bold">Warm-up Protocol</p>
              <p className="text-gray-500 text-[6px]">Duration: 20 min</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="px-8 pb-12 pt-4 text-center mt-8">
      <p className="text-gray-500 text-center text-sm mb-8 font-medium">No payment due today</p>
      <Button 
        onClick={onComplete} 
        className="w-full h-16 rounded-full bg-[#E53E3E] text-white font-black text-lg flex items-center justify-center gap-2 shadow-2xl hover:bg-[#D43737] transition-all active:scale-95"
      >
        Continue
      </Button>
    </div>
  </div>
);

const TrialTimelineView = ({ onComplete }: { onComplete: () => void }) => (
  <div className="flex-1 flex flex-col p-8">
    <div className="p-0 text-center mb-12">
      <div className="flex justify-center gap-1 mb-8">
        <div className="w-4 h-1 rounded-full bg-gray-800" />
        <div className="w-4 h-1 rounded-full bg-red-500" />
        <div className="w-4 h-1 rounded-full bg-gray-800" />
      </div>
      <h2 className="text-3xl font-black text-white leading-tight">
        How your free trial works
      </h2>
    </div>

    <div className="flex-1 flex flex-col gap-0 px-4">
      {[
        { day: 'Today', title: 'Unlock full access', sub: 'Get access to everything and get the most out of ProjectBaller.', icon: <Lock className="w-5 h-5" />, color: 'text-red-500' },
        { day: 'Day 5', title: 'Reminder sent', sub: "We'll remind you when your trial is almost done, check your inbox and notifications.", icon: '🔔', color: 'text-gray-400' },
        { day: 'Day 7', title: 'Trial ends', sub: 'Your trial period concludes. Cancel anytime before.', icon: <Trophy className="w-5 h-5" />, color: 'text-red-500' }
      ].map((step, i) => (
        <div key={i} className="flex gap-6 relative pb-12">
          {i !== 2 && <div className="absolute left-[26px] top-12 bottom-0 w-[2px] bg-white/10" />}
          <div className="z-10 bg-[#121826] w-14 h-14 rounded-full border border-white/10 flex items-center justify-center shrink-0">
            {typeof step.icon === 'string' ? <span className="text-xl">{step.icon}</span> : <div className={step.color}>{step.icon}</div>}
          </div>
          <div>
            <div className="text-white font-black text-lg mb-1">{step.day}</div>
            <div className="text-white font-bold mb-2">{step.title}</div>
            <p className="text-gray-500 text-sm font-medium leading-relaxed">{step.sub}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="bg-red-500/5 border border-white/5 p-5 rounded-3xl mt-8 mb-8 flex items-center gap-4">
      <div className="w-8 h-8 rounded-full bg-[#38A169] flex items-center justify-center">
        <Check className="w-5 h-5 text-white" />
      </div>
      <p className="text-gray-300 text-xs font-bold leading-relaxed">
        Full access, completely free for 7 days. No strings attached.
      </p>
    </div>

    <Button onClick={onComplete} className="w-full">
      Try for $0.00
    </Button>
  </div>
);

const PaywallView = ({ onComplete, onBack }: { onComplete: () => void; onBack: () => void }) => {
  const [selectedPlan, setSelectedPlan] = useState<'annual' | 'monthly'>('annual');

  return (
    <div className="flex-1 flex flex-col p-8 pt-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={onBack} className="text-white"><ArrowLeft className="w-6 h-6" /></button>
        <div className="flex gap-1">
          <div className="w-4 h-1 rounded-full bg-gray-800" />
          <div className="w-4 h-1 rounded-full bg-gray-800" />
          <div className="w-4 h-1 rounded-full bg-red-500" />
        </div>
        <button onClick={onComplete} className="text-white"><MoreHorizontal className="w-6 h-6" /></button>
      </div>

      <h2 className="text-3xl font-black text-white mb-4 leading-tight">
        Go from average to undroppable.
      </h2>
      <div className="flex items-center gap-2 mb-8">
        <div className="flex text-orange-400">★★★★★</div>
        <span className="text-white font-bold text-sm">4.9 stars</span>
      </div>

      <div className="space-y-6 mb-12">
        {[
          { icon: '📅', text: 'A structured week, built around your match schedule' },
          { icon: '❤️', text: 'Know exactly when to push hard and when to rest' },
          { icon: '⚡️', text: 'Fuel your body the way professional footballers do' },
          { icon: '📊', text: 'AI coach feedback, performance analytics and trends' },
          { icon: '👥', text: 'Join a community of thousands of ballers' }
        ].map((feat, i) => (
          <div key={i} className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl shrink-0">
              {feat.icon}
            </div>
            <p className="text-white font-medium text-sm leading-relaxed">{feat.text}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-[#121826] border border-white/10 rounded-2xl p-4">
          <h4 className="text-white font-black text-sm mb-2">Game changer ⚙️</h4>
          <div className="text-orange-400 text-[10px] mb-2">★★★★★</div>
          <p className="text-gray-400 text-[10px] leading-relaxed mb-4">Went from dropped to starting every game in 6 weeks.</p>
          <p className="text-gray-500 text-[10px] font-bold">Jamie R.</p>
        </div>
        <div className="bg-[#121826] border border-white/10 rounded-2xl p-4">
          <h4 className="text-white font-black text-sm mb-2">Got scouted 🏆</h4>
          <div className="text-orange-400 text-[10px] mb-2">★★★★★</div>
          <p className="text-gray-400 text-[10px] leading-relaxed mb-4">Coach said I improved more in months than the whole year before.</p>
          <p className="text-gray-500 text-[10px] font-bold">Marcus T.</p>
        </div>
      </div>

      <div className="bg-[#38A169]/10 border border-[#38A169]/20 rounded-2xl p-3 mb-8 flex items-center justify-center gap-2">
        <Check className="w-4 h-4 text-[#38A169]" />
        <span className="text-[#38A169] text-xs font-bold uppercase tracking-widest">Trusted by 1,000+ footballers worldwide</span>
      </div>

      <h3 className="text-white font-black mb-4">Choose your plan</h3>
      <div className="space-y-3 mb-8">
        <button 
          onClick={() => setSelectedPlan('annual')}
          className={cn(
            "w-full p-5 rounded-2xl flex items-center justify-between border transition-all",
            selectedPlan === 'annual' ? "bg-red-500/5 border-red-500" : "bg-[#121826] border-white/5"
          )}
        >
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="text-white font-bold">Annual Plan</span>
              <span className="text-[10px] bg-red-500 text-white font-black px-2 py-0.5 rounded-full">SAVE 17%</span>
            </div>
            <p className="text-gray-500 text-xs mt-1">7-day free trial, then $99.00/year</p>
            <p className="text-gray-600 text-[10px] line-through">$119.88</p>
          </div>
          <div className="text-right">
            <div className="text-white font-black">$99.00/year</div>
            <div className={cn("w-6 h-6 rounded-full border-2 mt-2 ml-auto", selectedPlan === 'annual' ? "bg-red-500 border-red-500" : "border-white/10")}>
              {selectedPlan === 'annual' && <div className="w-2 h-2 bg-white rounded-full m-1.5" />}
            </div>
          </div>
        </button>
        <button 
          onClick={() => setSelectedPlan('monthly')}
          className={cn(
            "w-full p-5 rounded-2xl flex items-center justify-between border transition-all",
            selectedPlan === 'monthly' ? "bg-red-500/5 border-red-500" : "bg-[#121826] border-white/5"
          )}
        >
          <div className="text-left">
            <span className="text-white font-bold">Monthly Plan</span>
            <p className="text-gray-500 text-xs mt-1">7-day free trial, then $9.99/month</p>
          </div>
          <div className="text-right">
            <div className="text-white font-black">$9.99/month</div>
            <div className={cn("w-6 h-6 rounded-full border-2 mt-2 ml-auto", selectedPlan === 'monthly' ? "bg-red-500 border-red-500" : "border-white/10")}>
              {selectedPlan === 'monthly' && <div className="w-2 h-2 bg-white rounded-full m-1.5" />}
            </div>
          </div>
        </button>
      </div>

      <Button onClick={onComplete} className="w-full py-6 text-xl">
        Try for $0.00
      </Button>
    </div>
  );
};

const PotentialGraphView = ({ onComplete }: { onComplete: () => void }) => (
  <div className="flex-1 flex flex-col p-8">
    <h2 className="text-2xl font-bold leading-tight mb-8 text-white font-sans">
      If you're consistent, you have great potential to crush your goal
    </h2>

    <div className="bg-[#121826] p-6 rounded-[2rem] border border-white/5 mb-8">
      <h3 className="text-sm font-bold text-gray-400 mb-6 font-sans">Your Progress</h3>
      <div className="h-48 relative mb-4">
        <svg viewBox="0 0 400 200" className="w-full h-full">
          <path 
            d="M 20,180 Q 100,170 200,100 T 380,20" 
            fill="none" 
            stroke="url(#gradient)" 
            strokeWidth="4" 
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E53E3E" />
              <stop offset="50%" stopColor="#F6AD55" />
              <stop offset="100%" stopColor="#48BB78" />
            </linearGradient>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#48BB78" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#E53E3E" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path 
            d="M 20,180 Q 100,170 200,100 T 380,20 L 380,180 Z" 
            fill="url(#areaGradient)" 
          />
          {[20, 105, 230, 350].map((x, i) => (
            <circle key={i} cx={x} cy={180 - (i * 50) - (i === 3 ? 10 : 0)} r="5" fill="white" stroke="#121826" strokeWidth="2" />
          ))}
        </svg>
      </div>
      <div className="flex justify-between text-[10px] text-gray-600 font-bold uppercase tracking-wider">
        <span>Start</span>
        <span>3 Days</span>
        <span>7 Days</span>
        <span>30 Days</span>
      </div>
    </div>

    <p className="text-gray-500 text-xs text-center leading-relaxed font-medium mb-12">
      Based on ProjectBaller's data, players who stay consistent see exponential improvement after the first week. Stick with it and watch your development take off!
    </p>

    <div className="mt-auto">
      <Button onClick={onComplete} className="w-full">
        Continue <ArrowRight className="w-5 h-5" />
      </Button>
    </div>
  </div>
);

const TrainingSetupView = ({ onComplete }: { onComplete: () => void }) => {
  const [days, setDays] = useState('4 days');
  const [selectedEq, setSelectedEq] = useState<string[]>(['Full gym', 'Weights (dumbbells/barbells)', 'Resistance bands', 'Agility equipment (cones, ladder)']);

  const equipment = [
    'Home workout space',
    'Full gym',
    'Weights (dumbbells/barbells)',
    'Resistance bands',
    'Agility equipment (cones, ladder)',
    'Cardio machines (treadmill, bike)'
  ];

  const toggleEq = (e: string) => {
    setSelectedEq(prev => 
      prev.includes(e) ? prev.filter(item => item !== e) : [...prev, e]
    );
  };

  return (
    <div className="flex-1 flex flex-col p-8 overflow-y-auto">
      <h2 className="text-[28px] font-bold leading-tight mb-8 text-white font-sans">
        Your Training Setup
      </h2>

      <div className="mb-10">
        <h3 className="text-sm font-bold text-gray-300 mb-4 font-sans">How many days per week can you train?</h3>
        <div className="flex gap-2">
          {['2 days', '3 days', '4 days', '5+ days'].map(d => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`flex-1 py-3 rounded-xl border text-[13px] font-bold transition-all duration-300 ${
                days === d 
                ? 'bg-[#E53E3E]/5 border-[#E53E3E] text-white shadow-lg shadow-red-500/10' 
                : 'bg-[#121826] border-white/5 text-gray-500'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-sm font-bold text-gray-300 mb-6 font-sans">What equipment do you have access to?</h3>
        <div className="space-y-4">
          {equipment.map(e => (
            <button
              key={e}
              onClick={() => toggleEq(e)}
              className={`w-full flex items-center gap-4 p-5 rounded-[1.2rem] border transition-all duration-300 ${
                selectedEq.includes(e) ? 'bg-[#121826] border-white/10' : 'bg-[#121826]/30 border-white/5'
              }`}
            >
              <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                selectedEq.includes(e) ? 'bg-[#E53E3E] border-[#E53E3E]' : 'border-white/10'
              }`}>
                {selectedEq.includes(e) && <CircleCheck className="w-4 h-4 text-white" />}
              </div>
              <span className={`text-[15px] font-bold transition-colors ${
                selectedEq.includes(e) ? 'text-white' : 'text-gray-600'
              }`}>{e}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <Button onClick={onComplete} className="w-full">
          Continue <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

const NutritionView = ({ onComplete }: { onComplete: () => void }) => {
  const [prefs, setPrefs] = useState<string[]>(['High Protein', 'High Carb']);
  const [allergies, setAllergies] = useState<string[]>([]);

  const toggle = (list: string[], set: (l: string[]) => void, item: string) => {
    set(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
  };

  return (
    <div className="flex-1 flex flex-col p-8 overflow-y-auto">
      <h2 className="text-[28px] font-bold leading-tight mb-2 text-white font-sans">
        Nutrition Preferences
      </h2>
      <p className="text-gray-400 text-sm mb-12 font-medium">
        Select any dietary preferences or restrictions.
      </p>

      <div className="space-y-8">
        <div>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 font-sans">Nutrition preferences</h3>
          <div className="space-y-4">
            {['High Protein', 'Low Carb', 'High Carb', 'Vegetarian', 'Vegan'].map(p => (
              <button key={p} onClick={() => toggle(prefs, setPrefs, p)} className="w-full flex items-center justify-between group">
                <span className={`text-[15px] font-bold ${prefs.includes(p) ? 'text-white' : 'text-gray-600'} transition-colors`}>{p}</span>
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                  prefs.includes(p) ? 'bg-[#E53E3E] border-[#E53E3E]' : 'border-white/10'
                }`}>
                  {prefs.includes(p) && <CircleCheck className="w-4 h-4 text-white" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="h-[1px] bg-white/5" />

        <div>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 font-sans">Known allergies</h3>
          <div className="space-y-4">
            {['Peanuts', 'Shellfish', 'Gluten', 'Dairy'].map(a => (
              <button key={a} onClick={() => toggle(allergies, setAllergies, a)} className="w-full flex items-center justify-between group">
                <span className={`text-[15px] font-bold ${allergies.includes(a) ? 'text-white' : 'text-gray-600'} transition-colors`}>{a}</span>
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                  allergies.includes(a) ? 'bg-[#E53E3E] border-[#E53E3E]' : 'border-white/10'
                }`}>
                  {allergies.includes(a) && <CircleCheck className="w-4 h-4 text-white" />}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 flex flex-col gap-4">
        <Button onClick={onComplete} className="w-full">
          Continue <ArrowRight className="w-5 h-5" />
        </Button>
        <button onClick={onComplete} className="text-gray-500 font-bold py-2 text-sm hover:text-white transition-colors">
          Skip
        </button>
      </div>
    </div>
  );
};

const GenderView = ({ onComplete }: { onComplete: (gender: string) => void }) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 p-8">
        <h2 className="text-[28px] font-bold leading-tight mb-2 text-white font-sans">
          Choose Your Gender
        </h2>
        <p className="text-gray-500 text-sm mb-12 font-medium">
          This helps us personalise your training plan.
        </p>

        <div className="space-y-4">
          {['Male', 'Female', 'Other'].map((label) => (
            <motion.button
              key={label}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelected(label)}
              className={`w-full p-6 rounded-[1.5rem] border transition-all duration-300 text-lg font-bold ${
                selected === label 
                ? 'bg-[#E53E3E]/5 border-[#E53E3E] text-white shadow-lg shadow-red-500/10' 
                : 'bg-[#121826] border-white/5 text-gray-400 hover:border-white/10'
              }`}
            >
              {label}
            </motion.button>
          ))}
        </div>
      </div>
      <div className="p-8 pt-0">
        <Button disabled={!selected} onClick={() => selected && onComplete(selected)} className="w-full">
          Continue <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

const Button = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary',
  disabled = false
}: { 
  children: React.ReactNode, 
  onClick?: () => void, 
  className?: string,
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost',
  disabled?: boolean
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-[#FF4D4D] to-[#E60000] text-white shadow-lg shadow-red-900/20',
    secondary: 'bg-[#1A202C] text-white border border-[#2D3748]',
    outline: 'bg-transparent border-2 border-[#1A202C] text-white',
    ghost: 'bg-transparent text-gray-500 font-medium'
  };

  return (
    <motion.button
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={!disabled ? onClick : undefined}
      className={`py-4 px-8 rounded-full font-bold flex items-center justify-center gap-3 transition-all duration-200 ${variants[variant]} ${disabled ? 'opacity-30 cursor-not-allowed grayscale' : 'active:opacity-90'} ${className}`}
    >
      {children}
    </motion.button>
  );
};

const Header = ({ title, onBack, progress }: { title: string, onBack: () => void, progress: number }) => {
  const getSegmentFill = (segIndex: number) => {
    const ranges = [[1,3],[4,6],[7,9]]
    const [start, end] = ranges[segIndex]
    if (progress > end) return '100%'
    if (progress < start) return '0%'
    return `${((progress - start + 1) / (end - start + 1)) * 100}%`
  }

  return (
    <div className="px-6 py-4 flex-shrink-0">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="w-10 h-10 bg-[#1A202C] rounded-xl flex items-center justify-center border border-white/5">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h2 className="text-white font-bold text-base">{title}</h2>
        <div className="w-10" />
      </div>
      <div className="flex gap-2 mb-2">
        {['PROFILE','PLAN','FINALIZE'].map((label, i) => (
          <div key={i} className="flex-1 flex flex-col gap-1.5">
            <div className="h-[3px] rounded-full bg-[#1A202C] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: getSegmentFill(i) }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="h-full bg-[#E53E3E] rounded-full"
              />
            </div>
            <span className={`text-[9px] font-black tracking-widest uppercase ${
              progress >= [1,4,7][i] ? 'text-[#E53E3E]' : 'text-gray-600'
            }`}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Views ---

const LandingView = ({ onComplete }: { onComplete: () => void }) => {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const slides = [
    {
      id: 0,
      content: (
        <div className="flex flex-col h-full bg-[#05080D]">
          <div className="p-4 pt-8">
            <div className="flex items-center justify-between mb-4">
              <ProjectBallerLogo className="w-6 h-6 grayscale opacity-50" />
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#1A202C]" />
                <div className="w-6 h-6 rounded-lg bg-[#1A202C]" />
              </div>
            </div>
            <p className="text-white text-[10px] font-bold mb-4">Thursday, Apr 16</p>
            <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-orange-500/10" />
              <div className="absolute inset-0 rounded-full border-4 border-t-orange-500 border-r-transparent border-b-transparent border-l-transparent rotate-[45deg]" />
              <div className="text-center">
                <span className="text-3xl font-black text-orange-500 leading-none">0</span>
                <p className="text-[6px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">Recovery Needed</p>
              </div>
            </div>
            
            <p className="text-gray-500 text-[6px] font-bold text-center mb-4 uppercase tracking-widest">Next match in 2 days</p>
            
            <div className="grid grid-cols-3 gap-2 mb-6">
              {[1,2,3].map(i => (
                <div key={i} className="bg-[#1A202C] rounded-lg p-2">
                  <div className="w-3 h-3 bg-red-500/20 rounded-full mb-1" />
                  <div className="h-1 w-full bg-gray-800 rounded-full" />
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-red-900/40 to-black border border-red-500/20 rounded-xl p-3 shadow-2xl">
              <p className="text-[6px] text-red-500 font-bold mb-1 uppercase tracking-widest">• Today's Focus</p>
              <p className="text-white text-[10px] font-black mb-1">MD-3 Strength (Lower)</p>
              <p className="text-gray-500 text-[6px] mb-3">Built from your constraints and match schedule.</p>
              <div className="flex justify-end">
                <div className="bg-red-500 text-white text-[7px] font-black px-3 py-1.5 rounded-lg shadow-lg">Start Session →</div>
              </div>
            </div>
          </div>
          <div className="mt-auto h-12 bg-[#0D121D] border-t border-white/5 flex items-center justify-around px-4">
             {['home', 'train', 'fuel', 'social', 'match', 'more'].map((ic, i) => (
               <div key={i} className={cn("w-4 h-4 rounded flex flex-col items-center gap-0.5", i === 0 ? "text-red-500" : "text-gray-600")}>
                 <div className="w-full h-full bg-current rounded-sm opacity-20" />
                 <span className="text-[4px] uppercase font-bold">{ic}</span>
               </div>
             ))}
          </div>
        </div>
      )
    },
    {
      id: 1,
      content: (
        <div className="flex flex-col h-full bg-[#05080D] p-4 pt-8">
           <p className="text-red-500 text-[6px] font-black uppercase mb-1 tracking-widest">BALLERPRO FUEL</p>
           <div className="flex justify-between items-end mb-6">
              <h2 className="text-white text-xl font-black leading-none">Nutrition</h2>
              <p className="text-gray-500 text-[8px] font-bold">Today, Mar 29</p>
           </div>
           
           <p className="text-[7px] text-gray-500 font-bold mb-1 uppercase tracking-widest">Calories Consumed</p>
           <div className="flex justify-between items-baseline mb-6">
              <p className="text-white text-2xl font-black">375 <span className="text-gray-600 text-sm font-bold">/2400</span></p>
              <div className="text-red-500 text-[7px] font-bold bg-red-500/10 px-2 py-0.5 rounded-full">2025 Left →</div>
           </div>
           
           <div className="flex justify-around mb-8 p-2 bg-[#1A202C]/50 rounded-2xl border border-white/5">
             {[
               { val: '141%', color: 'border-orange-500', label: 'PROTEIN' },
               { val: '80%', color: 'border-blue-500', label: 'CARBS' },
               { val: '1096%', color: 'border-yellow-500', label: 'FATS' }
             ].map((m, i) => (
               <div key={i} className="flex flex-col items-center gap-1.5">
                 <div className={cn("w-12 h-12 rounded-full border-2 flex items-center justify-center text-[8px] font-black text-white shadow-lg", m.color)}>
                   {m.val}
                 </div>
                 <span className="text-[5px] text-gray-500 font-bold tracking-widest">{m.label}</span>
               </div>
             ))}
           </div>
           
           <div className="bg-[#1A202C]/50 rounded-xl p-3 border border-white/5 mb-4">
             <div className="flex justify-between items-center mb-1.5">
               <span className="text-white text-[8px] font-bold">Hydration</span>
               <span className="text-gray-500 text-[8px] font-bold">1000 / 2500ml</span>
             </div>
             <div className="h-1 w-full bg-[#1A202C] rounded-full overflow-hidden">
               <div className="h-full w-[40%] bg-blue-500 rounded-full" />
             </div>
           </div>
           
           <div className="flex justify-between items-center mb-2">
             <span className="text-white text-[8px] font-black">Daily Fuel</span>
             <span className="text-red-500 text-[6px] font-bold">View Plan →</span>
           </div>
           
           <div className="space-y-2">
             <div className="bg-[#1A202C] rounded-xl p-3 flex justify-between items-center">
               <div className="flex items-center gap-2">
                 <div className="w-5 h-5 bg-red-500/20 rounded-lg" />
                 <span className="text-white text-[8px] font-bold">Breakfast</span>
               </div>
               <span className="text-gray-500 text-[8px]">375 kcal</span>
             </div>
           </div>
        </div>
      )
    },
    {
      id: 2,
      content: (
        <div className="flex flex-col h-full bg-[#05080D] p-4 pt-8">
           <div className="flex justify-between items-center mb-6">
             <p className="text-white text-[10px] font-black uppercase tracking-widest">Match Day Hub</p>
             <div className="w-8 h-8 rounded-xl bg-[#1A202C] flex items-center justify-center">
               <Bell className="w-4 h-4 text-gray-500" />
             </div>
           </div>
           
           <div className="flex justify-center mb-3">
             <div className="bg-red-500/20 border border-red-500/40 text-red-500 text-[7px] font-black px-3 py-1 rounded-full uppercase tracking-widest">• Match Today</div>
           </div>
           
           <h2 className="text-white text-2xl font-black text-center mb-1">vs. City fav</h2>
           <p className="text-gray-500 text-[7px] text-center mb-8 font-medium">Kick-off: Mon, Mar 30 • 3:00 PM</p>
           
           <div className="bg-[#0D121D] border border-white/5 rounded-2xl p-6 mb-8 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 blur-2xl" />
             <div className="flex justify-between items-center mb-4">
               <p className="text-[7px] text-gray-500 font-bold uppercase tracking-[0.2em]">Time to Kick-off</p>
               <Clock className="w-3 h-3 text-gray-600" />
             </div>
             <div className="flex justify-center items-center gap-2">
               <div className="flex flex-col items-center">
                 <span className="text-4xl font-black text-white leading-none">23</span>
                 <span className="text-[5px] text-gray-600 font-bold uppercase mt-1">Hours</span>
               </div>
               <span className="text-gray-600 font-bold text-2xl pb-4">:</span>
               <div className="flex flex-col items-center">
                 <span className="text-4xl font-black text-white leading-none">01</span>
                 <span className="text-[5px] text-gray-600 font-bold uppercase mt-1">Mins</span>
               </div>
               <span className="text-gray-600 font-bold text-2xl pb-4">:</span>
               <div className="flex flex-col items-center">
                 <span className="text-4xl font-black text-red-500 leading-none">08</span>
                 <span className="text-[5px] text-gray-600 font-bold uppercase mt-1">Secs</span>
               </div>
             </div>
           </div>
           
           <p className="text-white text-[10px] font-black mb-3">Match Prep</p>
           <div className="space-y-3">
             <div className="bg-[#1A202C] rounded-2xl p-4 flex items-center justify-between border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/5 rounded-xl flex items-center justify-center">
                    <Utensils className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-white text-[8px] font-bold">Pre-match Meal</p>
                    <p className="text-gray-600 text-[6px]">Recommended: 3 hrs before kick-off</p>
                  </div>
                </div>
                <div className="w-5 h-5 rounded-lg border border-white/20" />
             </div>
             
             <div className="bg-gradient-to-r from-red-900/40 to-[#1A202C] rounded-2xl p-4 flex flex-col border border-red-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-red-500 rounded-xl flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white text-[8px] font-bold">Warm-up Protocol</p>
                    <p className="text-gray-400 text-[6px]">Duration: 20 min</p>
                  </div>
                </div>
                <div className="bg-red-500 text-white text-[8px] font-black h-10 rounded-xl flex items-center justify-center gap-2">
                   <motion.div animate={{ x: [0, 2, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                     ▶
                   </motion.div>
                   Start Session
                </div>
             </div>
           </div>
        </div>
      )
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#05080D] relative overflow-hidden h-full">
      {/* Top Header */}
      <div className="absolute top-12 left-6 flex items-center gap-2 z-20">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              "transition-all duration-500 ease-out",
              slide === i ? "w-8 h-2 bg-red-500 rounded-full" : "w-2 h-2 bg-gray-600 rounded-full"
            )}
          />
        ))}
      </div>
      <button 
        onClick={onComplete} 
        className="absolute top-12 right-6 text-gray-500 font-black text-xl z-20 hover:text-white transition-colors"
      >
        ✕
      </button>

      {/* Main Content (Sliding Mockup) */}
      <div className="flex-1 flex flex-col items-center justify-center relative mt-16 overflow-hidden">
        <div 
          className="relative w-64 aspect-[9/19.5] mx-auto cursor-pointer perspective-1000"
          onClick={() => setSlide((prev) => (prev + 1) % 3)}
        >
          <div className="absolute inset-0 rounded-[2.5rem] border-[6px] border-[#1A202C] bg-[#0D121D] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide}
                initial={{ x: 100, opacity: 0, scale: 0.95 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: -100, opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-0"
              >
                {slides[slide].content}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Subtle reflection overlay */}
          <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-30" />
        </div>
      </div>

      {/* Bottom Info (Fixed) */}
      <div className="px-8 pb-12 pt-8 text-center bg-gradient-to-t from-[#05080D] via-[#05080D] to-transparent z-10">
        <motion.div
           key={`text-${slide}`}
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.4 }}
        >
          <h1 className="text-[32px] font-black tracking-tight mb-4 leading-[1.1] text-white">
            Train Like A Pro <br />
            With Real Guidance
          </h1>
          <p className="text-gray-400 text-sm mb-10 leading-relaxed max-w-[280px] mx-auto font-medium">
            Personalized training, nutrition, and recovery in one flow.
          </p>
        </motion.div>

        <Button 
          onClick={onComplete} 
          className="w-full h-16 rounded-full bg-red-500 text-white font-black text-lg flex items-center justify-center gap-2 shadow-[0_20px_40px_-10px_rgba(239,68,68,0.5)] hover:bg-red-600 hover:scale-[1.02] active:scale-95 transition-all duration-300"
        >
          → Get Started
        </Button>
      </div>
    </div>
  );
};

const GraphView = ({ onComplete }: { onComplete: () => void }) => (
  <div className="flex-1 flex flex-col">
    <div className="flex-1 p-8">
      <h2 className="text-[28px] font-bold leading-tight mb-8 text-white">
        ProjectBaller creates <br />
        long-term results
      </h2>

      <div className="bg-[#121826] rounded-[2rem] p-6 pt-8 border border-white/5 relative overflow-hidden">
        <h3 className="text-gray-400 font-medium mb-12">Your development</h3>
        
        {/* Graph Placeholder */}
        <div className="h-64 relative flex items-end">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Dashed lines */}
            {[20, 40, 60, 80].map(y => (
              <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#1A202C" strokeWidth="0.5" strokeDasharray="2" />
            ))}
            
            {/* Green Line - Exponential Growth */}
            <motion.path
              d="M 5 80 Q 40 85 95 20"
              fill="none"
              stroke="#00C49A"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            {/* Red Line - Stagnation */}
            <motion.path
              d="M 5 80 Q 50 100 95 90"
              fill="none"
              stroke="#E53E3E"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            />
            
            {/* Start point dot */}
            <circle cx="5" cy="80" r="3" fill="#0D121D" stroke="#00C49A" strokeWidth="2" />
          </svg>
          
          <div className="absolute bottom-[-10px] w-full flex justify-between text-[10px] text-gray-500 font-bold px-1">
            <span>1 month</span>
            <span>6 months</span>
          </div>
        </div>
      </div>

      <p className="text-gray-400 text-center mt-12 px-2 leading-relaxed font-medium">
        90% of ProjectBaller athletes say their development improved exponentially during the first 6 months.
      </p>
    </div>

    <div className="p-8 pt-0">
       <Button onClick={onComplete} className="w-full">
         Continue <ArrowRight className="w-5 h-5" />
       </Button>
    </div>
  </div>
);

interface SelectOption {
  label: string;
  sub?: string;
  icon?: ReactNode;
}

const SelectView = ({ 
  title, 
  description,
  options, 
  onComplete, 
  onSkip,
  showSkip = false 
}: { 
  title: string;
  description?: string;
  options: SelectOption[];
  onComplete: (value: string) => void;
  onSkip?: () => void;
  showSkip?: boolean;
}) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto px-8 py-8">
        <h2 className="text-[28px] font-bold mb-2 text-white font-sans leading-tight">
          {title}
        </h2>
        {description && (
          <p className="text-gray-400 mb-8 font-medium">
            {description}
          </p>
        )}
        <div className="space-y-4">
          {options.map((opt) => (
            <button
              key={opt.label}
              onClick={() => setSelected(opt.label)}
              className={cn(
                "w-full p-5 rounded-[1.5rem] text-left transition-all duration-200 flex items-center gap-4 group border",
                selected === opt.label 
                  ? "bg-[#E53E3E]/5 border-[#E53E3E] text-white shadow-lg shadow-red-500/10" 
                  : "bg-[#121826] border-white/5 text-gray-400 hover:border-white/10"
              )}
            >
              <div className="flex items-center gap-4 flex-1">
                {opt.icon && <div className="flex-shrink-0">{opt.icon}</div>}
                <span className="font-bold text-white text-base">{opt.label}</span>
              </div>
              {selected === opt.label && <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0" />}
            </button>
          ))}
        </div>
      </div>

      <div className="p-8 pt-0 flex flex-col gap-4">
        <Button 
          disabled={!selected && !showSkip}
          onClick={() => onComplete(selected || 'Skipped')}
          className="w-full"
        >
          Continue <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        {onSkip && (
          <button onClick={onSkip} className="w-full text-center text-gray-500 font-bold text-sm py-3 mt-1">
            Skip
          </button>
        )}
      </div>
    </div>
  );
};

const ScheduleView = ({ onComplete }: { onComplete: (data: any) => void }) => {
  const [offseason, setOffseason] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [matchTime, setMatchTime] = useState('15:00');
  const [matchesPerWeek, setMatchesPerWeek] = useState('1 match');
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const toggleDay = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <div className="p-8">
        <h2 className="text-[28px] font-bold leading-tight mb-2 text-white">
          Match Schedule
        </h2>
        <p className="text-gray-500 text-sm mb-10 font-medium">
          When do you usually play matches? We'll build your training around this.
        </p>

        <div className="bg-[#121826] p-5 rounded-[1.5rem] border border-white/5 flex items-center justify-between mb-12">
          <span className="text-sm font-semibold max-w-[200px] leading-tight text-gray-300">
            I don't play any matches or I'm in the offseason
          </span>
          <button 
            onClick={() => setOffseason(!offseason)}
            className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 flex items-center ${offseason ? 'bg-white' : 'bg-[#1A202C]'}`}
          >
            <motion.div 
              animate={{ x: offseason ? 24 : 0 }}
              className={`w-6 h-6 rounded-full ${offseason ? 'bg-[#0D121D]' : 'bg-gray-400'}`} 
            />
          </button>
        </div>

        {!offseason && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div>
              <h3 className="font-bold mb-4 text-white">When are your matches</h3>
              <div className="flex flex-wrap gap-2">
                {days.map(day => (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`flex-1 min-w-[70px] py-3.5 rounded-2xl font-bold transition-all duration-200 border ${
                      selectedDays.includes(day)
                      ? 'bg-[#E53E3E]/10 border-[#E53E3E] text-white'
                      : 'bg-[#121826] border-white/5 text-gray-500'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                 <div className="absolute left-5 top-1/2 -translate-y-1/2">
                   <Clock className="w-5 h-5 text-gray-500" />
                 </div>
                 <div className="w-full bg-[#121826] border border-white/5 p-5 pl-14 rounded-2xl flex items-center justify-between group">
                    <select
                      value={matchTime}
                      onChange={(e) => setMatchTime(e.target.value)}
                      className="bg-transparent text-white font-bold border-none outline-none cursor-pointer flex-1"
                    >
                      {['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00'].map(t => (
                        <option key={t} value={t} style={{ background: '#121826' }}>{t}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                 </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-white">How many matches per week?</h3>
              <div className="flex gap-2">
                {['1 match', '2 matches', '3+ matches'].map((opt, i) => (
                  <button
                    key={opt}
                    onClick={() => setMatchesPerWeek(opt)}
                    className={`flex-1 py-4 rounded-2xl font-bold transition-all duration-200 border ${
                      opt === matchesPerWeek
                      ? 'bg-[#E53E3E]/10 border-[#E53E3E] text-[#E53E3E]'
                      : 'bg-[#121826] border-white/5 text-gray-500'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-8 pt-0 mt-auto">
        <Button onClick={() => onComplete({ offseason, matchDays: selectedDays })} className="w-full">
          Continue <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

const PositionView = ({ onComplete }: { onComplete: (pos: string) => void }) => {
  const [selectedPos, setSelectedPos] = useState<string | null>(null);

  const positions = [
    { id: 'ST', x: '50', y: '8' },
    { id: 'LW', x: '15', y: '18' },
    { id: 'LF', x: '35', y: '18' },
    { id: 'CF', x: '50', y: '18' },
    { id: 'RF', x: '65', y: '18' },
    { id: 'RW', x: '85', y: '18' },
    { id: 'CAM', x: '50', y: '38' },
    { id: 'LM', x: '25', y: '52' },
    { id: 'CM', x: '50', y: '52' },
    { id: 'RM', x: '75', y: '52' },
    { id: 'CDM', x: '50', y: '68' },
    { id: 'LWB', x: '12', y: '72' },
    { id: 'LB', x: '30', y: '82' },
    { id: 'CB', x: '50', y: '82' },
    { id: 'RB', x: '70', y: '82' },
    { id: 'RWB', x: '88', y: '72' },
    { id: 'GK', x: '50', y: '94' },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="p-8 pb-4">
          <h2 className="text-[28px] font-bold leading-tight mb-2 text-white font-sans">
            Your Position
          </h2>
          <p className="text-gray-400 text-sm font-medium">
            Tap your primary position on the pitch.
          </p>
        </div>

        <div className="px-6 pb-8">
          {/* Pitch Container */}
          <div className="w-full aspect-[2/3] bg-[#1E3A2F] rounded-2xl relative overflow-hidden ring-4 ring-white/5 shadow-[0_0_50px_rgba(30,58,47,0.5)]">
            {/* Grass Contrast Lines */}
            {[...Array(12)].map((_, i) => (
               <div key={i} className={`h-[8.33%] w-full ${i % 2 === 0 ? 'bg-black/5' : ''}`} />
            ))}

            {/* Pitch Markings */}
            <div className="absolute inset-4 border border-white/20 pointer-events-none">
              {/* Penalty Area Top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[15%] border border-white/20" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[25%] h-[6%] border border-white/20" />
              
              {/* Center Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35%] aspect-square border border-white/20 rounded-full" />
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/20" />
              
              {/* Penalty Area Bottom */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[15%] border border-white/20" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[25%] h-[6%] border border-white/20" />
            </div>

            {/* Position Nodes */}
            {positions.map((pos) => (
              <button
                key={pos.id}
                onClick={() => setSelectedPos(pos.id)}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full font-bold text-[8px] flex items-center justify-center transition-all duration-200 z-10 ${
                  selectedPos === pos.id 
                  ? 'bg-[#E53E3E] text-white scale-125 shadow-lg shadow-red-500/50' 
                  : 'bg-white text-[#05080D] shadow-md hover:scale-110'
                }`}
              >
                {pos.id}
              </button>
            ))}
          </div>
          
          <p className="text-center text-xs font-bold text-gray-500 mt-6 tracking-wide uppercase">
            {selectedPos ? `Selected: ${selectedPos}` : 'No position selected'}
          </p>
        </div>
      </div>

      <div className="p-8 pt-4 mt-auto">
        <Button 
          disabled={!selectedPos} 
          onClick={() => selectedPos && onComplete(selectedPos)} 
          className="w-full"
        >
          Continue <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

const TeamTrainingView = ({ onComplete }: { onComplete: (data: any) => void }) => {
  const [noTraining, setNoTraining] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>(['Mon']);
  const [duration, setDuration] = useState('90 minutes');
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const toggleDay = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <div className="p-8">
        <h2 className="text-[28px] font-bold leading-tight mb-2 text-white font-sans">
          Team Training
        </h2>
        <p className="text-gray-400 text-sm mb-10 font-medium">
          When do you train with your team/club?
        </p>

        <div className="bg-[#121826] p-5 rounded-[1.5rem] border border-white/5 flex items-center justify-between mb-12">
          <span className="text-sm font-semibold max-w-[200px] leading-tight text-gray-300">
            I don't have team training
          </span>
          <button 
            onClick={() => setNoTraining(!noTraining)}
            className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 flex items-center ${noTraining ? 'bg-white' : 'bg-[#1A202C]'}`}
          >
            <motion.div 
              animate={{ x: noTraining ? 24 : 0 }}
              className={`w-6 h-6 rounded-full ${noTraining ? 'bg-[#0D121D]' : 'bg-gray-400'}`} 
            />
          </button>
        </div>

        {!noTraining && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div>
              <h3 className="font-bold mb-4 text-white text-sm">Select your team training days:</h3>
              <div className="flex flex-wrap gap-2">
                {days.map(day => (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`flex-1 min-w-[70px] py-4 rounded-2xl font-bold transition-all duration-200 border ${
                      selectedDays.includes(day)
                      ? 'bg-[#E53E3E] border-[#E53E3E] text-white shadow-lg shadow-red-500/20'
                      : 'bg-[#121826] border-white/5 text-gray-500'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                 <div className="w-full bg-[#121826] border border-white/5 p-5  rounded-2xl flex flex-col gap-1 group">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tight ml-8">Session Duration</span>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-gray-500" />
                        <select
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          className="bg-transparent text-white font-bold border-none outline-none cursor-pointer"
                        >
                          {['45 minutes','60 minutes','75 minutes','90 minutes','105 minutes','120 minutes'].map(d => (
                            <option key={d} value={d} style={{ background: '#121826' }}>{d}</option>
                          ))}
                        </select>
                      </div>
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    </div>
                 </div>
              </div>
            </div>

            <div className="bg-[#121826]/40 p-5 rounded-2xl flex gap-4 border border-white/5">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                <Info className="w-3.4 h-3.5 text-blue-400" />
              </div>
              <p className="text-xs text-gray-400 leading-relaxed font-medium">
                We'll schedule personal sessions around team commitments
              </p>
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-8 pt-0 mt-auto">
        <Button onClick={() => onComplete({ noTraining, teamTrainingDays: selectedDays })} className="w-full">
          Continue <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default function App() {
  const [step, setStep] = useState<OnboardingStep>('loading');
  const [userName, setUserName] = useState('Athlete');
  const [activeTab, setActiveTab] = useState('home');
  const [trainTabStep, setTrainTabStep] = useState<'library' | 'history' | 'detail' | 'playback' | 'feedback'>('library');
  const [matchTabStep, setMatchTabStep] = useState<'hub' | 'add' | 'checklist'>('hub');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [history, setHistory] = useState<OnboardingStep[]>([]);

  // lifted global state
  const [match, setMatch] = useState<Match | null>(null);
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(INITIAL_CHECKLIST);
  const [hydration, setHydration] = useState(0);
  const [userProfile, setUserProfile] = useState({
    name: 'Test Athlete',
    gender: '',
    birthday: '',
    position: '',
    club: ''
  });
  const [posts, setPosts] = useState(DUMMY_POSTS);
  const [workoutHistory, setWorkoutHistory] = useState<Workout[]>([]);
  const [loggedMeals, setLoggedMeals] = useState<any[]>([]);
  const [matchCountdown, setMatchCountdown] = useState({ hours: 41, mins: 30, secs: 42 });

  useEffect(() => {
    if (match) {
      const timer = setInterval(() => {
        setMatchCountdown(prev => {
          let { hours, mins, secs } = prev;
          if (secs > 0) secs--;
          else {
            secs = 59;
            if (mins > 0) mins--;
            else {
              mins = 59;
              if (hours > 0) hours--;
            }
          }
          return { hours, mins, secs };
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [match]);

  const handleNext = (nextStep: OnboardingStep, data?: any) => {
    if (data) {
      setUserProfile(prev => ({ ...prev, ...data }));
    }
    setHistory(prev => [...prev, step]);
    setStep(nextStep);
  };

  const handleBack = useCallback(() => {
    if (history.length > 0) {
      const prev = [...history];
      const last = prev.pop();
      if (last) {
        setStep(last);
        setHistory(prev);
      }
    } else if (step !== 'landing') {
      setStep('landing');
    }
  }, [history, step]);

  const renderStep = () => {
    const renderTabContent = () => {
      if (activeTab === 'home') {
        return <DashboardView profile={userProfile} stats={workoutHistory} onStartWorkout={() => {
          setActiveTab('train');
          setTrainTabStep('detail');
        }} onCalendar={() => setShowSchedule(true)} />;
      }
      if (activeTab === 'train') {
        switch (trainTabStep) {
          case 'library':
            return <WorkoutsView onStart={() => setTrainTabStep('detail')} onHistory={() => setTrainTabStep('history')} />;
          case 'history':
            return <WorkoutHistoryView history={workoutHistory} onBack={() => setTrainTabStep('library')} />;
          case 'detail':
            return <WorkoutDetailsView workout={DUMMY_WORKOUT} onBack={() => setTrainTabStep('library')} onStart={() => setTrainTabStep('playback')} />;
          case 'playback':
            return (
              <SessionPlaybackView 
                workout={DUMMY_WORKOUT}
                onFinish={(completedWorkout) => {
                  setWorkoutHistory(prev => [completedWorkout, ...prev]);
                  setTrainTabStep('feedback');
                }} 
              />
            );
          case 'feedback':
            return <WorkoutFeedbackView onComplete={() => setTrainTabStep('library')} />;
          default:
            return <WorkoutsView onStart={() => setTrainTabStep('detail')} onHistory={() => setTrainTabStep('history')} />;
        }
      }
      if (activeTab === 'fuel') {
        return (
          <FuelView 
            hydration={hydration} 
            setHydration={setHydration} 
            onCalendar={() => setShowSchedule(true)} 
            loggedMeals={loggedMeals}
            setLoggedMeals={setLoggedMeals}
          />
        );
      }
      if (activeTab === 'social') {
        return <SocialView posts={posts} setPosts={setPosts} />;
      }
      if (activeTab === 'match') {
        switch (matchTabStep) {
          case 'hub':
            return (
              <MatchView 
                match={match} 
                onAdd={() => setMatchTabStep('add')} 
                onChecklist={() => setMatchTabStep('checklist')} 
                onNotify={() => setShowNotifications(true)} 
                countdown={matchCountdown}
              />
            );
          case 'add':
            return (
              <MatchAddView 
                onBack={() => setMatchTabStep('hub')} 
                onComplete={(newMatch) => {
                  setMatch(newMatch);
                  setMatchTabStep('hub');
                }} 
              />
            );
          case 'checklist':
            return <MatchChecklistView match={match} items={checklistItems} setItems={setChecklistItems} onBack={() => setMatchTabStep('hub')} />;
          default:
            return <MatchView match={match} countdown={matchCountdown} onAdd={() => setMatchTabStep('add')} onChecklist={() => setMatchTabStep('checklist')} />;
        }
      }
      if (activeTab === 'more') {
        return <MoreView profile={userProfile} stats={workoutHistory} onLogout={() => setStep('landing')} onAiCoach={() => setStep('aiCoach')} userName={userName} />;
      }
      return (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} View Coming Soon
        </div>
      );
    };

    switch (step) {
      case 'loading':
        return <LoadingScreen onComplete={() => setStep('landing')} />;
      case 'landing':
        return <LandingView onComplete={() => handleNext('gender')} />;
      case 'aiCoach':
        return <AiCoachView onBack={() => setStep('dashboard')} />;
      case 'gender':
        return (
          <div className="flex-1 flex flex-col">
            <Header title="Build Your Profile" onBack={handleBack} progress={1} />
            <GenderView onComplete={(gender) => handleNext('position', { gender })} />
          </div>
        );
      case 'position':
        return (
          <div className="flex-1 flex flex-col">
            <Header title="Build Your Profile" onBack={handleBack} progress={1} />
            <PositionView onComplete={(position) => handleNext('teamTraining', { position })} />
          </div>
        );
      case 'teamTraining':
        return (
          <div className="flex-1 flex flex-col">
            <Header title="Build Your Profile" onBack={handleBack} progress={1} />
            <TeamTrainingView onComplete={() => handleNext('schedule')} />
          </div>
        );
      case 'schedule':
        return (
          <div className="flex-1 flex flex-col">
            <Header title="Build Your Profile" onBack={handleBack} progress={2} />
            <ScheduleView onComplete={() => handleNext('referral')} />
          </div>
        );
      case 'referral':
        return (
          <div className="flex-1 flex flex-col">
            <Header title="Build Your Profile" onBack={handleBack} progress={2} />
            <SelectView 
              title="Where did you hear about us?"
              options={[
                {
                  label: 'Academy / Club',
                  icon: <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="#60A5FA" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 6.2 2.1L12 8.5 5.8 4.1A10 10 0 0 1 12 2z" fill="#60A5FA" opacity="0.3"/>
                      <circle cx="12" cy="12" r="3" fill="#60A5FA"/>
                    </svg>
                  </div>
                },
                {
                  label: 'Instagram',
                  icon: <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{background:'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)'}}>
                    <Instagram className="w-4 h-4 text-white" />
                  </div>
                },
                {
                  label: 'TikTok',
                  icon: <div className="w-8 h-8 rounded-xl bg-black border border-white/10 flex items-center justify-center relative overflow-hidden">
                    <span className="font-black text-white text-xs" style={{textShadow:'1px 0 0 #69C9D0,-1px 0 0 #EE1D52'}}>TT</span>
                  </div>
                },
                {
                  label: 'Facebook',
                  icon: <div className="w-8 h-8 rounded-xl bg-[#1877F2] flex items-center justify-center">
                    <Facebook className="w-4 h-4 text-white" />
                  </div>
                },
                {
                  label: 'YouTube',
                  icon: <div className="w-8 h-8 rounded-xl bg-[#FF0000] flex items-center justify-center">
                    <Youtube className="w-4 h-4 text-white" />
                  </div>
                },
                {
                  label: 'X (Twitter)',
                  icon: <div className="w-8 h-8 rounded-xl bg-black border border-white/10 flex items-center justify-center">
                    <span className="font-black text-white text-sm">✕</span>
                  </div>
                },
                {
                  label: 'Friend / Word of Mouth',
                  icon: <div className="w-8 h-8 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center">
                    <Users className="w-4 h-4 text-teal-400" />
                  </div>
                },
              ]}
              onComplete={(val) => handleNext('experience', { referral: val })}
              onSkip={() => handleNext('experience')}
            />
          </div>
        );
      case 'experience':
        return (
          <div className="flex-1 flex flex-col">
            <Header title="Build Your Profile" onBack={handleBack} progress={2} />
            <SelectView 
              title="Have you tried other football training apps?"
              options={[{ label: 'No' }, { label: 'Yes' }]}
              onComplete={(val) => handleNext('graph', { triedOtherApps: val })}
            />
          </div>
        );
      case 'graph':
        return (
          <div className="flex-1 flex flex-col">
            <Header title="Build Your Profile" onBack={handleBack} progress={3} />
            <GraphView onComplete={() => handleNext('heightWeight')} />
          </div>
        );
      case 'heightWeight':
        return (
          <div className="flex-1 flex flex-col">
            <Header title="Build Your Profile" onBack={handleBack} progress={3} />
            <HeightWeightView onComplete={(hw) => handleNext('birthday', hw)} />
          </div>
        );
      case 'birthday':
        return (
          <div className="flex-1 flex flex-col">
            <Header title="Build Your Profile" onBack={handleBack} progress={3} />
            <BirthdayView onComplete={(birthday) => handleNext('name', { birthday })} />
          </div>
        );
      case 'name':
        return (
          <div className="flex-1 flex flex-col">
            <Header title="Build Your Profile" onBack={handleBack} progress={3} />
            <NameView onComplete={(name) => { setUserName(name); handleNext('club', { name }); }} />
          </div>
        );
      case 'club':
        return (
          <div className="flex-1 flex flex-col">
            <Header title="Build Your Profile" onBack={handleBack} progress={3} />
            <ClubView onComplete={(club) => handleNext('trust', { club })} />
          </div>
        );
      case 'trust':
        return (
          <div className="flex-1 flex flex-col">
            <Header title="Build Your Profile" onBack={handleBack} progress={3} />
            <TrustView onComplete={() => handleNext('holdingBack')} />
          </div>
        );
      case 'holdingBack':
        return (
          <div className="flex-1 flex flex-col">
            <Header title="Build Your Profile" onBack={handleBack} progress={4} />
            <SelectView 
              title="Name one thing that's currently holding you back"
              options={[
                { label: 'Inconsistent nutrition' },
                { label: 'No optimal recovery' },
                { label: 'Injuries' },
                { label: 'No structure' }
              ]}
              onComplete={(val) => handleNext('improveMost', { holdingBack: val })}
            />
          </div>
        );
      case 'improveMost':
        return (
          <div className="flex-1 flex flex-col">
            <Header title="Build Your Profile" onBack={handleBack} progress={4} />
            <SelectView 
              title="What do you want to improve most?"
              options={[
                { label: 'Pace and acceleration' },
                { label: 'Strength and physicality' },
                { label: 'Match fitness' },
                { label: 'Everything' }
              ]}
              onComplete={(val) => handleNext('goalDeadline', { improveMost: val })}
            />
          </div>
        );
      case 'goalDeadline':
        return (
          <div className="flex-1 flex flex-col">
            <Header title="Build Your Profile" onBack={handleBack} progress={4} />
            <SelectView 
              title="When do you want to reach this goal?"
              options={[
                { label: '1 Month' },
                { label: '3 Months' },
                { label: '6 Months' },
                { label: 'No deadline - just want to improve' }
              ]}
              onComplete={(val) => handleNext('benefitStatement', { goalDeadline: val })}
            />
          </div>
        );
      case 'benefitStatement':
        return (
          <div className="flex-1 flex flex-col">
            <Header title="Build Your Profile" onBack={handleBack} progress={4} />
            <BenefitStatementView onComplete={() => handleNext('potentialGraph')} />
          </div>
        );
      case 'potentialGraph':
        return (
          <div className="flex-1 flex flex-col">
            <Header title="Build Your Profile" onBack={handleBack} progress={5} />
            <PotentialGraphView onComplete={() => handleNext('trainingSetup')} />
          </div>
        );
      case 'trainingSetup':
        return (
          <div className="flex-1 flex flex-col">
            <Header title="Build Your Profile" onBack={handleBack} progress={5} />
            <TrainingSetupView onComplete={() => handleNext('activityLevel')} />
          </div>
        );
      case 'activityLevel':
        return (
          <div className="flex-1 flex flex-col">
            <Header title="Build Your Profile" onBack={handleBack} progress={5} />
            <SelectView 
              title="What's your activity level?"
              description="This helps us calibrate your calorie targets."
              options={[
                { label: 'Sedentary', sub: 'No exercise, desk job' },
                { label: 'Lightly Active', sub: 'Exercise 1-2 days/week' },
                { label: 'Moderately Active', sub: 'Exercise 3-4 days/week' },
                { label: 'Very Active', sub: 'Exercise 5-7 days/week' }
              ]}
              onComplete={(val) => handleNext('weightGoal', { activityLevel: val })}
            />
          </div>
        );
      case 'weightGoal':
        return (
          <div className="flex-1 flex flex-col">
            <Header title="Build Your Profile" onBack={handleBack} progress={5} />
            <SelectView 
              title="Weight Goal"
              description="Pick your goal so we can calculate calorie targets correctly."
              options={[
                { label: 'Lose Weight', sub: 'Trim body fat while preserving performance' },
                { label: 'Maintain Weight', sub: 'Stay at current weight and optimize energy' },
                { label: 'Gain Weight', sub: 'Add quality mass for strength and power' }
              ]}
              onComplete={(val) => handleNext('nutrition', { weightGoal: val })}
            />
          </div>
        );
      case 'nutrition':
        return (
          <div className="flex-1 flex flex-col">
            <Header title="Build Your Profile" onBack={handleBack} progress={6} />
            <NutritionView onComplete={() => handleNext('accomplish')} />
          </div>
        );
      case 'accomplish':
        return (
          <div className="flex-1 flex flex-col">
            <Header title="Build Your Profile" onBack={handleBack} progress={6} />
            <SelectView 
              title="What do you want to accomplish through training?"
              description="Select all that apply."
              options={[
                { label: 'Confidence on the pitch' },
                { label: 'More minutes & better stats' },
                { label: 'Physical edge' },
                { label: 'General improvements' }
              ]}
              onComplete={(val) => handleNext('fixPace', { goals: val })}
            />
          </div>
        );
      case 'fixPace':
        return (
          <div className="flex-1 flex flex-col">
            <Header title="Finalize" onBack={handleBack} progress={7} />
            <FixPaceView onComplete={() => handleNext('twiceFast')} />
          </div>
        );
      case 'twiceFast':
        return (
          <div className="flex-1 flex flex-col">
            <Header title="Finalize" onBack={handleBack} progress={7} />
            <TwiceFastView onComplete={() => handleNext('referralCode')} />
          </div>
        );
      case 'referralCode':
        return (
          <div className="flex-1 flex flex-col">
            <Header title="Finalize" onBack={handleBack} progress={8} />
            <ReferralCodeView onComplete={() => handleNext('connectWatch')} />
          </div>
        );
      case 'connectWatch':
        return (
          <div className="flex-1 flex flex-col">
            <Header title="Finalize" onBack={handleBack} progress={8} />
            <ConnectWatchView onComplete={() => handleNext('testimonials')} />
          </div>
        );
      case 'testimonials':
        return (
          <div className="flex-1 flex flex-col">
            <Header title="Finalize" onBack={handleBack} progress={9} />
            <TestimonialsView onComplete={() => handleNext('generating')} />
          </div>
        );
      case 'generating':
        return (
          <div className="flex-1 flex flex-col bg-black">
            <GeneratingView onComplete={() => handleNext('planReady')} />
          </div>
        );
      case 'planReady':
        return (
          <div className="flex-1 flex flex-col bg-black">
            <PlanReadyView onComplete={() => handleNext('planResults')} />
          </div>
        );
      case 'planResults':
        return (
          <div className="flex-1 flex flex-col bg-black">
            <PlanResultsView onComplete={() => handleNext('trialIntro')} />
          </div>
        );
      case 'trialIntro':
        return (
          <div className="flex-1 flex flex-col bg-black">
            <TrialIntroView onComplete={() => handleNext('trialTimeline')} />
          </div>
        );
      case 'trialTimeline':
        return (
          <div className="flex-1 flex flex-col bg-black">
            <TrialTimelineView onComplete={() => handleNext('paywall')} />
          </div>
        );
      case 'paywall':
        return (
          <div className="flex-1 flex flex-col bg-black overflow-y-auto">
            <PaywallView onComplete={() => setStep('dashboard')} onBack={() => handleNext('trialTimeline')} />
          </div>
        );
      case 'dashboard':
        if (showNotifications) {
          return <NotificationsView onBack={() => setShowNotifications(false)} />;
        }
        if (showSchedule) {
           return (
             <div className="flex-1 flex flex-col bg-[#05080D]">
                <div className="p-6 flex items-center gap-8 mb-4">
                  <button onClick={() => setShowSchedule(false)} className="text-white"><ArrowLeft className="w-6 h-6" /></button>
                  <h2 className="text-white font-bold text-xl">Schedule</h2>
                </div>
                <div className="flex-1 p-6">
                  <ScheduleView onComplete={() => setShowSchedule(false)} />
                </div>
             </div>
           );
        }
        return (
          <MainLayout 
            activeTab={activeTab} 
            onTabChange={(tab) => {
              setActiveTab(tab);
              if (tab === 'train') setTrainTabStep('library');
              if (tab === 'match') setMatchTabStep('hub');
            }} 
            onNotify={() => setShowNotifications(true)}
            onCalendar={() => setShowSchedule(true)}
            onAiCoach={() => setStep('aiCoach')}
          >
            {renderTabContent()}
          </MainLayout>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#05080D] flex items-center justify-center">
      {/* Container */}
      <div className="w-full max-w-[450px] h-screen bg-[#0D121D] shadow-2xl relative overflow-hidden flex flex-col">
        <div className="flex-1 flex flex-col relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col overflow-hidden"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
