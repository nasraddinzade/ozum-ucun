import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {OnboardingStackParams} from '../../navigation/types';
import {Colors, FontFamily, FontSize, Spacing, BorderRadius} from '../../theme';
import ScreenContainer from '../../components/common/ScreenContainer';
import Button from '../../components/common/Button';
import {useTranslation} from 'react-i18next';
import {changeLanguage, SupportedLanguage} from '../../locales/i18n';
import {updateUser} from '../../database';

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParams, 'Welcome'>;
};

const LANGUAGES: {code: SupportedLanguage; label: string; native: string}[] = [
  {code: 'az', label: 'Azerbaijani', native: 'Azərbaycan'},
  {code: 'en', label: 'English', native: 'English'},
  {code: 'ru', label: 'Russian', native: 'Русский'},
];

export default function WelcomeScreen({navigation}: Props) {
  const {t, i18n} = useTranslation();
  const [langModalVisible, setLangModalVisible] = useState(false);
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>(
    (i18n.language as SupportedLanguage) || 'az',
  );

  async function handleLanguageSelect(lang: SupportedLanguage) {
    setSelectedLang(lang);
    changeLanguage(lang);
    await updateUser({language: lang});
    setLangModalVisible(false);
  }

  return (
    <ScreenContainer>
      <View style={styles.container}>
        {/* Language picker */}
        <TouchableOpacity
          style={styles.langButton}
          onPress={() => setLangModalVisible(true)}>
          <Text style={styles.langFlag}>
            {selectedLang === 'az' ? '🇦🇿' : selectedLang === 'en' ? '🇬🇧' : '🇷🇺'}
          </Text>
          <Text style={styles.langCode}>{selectedLang.toUpperCase()}</Text>
        </TouchableOpacity>

        {/* Main content */}
        <View style={styles.content}>
          <View style={styles.titleBlock}>
            <Image
              source={require('../../../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.subtitle}>{t('app.tagline')}</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.body}>{t('onboarding.welcome.body')}</Text>

          <View style={styles.quoteBlock}>
            <Text style={styles.quoteText}>
              {t('quotes.fromm1')}
            </Text>
            <Text style={styles.quoteAttrib}>— Erich Fromm</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            label={t('onboarding.welcome.cta')}
            onPress={() => navigation.navigate('Orientation')}
          />
        </View>
      </View>

      {/* Language Modal */}
      <Modal
        visible={langModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setLangModalVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setLangModalVisible(false)}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>Language / Dil / Язык</Text>
            {LANGUAGES.map(lang => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.langOption,
                  selectedLang === lang.code && styles.langOptionSelected,
                ]}
                onPress={() => handleLanguageSelect(lang.code)}>
                <Text style={styles.langOptionText}>{lang.native}</Text>
                {selectedLang === lang.code && (
                  <Text style={styles.langCheck}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing[6],
    paddingVertical: Spacing[6],
  },
  langButton: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[1],
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing[3],
    paddingVertical: Spacing[2],
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  langFlag: {
    fontSize: 16,
  },
  langCode: {
    fontFamily: FontFamily.sansMedium,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    letterSpacing: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: Spacing[8],
  },
  titleBlock: {
    gap: Spacing[3],
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 250,
  },
  subtitle: {
    fontFamily: FontFamily.serif,
    fontSize: FontSize.lg,
    color: Colors.terracotta,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  divider: {
    width: 40,
    height: 1,
    backgroundColor: Colors.border,
  },
  body: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.base,
    color: Colors.textSecondary,
    lineHeight: FontSize.base * 1.65,
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
  footer: {
    paddingBottom: Spacing[4],
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    padding: Spacing[6],
    gap: Spacing[2],
  },
  modalTitle: {
    fontFamily: FontFamily.sansMedium,
    fontSize: FontSize.base,
    color: Colors.textMuted,
    marginBottom: Spacing[2],
    letterSpacing: 1,
  },
  langOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing[4],
    paddingHorizontal: Spacing[4],
    borderRadius: BorderRadius.md,
  },
  langOptionSelected: {
    backgroundColor: Colors.surfaceElevated,
  },
  langOptionText: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
  },
  langCheck: {
    color: Colors.terracotta,
    fontSize: FontSize.md,
  },
});
