import {create} from 'zustand';
import {
  ModuleRecord,
  getModules,
  getModule,
  markModuleStep,
  saveReflection,
  earnBadge,
} from '../database';
import {MODULES} from '../data/modules';
import {useUserStore} from './userStore';

interface ModuleState {
  modules: ModuleRecord[];
  isLoading: boolean;

  loadModules: () => Promise<void>;
  refreshModule: (id: number) => Promise<ModuleRecord | null>;
  completeConceptRead: (moduleId: number) => Promise<void>;
  completeReflection: (
    moduleId: number,
    text: string,
  ) => Promise<void>;
  completePractice: (moduleId: number) => Promise<void>;
  completeQuiz: (moduleId: number) => Promise<void>;
}

export const useModuleStore = create<ModuleState>((set, get) => ({
  modules: [],
  isLoading: true,

  loadModules: async () => {
    set({isLoading: true});
    const modules = await getModules();
    set({modules, isLoading: false});
  },

  refreshModule: async (id: number) => {
    const mod = await getModule(id);
    if (!mod) return null;
    set(state => ({
      modules: state.modules.map(m => (m.id === id ? mod : m)),
    }));
    return mod;
  },

  completeConceptRead: async (moduleId: number) => {
    if (get().modules.find(m => m.id === moduleId)?.concept_read) return;
    await markModuleStep(moduleId, 'concept_read');
    await useUserStore.getState().earnXP(10);
    await get().loadModules();
  },

  completeReflection: async (moduleId: number, text: string) => {
    const seed = MODULES.find(m => m.id === moduleId);
    if (!seed) return;

    await saveReflection(
      moduleId,
      seed.reflectionPrompt_az,
      seed.reflectionPrompt_en,
      seed.reflectionPrompt_ru,
      text,
    );
    await markModuleStep(moduleId, 'reflection_done');
    await useUserStore.getState().earnXP(20);

    if (seed.isVulnerablePrompt) {
      await earnBadge('courage');
    }
    if (seed.badgeId && seed.badgeId !== 'courage') {
      await earnBadge(seed.badgeId);
    }

    await get().loadModules();
  },

  completePractice: async (moduleId: number) => {
    if (get().modules.find(m => m.id === moduleId)?.practice_done) return;
    const seed = MODULES.find(m => m.id === moduleId);
    await markModuleStep(moduleId, 'practice_done');
    await useUserStore.getState().earnXP(30);

    if (seed?.badgeId && !seed.isVulnerablePrompt) {
      await earnBadge(seed.badgeId);
    }

    await get().loadModules();
  },

  completeQuiz: async (moduleId: number) => {
    if (get().modules.find(m => m.id === moduleId)?.quiz_done) return;
    const seed = MODULES.find(m => m.id === moduleId);
    await markModuleStep(moduleId, 'quiz_done');
    await useUserStore.getState().earnXP(seed?.xpReward ?? 60);

    if (seed?.badgeId === 'artistOfLove') {
      await earnBadge('artistOfLove');
    }

    await get().loadModules();
  },
}));
