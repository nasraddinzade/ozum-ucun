import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Colors, FontFamily, FontSize, Spacing, BorderRadius} from '../../theme';
import ScreenContainer from '../../components/common/ScreenContainer';
import Button from '../../components/common/Button';
import {useCheckinStore} from '../../store/checkinStore';
import {useTranslation} from 'react-i18next';

const HEART_SCALE = ['1', '2', '3', '4', '5'];

export default function CheckInScreen() {
  const {t} = useTranslation();
  const {todayCheckin, loadCheckin, submitMorning, submitEvening} = useCheckinStore();
  const [morningScore, setMorningScore] = useState<number | null>(null);
  const [eveningText, setEveningText] = useState('');
  const [savingMorning, setSavingMorning] = useState(false);
  const [savingEvening, setSavingEvening] = useState(false);

  // i18next returns a joined string for array keys unless returnObjects is set.
  const scaleLabels = t('checkin.morning.scale', {returnObjects: true}) as string[];
  function scaleLabel(score: number): string {
    return Array.isArray(scaleLabels) ? scaleLabels[score - 1] ?? '' : '';
  }

  useEffect(() => {
    loadCheckin();
  }, []);

  async function handleMorning() {
    if (!morningScore) return;
    setSavingMorning(true);
    await submitMorning(morningScore);
    setSavingMorning(false);
  }

  async function handleEvening() {
    if (!eveningText.trim()) return;
    setSavingEvening(true);
    await submitEvening(eveningText.trim());
    setSavingEvening(false);
    setEveningText('');
  }

  const hasMorning = Boolean(todayCheckin?.morning_score);
  const hasEvening = Boolean(todayCheckin?.evening_text);

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: Colors.background}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScreenContainer edges={['top']}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.screenTitle}>{t('checkin.title')}</Text>

          {/* Morning */}
          <View style={styles.section}>
            <View style={styles.sectionTop}>
              <Text style={styles.sectionIcon}>☀</Text>
              <Text style={styles.sectionTitle}>{t('checkin.morning.title')}</Text>
              {hasMorning && <Text style={styles.doneTag}>✓</Text>}
            </View>

            {hasMorning ? (
              <View style={styles.completedBlock}>
                <Text style={styles.completedScore}>
                  {todayCheckin?.morning_score}/5
                </Text>
                <Text style={styles.completedLabel}>
                  {scaleLabel(todayCheckin?.morning_score ?? 3)}
                </Text>
              </View>
            ) : (
              <View style={styles.scaleBlock}>
                <Text style={styles.scaleQuestion}>
                  {t('checkin.morning.question')}
                </Text>
                <View style={styles.hearts}>
                  {[1, 2, 3, 4, 5].map(v => (
                    <TouchableOpacity
                      key={v}
                      onPress={() => setMorningScore(v)}
                      style={styles.heartBtn}>
                      <Text style={styles.heartIcon}>
                        {morningScore !== null && v <= morningScore ? '♥' : '♡'}
                      </Text>
                      <Text style={styles.heartNum}>{v}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                {morningScore && (
                  <Text style={styles.scaleLabel}>
                    {scaleLabel(morningScore)}
                  </Text>
                )}
                <Button
                  label={t('checkin.submit')}
                  onPress={handleMorning}
                  disabled={!morningScore}
                  loading={savingMorning}
                  style={styles.submitBtn}
                />
              </View>
            )}
          </View>

          {/* Evening */}
          <View style={styles.section}>
            <View style={styles.sectionTop}>
              <Text style={styles.sectionIcon}>☽</Text>
              <Text style={styles.sectionTitle}>{t('checkin.evening.title')}</Text>
              {hasEvening && <Text style={styles.doneTag}>✓</Text>}
            </View>

            {hasEvening ? (
              <View style={styles.completedBlock}>
                <Text style={styles.completedText}>
                  {todayCheckin?.evening_text}
                </Text>
              </View>
            ) : (
              <View style={styles.eveningBlock}>
                <Text style={styles.scaleQuestion}>
                  {t('checkin.evening.question')}
                </Text>
                <TextInput
                  style={styles.eveningInput}
                  multiline
                  value={eveningText}
                  onChangeText={setEveningText}
                  placeholder={t('checkin.evening.placeholder')}
                  placeholderTextColor={Colors.textMuted}
                  textAlignVertical="top"
                />
                <Button
                  label={t('checkin.submit')}
                  onPress={handleEvening}
                  disabled={eveningText.trim().length < 5}
                  loading={savingEvening}
                  style={styles.submitBtn}
                />
              </View>
            )}
          </View>

          {hasMorning && hasEvening && (
            <View style={styles.allDone}>
              <Text style={styles.allDoneText}>{t('checkin.alreadyDone')}</Text>
            </View>
          )}
        </ScrollView>
      </ScreenContainer>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing[6],
    gap: Spacing[6],
    paddingBottom: Spacing[12],
  },
  screenTitle: {
    fontFamily: FontFamily.serifBold,
    fontSize: FontSize['2xl'],
    color: Colors.textPrimary,
  },
  section: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing[5],
    gap: Spacing[4],
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sectionTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
  },
  sectionIcon: {
    fontSize: 20,
    color: Colors.terracotta,
  },
  sectionTitle: {
    flex: 1,
    fontFamily: FontFamily.sansMedium,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
  },
  doneTag: {
    color: Colors.terracotta,
    fontSize: FontSize.base,
  },
  scaleBlock: {gap: Spacing[4]},
  scaleQuestion: {
    fontFamily: FontFamily.serifItalic,
    fontSize: FontSize.base,
    color: Colors.textSecondary,
    lineHeight: FontSize.base * 1.5,
  },
  hearts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heartBtn: {
    alignItems: 'center',
    gap: Spacing[1],
    flex: 1,
  },
  heartIcon: {
    fontSize: 28,
    color: Colors.terracotta,
  },
  heartNum: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  scaleLabel: {
    fontFamily: FontFamily.serifItalic,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  submitBtn: {marginTop: Spacing[2]},
  completedBlock: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: BorderRadius.md,
    padding: Spacing[4],
    gap: Spacing[2],
  },
  completedScore: {
    fontFamily: FontFamily.serifBold,
    fontSize: FontSize.xl,
    color: Colors.terracotta,
  },
  completedLabel: {
    fontFamily: FontFamily.serifItalic,
    fontSize: FontSize.base,
    color: Colors.textSecondary,
  },
  completedText: {
    fontFamily: FontFamily.serif,
    fontSize: FontSize.base,
    color: Colors.textSecondary,
    lineHeight: FontSize.base * 1.5,
  },
  eveningBlock: {gap: Spacing[4]},
  eveningInput: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: BorderRadius.md,
    padding: Spacing[4],
    minHeight: 100,
    fontFamily: FontFamily.sans,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  allDone: {
    alignItems: 'center',
    padding: Spacing[4],
  },
  allDoneText: {
    fontFamily: FontFamily.serifItalic,
    fontSize: FontSize.base,
    color: Colors.textMuted,
    textAlign: 'center',
  },
});
