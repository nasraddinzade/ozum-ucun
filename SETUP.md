# Özüm üçün — Setup Guide

## Prerequisites

- Node.js 18+
- React Native CLI: `npm install -g react-native`
- Android Studio + SDK (API 26+)
- Java 17

## Install dependencies

```bash
cd "ozum ucun"
npm install
```

## Additional setup for Expo packages (bare workflow)

Because we use `expo-sqlite` and `expo-notifications` in a bare React Native project,
you need the Expo modules setup:

```bash
npx install-expo-modules@latest
```

Then rebuild the native project:

```bash
cd android && ./gradlew clean && cd ..
```

## Running on Android

```bash
npm run android
```

Or with Metro separately:
```bash
npm start
# In another terminal:
npx react-native run-android
```

## Project Structure

```
src/
├── data/        modules.ts — all 10 Fromm module seeds (az + en + ru)
├── database/    SQLite layer — schema, CRUD, streaks, badges
├── locales/     az.json, en.json, ru.json + i18n init
├── navigation/  AppNavigator, OnboardingNavigator, MainNavigator, etc.
├── screens/
│   ├── onboarding/   Welcome → Orientation → PainPoint → Commitment → StartingPoint
│   ├── modules/      ModulesList → ModuleDetail → ConceptCard → Reflection → Practice → Quiz
│   ├── journal/      JournalScreen, JournalEntryScreen
│   ├── checkin/      CheckInScreen (morning heart scale + evening text)
│   ├── progress/     ProgressScreen (heart, XP bar, badges)
│   └── settings/     Language switcher, data export, about
├── store/       userStore, moduleStore, checkinStore (Zustand)
├── theme/       colors, typography, spacing
└── utils/       notifications.ts
```

## Features

- **10 Fromm modules** — full concept text, reflection, practice, quiz in 3 languages
- **Offline-first** — all data in SQLite, no server
- **Gamification** — XP, 4 levels, 7 badges, heart healing visual
- **Daily check-in** — morning heart scale (1-5) + evening text
- **Reflection journal** — searchable, past-self (30 days ago), export
- **Language switching** — AZ / EN / RU with full content translation
- **Daily notifications** — expo-notifications scheduled reminder

## Brand Palette

| Token       | Hex       | Use |
|-------------|-----------|-----|
| burgundy    | #4A1A2C   | Deep background accents |
| terracotta  | #B8671B   | Primary accent, CTAs |
| cream       | #F4EFE8   | Primary text |
| background  | #1A0A10   | Screen background |
| surface     | #2A1020   | Cards |
| gold        | #C9A84C   | XP, badges |
