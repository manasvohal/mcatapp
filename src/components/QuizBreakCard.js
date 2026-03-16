import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

export default function QuizBreakCard({ quiz, onContinue, cardHeight }) {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (optionId) => {
    if (answered) return;
    Haptics.selectionAsync();
    setSelected(optionId);
    setAnswered(true);
  };

  const getOptionStyle = (optionId) => {
    if (!answered) return styles.optionDefault;
    if (optionId === quiz.correctAnswer) return styles.optionCorrect;
    if (optionId === selected && selected !== quiz.correctAnswer) return styles.optionWrong;
    return styles.optionDefault;
  };

  const getOptionTextStyle = (optionId) => {
    if (!answered) return styles.optionText;
    if (optionId === quiz.correctAnswer) return [styles.optionText, { color: '#15803D' }];
    if (optionId === selected && selected !== quiz.correctAnswer)
      return [styles.optionText, { color: '#DC2626' }];
    return styles.optionText;
  };

  return (
    <View style={[styles.container, { height: cardHeight }]}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.headerBadge}>
            <Ionicons name="flash" size={16} color={COLORS.blue} />
            <Text style={styles.headerText}>QUICK CHECK</Text>
          </View>
          <Text style={styles.headerSub}>Test your knowledge</Text>
        </View>

        <Text style={styles.questionText}>{quiz.question}</Text>

        <View style={styles.optionsContainer}>
          {quiz.options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[styles.option, getOptionStyle(option.id)]}
              onPress={() => handleSelect(option.id)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.optionBadge,
                  answered && option.id === quiz.correctAnswer && styles.optionBadgeCorrect,
                  answered &&
                    option.id === selected &&
                    selected !== quiz.correctAnswer &&
                    styles.optionBadgeWrong,
                ]}
              >
                <Text
                  style={[
                    styles.optionBadgeText,
                    answered && option.id === quiz.correctAnswer && { color: 'white' },
                    answered &&
                      option.id === selected &&
                      selected !== quiz.correctAnswer && { color: 'white' },
                  ]}
                >
                  {option.id}
                </Text>
              </View>
              <View style={styles.optionContent}>
                <Text style={getOptionTextStyle(option.id)}>{option.text}</Text>
                {answered && option.id === quiz.correctAnswer && (
                  <Text style={styles.explanationText}>{quiz.explanation}</Text>
                )}
              </View>
              {answered && option.id === quiz.correctAnswer && (
                <View style={styles.correctDot} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {answered && (
          <TouchableOpacity style={styles.continueBtn} onPress={onContinue}>
            <Text style={styles.continueBtnText}>Continue Feed →</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  header: {
    marginBottom: 20,
  },
  headerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  headerText: {
    color: COLORS.blue,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  headerSub: {
    color: COLORS.gray,
    fontSize: 13,
  },
  questionText: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.charcoal,
    lineHeight: 26,
    marginBottom: 20,
  },
  optionsContainer: {
    gap: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 14,
    borderRadius: 14,
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
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.lightGray,
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
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.charcoal,
  },
  optionContent: {
    flex: 1,
  },
  optionText: {
    fontSize: 14,
    color: COLORS.charcoal,
    lineHeight: 20,
    fontWeight: '500',
  },
  explanationText: {
    fontSize: 12,
    color: '#15803D',
    marginTop: 6,
    fontStyle: 'italic',
    lineHeight: 18,
  },
  correctDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E',
    alignSelf: 'center',
    flexShrink: 0,
  },
  continueBtn: {
    marginTop: 20,
    backgroundColor: COLORS.blue,
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
});
