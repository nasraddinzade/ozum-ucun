import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import {Image} from 'react-native';
import {Colors, FontFamily, FontSize, Spacing, BorderRadius} from '../../theme';
import ScreenContainer from '../../components/common/ScreenContainer';
import {useTranslation} from 'react-i18next';
import {changeLanguage, SupportedLanguage} from '../../locales/i18n';
import {useUserStore} from '../../store/userStore';
import {deleteAllData} from '../../database';

const VERSION = '1.0.0';

const LANGUAGES: {code: SupportedLanguage; label: string}[] = [
  {code: 'az', label: 'Azərbaycan dili'},
  {code: 'en', label: 'English'},
  {code: 'ru', label: 'Русский'},
];

export default function SettingsScreen() {
  const {t, i18n} = useTranslation();
  const {user, updateLanguage, refreshUser} = useUserStore();
  const [deleting, setDeleting] = useState(false);

  async function handleLanguageChange(lang: SupportedLanguage) {
    changeLanguage(lang);
    await updateLanguage(lang);
  }

  function handleDeleteAll() {
    Alert.alert(
      t('settings.data.delete'),
      t('settings.data.deleteWarning'),
      [
        {text: t('settings.data.deleteCancel'), style: 'cancel'},
        {
          text: t('settings.data.deleteConfirm'),
          style: 'destructive',
          onPress: async () => {
            setDeleting(true);
            await deleteAllData();
            await refreshUser();
            setDeleting(false);
          },
        },
      ],
    );
  }

  const currentLang = (i18n.language as SupportedLanguage) || 'az';

  return (
    <ScreenContainer edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.screenTitle}>{t('settings.title')}</Text>

        {/* Language */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('settings.language')}</Text>
          <View style={styles.langOptions}>
            {LANGUAGES.map(l => (
              <TouchableOpacity
                key={l.code}
                style={[
                  styles.langOption,
                  currentLang === l.code && styles.langOptionSelected,
                ]}
                onPress={() => handleLanguageChange(l.code)}>
                <Text
                  style={[
                    styles.langLabel,
                    currentLang === l.code && styles.langLabelSelected,
                  ]}>
                  {l.label}
                </Text>
                {currentLang === l.code && (
                  <Text style={styles.langCheck}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Data */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('settings.data.title')}</Text>

          <TouchableOpacity
            style={styles.actionRow}
            onPress={handleDeleteAll}>
            <Text style={styles.actionDanger}>
              {deleting ? '...' : t('settings.data.delete')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Image
            source={require('../../../assets/logo.png')}
            style={styles.aboutLogo}
            resizeMode="contain"
          />
          <Text style={styles.sectionTitle}>{t('settings.about.title')}</Text>
          <Text style={styles.aboutDesc}>{t('settings.about.description')}</Text>

          <TouchableOpacity
            style={styles.linkRow}
            onPress={() => Linking.openURL('https://www.youtube.com/@ozum-ucun')}>
            <Text style={styles.linkIcon}>▶</Text>
            <Text style={styles.linkText}>{t('settings.about.youtube')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkRow}
            onPress={() => Linking.openURL('https://www.instagram.com/ozum.ucun')}>
            <Text style={styles.linkIcon}>◎</Text>
            <Text style={styles.linkText}>{t('settings.about.instagram')}</Text>
          </TouchableOpacity>

          <Text style={styles.version}>
            {t('settings.about.version', {version: VERSION})}
          </Text>
        </View>

        {/* Fromm quote at bottom */}
        <View style={styles.footer}>
          <Text style={styles.footerQuote}>"{t('quotes.fromm5')}"</Text>
          <Text style={styles.footerAttrib}>— Erich Fromm</Text>
        </View>
      </ScrollView>
    </ScreenContainer>
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
  sectionTitle: {
    fontFamily: FontFamily.sansCondensed,
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    letterSpacing: 3,
  },
  langOptions: {gap: Spacing[2]},
  langOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing[3],
    paddingHorizontal: Spacing[3],
    borderRadius: BorderRadius.md,
  },
  langOptionSelected: {
    backgroundColor: Colors.surfaceElevated,
  },
  langLabel: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.base,
    color: Colors.textSecondary,
  },
  langLabelSelected: {
    color: Colors.textPrimary,
    fontFamily: FontFamily.sansMedium,
  },
  langCheck: {
    color: Colors.terracotta,
    fontSize: FontSize.base,
  },
  actionRow: {
    paddingVertical: Spacing[3],
  },
  actionDanger: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.base,
    color: Colors.error,
  },
  aboutLogo: {
    width: 170,
    height: 142,
    alignSelf: 'center',
    marginBottom: Spacing[2],
  },
  aboutDesc: {
    fontFamily: FontFamily.serifItalic,
    fontSize: FontSize.base,
    color: Colors.textMuted,
    lineHeight: FontSize.base * 1.5,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
    paddingVertical: Spacing[2],
  },
  linkIcon: {
    fontSize: FontSize.base,
    color: Colors.terracotta,
    width: 20,
  },
  linkText: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.base,
    color: Colors.textSecondary,
  },
  version: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: Spacing[2],
  },
  footer: {
    gap: Spacing[2],
    alignItems: 'center',
    paddingVertical: Spacing[4],
  },
  footerQuote: {
    fontFamily: FontFamily.serifItalic,
    fontSize: FontSize.base,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: FontSize.base * 1.65,
  },
  footerAttrib: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
});
