import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import {initDatabase, getUser} from './src/database';
import {initI18n} from './src/locales/i18n';
import {useUserStore} from './src/store/userStore';
import {useModuleStore} from './src/store/moduleStore';
import AppNavigator from './src/navigation/AppNavigator';
import {Colors, FontFamily, FontSize} from './src/theme';

// Keep the native splash (logo on cream) visible until our data is ready.
// This replaces any default Expo logo flash with our own branded splash.
SplashScreen.preventAutoHideAsync().catch(() => {});

function BootLoader() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {loadUser} = useUserStore();
  const {loadModules} = useModuleStore();

  useEffect(() => {
    async function boot() {
      try {
        // 1. Init database
        await initDatabase();

        // 2. Load user to get saved language
        const user = await getUser();
        const savedLang = user?.language ?? undefined;

        // 3. Init i18n with saved or device language
        initI18n(savedLang);

        // 4. Load state into stores
        await Promise.all([loadUser(), loadModules()]);

        setReady(true);
      } catch (e) {
        console.error('Boot error', e);
        setError(String(e));
      } finally {
        // Hide the native splash now that the UI is ready to render.
        await SplashScreen.hideAsync().catch(() => {});
      }
    }
    boot();
  }, []);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!ready) {
    // Native splash is still covering the screen; render nothing underneath.
    return <View style={styles.splash} />;
  }

  return <AppNavigator />;
}

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
    card: Colors.surface,
    text: Colors.textPrimary,
    border: Colors.border,
    primary: Colors.terracotta,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navTheme}>
        <BootLoader />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  errorText: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.sm,
    color: Colors.error,
    textAlign: 'center',
  },
  splash: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
