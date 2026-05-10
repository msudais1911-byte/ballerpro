import { View, Text, TouchableOpacity, ScrollView, TextInput, Dimensions, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { colors, spacing, fontSizes, borderRadius } from '@/utils/styles';
import { 
  ArrowLeft, ArrowRight, Check, ChevronDown, CheckCircle, Circle 
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const STEP_ORDER = [
  'loading', 'landing', 'name', 'gender', 'birthday', 'heightWeight', 'position',
  'club', 'teamTraining', 'schedule', 'referral', 'experience', 'graph', 'trust',
  'holdingBack', 'improveMost', 'goalDeadline', 'benefitStatement', 'potentialGraph',
  'trainingSetup', 'activityLevel', 'weightGoal', 'nutrition', 'accomplish', 'fixPace',
  'twiceFast', 'referralCode', 'connectWatch', 'testimonials', 'generating', 'planReady',
  'planResults', 'trialIntro', 'trialTimeline', 'paywall'
];

export default function OnboardingScreen() {
  const router = useRouter();
  const { currentStep, setCurrentStep, userData, setUserData } = useAppContext();
  const [inputValue, setInputValue] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  
  const currentStepIndex = STEP_ORDER.indexOf(currentStep as any);

  useEffect(() => {
    if (currentStep === 'loading') {
      const timer = setTimeout(() => {
        setCurrentStep('landing');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  useEffect(() => {
    if (currentStep === 'dashboard') {
      router.replace('/(tabs)');
    }
  }, [currentStep]);

  const handleNextStep = () => {
    if (currentStepIndex < STEP_ORDER.length - 1) {
      setCurrentStep(STEP_ORDER[currentStepIndex + 1] as any);
    }
  };

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(STEP_ORDER[currentStepIndex - 1] as any);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setInputValue(value);
    setUserData({ [field as keyof typeof userData]: value });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'loading':
        return <LoadingScreen />;
      case 'landing':
        return <LandingScreen />;
      case 'name':
        return <NameScreen inputValue={inputValue} handleInputChange={handleInputChange} />;
      case 'gender':
        return <GenderScreen selectedGender={selectedGender} setSelectedGender={setSelectedGender} />;
      case 'birthday':
        return <BirthdayScreen inputValue={inputValue} handleInputChange={handleInputChange} />;
      case 'heightWeight':
        return <HeightWeightScreen />;
      case 'position':
        return <PositionScreen />;
      case 'club':
        return <ClubScreen inputValue={inputValue} handleInputChange={handleInputChange} />;
      case 'teamTraining':
        return <TeamTrainingScreen />;
      case 'schedule':
        return <ScheduleScreen />;
      case 'referral':
        return <ReferralScreen />;
      case 'experience':
        return <ExperienceScreen />;
      case 'graph':
        return <GraphScreen />;
      case 'trust':
        return <TrustScreen />;
      case 'holdingBack':
        return <HoldingBackScreen />;
      case 'improveMost':
        return <ImproveMostScreen />;
      case 'goalDeadline':
        return <GoalDeadlineScreen />;
      case 'benefitStatement':
        return <BenefitStatementScreen />;
      case 'potentialGraph':
        return <PotentialGraphScreen />;
      case 'trainingSetup':
        return <TrainingSetupScreen />;
      case 'activityLevel':
        return <ActivityLevelScreen />;
      case 'weightGoal':
        return <WeightGoalScreen />;
      case 'nutrition':
        return <NutritionScreen />;
      case 'accomplish':
        return <AccomplishScreen />;
      case 'fixPace':
        return <FixPaceScreen />;
      case 'twiceFast':
        return <TwiceFastScreen />;
      case 'referralCode':
        return <ReferralCodeScreen inputValue={inputValue} handleInputChange={handleInputChange} />;
      case 'connectWatch':
        return <ConnectWatchScreen />;
      case 'testimonials':
        return <TestimonialsScreen />;
      case 'generating':
        return <GeneratingScreen />;
      case 'planReady':
        return <PlanReadyScreen />;
      case 'planResults':
        return <PlanResultsScreen />;
      case 'trialIntro':
        return <TrialIntroScreen />;
      case 'trialTimeline':
        return <TrialTimelineScreen />;
      case 'paywall':
        return <PaywallScreen />;
      default:
        return <LandingScreen />;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.dark }]}>
      {renderStep()}
      {currentStep !== 'loading' && (
        <View style={styles.navigationBar}>
          {currentStepIndex > 0 && (
            <TouchableOpacity onPress={handlePreviousStep} style={styles.navButton}>
              <ArrowLeft size={24} color={colors.text} />
            </TouchableOpacity>
          )}
          <View style={{ flex: 1 }} />
          {currentStep !== 'paywall' && currentStepIndex < STEP_ORDER.length - 1 && (
            <TouchableOpacity onPress={handleNextStep} style={styles.navButton}>
              <ArrowRight size={24} color={colors.text} />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

// --- Screen Components ---

const LoadingScreen = () => (
  <View style={[styles.centerScreen, { backgroundColor: colors.dark }]}>
    <View
      style={[styles.logo, { backgroundColor: colors.accent }]}
    >
      <Text style={{ fontSize: 48, fontWeight: 'bold', color: colors.text }}>B</Text>
    </View>
    <Text style={[styles.title, { marginTop: spacing.lg }]}>BollerPro</Text>
  </View>
);

const LandingScreen = () => (
  <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}>
    <View style={styles.centerContent}>
      <Text style={styles.title}>Welcome to BollerPro</Text>
      <Text style={styles.subtitle}>Your personalized football training platform</Text>
      <Text style={styles.description}>
        Get a customized training plan designed specifically for your goals, position, and experience level.
      </Text>
    </View>
  </ScrollView>
);

const NameScreen = ({ inputValue, handleInputChange }: { inputValue: string; handleInputChange: (field: string, value: string) => void }) => (
  <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}>
    <Text style={styles.title}>What&apos;s your name?</Text>
    <TextInput
      style={styles.input}
      placeholder="Enter your name"
      placeholderTextColor={colors.textSecondary}
      value={inputValue}
      onChangeText={(text) => handleInputChange('name', text)}
    />
  </ScrollView>
);

const GenderScreen = ({ selectedGender, setSelectedGender }: { selectedGender: string; setSelectedGender: (g: string) => void }) => (
  <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}>
    <Text style={styles.title}>What&apos;s your gender?</Text>
    {['Male', 'Female', 'Other'].map((gender) => (
      <TouchableOpacity
        key={gender}
        onPress={() => setSelectedGender(gender)}
        style={[styles.optionButton, selectedGender === gender && styles.optionButtonSelected]}
      >
        <Text style={styles.optionButtonText}>{gender}</Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

const BirthdayScreen = ({ inputValue, handleInputChange }: { inputValue: string; handleInputChange: (field: string, value: string) => void }) => (
  <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}>
    <Text style={styles.title}>When were you born?</Text>
    <TextInput
      style={styles.input}
      placeholder="MM/DD/YYYY"
      placeholderTextColor={colors.textSecondary}
      value={inputValue}
      onChangeText={(text) => handleInputChange('birthday', text)}
    />
  </ScrollView>
);

const HeightWeightScreen = () => (
  <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}>
    <Text style={styles.title}>Height & Weight</Text>
    <TextInput
      style={styles.input}
      placeholder="Height (cm)"
      placeholderTextColor={colors.textSecondary}
    />
    <TextInput
      style={styles.input}
      placeholder="Weight (kg)"
      placeholderTextColor={colors.textSecondary}
    />
  </ScrollView>
);

const PositionScreen = () => (
  <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}>
    <Text style={styles.title}>What&apos;s your position?</Text>
    {['Goalkeeper', 'Defender', 'Midfielder', 'Forward'].map((position) => (
      <TouchableOpacity key={position} style={styles.optionButton}>
        <Text style={styles.optionButtonText}>{position}</Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

const ClubScreen = ({ inputValue, handleInputChange }: { inputValue: string; handleInputChange: (field: string, value: string) => void }) => (
  <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}>
    <Text style={styles.title}>What club do you play for?</Text>
    <TextInput
      style={styles.input}
      placeholder="Club name"
      placeholderTextColor={colors.textSecondary}
      value={inputValue}
      onChangeText={(text) => handleInputChange('club', text)}
    />
  </ScrollView>
);

const TeamTrainingScreen = () => (
  <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}>
    <Text style={styles.title}>Team Training Schedule</Text>
    <Text style={styles.description}>How many times per week does your team train?</Text>
    {['2-3 times', '3-4 times', '4-5 times', '5+ times'].map((freq) => (
      <TouchableOpacity key={freq} style={styles.optionButton}>
        <Text style={styles.optionButtonText}>{freq}</Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

const ScheduleScreen = () => (
  <View style={[styles.centerScreen, { backgroundColor: colors.dark }]}>
    <Text style={styles.title}>Your training schedule has been set</Text>
  </View>
);

const ReferralScreen = () => (
  <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}>
    <Text style={styles.title}>How did you hear about us?</Text>
    {['Friend', 'Social Media', 'Search', 'Other'].map((source) => (
      <TouchableOpacity key={source} style={styles.optionButton}>
        <Text style={styles.optionButtonText}>{source}</Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

const ExperienceScreen = () => (
  <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}>
    <Text style={styles.title}>Years of experience?</Text>
    {['0-1', '1-3', '3-5', '5+'].map((years) => (
      <TouchableOpacity key={years} style={styles.optionButton}>
        <Text style={styles.optionButtonText}>{years} years</Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

const GraphScreen = () => (
  <View style={[styles.centerScreen, { backgroundColor: colors.dark }]}>
    <Text style={styles.title}>Your Performance Graph</Text>
  </View>
);

const TrustScreen = () => (
  <View style={[styles.centerScreen, { backgroundColor: colors.dark }]}>
    <Text style={styles.title}>Building your training plan</Text>
  </View>
);

const HoldingBackScreen = () => (
  <View style={[styles.centerScreen, { backgroundColor: colors.dark }]}>
    <Text style={styles.title}>What&apos;s holding you back?</Text>
  </View>
);

const ImproveMostScreen = () => (
  <View style={[styles.centerScreen, { backgroundColor: colors.dark }]}>
    <Text style={styles.title}>What do you want to improve most?</Text>
  </View>
);

const GoalDeadlineScreen = () => (
  <View style={[styles.centerScreen, { backgroundColor: colors.dark }]}>
    <Text style={styles.title}>When do you want to achieve this?</Text>
  </View>
);

const BenefitStatementScreen = () => (
  <View style={[styles.centerScreen, { backgroundColor: colors.dark }]}>
    <Text style={styles.title}>Benefits of your training</Text>
  </View>
);

const PotentialGraphScreen = () => (
  <View style={[styles.centerScreen, { backgroundColor: colors.dark }]}>
    <Text style={styles.title}>Your potential growth</Text>
  </View>
);

const TrainingSetupScreen = () => (
  <View style={[styles.centerScreen, { backgroundColor: colors.dark }]}>
    <Text style={styles.title}>Training setup</Text>
  </View>
);

const ActivityLevelScreen = () => (
  <View style={[styles.centerScreen, { backgroundColor: colors.dark }]}>
    <Text style={styles.title}>Activity level</Text>
  </View>
);

const WeightGoalScreen = () => (
  <View style={[styles.centerScreen, { backgroundColor: colors.dark }]}>
    <Text style={styles.title}>Weight goal</Text>
  </View>
);

const NutritionScreen = () => (
  <View style={[styles.centerScreen, { backgroundColor: colors.dark }]}>
    <Text style={styles.title}>Nutrition preferences</Text>
  </View>
);

const AccomplishScreen = () => (
  <View style={[styles.centerScreen, { backgroundColor: colors.dark }]}>
    <Text style={styles.title}>What do you want to accomplish?</Text>
  </View>
);

const FixPaceScreen = () => (
  <View style={[styles.centerScreen, { backgroundColor: colors.dark }]}>
    <Text style={styles.title}>Fix your pace</Text>
  </View>
);

const TwiceFastScreen = () => (
  <View style={[styles.centerScreen, { backgroundColor: colors.dark }]}>
    <Text style={styles.title}>Twice as fast</Text>
  </View>
);

const ReferralCodeScreen = ({ inputValue, handleInputChange }: { inputValue: string; handleInputChange: (field: string, value: string) => void }) => (
  <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}>
    <Text style={styles.title}>Have a referral code?</Text>
    <TextInput
      style={styles.input}
      placeholder="Enter code (optional)"
      placeholderTextColor={colors.textSecondary}
      value={inputValue}
      onChangeText={(text) => handleInputChange('referralCode', text)}
    />
  </ScrollView>
);

const ConnectWatchScreen = () => (
  <View style={[styles.centerScreen, { backgroundColor: colors.dark }]}>
    <Text style={styles.title}>Connect your smartwatch</Text>
  </View>
);

const TestimonialsScreen = () => (
  <View style={[styles.centerScreen, { backgroundColor: colors.dark }]}>
    <Text style={styles.title}>Success stories</Text>
  </View>
);

const GeneratingScreen = () => (
  <View style={[styles.centerScreen, { backgroundColor: colors.dark }]}>
    <Text style={styles.title}>Generating your plan...</Text>
  </View>
);

const PlanReadyScreen = () => (
  <View style={[styles.centerScreen, { backgroundColor: colors.dark }]}>
    <Text style={styles.title}>Your plan is ready!</Text>
  </View>
);

const PlanResultsScreen = () => (
  <View style={[styles.centerScreen, { backgroundColor: colors.dark }]}>
    <Text style={styles.title}>Plan results</Text>
  </View>
);

const TrialIntroScreen = () => (
  <View style={[styles.centerScreen, { backgroundColor: colors.dark }]}>
    <Text style={styles.title}>Try for free</Text>
  </View>
);

const TrialTimelineScreen = () => (
  <View style={[styles.centerScreen, { backgroundColor: colors.dark }]}>
    <Text style={styles.title}>Trial timeline</Text>
  </View>
);

const PaywallScreen = () => (
  <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}>
    <Text style={styles.title}>Start your journey</Text>
    <View
      style={[styles.upgradeButton, { backgroundColor: colors.accent }]}
    >
      <Text style={styles.upgradeButtonText}>Continue to Dashboard</Text>
    </View>
  </ScrollView>
);

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  screenContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xl + 60,
  },
  centerScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: fontSizes['2xl'],
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: fontSizes.lg,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  description: {
    fontSize: fontSizes.base,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  input: {
    backgroundColor: colors.darkSecondary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    color: colors.text,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: fontSizes.base,
  },
  optionButton: {
    backgroundColor: colors.darkSecondary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: colors.border,
  },
  optionButtonSelected: {
    borderColor: colors.accent,
    backgroundColor: `${colors.accent}20`,
  },
  optionButtonText: {
    color: colors.text,
    fontSize: fontSizes.base,
    fontWeight: '600',
  },
  upgradeButton: {
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  upgradeButtonText: {
    color: colors.text,
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
  },
  navigationBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.darkSecondary,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  navButton: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.accent,
  },
});
