export type OnboardingStackParams = {
  Welcome: undefined;
  Orientation: undefined;
  PainPoint: {orientation: string};
  Commitment: {orientation: string; painPoint: string};
  StartingPoint: {orientation: string; painPoint: string; commitment: string};
};

export type MainTabParams = {
  ModulesTab: undefined;
  JournalTab: undefined;
  CheckInTab: undefined;
  ProgressTab: undefined;
  SettingsTab: undefined;
};

export type ModulesStackParams = {
  ModulesList: undefined;
  ModuleDetail: {moduleId: number};
  ConceptCard: {moduleId: number};
  Reflection: {moduleId: number};
  Practice: {moduleId: number};
  Quiz: {moduleId: number};
};

export type JournalStackParams = {
  JournalList: undefined;
  JournalEntry: {reflectionId: number};
};

export type RootStackParams = {
  Onboarding: undefined;
  Main: undefined;
};
