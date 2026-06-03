import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {OnboardingStackParams, RootStackParams} from '../../navigation/types';
import {Colors, FontFamily, FontSize, Spacing, BorderRadius} from '../../theme';
import ScreenContainer from '../../components/common/ScreenContainer';
import Button from '../../components/common/Button';
import {useTranslation} from 'react-i18next';
import {MODULES} from '../../data/modules';
import {useUserStore} from '../../store/userStore';
import {NativeStackNavigationProp as RootNav} from '@react-navigation/native-stack';

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParams, 'StartingPoint'>;
  route: RouteProp<OnboardingStackParams, 'StartingPoint'>;
};

const PAIN_TO_MODULE: Record<string, number> = {
  love: 1,
  meaning: 8,
  freedom: 2,
  self: 7,
};

export default function StartingPointScreen({navigation, route}: Props) {
  const {t, i18n} = useTranslation();
  const {orientation, painPoint, commitment} = route.params;
  const lang = i18n.language as 'az' | 'en' | 'ru';
  const {completeOnboarding} = useUserStore();
  const rootNav = useNavigation<RootNav<RootStackParams, 'Onboarding'>>();

  const suggestedId = PAIN_TO_MODULE[painPoint] ?? 1;
  const [selectedId, setSelectedId] = useState<number>(suggestedId);
  const [loading, setLoading] = useState(false);

  function getTitle(m: (typeof MODULES)[0]) {
    if (lang === 'ru') return m.title_ru;
    if (lang === 'en') return m.title_en;
    return m.title_az;
  }

  async function handleStart() {
    setLoading(true);
    await completeOnboarding({
      language: lang,
      painPoint,
      commitment,
      archetype: orientation,
    });
    rootNav.reset({index: 0, routes: [{name: 'Main'}]});
  }

  return (
    <ScreenContainer scrollable>
      <View style={styles.container}>
        <View style={styles.progress}>
          <View style={[styles.dot, styles.dotDone]} />
          <View style={[styles.dot, styles.dotDone]} />
          <View style={[styles.dot, styles.dotDone]} />
          <View style={[styles.dot, styles.dotActive]} />
        </View>

        <Text style={styles.title}>{t('onboarding.startingPoint.title')}</Text>
        <Text style={styles.subtitle}>{t('onboarding.startingPoint.subtitle')}</Text>

        <View style={styles.modules}>
          {MODULES.map(m => {
            const isSuggested = m.id === suggestedId;
            const isSelected = m.id === selectedId;
            return (
              <TouchableOpacity
                key={m.id}
                style={[
                  styles.moduleCard,
                  isSelected && styles.moduleCardSelected,
                ]}
                onPress={() => setSelectedId(m.id)}>
                <View style={styles.moduleCardTop}>
                  <Text style={styles.chapterNum}>
                    {String(m.chapter).padStart(2, '0')}
                  </Text>
                  {isSuggested && (
                    <View style={styles.suggestedBadge}>
                      <Text style={styles.suggestedText}>
                        {t('onboarding.startingPoint.suggested')}
                      </Text>
                    </View>
                  )}
                </View>
                <Text
                  style={[
                    styles.moduleTitle,
                    isSelected && styles.moduleTitleSelected,
                  ]}>
                  {getTitle(m)}
                </Text>
                <Text style={styles.moduleDesc}>
                  {lang === 'ru' ? m.description_ru : lang === 'en' ? m.description_en : m.description_az}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Button
          label={t('onboarding.startingPoint.cta')}
          onPress={handleStart}
          loading={loading}
          style={styles.cta}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing[6],
    gap: Spacing[6],
  },
  progress: {
    flexDirection: 'row',
    gap: Spacing[2],
  },
  dot: {
    width: 28,
    height: 3,
    borderRadius: 2,
    backgroundColor: Colors.surfaceElevated,
  },
  dotDone: {backgroundColor: Colors.terracottaDark},
  dotActive: {backgroundColor: Colors.terracotta},
  title: {
    fontFamily: FontFamily.serifBold,
    fontSize: FontSize['2xl'],
    color: Colors.textPrimary,
    lineHeight: FontSize['2xl'] * 1.3,
  },
  subtitle: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.base,
    color: Colors.textMuted,
  },
  modules: {
    gap: Spacing[3],
  },
  moduleCard: {
    padding: Spacing[4],
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    gap: Spacing[2],
  },
  moduleCardSelected: {
    borderColor: Colors.terracotta,
    backgroundColor: Colors.surfaceElevated,
  },
  moduleCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chapterNum: {
    fontFamily: FontFamily.sansCondensed,
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    letterSpacing: 2,
  },
  suggestedBadge: {
    backgroundColor: Colors.terracottaDark,
    paddingHorizontal: Spacing[2],
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  suggestedText: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.xs,
    color: Colors.terracottaLight,
    letterSpacing: 0.5,
  },
  moduleTitle: {
    fontFamily: FontFamily.serifBold,
    fontSize: FontSize.base,
    color: Colors.textSecondary,
  },
  moduleTitleSelected: {
    color: Colors.textPrimary,
  },
  moduleDesc: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    lineHeight: FontSize.sm * 1.5,
  },
  cta: {
    marginBottom: Spacing[4],
  },
});
