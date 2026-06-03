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
  navigation: NativeStackNavigationProp<OnboardingStackParams, 'PainPoint'>;
  route: RouteProp<OnboardingStackParams, 'PainPoint'>;
};

type PainKey = 'love' | 'meaning' | 'freedom' | 'self';

const PAIN_ICONS: Record<PainKey, string> = {
  love: '♡',
  meaning: '◎',
  freedom: '◌',
  self: '◉',
};

export default function PainPointScreen({navigation, route}: Props) {
  const {t} = useTranslation();
  const [selected, setSelected] = useState<PainKey | null>(null);

  const options: PainKey[] = ['love', 'meaning', 'freedom', 'self'];

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.progress}>
          <View style={[styles.dot, styles.dotDone]} />
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{t('onboarding.painPoint.title')}</Text>
          <Text style={styles.subtitle}>{t('onboarding.painPoint.subtitle')}</Text>

          <View style={styles.options}>
            {options.map(key => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.option,
                  selected === key && styles.optionSelected,
                ]}
                onPress={() => setSelected(key)}>
                <Text
                  style={[
                    styles.icon,
                    selected === key && styles.iconSelected,
                  ]}>
                  {PAIN_ICONS[key]}
                </Text>
                <Text
                  style={[
                    styles.optionText,
                    selected === key && styles.optionTextSelected,
                  ]}>
                  {t(`onboarding.painPoint.options.${key}`)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Button
          label={t('common.next')}
          onPress={() =>
            navigation.navigate('Commitment', {
              orientation: route.params.orientation,
              painPoint: selected ?? '',
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
    gap: Spacing[4],
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
  icon: {
    fontSize: 20,
    color: Colors.textMuted,
    width: 28,
    textAlign: 'center',
  },
  iconSelected: {
    color: Colors.terracotta,
  },
  optionText: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.base,
    color: Colors.textSecondary,
    flex: 1,
  },
  optionTextSelected: {
    color: Colors.textPrimary,
    fontFamily: FontFamily.sansMedium,
  },
  cta: {
    marginBottom: Spacing[4],
  },
});
