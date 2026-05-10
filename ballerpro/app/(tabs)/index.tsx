import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext } from '@/context/AppContext';
import { colors, spacing, fontSizes, borderRadius } from '@/utils/styles';
import { 
  Dumbbell, Calendar, Trophy, Activity, Plus, ArrowRight,
  BarChart3, Zap, Users, Heart
} from 'lucide-react-native';

export default function DashboardScreen() {
  const router = useRouter();
  const { userData, matches } = useAppContext();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.name}>{userData.name || 'Player'}</Text>
        </View>
        <View style={styles.headerBadge}>
          <Trophy size={20} color={colors.accent} />
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Activity size={24} color={colors.accent} />
          <Text style={styles.statValue}>120</Text>
          <Text style={styles.statLabel}>Training AU</Text>
        </View>
        <View style={styles.statCard}>
          <Heart size={24} color={colors.accent} />
          <Text style={styles.statValue}>85%</Text>
          <Text style={styles.statLabel}>Recovery</Text>
        </View>
        <View style={styles.statCard}>
          <BarChart3 size={24} color={colors.accent} />
          <Text style={styles.statValue}>8h</Text>
          <Text style={styles.statLabel}>Sleep</Text>
        </View>
      </View>

      {/* Next Workout */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Workout</Text>
        <TouchableOpacity onPress={() => router.push('/explore')}>
          <View
            style={[styles.workoutCard, { backgroundColor: colors.accent }]}
          >
            <View>
              <Text style={styles.workoutName}>Strength Training</Text>
              <Text style={styles.workoutDetails}>60 min • 4 exercises</Text>
            </View>
            <ArrowRight size={24} color={colors.text} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Next Match */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Match</Text>
          <TouchableOpacity onPress={() => router.push('/explore')}>
            <Plus size={20} color={colors.accent} />
          </TouchableOpacity>
        </View>
        {matches.length > 0 ? (
          <View style={styles.matchCard}>
            <View>
              <Text style={styles.matchTeam}>{matches[0].opponent}</Text>
              <Text style={styles.matchDetails}>{matches[0].date} • {matches[0].time}</Text>
              <Text style={styles.matchLocation}>{matches[0].location}</Text>
            </View>
            <View style={[styles.matchType, { backgroundColor: colors.accentLight + '20' }]}>
              <Text style={styles.matchTypeText}>{matches[0].type}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.emptyCard}>
            <Calendar size={32} color={colors.textSecondary} />
            <Text style={styles.emptyText}>No matches scheduled</Text>
            <TouchableOpacity onPress={() => router.push('/explore')} style={styles.addButton}>
              <Text style={styles.addButtonText}>Add Match</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionGrid}>
          <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/explore')}>
            <Dumbbell size={28} color={colors.accent} />
            <Text style={styles.actionLabel}>Workouts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/explore')}>
            <Users size={28} color={colors.accent} />
            <Text style={styles.actionLabel}>Matches</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/explore')}>
            <Zap size={28} color={colors.accent} />
            <Text style={styles.actionLabel}>AI Coach</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/explore')}>
            <BarChart3 size={28} color={colors.accent} />
            <Text style={styles.actionLabel}>Progress</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  content: {
    paddingBottom: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    paddingTop: spacing.xl,
  },
  greeting: {
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
  },
  name: {
    fontSize: fontSizes['2xl'],
    fontWeight: 'bold',
    color: colors.text,
  },
  headerBadge: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.darkSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.darkSecondary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: {
    fontSize: fontSizes.xl,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: spacing.sm,
  },
  statLabel: {
    fontSize: fontSizes.xs,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.md,
  },
  workoutCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: borderRadius.md,
  },
  workoutName: {
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
    color: colors.text,
  },
  workoutDetails: {
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  matchCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.darkSecondary,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  matchTeam: {
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
    color: colors.text,
  },
  matchDetails: {
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  matchLocation: {
    fontSize: fontSizes.xs,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  matchType: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  matchTypeText: {
    fontSize: fontSizes.xs,
    fontWeight: 'bold',
    color: colors.accent,
  },
  emptyCard: {
    backgroundColor: colors.darkSecondary,
    borderRadius: borderRadius.md,
    padding: spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyText: {
    fontSize: fontSizes.base,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
  addButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    marginTop: spacing.md,
  },
  addButtonText: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: fontSizes.base,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  actionButton: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.darkSecondary,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionLabel: {
    fontSize: fontSizes.sm,
    color: colors.text,
    fontWeight: '600',
    marginTop: spacing.sm,
  },
});
