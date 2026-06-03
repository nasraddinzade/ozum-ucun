import React, {useState} from 'react';
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

type Props = {
  navigation: NativeStackNavigationProp<ModulesStackParams, 'Quiz'>;
  route: RouteProp<ModulesStackParams, 'Quiz'>;
};

export default function QuizScreen({navigation, route}: Props) {
  const {t, i18n} = useTranslation();
  const {moduleId} = route.params;
  const lang = i18n.language as 'az' | 'en' | 'ru';
  const {completeQuiz} = useModuleStore();
  const seed = MODULES.find(m => m.id === moduleId);

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!seed || seed.quiz.length === 0) return null;

  const questions = seed.quiz;
  const q = questions[currentQ];

  const question = lang === 'ru' ? q.question_ru : lang === 'en' ? q.question_en : q.question_az;
  const options = lang === 'ru' ? q.options_ru : lang === 'en' ? q.options_en : q.options_az;
  const explanation = lang === 'ru' ? q.explanation_ru : lang === 'en' ? q.explanation_en : q.explanation_az;

  function handleSelect(idx: number) {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    if (idx === q.correctIndex) setScore(s => s + 1);
  }

  async function handleNext() {
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setSubmitting(true);
      await completeQuiz(moduleId);
      setFinished(true);
      setSubmitting(false);
    }
  }

  if (finished) {
    return (
      <ScreenContainer>
        <View style={styles.finishedWrapper}>
          <Text style={styles.finishedIcon}>◉</Text>
          <Text style={styles.finishedTitle}>
            {t('quiz.score', {score, total: questions.length})}
          </Text>
          <Text style={styles.finishedSub}>
            {score === questions.length
              ? (lang === 'az' ? 'Mükəmməl!' : lang === 'ru' ? 'Отлично!' : 'Perfect!')
              : (lang === 'az' ? 'Yaxşı işdir. Düşünmə davam edir.' : lang === 'ru' ? 'Хорошая работа. Думай дальше.' : 'Good work. Keep thinking.')}
          </Text>
          <Button
            label={t('common.done')}
            onPress={() => navigation.navigate('ModulesList')}
            style={styles.doneCta}
          />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scrollable>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← {t('common.back')}</Text>
          </TouchableOpacity>
          <Text style={styles.topLabel}>{t('quiz.title')}</Text>
          <Text style={styles.progress}>
            {currentQ + 1}/{questions.length}
          </Text>
        </View>

        <View style={styles.questionBlock}>
          <Text style={styles.questionNum}>
            {t('quiz.question', {n: currentQ + 1})}
          </Text>
          <Text style={styles.question}>{question}</Text>
        </View>

        <View style={styles.options}>
          {options.map((opt, idx) => {
            const isSelected = selected === idx;
            const isCorrect = idx === q.correctIndex;
            let style = styles.option;
            if (showResult && isSelected && isCorrect) style = {...styles.option, ...styles.optionCorrect} as any;
            else if (showResult && isSelected && !isCorrect) style = {...styles.option, ...styles.optionWrong} as any;
            else if (showResult && isCorrect) style = {...styles.option, ...styles.optionCorrectAlt} as any;

            return (
              <TouchableOpacity
                key={idx}
                style={style}
                onPress={() => handleSelect(idx)}
                disabled={showResult}>
                <Text style={styles.optionLetter}>
                  {String.fromCharCode(65 + idx)}
                </Text>
                <Text style={styles.optionText}>{opt}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {showResult && (
          <View style={styles.resultBlock}>
            <Text style={styles.resultVerdict}>
              {selected === q.correctIndex ? t('quiz.correct') : t('quiz.incorrect')}
            </Text>
            <Text style={styles.resultLabel}>{t('quiz.explanation')}</Text>
            <Text style={styles.explanation}>{explanation}</Text>
          </View>
        )}

        {showResult && (
          <Button
            label={
              currentQ < questions.length - 1 ? t('quiz.next') : t('quiz.finish')
            }
            onPress={handleNext}
            loading={submitting}
            style={styles.nextBtn}
          />
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
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  progress: {
    fontFamily: FontFamily.sansMedium,
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
  questionBlock: {gap: Spacing[3]},
  questionNum: {
    fontFamily: FontFamily.sansCondensed,
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    letterSpacing: 2,
  },
  question: {
    fontFamily: FontFamily.serifBold,
    fontSize: FontSize.xl,
    color: Colors.textPrimary,
    lineHeight: FontSize.xl * 1.4,
  },
  options: {gap: Spacing[3]},
  option: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing[4],
    padding: Spacing[4],
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  optionCorrect: {
    borderColor: Colors.success,
    backgroundColor: 'rgba(107, 158, 107, 0.1)',
  },
  optionWrong: {
    borderColor: Colors.error,
    backgroundColor: 'rgba(196, 80, 74, 0.1)',
  },
  optionCorrectAlt: {
    borderColor: Colors.success,
    opacity: 0.6,
  },
  optionLetter: {
    fontFamily: FontFamily.sansMedium,
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    width: 20,
    textAlign: 'center',
  },
  optionText: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.base,
    color: Colors.textSecondary,
    flex: 1,
    lineHeight: FontSize.base * 1.5,
  },
  resultBlock: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing[5],
    gap: Spacing[3],
    borderWidth: 1,
    borderColor: Colors.border,
  },
  resultVerdict: {
    fontFamily: FontFamily.sansMedium,
    fontSize: FontSize.base,
    color: Colors.terracotta,
  },
  resultLabel: {
    fontFamily: FontFamily.sansCondensed,
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    letterSpacing: 2,
  },
  explanation: {
    fontFamily: FontFamily.serif,
    fontSize: FontSize.base,
    color: Colors.textSecondary,
    lineHeight: FontSize.base * 1.65,
  },
  nextBtn: {marginBottom: Spacing[4]},
  // Finished state
  finishedWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing[6],
    gap: Spacing[6],
  },
  finishedIcon: {
    fontSize: 64,
    color: Colors.terracotta,
  },
  finishedTitle: {
    fontFamily: FontFamily.serifBold,
    fontSize: FontSize['2xl'],
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  finishedSub: {
    fontFamily: FontFamily.serif,
    fontSize: FontSize.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: FontSize.base * 1.65,
  },
  doneCta: {width: '100%'},
});
