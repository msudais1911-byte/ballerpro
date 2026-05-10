import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { colors, spacing, fontSizes, borderRadius } from '@/utils/styles';
import { 
  User, Bell, Lock, HelpCircle, LogOut, ChevronRight,
  Moon, Zap, Volume2
} from 'lucide-react-native';

const SETTINGS_ITEMS = [
  {
    title: 'Account',
    items: [
      { icon: User, label: 'Profile', value: 'profile' },
      { icon: Lock, label: 'Password', value: 'password' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { icon: Bell, label: 'Notifications', value: 'notifications', hasToggle: true },
      { icon: Moon, label: 'Dark Mode', value: 'darkmode', hasToggle: true },
      { icon: Volume2, label: 'Sound', value: 'sound', hasToggle: true },
    ],
  },
  {
    title: 'More',
    items: [
      { icon: HelpCircle, label: 'Help & Support', value: 'help' },
      { icon: Zap, label: 'About BollerPro', value: 'about' },
    ],
  },
];

export default function SettingsScreen() {
  const router = useRouter();
  const [toggles, setToggles] = useState({
    notifications: true,
    darkmode: true,
    sound: true,
  });

  const handleToggle = (value: string) => {
    setToggles((prev) => ({
      ...prev,
      [value]: !prev[value as keyof typeof prev],
    }));
  };

  const handleLogout = () => {
    router.replace('/onboarding');
  };

  const SettingItem = ({ icon: Icon, label, value, hasToggle }: any) => (
    <TouchableOpacity style={styles.settingItem}>
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, gap: spacing.md }}>
        <Icon size={20} color={colors.accent} />
        <Text style={styles.settingLabel}>{label}</Text>
      </View>
      {hasToggle ? (
        <Switch
          value={toggles[value as keyof typeof toggles]}
          onValueChange={() => handleToggle(value)}
          trackColor={{ false: colors.border, true: colors.accent }}
          thumbColor={colors.text}
        />
      ) : (
        <ChevronRight size={20} color={colors.textSecondary} />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.profileAvatar}>
          <User size={40} color={colors.text} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.profileName}>John Player</Text>
          <Text style={styles.profileEmail}>john@ballerpro.com</Text>
        </View>
      </View>

      {/* Settings Sections */}
      {SETTINGS_ITEMS.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.sectionContent}>
            {section.items.map((item, itemIndex) => (
              <View key={itemIndex}>
                <SettingItem {...item} />
                {itemIndex < section.items.length - 1 && <View style={styles.divider} />}
              </View>
            ))}
          </View>
        </View>
      ))}

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <LogOut size={20} color="#EF4444" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* App Version */}
      <View style={styles.footer}>
        <Text style={styles.versionText}>BollerPro v1.0.0</Text>
        <Text style={styles.copyrightText}>© 2024 BollerPro. All rights reserved.</Text>
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
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.darkSecondary,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.lg,
  },
  profileAvatar: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.md,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
    color: colors.text,
  },
  profileEmail: {
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSizes.sm,
    fontWeight: 'bold',
    color: colors.textSecondary,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
    textTransform: 'uppercase',
  },
  sectionContent: {
    backgroundColor: colors.darkSecondary,
    marginHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  settingLabel: {
    fontSize: fontSizes.base,
    color: colors.text,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.lg,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    backgroundColor: colors.darkSecondary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.lg,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  logoutText: {
    fontSize: fontSizes.base,
    fontWeight: 'bold',
    color: '#EF4444',
  },
  footer: {
    alignItems: 'center',
    marginTop: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  versionText: {
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
  },
  copyrightText: {
    fontSize: fontSizes.xs,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
});
