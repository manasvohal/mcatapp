import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { SHADOWS } from '../constants/fonts';

const FILTERS = ['All', 'Biology', 'Biochem', 'Physics', 'Psych', 'General Chem'];

const STASHES = [
  {
    id: '1',
    icon: '🧪',
    title: 'High-Yield Biochem',
    cards: 42,
    mastery: 80,
    iconBg: '#FEF3C7',
  },
  {
    id: '2',
    icon: '⚡',
    title: 'Tricky Equations',
    cards: 18,
    mastery: 45,
    iconBg: '#FEF9C3',
  },
  {
    id: '3',
    icon: '🧠',
    title: 'Psych Theories',
    cards: 27,
    mastery: 68,
    iconBg: '#FEE2E2',
  },
  {
    id: '4',
    icon: '🔬',
    title: 'Cell Biology',
    cards: 33,
    mastery: 72,
    iconBg: '#EDE9FF',
  },
];

const BOOKS = [
  {
    id: '1',
    title: 'Kaplan Biochem Master',
    subtitle: 'Updated weekly · 1.2k students',
    emoji: '📗',
    tags: [
      { label: 'ELITE', color: COLORS.blue },
      { label: 'FEATURED', color: COLORS.green },
    ],
  },
  {
    id: '2',
    title: 'MCAT Physics 101',
    subtitle: 'The essential formula guide',
    emoji: '⚡',
    tags: [{ label: 'FOUNDATIONS', color: COLORS.gray }],
  },
  {
    id: '3',
    title: 'Biology: High Yield',
    subtitle: 'Top 200 MCAT bio concepts',
    emoji: '🧬',
    tags: [
      { label: 'ELITE', color: COLORS.blue },
      { label: 'POPULAR', color: COLORS.orange },
    ],
  },
  {
    id: '4',
    title: 'Psych & Soc Crashcourse',
    subtitle: 'Complete behavioral science',
    emoji: '🧠',
    tags: [{ label: 'FOUNDATIONS', color: COLORS.gray }],
  },
];

export default function LibraryScreen() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchText, setSearchText] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <Text style={styles.header}>Library</Text>

        {/* SEARCH BAR */}
        <View style={[styles.searchBar, SHADOWS.card]}>
          <Ionicons name="search" size={18} color={COLORS.gray} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search cards, stashes, or topics..."
            placeholderTextColor={COLORS.gray}
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Ionicons name="close-circle" size={18} color={COLORS.gray} />
            </TouchableOpacity>
          )}
        </View>

        {/* FILTER PILLS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
          style={styles.filtersScroll}
        >
          {FILTERS.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[styles.filterPill, activeFilter === filter && styles.filterPillActive]}
              onPress={() => setActiveFilter(filter)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === filter && styles.filterTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* MY STASHES */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Stashes</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.stashGrid}>
          {STASHES.map((stash) => (
            <TouchableOpacity key={stash.id} style={[styles.stashCard, SHADOWS.card]} activeOpacity={0.8}>
              <View style={[styles.stashIconContainer, { backgroundColor: stash.iconBg }]}>
                <Text style={styles.stashIcon}>{stash.icon}</Text>
              </View>
              <Text style={styles.stashTitle}>{stash.title}</Text>
              <Text style={styles.stashMeta}>{stash.cards} Cards · {stash.mastery}% Mastery</Text>
              <View style={styles.stashBar}>
                <View
                  style={[styles.stashBarFill, { width: `${stash.mastery}%` }]}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* FOLLOWED BOOKS */}
        <View style={[styles.sectionHeader, { marginTop: 8 }]}>
          <Text style={styles.sectionTitle}>Followed Books</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {BOOKS.map((book) => (
          <TouchableOpacity key={book.id} style={[styles.bookRow, SHADOWS.card]} activeOpacity={0.8}>
            <View style={styles.bookThumb}>
              <Text style={styles.bookEmoji}>{book.emoji}</Text>
            </View>
            <View style={styles.bookInfo}>
              <Text style={styles.bookTitle}>{book.title}</Text>
              <Text style={styles.bookSubtitle}>{book.subtitle}</Text>
              <View style={styles.tagRow}>
                {book.tags.map((tag) => (
                  <View
                    key={tag.label}
                    style={[styles.tag, { backgroundColor: tag.color + '20', borderColor: tag.color + '40' }]}
                  >
                    <Text style={[styles.tagText, { color: tag.color }]}>{tag.label}</Text>
                  </View>
                ))}
              </View>
            </View>
            <Ionicons name="chevron-forward" size={16} color={COLORS.gray} />
          </TouchableOpacity>
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
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  searchBar: {
    backgroundColor: 'white',
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '400',
  },
  filtersScroll: {
    marginBottom: 24,
  },
  filtersContainer: {
    gap: 8,
    paddingRight: 20,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 50,
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  filterPillActive: {
    backgroundColor: COLORS.blue,
    borderColor: COLORS.blue,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.gray,
  },
  filterTextActive: {
    color: 'white',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
    letterSpacing: -0.3,
  },
  seeAll: {
    color: COLORS.blue,
    fontSize: 14,
    fontWeight: '600',
  },
  stashGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  stashCard: {
    width: '47%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
  },
  stashIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  stashIcon: {
    fontSize: 22,
  },
  stashTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  stashMeta: {
    fontSize: 11,
    color: COLORS.gray,
    marginBottom: 10,
  },
  stashBar: {
    height: 4,
    backgroundColor: COLORS.lightGray,
    borderRadius: 2,
    overflow: 'hidden',
  },
  stashBarFill: {
    height: '100%',
    backgroundColor: COLORS.blue,
    borderRadius: 2,
  },
  bookRow: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 12,
  },
  bookThumb: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  bookEmoji: {
    fontSize: 26,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 2,
  },
  bookSubtitle: {
    fontSize: 12,
    color: COLORS.gray,
    marginBottom: 6,
  },
  tagRow: {
    flexDirection: 'row',
    gap: 6,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
});
