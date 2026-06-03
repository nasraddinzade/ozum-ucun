import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ModulesStackParams} from '../../navigation/types';
import {Colors, FontFamily, FontSize, Spacing, BorderRadius} from '../../theme';
import ScreenContainer from '../../components/common/ScreenContainer';
import {useModuleStore} from '../../store/moduleStore';
import {useTranslation} from 'react-i18next';
import {MODULES} from '../../data/modules';
import {ModuleRecord} from '../../database';

type Props = {
  navigation: NativeStackNavigationProp<ModulesStackParams, 'ModulesList'>;
};

export default function ModulesListScreen({navigation}: Props) {
  const {t, i18n} = useTranslation();
  const {modules, loadModules} = useModuleStore();
  const lang = i18n.language as 'az' | 'en' | 'ru';

  useEffect(() => {
    loadModules();
  }, []);

  function getTitle(m: ModuleRecord) {
    if (lang === 'ru') return m.title_ru;
    if (lang === 'en') return m.title_en;
    return m.title_az;
  }

  function getProgress(m: ModuleRecord): number {
    const steps = [m.concept_read, m.reflection_done, m.practice_done, m.quiz_done];
    return steps.filter(Boolean).length / 4;
  }

  function getStatusLabel(m: ModuleRecord): string {
    if (m.is_completed) return t('modules.completed');
    if (!m.is_unlocked) return t('modules.locked');
    if (getProgress(m) > 0) return t('modules.current');
    return '';
  }

  function renderModule({item: m}: {item: ModuleRecord}) {
    const seed = MODULES.find(s => s.id === m.id);
    const progress = getProgress(m);
    const isLocked = !m.is_unlocked;

    return (
      <TouchableOpacity
        style={[styles.card, isLocked && styles.cardLocked]}
        onPress={() => {
          if (!isLocked) navigation.navigate('ModuleDetail', {moduleId: m.id});
        }}
        disabled={isLocked}>
        <View style={styles.cardTop}>
          <Text style={styles.chapterNum}>
            {String(m.chapter_ref).padStart(2, '0')}
          </Text>
          <StatusChip label={getStatusLabel(m)} completed={m.is_completed === 1} />
        </View>

        <Text style={[styles.cardTitle, isLocked && styles.cardTitleLocked]}>
          {getTitle(m)}
        </Text>

        {seed && (
          <Text style={styles.cardDesc} numberOfLines={2}>
            {lang === 'ru' ? seed.description_ru : lang === 'en' ? seed.description_en : seed.description_az}
          </Text>
        )}

        {!isLocked && (
          <View style={styles.progressRow}>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, {width: `${progress * 100}%`}]} />
            </View>
            <View style={styles.stepIcons}>
              <StepDot done={m.concept_read === 1} label="◈" />
              <StepDot done={m.reflection_done === 1} label="◻" />
              <StepDot done={m.practice_done === 1} label="◆" />
              <StepDot done={m.quiz_done === 1} label="?" />
            </View>
          </View>
        )}

        {isLocked && (
          <Text style={styles.lockIcon}>🔒</Text>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <ScreenContainer edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>{t('modules.title')}</Text>
        <Text style={styles.screenSubtitle}>{t('modules.subtitle')}</Text>
      </View>
      <FlatList
        data={modules}
        keyExtractor={item => String(item.id)}
        renderItem={renderModule}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  );
}

function StatusChip({label, completed}: {label: string; completed: boolean}) {
  if (!label) return null;
  return (
    <View style={[styles.chip, completed && styles.chipCompleted]}>
      <Text style={[styles.chipText, completed && styles.chipTextCompleted]}>
        {label}
      </Text>
    </View>
  );
}

function StepDot({done, label}: {done: boolean; label: string}) {
  return (
    <Text style={[styles.stepDot, done && styles.stepDotDone]}>{label}</Text>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Spacing[6],
    paddingTop: Spacing[6],
    paddingBottom: Spacing[4],
    gap: Spacing[1],
  },
  screenTitle: {
    fontFamily: FontFamily.serifBold,
    fontSize: FontSize['2xl'],
    color: Colors.textPrimary,
  },
  screenSubtitle: {
    fontFamily: FontFamily.serifItalic,
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
  list: {
    padding: Spacing[6],
    gap: Spacing[4],
    paddingBottom: Spacing[10],
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing[5],
    gap: Spacing[3],
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardLocked: {
    opacity: 0.5,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chapterNum: {
    fontFamily: FontFamily.sansCondensed,
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    letterSpacing: 3,
  },
  chip: {
    paddingHorizontal: Spacing[2],
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surfaceElevated,
  },
  chipCompleted: {
    backgroundColor: Colors.terracottaDark,
  },
  chipText: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  chipTextCompleted: {
    color: Colors.terracottaLight,
  },
  cardTitle: {
    fontFamily: FontFamily.serifBold,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
  },
  cardTitleLocked: {
    color: Colors.textMuted,
  },
  cardDesc: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    lineHeight: FontSize.sm * 1.5,
  },
  progressRow: {
    gap: Spacing[2],
  },
  progressTrack: {
    height: 3,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.terracotta,
    borderRadius: BorderRadius.full,
  },
  stepIcons: {
    flexDirection: 'row',
    gap: Spacing[3],
  },
  stepDot: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  stepDotDone: {
    color: Colors.terracotta,
  },
  lockIcon: {
    fontSize: 16,
    alignSelf: 'flex-end',
  },
});
