import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { SHADOWS } from '../constants/fonts';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hi, Manas 👋</Text>
            <Text style={styles.subGreeting}>Ready to crush the MCAT?</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>M</Text>
          </View>
        </View>

        {/* STAT CARDS */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, SHADOWS.card]}>
            <Text style={styles.statIcon}>🔥</Text>
            <Text style={styles.statValue}>14 Days</Text>
            <Text style={styles.statLabel}>BRAIN ON FIRE</Text>
          </View>
          <View style={[styles.statCard, SHADOWS.card]}>
            <Text style={[styles.statIcon, { color: '#10B981' }]}>⚡</Text>
            <Text style={styles.statValue}>85%</Text>
            <Text style={styles.statLabel}>MASTERY</Text>
          </View>
        </View>

        {/* CTA BUTTON */}
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => navigation.navigate('Quiz')}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaText}>Start Daily Quiz →</Text>
        </TouchableOpacity>

        {/* TODAY'S INSIGHT */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Insight</Text>
          <View style={styles.readTimeBadge}>
            <Text style={styles.readTimeText}>2 min read</Text>
          </View>
        </View>

        <View style={[styles.insightCard, SHADOWS.card]}>
          <View style={styles.subjectBadge}>
            <Text style={styles.subjectBadgeText}>🧬 BIOLOGY</Text>
          </View>
          <Text style={styles.insightTitle}>Action Potentials</Text>
          <Text style={styles.insightBody}>
            An action potential is a rapid sequence of changes in the voltage across a membrane. Key
            terms:{' '}
            <Text style={styles.boldText}>Depolarization</Text>
            {' '}(Na⁺ in) and{' '}
            <Text style={styles.italicText}>Repolarization</Text>
            {' '}(K⁺ out). The threshold must be reached (~−55 mV) for the all-or-nothing response
            to fire.
          </Text>
          <TouchableOpacity
            style={styles.flipBtn}
            onPress={() => navigation.navigate('FeedTab')}
            activeOpacity={0.8}
          >
            <Text style={styles.flipBtnText}>Flip Card 🔄</Text>
          </TouchableOpacity>
        </View>

        {/* CONTINUE STUDYING */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Continue Studying</Text>

        <View style={styles.continueGrid}>
          {[
            { icon: '⚡', title: 'Physics', cards: 24, color: '#EEF2FF', accent: COLORS.blue },
            { icon: '🧬', title: 'Biology', cards: 38, color: '#ECFDF5', accent: COLORS.green },
            { icon: '🔬', title: 'Biochem', cards: 31, color: '#F5F3FF', accent: COLORS.purple },
            { icon: '🧠', title: 'Psychology', cards: 22, color: '#FFF1F2', accent: COLORS.coral },
          ].map((subject) => (
            <TouchableOpacity
              key={subject.title}
              style={[styles.subjectCard, SHADOWS.card, { backgroundColor: subject.color }]}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('FeedTab')}
            >
              <Text style={styles.subjectCardIcon}>{subject.icon}</Text>
              <Text style={[styles.subjectCardTitle, { color: subject.accent }]}>
                {subject.title}
              </Text>
              <Text style={styles.subjectCardCount}>{subject.cards} cards</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* RECENT ACTIVITY */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Recent Activity</Text>
        {[
          { icon: '✅', title: 'Cellular Respiration', time: '2h ago', subject: 'Biology' },
          { icon: '📖', title: 'Lens Equations', time: '1d ago', subject: 'Physics' },
          { icon: '🔖', title: 'Enzyme Kinetics', time: '2d ago', subject: 'Biochem' },
        ].map((item) => (
          <View key={item.title} style={[styles.activityRow, SHADOWS.card]}>
            <Text style={styles.activityIcon}>{item.icon}</Text>
            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>{item.title}</Text>
              <Text style={styles.activitySubject}>{item.subject}</Text>
            </View>
            <Text style={styles.activityTime}>{item.time}</Text>
          </View>
        ))}

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
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1F2937',
    letterSpacing: -0.5,
  },
  subGreeting: {
    fontSize: 15,
    color: COLORS.gray,
    marginTop: 2,
    fontWeight: '400',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1F2937',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.gray,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  ctaButton: {
    backgroundColor: COLORS.blue,
    borderRadius: 50,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 28,
  },
  ctaText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  readTimeBadge: {
    backgroundColor: '#FED7AA',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  readTimeText: {
    color: '#C2410C',
    fontSize: 11,
    fontWeight: '700',
  },
  insightCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
  },
  subjectBadge: {
    backgroundColor: '#F3F4F6',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 10,
  },
  subjectBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#6D28D9',
    textTransform: 'uppercase',
  },
  insightTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 8,
  },
  insightBody: {
    fontSize: 14,
    lineHeight: 22,
    color: '#374151',
    marginBottom: 16,
  },
  boldText: {
    fontWeight: '700',
    color: '#1F2937',
  },
  italicText: {
    fontStyle: 'italic',
  },
  flipBtn: {
    backgroundColor: '#EDE9FF',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 50,
  },
  flipBtnText: {
    color: '#7C3AED',
    fontSize: 13,
    fontWeight: '700',
  },
  continueGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  subjectCard: {
    width: '47%',
    borderRadius: 16,
    padding: 16,
  },
  subjectCardIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  subjectCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  subjectCardCount: {
    fontSize: 12,
    color: COLORS.gray,
  },
  activityRow: {
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 12,
  },
  activityIcon: {
    fontSize: 20,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  activitySubject: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 1,
  },
  activityTime: {
    fontSize: 12,
    color: COLORS.gray,
  },
});
