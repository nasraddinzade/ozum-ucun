import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {initDatabase, getUser} from './src/database';
import {initI18n} from './src/locales/i18n';
import {useUserStore} from './src/store/userStore';
import {useModuleStore} from './src/store/moduleStore';
import AppNavigator from './src/navigation/AppNavigator';
import {Colors, FontFamily, FontSize} from './src/theme';

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
    return (
      <View style={styles.splash}>
        <Text style={styles.splashTitle}>Özüm üçün</Text>
        <ActivityIndicator
          color={Colors.terracotta}
          size="small"
          style={styles.loader}
        />
      </View>
    );
  }

  return <AppNavigator />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
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
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  splashTitle: {
    fontFamily: FontFamily.serifBold,
    fontSize: FontSize['3xl'],
    color: Colors.cream,
    letterSpacing: -0.5,
  },
  loader: {
    marginTop: 8,
  },
});
