import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext } from '@/context/AppContext';
import { colors, spacing, fontSizes, borderRadius } from '@/utils/styles';
import { ArrowLeft, Play, CheckCircle, Clock, Zap } from 'lucide-react-native';

export default function WorkoutDetailScreen() {
  const router = useRouter();
  const { currentWorkout } = useAppContext();

  if (!currentWorkout) {
    return (
      <View style={[styles.container, styles.centerContainer]}>
        <Text style={styles.errorText}>No workout selected</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderExercise = ({ item, index }: any) => (
    <View style={styles.exerciseCard}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
          <View style={styles.exerciseNumber}>
            <Text style={styles.exerciseNumberText}>{index + 1}</Text>
          </View>
          <View>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <Text style={styles.exerciseMeta}>
              {item.sets} sets × {item.reps} reps
            </Text>
          </View>
        </View>
        <View style={styles.restBadge}>
          <Clock size={14} color={colors.text} />
          <Text style={styles.restText}>{item.rest}s</Text>
        </View>
      </View>

      <View style={styles.exerciseProgressBar}>
        <View
          style={[
            styles.exerciseProgress,
            {
              width: `${(item.completedSets / item.sets) * 100}%`,
            },
          ]}
        />
      </View>
      <Text style={styles.progressText}>
        {item.completedSets}/{item.sets} sets completed
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.headerTitle}>{currentWorkout.type}</Text>
        </View>
        <View style={{ width: 24 }} />
      </View>

      {/* Workout Info */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentInner}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.workoutHeader}>
          <View>
            <Text style={styles.workoutTitle}>{currentWorkout.name}</Text>
            <Text style={styles.workoutFocus}>{currentWorkout.focus}</Text>
          </View>
          <View style={styles.rpeBox}>
            <Text style={styles.rpeLabel}>RPE</Text>
            <Text style={styles.rpeValue}>{currentWorkout.rpe}</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Clock size={20} color={colors.accent} />
            <Text style={styles.statValue}>{currentWorkout.duration}</Text>
            <Text style={styles.statLabel}>Duration</Text>
          </View>
          <View style={styles.statItem}>
            <Zap size={20} color={colors.accent} />
            <Text style={styles.statValue}>{currentWorkout.exercises.length}</Text>
            <Text style={styles.statLabel}>Exercises</Text>
          </View>
          <View style={styles.statItem}>
            <CheckCircle size={20} color={colors.accent} />
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
        </View>

        {/* Exercises */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exercises</Text>
          <FlatList
            data={currentWorkout.exercises}
            renderItem={renderExercise}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
          />
        </View>

        {/* Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Workout Tips</Text>
          <View style={styles.tipsBox}>
            <Text style={styles.tipsText}>
              • Focus on proper form over speed{'\n'}
              • Take full rest between sets{'\n'}
              • Stay hydrated throughout{'\n'}
              • Listen to your body
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Start Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.startButton}>
          <Play size={20} color={colors.text} fill={colors.text} />
          <Text style={styles.startButtonText}>Start Workout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    paddingTop: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
    color: colors.text,
  },
  content: {
    flex: 1,
  },
  contentInner: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    paddingBottom: spacing.xl + 80,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  workoutTitle: {
    fontSize: fontSizes.xl,
    fontWeight: 'bold',
    color: colors.text,
  },
  workoutFocus: {
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    textTransform: 'capitalize',
  },
  rpeBox: {
    backgroundColor: colors.accent,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  rpeLabel: {
    fontSize: fontSizes.xs,
    color: colors.text,
    fontWeight: '600',
  },
  rpeValue: {
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
    color: colors.text,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  statItem: {
    flex: 1,
    backgroundColor: colors.darkSecondary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: {
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
    color: colors.text,
    marginVertical: spacing.xs,
  },
  statLabel: {
    fontSize: fontSizes.xs,
    color: colors.textSecondary,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.md,
  },
  exerciseCard: {
    backgroundColor: colors.darkSecondary,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  exerciseNumber: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseNumberText: {
    fontSize: fontSizes.base,
    fontWeight: 'bold',
    color: colors.text,
  },
  exerciseName: {
    fontSize: fontSizes.base,
    fontWeight: '600',
    color: colors.text,
  },
  exerciseMeta: {
    fontSize: fontSizes.xs,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  restBadge: {
    backgroundColor: colors.accent + '20',
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  restText: {
    fontSize: fontSizes.xs,
    fontWeight: 'bold',
    color: colors.accent,
  },
  exerciseProgressBar: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  exerciseProgress: {
    height: '100%',
    backgroundColor: colors.accent,
  },
  progressText: {
    fontSize: fontSizes.xs,
    color: colors.textSecondary,
  },
  tipsBox: {
    backgroundColor: colors.darkSecondary,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tipsText: {
    fontSize: fontSizes.sm,
    color: colors.text,
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    backgroundColor: colors.accent,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.lg,
  },
  startButtonText: {
    fontSize: fontSizes.base,
    fontWeight: 'bold',
    color: colors.text,
  },
  backButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    marginTop: spacing.lg,
  },
  backButtonText: {
    color: colors.text,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: fontSizes.lg,
    color: colors.textSecondary,
  },
});
