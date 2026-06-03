import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {OnboardingStackParams} from '../../navigation/types';
import {Colors, FontFamily, FontSize, Spacing, BorderRadius} from '../../theme';
import ScreenContainer from '../../components/common/ScreenContainer';
import Button from '../../components/common/Button';
import {useTranslation} from 'react-i18next';

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParams, 'Commitment'>;
  route: RouteProp<OnboardingStackParams, 'Commitment'>;
};

type CommitmentKey = 'daily' | 'thrice' | 'weekly' | 'whenever';

const COMMITMENT_DESC: Record<CommitmentKey, string> = {
  daily: '◆◆◆◆',
  thrice: '◆◆◆◇',
  weekly: '◆◆◇◇',
  whenever: '◆◇◇◇',
};

export default function CommitmentScreen({navigation, route}: Props) {
  const {t} = useTranslation();
  const [selected, setSelected] = useState<CommitmentKey | null>(null);

  const options: CommitmentKey[] = ['daily', 'thrice', 'weekly', 'whenever'];

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.progress}>
          <View style={[styles.dot, styles.dotDone]} />
          <View style={[styles.dot, styles.dotDone]} />
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{t('onboarding.commitment.title')}</Text>
          <Text style={styles.subtitle}>{t('onboarding.commitment.subtitle')}</Text>

          <View style={styles.options}>
            {options.map(key => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.option,
                  selected === key && styles.optionSelected,
                ]}
                onPress={() => setSelected(key)}>
                <View style={styles.optionLeft}>
                  <Text
                    style={[
                      styles.optionText,
                      selected === key && styles.optionTextSelected,
                    ]}>
                    {t(`onboarding.commitment.options.${key}`)}
                  </Text>
                  <Text style={styles.intensity}>
                    {COMMITMENT_DESC[key]}
                  </Text>
                </View>
                {selected === key && (
                  <Text style={styles.check}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Button
          label={t('common.next')}
          onPress={() =>
            navigation.navigate('StartingPoint', {
              orientation: route.params.orientation,
              painPoint: route.params.painPoint,
              commitment: selected ?? '',
            })
          }
          disabled={!selected}
          style={styles.cta}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing[6],
    paddingVertical: Spacing[6],
  },
  progress: {
    flexDirection: 'row',
    gap: Spacing[2],
    marginBottom: Spacing[10],
  },
  dot: {
    width: 28,
    height: 3,
    borderRadius: 2,
    backgroundColor: Colors.surfaceElevated,
  },
  dotDone: {backgroundColor: Colors.terracottaDark},
  dotActive: {backgroundColor: Colors.terracotta},
  content: {
    flex: 1,
    gap: Spacing[8],
  },
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
  options: {
    gap: Spacing[3],
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing[4],
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  optionSelected: {
    borderColor: Colors.terracotta,
    backgroundColor: Colors.surfaceElevated,
  },
  optionLeft: {
    gap: Spacing[1],
  },
  optionText: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.base,
    color: Colors.textSecondary,
  },
  optionTextSelected: {
    color: Colors.textPrimary,
    fontFamily: FontFamily.sansMedium,
  },
  intensity: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.sm,
    color: Colors.terracotta,
    letterSpacing: 2,
  },
  check: {
    color: Colors.terracotta,
    fontSize: FontSize.md,
  },
  cta: {
    marginBottom: Spacing[4],
  },
});
