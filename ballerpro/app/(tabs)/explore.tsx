import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext } from '@/context/AppContext';
import { colors, spacing, fontSizes, borderRadius } from '@/utils/styles';
import { Dumbbell, Clock, TrendingUp, Plus, Play, CheckCircle } from 'lucide-react-native';
import { DUMMY_WORKOUT } from '@/types';

const WORKOUTS = [
  { ...DUMMY_WORKOUT, id: 'w1', name: 'Strength - Monday', rpe: 7 },
  { id: 'w2', name: 'Speed Work - Tuesday', type: 'SPEED', duration: '45 min', rpe: 8, focus: 'speed', exercises: [] },
  { id: 'w3', name: 'Endurance - Wednesday', type: 'ENDURANCE', duration: '90 min', rpe: 6, focus: 'endurance', exercises: [] },
  { id: 'w4', name: 'Strength - Thursday', type: 'STRENGTH', duration: '60 min', rpe: 8, focus: 'strength', exercises: [] },
  { id: 'w5', name: 'Recovery - Friday', type: 'RECOVERY', duration: '30 min', rpe: 3, focus: 'recovery', exercises: [] },
];

export default function WorkoutsScreen() {
  const router = useRouter();
  const { currentWorkout, setCurrentWorkout } = useAppContext();

  const handleStartWorkout = (workout: any) => {
    setCurrentWorkout(workout);
    router.push('/workout');
  };

  const getWorkoutColor = (type: string) => {
    switch (type) {
      case 'STRENGTH':
        return colors.accent;
      case 'SPEED':
        return '#FF6B6B';
      case 'ENDURANCE':
        return '#4ECDC4';
      case 'RECOVERY':
        return '#95E1D3';
      default:
        return colors.accent;
    }
  };

  const renderWorkout = ({ item }: any) => (
    <TouchableOpacity
      style={styles.workoutCard}
      onPress={() => handleStartWorkout(item)}
    >
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm }}>
          <View
            style={[
              styles.typeIndicator,
              { backgroundColor: getWorkoutColor(item.type) },
            ]}
          >
            <Dumbbell size={12} color={colors.text} />
          </View>
          <Text style={styles.workoutType}>{item.type}</Text>
          <Text style={styles.rpeText}>RPE {item.rpe}</Text>
        </View>
        <Text style={styles.workoutTitle}>{item.name}</Text>
        <View style={{ flexDirection: 'row', gap: spacing.md, marginTop: spacing.sm }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
            <Clock size={14} color={colors.textSecondary} />
            <Text style={styles.workoutMeta}>{item.duration}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
            <Dumbbell size={14} color={colors.textSecondary} />
            <Text style={styles.workoutMeta}>{item.exercises.length} exercises</Text>
          </View>
        </View>
      </View>
      <View style={styles.playButton}>
        <Play size={20} color={colors.text} fill={colors.text} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>This Week</Text>
          <Text style={styles.headerSubtitle}>5 workouts planned</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <TrendingUp size={20} color={colors.accent} />
          <Text style={styles.statValue}>285</Text>
          <Text style={styles.statLabel}>Total AU</Text>
        </View>
        <View style={styles.statBox}>
          <Clock size={20} color={colors.accent} />
          <Text style={styles.statValue}>5h</Text>
          <Text style={styles.statLabel}>Total Time</Text>
        </View>
        <View style={styles.statBox}>
          <CheckCircle size={20} color={colors.accent} />
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
      </View>

      {/* Workouts List */}
      <FlatList
        data={WORKOUTS}
        renderItem={renderWorkout}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    paddingTop: spacing.xl,
  },
  headerTitle: {
    fontSize: fontSizes.xl,
    fontWeight: 'bold',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  statBox: {
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
    marginTop: spacing.sm,
  },
  statLabel: {
    fontSize: fontSizes.xs,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  workoutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.darkSecondary,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  typeIndicator: {
    width: 28,
    height: 28,
    borderRadius: borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  workoutType: {
    fontSize: fontSizes.xs,
    fontWeight: 'bold',
    color: colors.text,
  },
  rpeText: {
    fontSize: fontSizes.xs,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
  },
  workoutTitle: {
    fontSize: fontSizes.base,
    fontWeight: '600',
    color: colors.text,
  },
  workoutMeta: {
    fontSize: fontSizes.xs,
    color: colors.textSecondary,
  },
  playButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.md,
  },
});
