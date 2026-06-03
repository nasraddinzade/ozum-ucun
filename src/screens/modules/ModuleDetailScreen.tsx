import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {ModulesStackParams} from '../../navigation/types';
import {Colors, FontFamily, FontSize, Spacing, BorderRadius} from '../../theme';
import ScreenContainer from '../../components/common/ScreenContainer';
import Button from '../../components/common/Button';
import {useModuleStore} from '../../store/moduleStore';
import {useTranslation} from 'react-i18next';
import {MODULES} from '../../data/modules';
import {getModule, ModuleRecord} from '../../database';

type Props = {
  navigation: NativeStackNavigationProp<ModulesStackParams, 'ModuleDetail'>;
  route: RouteProp<ModulesStackParams, 'ModuleDetail'>;
};

type Step = {
  key: 'concept' | 'reflection' | 'practice' | 'quiz';
  icon: string;
  labelKey: string;
  done: (m: ModuleRecord) => boolean;
  screen: keyof ModulesStackParams;
  xp: number;
};

const STEPS: Step[] = [
  {key: 'concept', icon: '◈', labelKey: 'modules.conceptCard', done: m => m.concept_read === 1, screen: 'ConceptCard', xp: 10},
  {key: 'reflection', icon: '◻', labelKey: 'modules.reflection', done: m => m.reflection_done === 1, screen: 'Reflection', xp: 20},
  {key: 'practice', icon: '◆', labelKey: 'modules.practice', done: m => m.practice_done === 1, screen: 'Practice', xp: 30},
  {key: 'quiz', icon: '?', labelKey: 'modules.quiz', done: m => m.quiz_done === 1, screen: 'Quiz', xp: 0},
];

export default function ModuleDetailScreen({navigation, route}: Props) {
  const {t, i18n} = useTranslation();
  const {moduleId} = route.params;
  const lang = i18n.language as 'az' | 'en' | 'ru';
  const [module, setModule] = useState<ModuleRecord | null>(null);
  const seed = MODULES.find(m => m.id === moduleId);

  useEffect(() => {
    async function load() {
      const m = await getModule(moduleId);
      setModule(m);
    }
    load();
    const unsubscribe = navigation.addListener('focus', load);
    return unsubscribe;
  }, [moduleId]);

  if (!module || !seed) return null;

  const title = lang === 'ru' ? module.title_ru : lang === 'en' ? module.title_en : module.title_az;
  const quote = lang === 'ru' ? seed.quote_ru : lang === 'en' ? seed.quote_en : seed.quote_az;
  const completedSteps = STEPS.filter(s => s.done(module)).length;

  function nextStep(): Step | undefined {
    return STEPS.find(s => !s.done(module!));
  }

  function handleStepPress(step: Step) {
    navigation.navigate(step.screen as any, {moduleId});
  }

  const next = nextStep();

  return (
    <ScreenContainer scrollable>
      <View style={styles.container}>
        {/* Header */}
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← {t('common.back')}</Text>
        </TouchableOpacity>

        <View style={styles.headerBlock}>
          <Text style={styles.chapterLabel}>
            {String(seed.chapter).padStart(2, '0')} / 10
          </Text>
          <Text style={styles.title}>{title}</Text>
        </View>

        {/* Quote */}
        <View style={styles.quoteBlock}>
          <Text style={styles.quoteText}>"{quote}"</Text>
          <Text style={styles.quoteAttrib}>— Erich Fromm</Text>
        </View>

        {/* XP */}
        <View style={styles.xpRow}>
          <Text style={styles.xpLabel}>
            {t('modules.xpReward', {xp: seed.xpReward})}
          </Text>
          <Text style={styles.readTime}>
            {t('modules.readTime', {min: seed.readMinutes})}
          </Text>
        </View>

        {/* Steps */}
        <View style={styles.stepsSection}>
          {STEPS.map((step, i) => {
            const done = step.done(module);
            const isNext = !done && i === completedSteps;
            return (
              <TouchableOpacity
                key={step.key}
                style={[
                  styles.stepCard,
                  done && styles.stepCardDone,
                  isNext && styles.stepCardNext,
                ]}
                onPress={() => handleStepPress(step)}>
                <Text
                  style={[styles.stepIcon, done && styles.stepIconDone]}>
                  {done ? '✓' : step.icon}
                </Text>
                <View style={styles.stepInfo}>
                  <Text
                    style={[
                      styles.stepLabel,
                      done && styles.stepLabelDone,
                    ]}>
                    {t(step.labelKey)}
                  </Text>
                  {step.xp > 0 && !done && (
                    <Text style={styles.stepXP}>+{step.xp} XP</Text>
                  )}
                </View>
                {isNext && (
                  <View style={styles.nextBadge}>
                    <Text style={styles.nextBadgeText}>→</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* CTA */}
        {next && (
          <Button
            label={
              completedSteps === 0
                ? t('modules.startModule')
                : t('modules.continueModule')
            }
            onPress={() => handleStepPress(next)}
            style={styles.cta}
          />
        )}

        {module.is_completed === 1 && (
          <View style={styles.completedBanner}>
            <Text style={styles.completedText}>✓ {t('modules.completed')}</Text>
          </View>
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing[6],
    gap: Spacing[6],
  },
  back: {paddingVertical: Spacing[2]},
  backText: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.base,
    color: Colors.textMuted,
  },
  headerBlock: {gap: Spacing[2]},
  chapterLabel: {
    fontFamily: FontFamily.sansCondensed,
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    letterSpacing: 3,
  },
  title: {
    fontFamily: FontFamily.serifBold,
    fontSize: FontSize['3xl'],
    color: Colors.textPrimary,
    lineHeight: FontSize['3xl'] * 1.2,
  },
  quoteBlock: {
    borderLeftWidth: 2,
    borderLeftColor: Colors.terracotta,
    paddingLeft: Spacing[4],
    gap: Spacing[2],
  },
  quoteText: {
    fontFamily: FontFamily.serifItalic,
    fontSize: FontSize.base,
    color: Colors.textSecondary,
    lineHeight: FontSize.base * 1.65,
  },
  quoteAttrib: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
  xpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  xpLabel: {
    fontFamily: FontFamily.sansMedium,
    fontSize: FontSize.sm,
    color: Colors.gold,
  },
  readTime: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
  stepsSection: {gap: Spacing[3]},
  stepCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[4],
    padding: Spacing[4],
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  stepCardDone: {
    borderColor: Colors.terracottaDark,
    opacity: 0.7,
  },
  stepCardNext: {
    borderColor: Colors.terracotta,
    backgroundColor: Colors.surfaceElevated,
  },
  stepIcon: {
    fontSize: FontSize.lg,
    color: Colors.textMuted,
    width: 28,
    textAlign: 'center',
  },
  stepIconDone: {
    color: Colors.terracotta,
  },
  stepInfo: {flex: 1, gap: 2},
  stepLabel: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.base,
    color: Colors.textSecondary,
  },
  stepLabelDone: {
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
  },
  stepXP: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.xs,
    color: Colors.gold,
  },
  nextBadge: {
    backgroundColor: Colors.terracotta,
    width: 28,
    height: 28,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextBadgeText: {
    color: Colors.onAccent,
    fontSize: FontSize.base,
  },
  cta: {marginBottom: Spacing[4]},
  completedBanner: {
    backgroundColor: Colors.terracottaDark,
    borderRadius: BorderRadius.md,
    padding: Spacing[4],
    alignItems: 'center',
  },
  completedText: {
    fontFamily: FontFamily.sansMedium,
    fontSize: FontSize.base,
    color: Colors.terracottaLight,
  },
});
