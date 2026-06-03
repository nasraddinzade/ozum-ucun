import {create} from 'zustand';
import {
  UserRecord,
  getUser,
  updateUser,
  addXP,
  xpToLevel,
  levelThresholds,
  checkStreakBadges,
} from '../database';

interface UserState {
  user: UserRecord | null;
  isLoading: boolean;
  recentXPGain: number | null;
  leveledUp: boolean;

  loadUser: () => Promise<void>;
  completeOnboarding: (data: {
    language: string;
    painPoint: string;
    commitment: string;
    archetype: string;
  }) => Promise<void>;
  earnXP: (amount: number) => Promise<void>;
  updateLanguage: (lang: string) => Promise<void>;
  updateNotificationTime: (time: string) => Promise<void>;
  clearLevelUp: () => void;
  clearXPGain: () => void;
  refreshUser: () => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  isLoading: true,
  recentXPGain: null,
  leveledUp: false,

  loadUser: async () => {
    set({isLoading: true});
    const user = await getUser();
    set({user, isLoading: false});
  },

  completeOnboarding: async ({language, painPoint, commitment, archetype}) => {
    await updateUser({
      language,
      pain_point: painPoint,
      commitment,
      selected_archetype: archetype,
      onboarding_complete: 1,
    });
    await get().refreshUser();
  },

  earnXP: async (amount: number) => {
    const prevUser = get().user;
    const prevLevel = prevUser?.level ?? 1;
    const {newXP, newLevel} = await addXP(amount);
    const didLevelUp = newLevel > prevLevel;

    await checkStreakBadges(prevUser?.current_streak ?? 0);
    await get().refreshUser();
    set({recentXPGain: amount, leveledUp: didLevelUp});
  },

  updateLanguage: async (lang: string) => {
    await updateUser({language: lang});
    await get().refreshUser();
  },

  updateNotificationTime: async (time: string) => {
    await updateUser({notification_time: time});
    await get().refreshUser();
  },

  clearLevelUp: () => set({leveledUp: false}),
  clearXPGain: () => set({recentXPGain: null}),

  refreshUser: async () => {
    const user = await getUser();
    set({user});
  },
}));

export function getXPProgress(xp: number): {
  levelXP: number;
  nextLevelXP: number;
  progress: number;
} {
  const thresholds = levelThresholds();
  const level = xpToLevel(xp);
  const levelIdx = level - 1;
  const levelXP = thresholds[levelIdx] ?? 0;
  const nextLevelXP = thresholds[levelIdx + 1] ?? thresholds[thresholds.length - 1];
  const progress = Math.min((xp - levelXP) / (nextLevelXP - levelXP), 1);
  return {levelXP, nextLevelXP, progress};
}
