import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {ModulesStackParams} from '../../navigation/types';
import {Colors, FontFamily, FontSize, Spacing, BorderRadius} from '../../theme';
import ScreenContainer from '../../components/common/ScreenContainer';
import Button from '../../components/common/Button';
import {useModuleStore} from '../../store/moduleStore';
import {useTranslation} from 'react-i18next';
import {MODULES} from '../../data/modules';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

type Props = {
  navigation: NativeStackNavigationProp<ModulesStackParams, 'Practice'>;
  route: RouteProp<ModulesStackParams, 'Practice'>;
};

export default function PracticeScreen({navigation, route}: Props) {
  const {t, i18n} = useTranslation();
  const {moduleId} = route.params;
  const lang = i18n.language as 'az' | 'en' | 'ru';
  const {completePractice} = useModuleStore();
  const seed = MODULES.find(m => m.id === moduleId);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const checkScale = useSharedValue(1);

  if (!seed) return null;

  const practice =
    lang === 'ru'
      ? seed.practice_ru
      : lang === 'en'
      ? seed.practice_en
      : seed.practice_az;

  const animStyle = useAnimatedStyle(() => ({
    transform: [{scale: checkScale.value}],
  }));

  async function handleComplete() {
    setLoading(true);
    checkScale.value = withSpring(1.2, {damping: 6}, () => {
      checkScale.value = withSpring(1);
    });
    await completePractice(moduleId);
    setCompleted(true);
    setLoading(false);
  }

  return (
    <ScreenContainer>
      <View style={styles.wrapper}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← {t('common.back')}</Text>
          </TouchableOpacity>
          <Text style={styles.topLabel}>{t('practice.title')}</Text>
          <Text style={styles.xpLabel}>+30 XP</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.durationTag}>
            <Text style={styles.durationText}>⏱ {t('practice.duration')}</Text>
          </View>

          <Text style={styles.reminderLabel}>{t('practice.reminder')}</Text>

          <View style={styles.practiceCard}>
            <Text style={styles.practiceIcon}>◆</Text>
            <Text style={styles.practiceText}>{practice}</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.philosophy}>
            {lang === 'ru' ? seed.description_ru : lang === 'en' ? seed.description_en : seed.description_az}
          </Text>
        </View>

        <View style={styles.footer}>
          {completed ? (
            <Animated.View style={[styles.completedBlock, animStyle]}>
              <Text style={styles.completedIcon}>✓</Text>
              <Text style={styles.completedText}>{t('practice.completed')}</Text>
            </Animated.View>
          ) : (
            <Button
              label={t('practice.complete')}
              onPress={handleComplete}
              loading={loading}
            />
          )}

          {completed && (
            <Button
              label={t('modules.quiz') + ' →'}
              onPress={() => navigation.navigate('Quiz', {moduleId})}
              variant="secondary"
              style={styles.nextBtn}
            />
          )}
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  wrapper: {flex: 1},
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing[6],
    paddingVertical: Spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backText: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
  topLabel: {
    fontFamily: FontFamily.sansCondensed,
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    letterSpacing: 2,
  },
  xpLabel: {
    fontFamily: FontFamily.sansMedium,
    fontSize: FontSize.sm,
    color: Colors.gold,
  },
  content: {
    flex: 1,
    padding: Spacing[6],
    gap: Spacing[6],
  },
  durationTag: {
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing[3],
    paddingVertical: Spacing[2],
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  durationText: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    letterSpacing: 0.5,
  },
  reminderLabel: {
    fontFamily: FontFamily.sansCondensed,
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    letterSpacing: 3,
  },
  practiceCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing[6],
    gap: Spacing[4],
    borderWidth: 1,
    borderColor: Colors.terracottaDark,
  },
  practiceIcon: {
    fontSize: FontSize.xl,
    color: Colors.terracotta,
  },
  practiceText: {
    fontFamily: FontFamily.serif,
    fontSize: FontSize.lg,
    color: Colors.textPrimary,
    lineHeight: FontSize.lg * 1.6,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },
  philosophy: {
    fontFamily: FontFamily.serifItalic,
    fontSize: FontSize.base,
    color: Colors.textMuted,
    lineHeight: FontSize.base * 1.65,
  },
  footer: {
    padding: Spacing[6],
    gap: Spacing[3],
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  completedBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing[3],
    padding: Spacing[4],
    backgroundColor: Colors.terracottaDark,
    borderRadius: BorderRadius.md,
  },
  completedIcon: {
    fontSize: FontSize.xl,
    color: Colors.terracottaLight,
  },
  completedText: {
    fontFamily: FontFamily.sansMedium,
    fontSize: FontSize.base,
    color: Colors.terracottaLight,
  },
  nextBtn: {marginTop: Spacing[1]},
});
