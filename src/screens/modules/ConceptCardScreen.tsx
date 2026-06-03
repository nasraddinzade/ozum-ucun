import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {ModulesStackParams} from '../../navigation/types';
import {Colors, FontFamily, FontSize, Spacing, BorderRadius} from '../../theme';
import ScreenContainer from '../../components/common/ScreenContainer';
import Button from '../../components/common/Button';
import {useModuleStore} from '../../store/moduleStore';
import {useTranslation} from 'react-i18next';
import {MODULES} from '../../data/modules';

type Props = {
  navigation: NativeStackNavigationProp<ModulesStackParams, 'ConceptCard'>;
  route: RouteProp<ModulesStackParams, 'ConceptCard'>;
};

export default function ConceptCardScreen({navigation, route}: Props) {
  const {t, i18n} = useTranslation();
  const {moduleId} = route.params;
  const lang = i18n.language as 'az' | 'en' | 'ru';
  const {completeConceptRead} = useModuleStore();
  const seed = MODULES.find(m => m.id === moduleId);
  const hasCompleted = useRef(false);

  if (!seed) return null;

  const title = lang === 'ru' ? seed.title_ru : lang === 'en' ? seed.title_en : seed.title_az;
  const concept = lang === 'ru' ? seed.concept_ru : lang === 'en' ? seed.concept_en : seed.concept_az;
  const quote = lang === 'ru' ? seed.quote_ru : lang === 'en' ? seed.quote_en : seed.quote_az;

  async function handleFinish() {
    if (!hasCompleted.current) {
      hasCompleted.current = true;
      await completeConceptRead(moduleId);
    }
    navigation.navigate('Reflection', {moduleId});
  }

  return (
    <ScreenContainer edges={['top', 'bottom']}>
      <View style={styles.wrapper}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← {t('common.back')}</Text>
          </TouchableOpacity>
          <Text style={styles.topLabel}>{t('modules.conceptCard')}</Text>
          <Text style={styles.xpLabel}>+10 XP</Text>
        </View>

        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <Text style={styles.chapterLabel}>
            {String(seed.chapter).padStart(2, '0')} / 10
          </Text>
          <Text style={styles.title}>{title}</Text>

          {/* Fromm Quote callout */}
          <View style={styles.callout}>
            <Text style={styles.calloutText}>"{quote}"</Text>
            <Text style={styles.calloutAttrib}>— Erich Fromm</Text>
          </View>

          {/* Main concept text */}
          <View style={styles.conceptBody}>
            {concept.split('\n\n').map((paragraph, i) => (
              <Text key={i} style={styles.conceptText}>
                {paragraph}
              </Text>
            ))}
          </View>

          <View style={styles.readTime}>
            <Text style={styles.readTimeText}>
              {t('modules.readTime', {min: seed.readMinutes})}
            </Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button
            label={t('modules.reflection') + ' →'}
            onPress={handleFinish}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
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
  scroll: {flex: 1},
  scrollContent: {
    padding: Spacing[6],
    gap: Spacing[6],
    paddingBottom: Spacing[10],
  },
  chapterLabel: {
    fontFamily: FontFamily.sansCondensed,
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    letterSpacing: 3,
  },
  title: {
    fontFamily: FontFamily.serifBold,
    fontSize: FontSize['2xl'],
    color: Colors.textPrimary,
    lineHeight: FontSize['2xl'] * 1.25,
  },
  callout: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: BorderRadius.md,
    borderLeftWidth: 3,
    borderLeftColor: Colors.terracotta,
    padding: Spacing[5],
    gap: Spacing[2],
  },
  calloutText: {
    fontFamily: FontFamily.serifItalic,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    lineHeight: FontSize.md * 1.6,
  },
  calloutAttrib: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
  conceptBody: {
    gap: Spacing[5],
  },
  conceptText: {
    fontFamily: FontFamily.serif,
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    lineHeight: FontSize.md * 1.75,
  },
  readTime: {
    alignItems: 'center',
    paddingTop: Spacing[4],
  },
  readTimeText: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    letterSpacing: 1,
  },
  footer: {
    padding: Spacing[6],
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
});
