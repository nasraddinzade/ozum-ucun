import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Share,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useFocusEffect} from '@react-navigation/native';
import {JournalStackParams} from '../../navigation/types';
import {Colors, FontFamily, FontSize, Spacing, BorderRadius} from '../../theme';
import ScreenContainer from '../../components/common/ScreenContainer';
import {useTranslation} from 'react-i18next';
import {
  ReflectionRecord,
  getReflections,
  getReflectionFrom30DaysAgo,
  searchReflections,
  getAllReflectionsText,
} from '../../database';
import {MODULES} from '../../data/modules';

type Props = {
  navigation: NativeStackNavigationProp<JournalStackParams, 'JournalList'>;
};

export default function JournalScreen({navigation}: Props) {
  const {t, i18n} = useTranslation();
  const lang = i18n.language as 'az' | 'en' | 'ru';
  const [reflections, setReflections] = useState<ReflectionRecord[]>([]);
  const [oldEntry, setOldEntry] = useState<ReflectionRecord | null>(null);
  const [query, setQuery] = useState('');

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

  async function loadData() {
    const [all, old] = await Promise.all([
      getReflections(),
      getReflectionFrom30DaysAgo(),
    ]);
    setReflections(all);
    setOldEntry(old);
  }

  async function handleSearch(q: string) {
    setQuery(q);
    if (q.trim().length < 2) {
      const all = await getReflections();
      setReflections(all);
    } else {
      const results = await searchReflections(q);
      setReflections(results);
    }
  }

  async function handleExport() {
    const text = await getAllReflectionsText();
    await Share.share({
      message: text,
      title: 'Özüm üçün — Journal',
    });
  }

  function getModuleTitle(moduleId: number) {
    const seed = MODULES.find(m => m.id === moduleId);
    if (!seed) return '';
    return lang === 'ru' ? seed.title_ru : lang === 'en' ? seed.title_en : seed.title_az;
  }

  function getPrompt(r: ReflectionRecord) {
    return lang === 'ru' ? r.prompt_ru : lang === 'en' ? r.prompt_en : r.prompt_az;
  }

  function renderEntry({item}: {item: ReflectionRecord}) {
    return (
      <TouchableOpacity
        style={styles.entryCard}
        onPress={() => navigation.navigate('JournalEntry', {reflectionId: item.id})}>
        <View style={styles.entryTop}>
          <Text style={styles.entryModule}>{getModuleTitle(item.module_id)}</Text>
          <Text style={styles.entryDate}>
            {item.created_at.split('T')[0]}
          </Text>
        </View>
        <Text style={styles.entryPrompt} numberOfLines={1}>
          {getPrompt(item)}
        </Text>
        <Text style={styles.entryPreview} numberOfLines={3}>
          {item.user_text}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <ScreenContainer edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>{t('journal.title')}</Text>
        <TouchableOpacity onPress={handleExport}>
          <Text style={styles.exportBtn}>↑ {t('journal.export')}</Text>
        </TouchableOpacity>
      </View>

      {/* Past Self */}
      {oldEntry && (
        <View style={styles.pastSelfCard}>
          <Text style={styles.pastSelfLabel}>◌ {t('journal.pastSelf')}</Text>
          <Text style={styles.pastSelfText} numberOfLines={3}>
            {oldEntry.user_text}
          </Text>
          <Text style={styles.pastSelfDate}>
            {oldEntry.created_at.split('T')[0]}
          </Text>
        </View>
      )}

      {/* Search */}
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder={t('journal.search')}
          placeholderTextColor={Colors.textMuted}
          value={query}
          onChangeText={handleSearch}
        />
      </View>

      {reflections.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>{t('journal.empty')}</Text>
        </View>
      ) : (
        <FlatList
          data={reflections}
          keyExtractor={item => String(item.id)}
          renderItem={renderEntry}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing[6],
    paddingTop: Spacing[6],
    paddingBottom: Spacing[4],
  },
  screenTitle: {
    fontFamily: FontFamily.serifBold,
    fontSize: FontSize['2xl'],
    color: Colors.textPrimary,
  },
  exportBtn: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
  pastSelfCard: {
    marginHorizontal: Spacing[6],
    marginBottom: Spacing[4],
    backgroundColor: Colors.surfaceElevated,
    borderRadius: BorderRadius.md,
    padding: Spacing[4],
    gap: Spacing[2],
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  pastSelfLabel: {
    fontFamily: FontFamily.sansCondensed,
    fontSize: FontSize.xs,
    color: Colors.gold,
    letterSpacing: 2,
  },
  pastSelfText: {
    fontFamily: FontFamily.serifItalic,
    fontSize: FontSize.base,
    color: Colors.textSecondary,
    lineHeight: FontSize.base * 1.5,
  },
  pastSelfDate: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  searchRow: {
    paddingHorizontal: Spacing[6],
    marginBottom: Spacing[3],
  },
  searchInput: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[3],
    fontFamily: FontFamily.sans,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing[8],
  },
  emptyText: {
    fontFamily: FontFamily.serifItalic,
    fontSize: FontSize.base,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: FontSize.base * 1.65,
  },
  list: {
    padding: Spacing[6],
    gap: Spacing[4],
    paddingBottom: Spacing[10],
  },
  entryCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing[4],
    gap: Spacing[2],
    borderWidth: 1,
    borderColor: Colors.border,
  },
  entryTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  entryModule: {
    fontFamily: FontFamily.sansCondensed,
    fontSize: FontSize.xs,
    color: Colors.terracotta,
    letterSpacing: 1,
  },
  entryDate: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  entryPrompt: {
    fontFamily: FontFamily.serifItalic,
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
  entryPreview: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: FontSize.sm * 1.5,
  },
});
