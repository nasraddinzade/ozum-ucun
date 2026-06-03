import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Colors, FontFamily, FontSize, Spacing, BorderRadius} from '../../theme';
import ScreenContainer from '../../components/common/ScreenContainer';
import HeartProgress from '../../components/common/HeartProgress';
import XPBar from '../../components/common/XPBar';
import BadgeCard from '../../components/common/BadgeCard';
import {useUserStore, getXPProgress} from '../../store/userStore';
import {useModuleStore} from '../../store/moduleStore';
import {useTranslation} from 'react-i18next';
import {BadgeRecord, getEarnedBadges} from '../../database';

const LEVEL_NAMES: Record<number, string> = {1: 'levels.1', 2: 'levels.2', 3: 'levels.3', 4: 'levels.4'};
const LEVEL_DESCS: Record<number, string> = {1: 'levelDescriptions.1', 2: 'levelDescriptions.2', 3: 'levelDescriptions.3', 4: 'levelDescriptions.4'};

export default function ProgressScreen() {
  const {t} = useTranslation();
  const {user, recentXPGain, clearXPGain} = useUserStore();
  const {modules} = useModuleStore();
  const [badges, setBadges] = useState<BadgeRecord[]>([]);

  useEffect(() => {
    loadBadges();
  }, []);

  useEffect(() => {
    if (recentXPGain) {
      setTimeout(clearXPGain, 2000);
    }
  }, [recentXPGain]);

  async function loadBadges() {
    const earned = await getEarnedBadges();
    setBadges(earned);
  }

  if (!user) return null;

  const {progress, nextLevelXP} = getXPProgress(user.xp);
  const completedModules = modules.filter(m => m.is_completed).length;
  const heartProgress = completedModules / 10;

  return (
    <ScreenContainer edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.screenTitle}>{t('progress.title')}</Text>

        {/* Heart */}
        <View style={styles.heartSection}>
          <HeartProgress progress={heartProgress} size={140} />
          <View style={styles.heartInfo}>
            <Text style={styles.heartTitle}>{t('progress.heart.title')}</Text>
            <Text style={styles.heartState}>
              {heartProgress < 0.33
                ? t('progress.heart.broken')
                : heartProgress < 0.8
                ? t('progress.heart.healing')
                : t('progress.heart.whole')}
            </Text>
          </View>
        </View>

        {/* Level */}
        <View style={styles.levelCard}>
          <View style={styles.levelTop}>
            <View>
              <Text style={styles.levelLabel}>{t('progress.level', {n: user.level})}</Text>
              <Text style={styles.levelName}>
                {t(`progress.${LEVEL_NAMES[user.level]}`)}
              </Text>
              <Text style={styles.levelDesc}>
                {t(`progress.${LEVEL_DESCS[user.level]}`)}
              </Text>
            </View>
            <Text style={styles.levelNum}>{user.level}</Text>
          </View>

          <XPBar
            progress={progress}
            currentXP={user.xp}
            nextLevelXP={nextLevelXP}
            showXPGain={recentXPGain}
          />

          {user.level < 4 && (
            <Text style={styles.xpToNext}>
              {t('progress.xpToNext', {xp: nextLevelXP - user.xp})}
            </Text>
          )}
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <StatCard
            value={String(user.current_streak)}
            label={t('checkin.streak', {n: user.current_streak})}
            icon="🔥"
          />
          <StatCard
            value={`${completedModules}/10`}
            label={t('progress.modulesCompleted', {n: completedModules})}
            icon="◈"
          />
          <StatCard
            value={String(user.longest_streak)}
            label={t('progress.longestStreak', {n: user.longest_streak})}
            icon="⚡"
          />
        </View>

        {/* Badges */}
        <View style={styles.badgesSection}>
          <Text style={styles.sectionTitle}>{t('progress.badges')}</Text>
          {badges.length === 0 ? (
            <Text style={styles.noBadges}>{t('progress.noBadges')}</Text>
          ) : (
            <View style={styles.badgesList}>
              {badges.map(b => (
                <BadgeCard key={b.id} badge={b} />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

function StatCard({value, label, icon}: {value: string; label: string; icon: string}) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel} numberOfLines={2}>{label}</Text>
    </View>
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
  heartSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[6],
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing[5],
    borderWidth: 1,
    borderColor: Colors.border,
  },
  heartInfo: {gap: Spacing[2], flex: 1},
  heartTitle: {
    fontFamily: FontFamily.sansCondensed,
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    letterSpacing: 2,
  },
  heartState: {
    fontFamily: FontFamily.serifBold,
    fontSize: FontSize.lg,
    color: Colors.textPrimary,
  },
  levelCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing[5],
    gap: Spacing[4],
    borderWidth: 1,
    borderColor: Colors.border,
  },
  levelTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  levelLabel: {
    fontFamily: FontFamily.sansCondensed,
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    letterSpacing: 2,
  },
  levelName: {
    fontFamily: FontFamily.serifBold,
    fontSize: FontSize.xl,
    color: Colors.textPrimary,
  },
  levelDesc: {
    fontFamily: FontFamily.serifItalic,
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
  levelNum: {
    fontFamily: FontFamily.serifBold,
    fontSize: FontSize['4xl'],
    color: Colors.terracotta,
    opacity: 0.5,
  },
  xpToNext: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    textAlign: 'right',
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing[3],
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing[4],
    alignItems: 'center',
    gap: Spacing[1],
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statIcon: {fontSize: 20},
  statValue: {
    fontFamily: FontFamily.serifBold,
    fontSize: FontSize.xl,
    color: Colors.textPrimary,
  },
  statLabel: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: FontSize.xs * 1.4,
  },
  badgesSection: {gap: Spacing[4]},
  sectionTitle: {
    fontFamily: FontFamily.serifBold,
    fontSize: FontSize.lg,
    color: Colors.textPrimary,
  },
  noBadges: {
    fontFamily: FontFamily.serifItalic,
    fontSize: FontSize.base,
    color: Colors.textMuted,
  },
  badgesList: {gap: Spacing[3]},
});
