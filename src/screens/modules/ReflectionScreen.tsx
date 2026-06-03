import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
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
  withTiming,
} from 'react-native-reanimated';

type Props = {
  navigation: NativeStackNavigationProp<ModulesStackParams, 'Reflection'>;
  route: RouteProp<ModulesStackParams, 'Reflection'>;
};

const MIN_CHARS = 50;

export default function ReflectionScreen({navigation, route}: Props) {
  const {t, i18n} = useTranslation();
  const {moduleId} = route.params;
  const lang = i18n.language as 'az' | 'en' | 'ru';
  const {completeReflection} = useModuleStore();
  const seed = MODULES.find(m => m.id === moduleId);
  const [text, setText] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const shieldOpacity = useSharedValue(0);

  if (!seed) return null;

  const prompt =
    lang === 'ru'
      ? seed.reflectionPrompt_ru
      : lang === 'en'
      ? seed.reflectionPrompt_en
      : seed.reflectionPrompt_az;

  const shieldStyle = useAnimatedStyle(() => ({
    opacity: shieldOpacity.value,
  }));

  async function handleSave() {
    if (text.trim().length < MIN_CHARS) {
      Alert.alert('', t('reflection.min_chars', {n: MIN_CHARS}));
      return;
    }
    setSaving(true);
    await completeReflection(moduleId, text.trim());
    setSaved(true);
    setSaving(false);

    if (seed?.isVulnerablePrompt) {
      shieldOpacity.value = withTiming(1, {duration: 500});
      setTimeout(() => {
        shieldOpacity.value = withTiming(0, {duration: 500});
        navigation.navigate('Practice', {moduleId});
      }, 2000);
    } else {
      navigation.navigate('Practice', {moduleId});
    }
  }

  const charCount = text.trim().length;
  const isReady = charCount >= MIN_CHARS;

  return (
    <KeyboardAvoidingView
      style={styles.kav}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScreenContainer edges={['top']}>
        <View style={styles.wrapper}>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.backText}>← {t('common.back')}</Text>
            </TouchableOpacity>
            <Text style={styles.topLabel}>{t('modules.reflection')}</Text>
            <Text style={styles.xpLabel}>+20 XP</Text>
          </View>

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled">
            {seed.isVulnerablePrompt && (
              <View style={styles.vulnerableTag}>
                <Text style={styles.vulnerableText}>🛡 {t('badges.courage.name')}</Text>
              </View>
            )}

            <View style={styles.promptBlock}>
              <Text style={styles.promptHint}>{t('reflection.prompt_hint')}</Text>
              <Text style={styles.prompt}>{prompt}</Text>
            </View>

            <TextInput
              style={styles.input}
              multiline
              value={text}
              onChangeText={setText}
              placeholder={t('reflection.placeholder')}
              placeholderTextColor={Colors.textMuted}
              textAlignVertical="top"
              autoFocus={false}
            />

            <View style={styles.charRow}>
              <Text style={[styles.charCount, isReady && styles.charCountReady]}>
                {charCount} / {MIN_CHARS}+
              </Text>
            </View>
          </ScrollView>

          {/* Courage badge animation */}
          {seed.isVulnerablePrompt && (
            <Animated.View style={[styles.courageBanner, shieldStyle]}>
              <Text style={styles.courageIcon}>🛡</Text>
              <Text style={styles.courageText}>{t('badges.courage.name')} — {t('badges.courage.description')}</Text>
            </Animated.View>
          )}

          <View style={styles.footer}>
            <Button
              label={saved ? t('reflection.saved') : t('reflection.save')}
              onPress={handleSave}
              disabled={!isReady || saved}
              loading={saving}
            />
          </View>
        </View>
      </ScreenContainer>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  kav: {flex: 1, backgroundColor: Colors.background},
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
  scroll: {flex: 1},
  scrollContent: {
    padding: Spacing[6],
    gap: Spacing[5],
    paddingBottom: Spacing[10],
  },
  vulnerableTag: {
    backgroundColor: Colors.surfaceElevated,
    paddingHorizontal: Spacing[3],
    paddingVertical: Spacing[2],
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  vulnerableText: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.xs,
    color: Colors.gold,
    letterSpacing: 0.5,
  },
  promptBlock: {gap: Spacing[3]},
  promptHint: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  prompt: {
    fontFamily: FontFamily.serifItalic,
    fontSize: FontSize.lg,
    color: Colors.textPrimary,
    lineHeight: FontSize.lg * 1.5,
  },
  input: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
    lineHeight: FontSize.base * 1.65,
    minHeight: 200,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing[4],
    borderWidth: 1,
    borderColor: Colors.border,
  },
  charRow: {alignItems: 'flex-end'},
  charCount: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  charCountReady: {color: Colors.terracotta},
  courageBanner: {
    position: 'absolute',
    bottom: 100,
    left: Spacing[6],
    right: Spacing[6],
    backgroundColor: Colors.surfaceElevated,
    borderRadius: BorderRadius.lg,
    padding: Spacing[5],
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[4],
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  courageIcon: {fontSize: 28},
  courageText: {
    flex: 1,
    fontFamily: FontFamily.sansMedium,
    fontSize: FontSize.base,
    color: Colors.gold,
  },
  footer: {
    padding: Spacing[6],
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
});
