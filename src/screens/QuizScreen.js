import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { COLORS } from '../constants/colors';
import { SHADOWS } from '../constants/fonts';
import { QUIZ_QUESTIONS } from '../data/quizzes';

export default function QuizScreen({ navigation }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const question = QUIZ_QUESTIONS[currentQ];
  const total = QUIZ_QUESTIONS.length;
  const progress = (currentQ + 1) / total;

  const handleSelect = (optionId) => {
    if (answered) return;
    Haptics.selectionAsync();
    setSelected(optionId);
    setAnswered(true);
    if (optionId === question.correctAnswer) {
      setScore((s) => s + 1);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const handleNext = () => {
    if (currentQ < total - 1) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setCompleted(false);
  };

  const getOptionStyle = (optionId) => {
    if (!answered) return styles.optionDefault;
    if (optionId === question.correctAnswer) return styles.optionCorrect;
    if (optionId === selected && selected !== question.correctAnswer) return styles.optionWrong;
    return styles.optionDefault;
  };

  const getOptionBadgeStyle = (optionId) => {
    if (!answered) return styles.optionBadge;
    if (optionId === question.correctAnswer) return [styles.optionBadge, styles.optionBadgeCorrect];
    if (optionId === selected && selected !== question.correctAnswer)
      return [styles.optionBadge, styles.optionBadgeWrong];
    return styles.optionBadge;
  };

  if (completed) {
    const pct = Math.round((score / total) * 100);
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.completedContainer}>
          <Text style={styles.completedEmoji}>{pct >= 80 ? '🏆' : pct >= 60 ? '💪' : '📚'}</Text>
          <Text style={styles.completedTitle}>Quiz Complete!</Text>
          <Text style={styles.completedScore}>
            {score}/{total} Correct
          </Text>
          <Text style={styles.completedPct}>{pct}% Score</Text>
          <View style={styles.completedBadge}>
            <Text style={styles.completedBadgeText}>
              {pct >= 80 ? 'Excellent Work! 🔥' : pct >= 60 ? 'Good Job! Keep Going 💪' : 'Keep Studying! 📚'}
            </Text>
          </View>
          <TouchableOpacity style={styles.restartBtn} onPress={handleRestart}>
            <Text style={styles.restartBtnText}>Try Again →</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.homeBtn}
            onPress={() => navigation && navigation.goBack()}
          >
            <Text style={styles.homeBtnText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* TOP BAR */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation && navigation.goBack()}
          >
            <Ionicons name="close" size={22} color={COLORS.charcoal} />
          </TouchableOpacity>
          <Text style={styles.questionCount}>
            Question {currentQ + 1} of {total}
          </Text>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="flag-outline" size={22} color={COLORS.charcoal} />
          </TouchableOpacity>
        </View>

        {/* PROGRESS BAR */}
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>

        {/* QUESTION CARD */}
        <View style={[styles.questionCard, SHADOWS.card]}>
          <View style={styles.topicBadge}>
            <Text style={styles.topicText}>
              {question.subject.toUpperCase()} • {question.topic.toUpperCase()}
            </Text>
          </View>
          <Text style={styles.questionText}>{question.question}</Text>
        </View>

        {/* OPTIONS */}
        <View style={styles.optionsContainer}>
          {question.options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[styles.option, getOptionStyle(option.id)]}
              onPress={() => handleSelect(option.id)}
              activeOpacity={0.75}
            >
              <View style={getOptionBadgeStyle(option.id)}>
                <Text
                  style={[
                    styles.optionBadgeText,
                    answered &&
                      (option.id === question.correctAnswer ||
                        (option.id === selected && selected !== question.correctAnswer)) && {
                        color: 'white',
                      },
                  ]}
                >
                  {option.id}
                </Text>
              </View>
              <View style={styles.optionContent}>
                <Text
                  style={[
                    styles.optionText,
                    answered &&
                      option.id === question.correctAnswer && { color: '#15803D', fontWeight: '600' },
                    answered &&
                      option.id === selected &&
                      selected !== question.correctAnswer && { color: '#DC2626' },
                  ]}
                >
                  {option.text}
                </Text>
                {answered && option.id === question.correctAnswer && (
                  <Text style={styles.explanationText}>{question.explanation}</Text>
                )}
              </View>
              {answered && option.id === question.correctAnswer && (
                <View style={styles.correctIndicator} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* NEXT BUTTON */}
        {answered && (
          <TouchableOpacity style={styles.nextBtn} onPress={handleNext} activeOpacity={0.85}>
            <Text style={styles.nextBtnText}>
              {currentQ < total - 1 ? 'Continue to Next Question →' : 'See Results →'}
            </Text>
          </TouchableOpacity>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F4FF',
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  questionCount: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 24,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.blue,
    borderRadius: 4,
  },
  questionCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  topicBadge: {
    marginBottom: 12,
  },
  topicText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.blue,
    letterSpacing: 1.2,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    lineHeight: 28,
  },
  optionsContainer: {
    gap: 10,
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    gap: 12,
  },
  optionDefault: {
    backgroundColor: 'white',
    borderColor: '#E5E7EB',
  },
  optionCorrect: {
    backgroundColor: '#DCFCE7',
    borderColor: '#22C55E',
  },
  optionWrong: {
    backgroundColor: '#FEE2E2',
    borderColor: '#EF4444',
  },
  optionBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    marginTop: 1,
  },
  optionBadgeCorrect: {
    backgroundColor: '#22C55E',
  },
  optionBadgeWrong: {
    backgroundColor: '#EF4444',
  },
  optionBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2937',
  },
  optionContent: {
    flex: 1,
  },
  optionText: {
    fontSize: 14,
    color: '#1F2937',
    lineHeight: 22,
    fontWeight: '500',
  },
  explanationText: {
    marginTop: 8,
    fontSize: 12,
    color: '#15803D',
    fontStyle: 'italic',
    lineHeight: 18,
  },
  correctIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#22C55E',
    alignSelf: 'center',
    flexShrink: 0,
  },
  nextBtn: {
    backgroundColor: COLORS.blue,
    borderRadius: 50,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 4,
  },
  nextBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  completedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  completedEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  completedTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 8,
  },
  completedScore: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.charcoal,
    marginBottom: 4,
  },
  completedPct: {
    fontSize: 42,
    fontWeight: '800',
    color: COLORS.blue,
    marginBottom: 20,
  },
  completedBadge: {
    backgroundColor: COLORS.blue + '15',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
    marginBottom: 32,
  },
  completedBadgeText: {
    color: COLORS.blue,
    fontWeight: '700',
    fontSize: 14,
  },
  restartBtn: {
    backgroundColor: COLORS.blue,
    borderRadius: 50,
    paddingVertical: 16,
    paddingHorizontal: 40,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },
  restartBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  homeBtn: {
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
  },
  homeBtnText: {
    color: COLORS.gray,
    fontSize: 15,
    fontWeight: '600',
  },
});
