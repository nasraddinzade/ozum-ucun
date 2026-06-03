import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BadgeRecord} from '../../database';
import {Colors, FontFamily, FontSize, BorderRadius, Spacing} from '../../theme';
import {useTranslation} from 'react-i18next';

const BADGE_ICONS: Record<string, string> = {
  courage: '🛡',
  streak7: '🔥',
  streak30: '⚡',
  artistOfLove: '❤',
  activeListener: '👂',
  unconditionalGiver: '🌿',
  selfRespect: '◎',
};

interface BadgeCardProps {
  badge: BadgeRecord;
}

export default function BadgeCard({badge}: BadgeCardProps) {
  const {i18n} = useTranslation();
  const lang = i18n.language as 'az' | 'en' | 'ru';

  const name =
    lang === 'az' ? badge.name_az : lang === 'ru' ? badge.name_ru : badge.name_en;
  const description =
    lang === 'az'
      ? badge.description_az
      : lang === 'ru'
      ? badge.description_ru
      : badge.description_en;

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{BADGE_ICONS[badge.id] ?? '★'}</Text>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.desc}>{description}</Text>
        {badge.earned_date && (
          <Text style={styles.date}>{badge.earned_date}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing[4],
    gap: Spacing[3],
    borderWidth: 1,
    borderColor: Colors.border,
  },
  icon: {
    fontSize: 28,
    width: 40,
    textAlign: 'center',
  },
  info: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontFamily: FontFamily.sansMedium,
    fontSize: FontSize.base,
    color: Colors.gold,
  },
  desc: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  date: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
});
