import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { SUBJECT_GRADIENTS, SUBJECT_ICONS } from '../constants/colors';

const { width } = Dimensions.get('window');

export default function FeedCard({ card, streakCount, isActive, onStash, onMastered, cardHeight }) {
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const stashScale = useRef(new Animated.Value(1)).current;
  const masteredScale = useRef(new Animated.Value(1)).current;
  const chevronAnim = useRef(new Animated.Value(0)).current;
  const [stashed, setStashed] = useState(false);
  const [mastered, setMastered] = useState(false);

  useEffect(() => {
    if (isActive) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }).start();
      // Bounce chevron
      Animated.loop(
        Animated.sequence([
          Animated.timing(chevronAnim, { toValue: 8, duration: 600, useNativeDriver: true }),
          Animated.timing(chevronAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
        ])
      ).start();
    } else {
      scaleAnim.setValue(0.95);
    }
  }, [isActive]);

  const gradients = SUBJECT_GRADIENTS[card.subject] || ['#1A3EFF', '#0A2BCC'];
  const subjectIcon = SUBJECT_ICONS[card.subject] || '📚';

  const handleStash = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Animated.sequence([
      Animated.spring(stashScale, { toValue: 1.3, useNativeDriver: true, speed: 50 }),
      Animated.spring(stashScale, { toValue: 1, useNativeDriver: true, speed: 50 }),
    ]).start();
    setStashed(true);
    onStash && onStash(card);
  };

  const handleMastered = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Animated.sequence([
      Animated.spring(masteredScale, { toValue: 1.3, useNativeDriver: true, speed: 50 }),
      Animated.spring(masteredScale, { toValue: 1, useNativeDriver: true, speed: 50 }),
    ]).start();
    setMastered(true);
    onMastered && onMastered(card);
  };

  return (
    <View style={[styles.container, { height: cardHeight }]}>
      <LinearGradient colors={gradients} style={styles.gradient}>
        {/* Noise overlay */}
        <View style={styles.noiseOverlay} />

        <Animated.View style={[styles.content, { transform: [{ scale: scaleAnim }] }]}>
          {/* TOP ROW */}
          <View style={styles.topRow}>
            <View style={styles.subjectBadge}>
              <Text style={styles.subjectIcon}>{subjectIcon}</Text>
              <Text style={styles.subjectText}>{card.subject.toUpperCase()}</Text>
            </View>
            <View style={styles.streakBadge}>
              <Text style={styles.streakText}>🔥 {streakCount} Streak</Text>
            </View>
          </View>

          {/* CENTER HOOK */}
          <View style={styles.centerSection}>
            <Text style={styles.hookText}>{card.hook}</Text>
            <View style={styles.insightMeta}>
              <View style={styles.insightBadge}>
                <Text style={styles.insightBadgeText}>INSIGHT</Text>
              </View>
              <Text style={styles.readTime}>◆ {card.readTime} read</Text>
            </View>

            {/* Insight card */}
            <View style={styles.insightCard}>
              <Text style={styles.insightText}>{card.insight}</Text>
            </View>
          </View>

          {/* TAKEAWAY */}
          <View style={styles.takeawayCard}>
            <Text style={styles.takeawayLabel}>KEY TAKEAWAY</Text>
            <Text style={styles.takeawayText}>→ {card.takeaway}</Text>
          </View>

          {/* BOTTOM CHEVRON */}
          <Animated.View
            style={[styles.chevronContainer, { transform: [{ translateY: chevronAnim }] }]}
          >
            <Ionicons name="chevron-down" size={24} color="rgba(255,255,255,0.7)" />
          </Animated.View>
        </Animated.View>

        {/* RIGHT SIDE BUTTONS */}
        <View style={styles.sideButtons}>
          <TouchableOpacity style={styles.sideBtn} onPress={handleStash}>
            <Animated.View style={{ transform: [{ scale: stashScale }] }}>
              <Ionicons
                name={stashed ? 'bookmark' : 'bookmark-outline'}
                size={28}
                color={stashed ? '#F59E0B' : 'white'}
              />
            </Animated.View>
            <Text style={styles.sideBtnLabel}>STASH</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sideBtn} onPress={handleMastered}>
            <Animated.View style={{ transform: [{ scale: masteredScale }] }}>
              <Ionicons
                name={mastered ? 'checkmark-circle' : 'checkmark-circle-outline'}
                size={28}
                color={mastered ? '#22C55E' : 'white'}
              />
            </Animated.View>
            <Text style={styles.sideBtnLabel}>MASTERED</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sideBtn}>
            <Ionicons name="arrow-up-circle-outline" size={28} color="white" />
            <Text style={styles.sideBtnLabel}>DIVE</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
  },
  gradient: {
    flex: 1,
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  noiseOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  content: {
    flex: 1,
    marginRight: 60,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  subjectBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  subjectIcon: {
    fontSize: 16,
  },
  subjectText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  streakBadge: {
    backgroundColor: '#F97316',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  streakText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  centerSection: {
    flex: 1,
    justifyContent: 'center',
  },
  hookText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 32,
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  insightMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  insightBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  insightBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  readTime: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    fontWeight: '500',
  },
  insightCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  insightText: {
    color: 'rgba(255,255,255,0.95)',
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '400',
  },
  takeawayCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  takeawayLabel: {
    color: '#F59E0B',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  takeawayText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  chevronContainer: {
    alignItems: 'center',
    paddingBottom: 8,
  },
  sideButtons: {
    position: 'absolute',
    right: 16,
    bottom: 120,
    alignItems: 'center',
    gap: 24,
  },
  sideBtn: {
    alignItems: 'center',
    gap: 4,
  },
  sideBtnLabel: {
    color: 'white',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
