import {create} from 'zustand';
import {
  CheckinRecord,
  getTodayCheckin,
  saveMorningCheckin,
  saveEveningCheckin,
  getCheckinDates,
} from '../database';
import {useUserStore} from './userStore';

interface CheckinState {
  todayCheckin: CheckinRecord | null;
  checkinDates: string[];
  isLoading: boolean;

  loadCheckin: () => Promise<void>;
  submitMorning: (score: number) => Promise<void>;
  submitEvening: (text: string) => Promise<void>;
}

export const useCheckinStore = create<CheckinState>((set) => ({
  todayCheckin: null,
  checkinDates: [],
  isLoading: true,

  loadCheckin: async () => {
    set({isLoading: true});
    const [todayCheckin, checkinDates] = await Promise.all([
      getTodayCheckin(),
      getCheckinDates(),
    ]);
    set({todayCheckin, checkinDates, isLoading: false});
  },

  submitMorning: async (score: number) => {
    await saveMorningCheckin(score);
    await useUserStore.getState().earnXP(15);
    await useUserStore.getState().refreshUser();
    const [todayCheckin, checkinDates] = await Promise.all([
      getTodayCheckin(),
      getCheckinDates(),
    ]);
    set({todayCheckin, checkinDates});
  },

  submitEvening: async (text: string) => {
    await saveEveningCheckin(text);
    await useUserStore.getState().earnXP(15);
    const [todayCheckin, checkinDates] = await Promise.all([
      getTodayCheckin(),
      getCheckinDates(),
    ]);
    set({todayCheckin, checkinDates});
  },
}));
