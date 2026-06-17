# Özüm üçün — Project Notes for Claude

## User Preferences (IMPORTANT)

- **Always perform ALL GitHub operations on the user's behalf.** Do not ask the
  user to run git/GitHub commands manually. Run `git add`, `git commit`,
  `git push`, branch creation, etc. directly via the Bash/PowerShell tools.
  The remote is already configured.
- The user prefers to be told what was done, not asked to do it.
- **Do NOT build an APK unless the user explicitly asks ("сделай apk").**
  After code changes, just verify the result by running on the Android
  emulator (install, drive the flow, screenshot). Skip `assembleRelease`/APK
  packaging until requested.

## Repository

- GitHub: https://github.com/nasraddinzade/ozum-ucun
- Remote `origin` already configured, branch `main`.
- git user: ramin98 / nasraddinzade@gmail.com

## Standard workflow after code changes

```
git add .
git commit -m "<clear description>"
git push
```

End commit messages with the Co-Authored-By trailer.

## Build & Publish (Expo EAS)

- Expo project: @ramin98/ozum-ucun (projectId in app.json)
- Production AAB:
  `eas build --platform android --profile production --non-interactive`
- Preview APK (for device testing, no Expo Go needed):
  `eas build --platform android --profile preview --non-interactive`
- `.npmrc` has `legacy-peer-deps=true` (required for EAS install phase).
- The native `android/` dir is moved to `android_backup/` (gitignored) so EAS
  uses the managed/prebuild flow. Do NOT restore `android/` into the repo.

## Keystore (for Play Store updates — keep safe)

- EAS manages remote Android credentials (keystore on Expo servers).
- Local backup keystore exists: `android_backup/app/ozumucun-release.keystore`
  (password: OzumUcun2024!, alias: ozumucun) — gitignored.

## Tech stack

- Expo SDK 56, React Native 0.85.3, React 19, TypeScript
- expo-sqlite (local DB), expo-notifications, react-navigation, zustand,
  react-native-reanimated, i18next (az/en/ru)
- Brand: burgundy #4A1A2C, terracotta #B8671B, cream #F2E3D0, bg #1A0A10

## Assets

- `assets/logo-source.png` — official logo (1254x1254)
- `scripts/process-logo.js` regenerates icon.png / adaptive-icon.png /
  splash.png / favicon.png from the source logo (pure Node, no deps).
