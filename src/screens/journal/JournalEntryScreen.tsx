import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {JournalStackParams} from '../../navigation/types';
import {Colors, FontFamily, FontSize, Spacing, BorderRadius} from '../../theme';
import ScreenContainer from '../../components/common/ScreenContainer';
import {useTranslation} from 'react-i18next';
import {ReflectionRecord, getReflections} from '../../database';
import {MODULES} from '../../data/modules';

type Props = {
  navigation: NativeStackNavigationProp<JournalStackParams, 'JournalEntry'>;
  route: RouteProp<JournalStackParams, 'JournalEntry'>;
};

export default function JournalEntryScreen({navigation, route}: Props) {
  const {t, i18n} = useTranslation();
  const {reflectionId} = route.params;
  const lang = i18n.language as 'az' | 'en' | 'ru';
  const [entry, setEntry] = useState<ReflectionRecord | null>(null);

  useEffect(() => {
    async function load() {
      const all = await getReflections();
      const found = all.find(r => r.id === reflectionId);
      setEntry(found ?? null);
    }
    load();
  }, [reflectionId]);

  if (!entry) return null;

  const seed = MODULES.find(m => m.id === entry.module_id);
  const moduleTitle = seed
    ? lang === 'ru' ? seed.title_ru : lang === 'en' ? seed.title_en : seed.title_az
    : '';
  const prompt = lang === 'ru' ? entry.prompt_ru : lang === 'en' ? entry.prompt_en : entry.prompt_az;

  return (
    <ScreenContainer>
      <View style={styles.wrapper}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← {t('common.back')}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <View style={styles.meta}>
            <Text style={styles.moduleLabel}>{moduleTitle}</Text>
            <Text style={styles.date}>{entry.created_at.split('T')[0]}</Text>
          </View>

          <View style={styles.promptBlock}>
            <Text style={styles.promptLabel}>{t('reflection.title')}</Text>
            <Text style={styles.prompt}>{prompt}</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.entryText}>{entry.user_text}</Text>
        </ScrollView>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  wrapper: {flex: 1},
  topBar: {
    paddingHorizontal: Spacing[6],
    paddingVertical: Spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backText: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.base,
    color: Colors.textMuted,
  },
  content: {
    padding: Spacing[6],
    gap: Spacing[6],
    paddingBottom: Spacing[12],
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moduleLabel: {
    fontFamily: FontFamily.sansCondensed,
    fontSize: FontSize.xs,
    color: Colors.terracotta,
    letterSpacing: 2,
  },
  date: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  promptBlock: {gap: Spacing[2]},
  promptLabel: {
    fontFamily: FontFamily.sansCondensed,
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    letterSpacing: 2,
  },
  prompt: {
    fontFamily: FontFamily.serifItalic,
    fontSize: FontSize.lg,
    color: Colors.textPrimary,
    lineHeight: FontSize.lg * 1.5,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },
  entryText: {
    fontFamily: FontFamily.serif,
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    lineHeight: FontSize.md * 1.75,
  },
});
