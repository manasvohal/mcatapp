import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  Animated,
  Text,
} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import FeedCard from '../components/FeedCard';
import QuizBreakCard from '../components/QuizBreakCard';
import { FEED_CARDS, QUIZ_BREAK } from '../data/cards';

const { height, width } = Dimensions.get('window');
const QUIZ_BREAK_INTERVAL = 10;

const buildFeedItems = () => {
  const items = [...FEED_CARDS];
  items.splice(QUIZ_BREAK_INTERVAL, 0, { ...QUIZ_BREAK, id: 'quiz_break_1' });
  return items;
};

const FEED_ITEMS = buildFeedItems();

export default function FeedScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  const CARD_HEIGHT = height - tabBarHeight;

  const [streakCount, setStreakCount] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const toastAnim = useRef(new Animated.Value(0)).current;
  const [toastVisible, setToastVisible] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    AsyncStorage.getItem('streakCount').then((val) => {
      if (val) setStreakCount(parseInt(val));
    });
  }, []);

  const showToast = () => {
    setToastVisible(true);
    Animated.sequence([
      Animated.timing(toastAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.delay(1200),
      Animated.timing(toastAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start(() => setToastVisible(false));
  };

  // Stable ref — FlatList requires this to never change identity
  const handleViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const idx = viewableItems[0].index;
      setActiveIndex(idx);

      const item = FEED_ITEMS[idx];
      if (item && item.type !== 'quiz') {
        setCardsViewed((prev) => {
          if (prev.has(item.id)) return prev;
          const newViewed = new Set(prev);
          newViewed.add(item.id);
          if (newViewed.size % 5 === 0) {
            setStreakCount((s) => {
              const next = s + 1;
              AsyncStorage.setItem('streakCount', next.toString());
              return next;
            });
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            showToast();
          }
          return newViewed;
        });
      }
    }
  }).current;

  // cardsViewed needs to be a ref-backed state so the stable callback can access setter
  const [cardsViewed, setCardsViewed] = useState(() => new Set());

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 80,
  }).current;

  const renderItem = useCallback(
    ({ item, index }) => {
      if (item.type === 'quiz') {
        return (
          <QuizBreakCard
            quiz={item}
            cardHeight={CARD_HEIGHT}
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
          cardHeight={CARD_HEIGHT}
        />
      );
    },
    [activeIndex, streakCount, CARD_HEIGHT]
  );

  const keyExtractor = useCallback((item) => item.id, []);

  const getItemLayout = useCallback(
    (_, index) => ({
      length: CARD_HEIGHT,
      offset: CARD_HEIGHT * index,
      index,
    }),
    [CARD_HEIGHT]
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
        snapToInterval={CARD_HEIGHT}
        decelerationRate="fast"
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={getItemLayout}
        removeClippedSubviews
        initialNumToRender={2}
        maxToRenderPerBatch={3}
        windowSize={5}
      />

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
