import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  Animated,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import FeedCard from '../components/FeedCard';
import QuizBreakCard from '../components/QuizBreakCard';
import { FEED_CARDS, QUIZ_BREAK } from '../data/cards';

const { height, width } = Dimensions.get('window');
const QUIZ_BREAK_INTERVAL = 10;

// Build feed items with quiz break at position 10
const buildFeedItems = () => {
  const items = [...FEED_CARDS];
  items.splice(QUIZ_BREAK_INTERVAL, 0, { ...QUIZ_BREAK, id: 'quiz_break_1' });
  return items;
};

const FEED_ITEMS = buildFeedItems();

export default function FeedScreen() {
  const [streakCount, setStreakCount] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardsViewed, setCardsViewed] = useState(new Set());
  const [toastVisible, setToastVisible] = useState(false);
  const toastAnim = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  useEffect(() => {
    loadStreak();
  }, []);

  const loadStreak = async () => {
    try {
      const stored = await AsyncStorage.getItem('streakCount');
      if (stored) setStreakCount(parseInt(stored));
    } catch (e) {}
  };

  const saveStreak = async (count) => {
    try {
      await AsyncStorage.setItem('streakCount', count.toString());
    } catch (e) {}
  };

  const showToast = () => {
    setToastVisible(true);
    Animated.sequence([
      Animated.timing(toastAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.delay(1200),
      Animated.timing(toastAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start(() => setToastVisible(false));
  };

  const handleViewableItemsChanged = useCallback(
    ({ viewableItems }) => {
      if (viewableItems.length > 0) {
        const idx = viewableItems[0].index;
        setActiveIndex(idx);

        const item = FEED_ITEMS[idx];
        if (item && item.type !== 'quiz' && !cardsViewed.has(item.id)) {
          const newViewed = new Set(cardsViewed);
          newViewed.add(item.id);
          setCardsViewed(newViewed);

          // Every 5 unique cards = +1 streak
          if (newViewed.size % 5 === 0) {
            const newStreak = streakCount + 1;
            setStreakCount(newStreak);
            saveStreak(newStreak);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            showToast();
          }
        }
      }
    },
    [cardsViewed, streakCount]
  );

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 80,
  }).current;

  const renderItem = useCallback(
    ({ item, index }) => {
      if (item.type === 'quiz') {
        return (
          <QuizBreakCard
            quiz={item}
            onContinue={() => {
              flatListRef.current?.scrollToIndex({
                index: index + 1,
                animated: true,
              });
            }}
          />
        );
      }
      return (
        <FeedCard
          card={item}
          streakCount={streakCount}
          isActive={index === activeIndex}
        />
      );
    },
    [activeIndex, streakCount]
  );

  const keyExtractor = useCallback((item) => item.id, []);

  const getItemLayout = useCallback(
    (_, index) => ({
      length: height,
      offset: height * index,
      index,
    }),
    []
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={FEED_ITEMS}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={height}
        decelerationRate="fast"
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={getItemLayout}
        removeClippedSubviews
        initialNumToRender={2}
        maxToRenderPerBatch={3}
        windowSize={5}
      />

      {/* STREAK TOAST */}
      {toastVisible && (
        <Animated.View
          style={[
            styles.toast,
            {
              opacity: toastAnim,
              transform: [
                {
                  translateY: toastAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.toastText}>🔥 +1 Streak!</Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  toast: {
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
    backgroundColor: '#F97316',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  toastText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
