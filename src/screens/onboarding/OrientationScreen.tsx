import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {OnboardingStackParams} from '../../navigation/types';
import {Colors, FontFamily, FontSize, Spacing, BorderRadius} from '../../theme';
import ScreenContainer from '../../components/common/ScreenContainer';
import Button from '../../components/common/Button';
import {useTranslation} from 'react-i18next';

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParams, 'Orientation'>;
};

type OptionKey = 'searching' | 'struggling' | 'found' | 'confused';

export default function OrientationScreen({navigation}: Props) {
  const {t} = useTranslation();
  const [selected, setSelected] = useState<OptionKey | null>(null);

  const options: {key: OptionKey; emoji: string}[] = [
    {key: 'searching', emoji: '◌'},
    {key: 'struggling', emoji: '△'},
    {key: 'found', emoji: '◉'},
    {key: 'confused', emoji: '◎'},
  ];

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.progress}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{t('onboarding.orientation.title')}</Text>
          <Text style={styles.subtitle}>{t('onboarding.orientation.subtitle')}</Text>

          <View style={styles.options}>
            {options.map(opt => (
              <TouchableOpacity
                key={opt.key}
                style={[
                  styles.option,
                  selected === opt.key && styles.optionSelected,
                ]}
                onPress={() => setSelected(opt.key)}>
                <Text style={styles.optionEmoji}>{opt.emoji}</Text>
                <Text
                  style={[
                    styles.optionText,
                    selected === opt.key && styles.optionTextSelected,
                  ]}>
                  {t(`onboarding.orientation.options.${opt.key}`)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Button
          label={t('common.next')}
          onPress={() =>
            navigation.navigate('PainPoint', {orientation: selected ?? ''})
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
  dotActive: {
    backgroundColor: Colors.terracotta,
  },
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
  optionEmoji: {
    fontSize: 18,
    color: Colors.textMuted,
    width: 24,
    textAlign: 'center',
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
