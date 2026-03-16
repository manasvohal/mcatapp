import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/colors';
import { SHADOWS } from '../constants/fonts';
import ProgressBar from '../components/ProgressBar';

const SUBJECTS = [
  { label: 'Biology', percentage: 92, color: COLORS.green },
  { label: 'Physics', percentage: 78, color: COLORS.blue },
  { label: 'Biochemistry', percentage: 65, color: COLORS.purple },
  { label: 'Psychology', percentage: 71, color: COLORS.coral },
  { label: 'General Chem', percentage: 55, color: COLORS.orange },
];

const generateActivity = () => {
  const days = [];
  for (let i = 27; i >= 0; i--) {
    days.push(Math.random() > 0.3);
  }
  days[27] = true;
  days[26] = true;
  days[24] = true;
  days[21] = true;
  days[20] = true;
  return days;
};

const ACTIVITY = generateActivity();
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function ProgressScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <Text style={styles.header}>Progress</Text>

        {/* STATS ROW */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, SHADOWS.card]}>
            <Text style={styles.statValue}>247</Text>
            <Text style={styles.statLabel}>Total Cards</Text>
          </View>
          <View style={[styles.statCard, SHADOWS.card, styles.statCardAccent]}>
            <Text style={[styles.statValue, { color: 'white' }]}>85%</Text>
            <Text style={[styles.statLabel, { color: 'rgba(255,255,255,0.8)' }]}>Mastery</Text>
          </View>
          <View style={[styles.statCard, SHADOWS.card]}>
            <Text style={[styles.statValue, { color: COLORS.orange }]}>🔥 14</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>

        {/* SUBJECT MASTERY */}
        <Text style={styles.sectionTitle}>Subject Mastery</Text>
        <View style={[styles.masteryCard, SHADOWS.card]}>
          {SUBJECTS.map((subject) => (
            <ProgressBar
              key={subject.label}
              label={subject.label}
              percentage={subject.percentage}
              color={subject.color}
            />
          ))}
        </View>

        {/* WEEKLY ACTIVITY */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Activity (Last 4 Weeks)</Text>
        <View style={[styles.activityCard, SHADOWS.card]}>
          <View style={styles.dayLabelsRow}>
            {DAY_LABELS.map((d) => (
              <Text key={d} style={styles.dayLabel}>{d}</Text>
            ))}
          </View>
          {[0, 1, 2, 3].map((week) => (
            <View key={week} style={styles.activityRow}>
              {[0, 1, 2, 3, 4, 5, 6].map((day) => {
                const idx = week * 7 + day;
                const studied = ACTIVITY[idx];
                return (
                  <View
                    key={day}
                    style={[
                      styles.activityDot,
                      studied && styles.activityDotFilled,
                      idx === 27 && styles.activityDotToday,
                    ]}
                  />
                );
              })}
            </View>
          ))}
          <View style={styles.activityLegend}>
            <View style={styles.legendItem}>
              <View style={styles.activityDot} />
              <Text style={styles.legendText}>Not studied</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.activityDot, styles.activityDotFilled]} />
              <Text style={styles.legendText}>Studied</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.activityDot, styles.activityDotToday]} />
              <Text style={styles.legendText}>Today</Text>
            </View>
          </View>
        </View>

        {/* ACHIEVEMENTS */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Achievements</Text>
        <View style={styles.achievementsGrid}>
          {[
            { icon: '🔥', title: '14-Day Streak', desc: 'Studied 14 days in a row', earned: true },
            { icon: '🧠', title: 'Bio Master', desc: '90%+ Biology mastery', earned: true },
            { icon: '⚡', title: 'Speed Runner', desc: 'Complete quiz under 5 min', earned: true },
            { icon: '📚', title: '100 Cards', desc: 'View 100 unique cards', earned: true },
            { icon: '🏆', title: 'Perfect Score', desc: 'Get 10/10 on a quiz', earned: false },
            { icon: '🎯', title: '30-Day Streak', desc: 'Study 30 days in a row', earned: false },
          ].map((a) => (
            <View
              key={a.title}
              style={[
                styles.achievementCard,
                SHADOWS.card,
                !a.earned && styles.achievementCardLocked,
              ]}
            >
              <Text style={[styles.achievementIcon, !a.earned && styles.achievementIconLocked]}>
                {a.earned ? a.icon : '🔒'}
              </Text>
              <Text style={[styles.achievementTitle, !a.earned && styles.lockedText]}>
                {a.title}
              </Text>
              <Text style={styles.achievementDesc}>{a.desc}</Text>
              {a.earned && (
                <View style={styles.earnedBadge}>
                  <Text style={styles.earnedText}>EARNED</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
  },
  statCardAccent: {
    backgroundColor: COLORS.blue,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.gray,
    fontWeight: '600',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 14,
    letterSpacing: -0.3,
  },
  masteryCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
  },
  activityCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
  },
  dayLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  dayLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.gray,
    width: 32,
    textAlign: 'center',
  },
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  activityDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.lightGray,
  },
  activityDotFilled: {
    backgroundColor: COLORS.blue,
  },
  activityDotToday: {
    backgroundColor: COLORS.orange,
    borderWidth: 2,
    borderColor: '#C2410C',
  },
  activityLegend: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendText: {
    fontSize: 11,
    color: COLORS.gray,
    fontWeight: '500',
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  achievementCard: {
    width: '47%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
  },
  achievementCardLocked: {
    backgroundColor: '#F9FAFB',
    opacity: 0.7,
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  achievementIconLocked: {
    opacity: 0.4,
  },
  achievementTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  lockedText: {
    color: COLORS.gray,
  },
  achievementDesc: {
    fontSize: 11,
    color: COLORS.gray,
    textAlign: 'center',
    lineHeight: 16,
  },
  earnedBadge: {
    marginTop: 8,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },
  earnedText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#15803D',
    letterSpacing: 0.8,
  },
});
