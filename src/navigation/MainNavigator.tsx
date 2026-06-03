import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, StyleSheet} from 'react-native';
import {MainTabParams} from './types';
import {Colors, FontFamily, FontSize} from '../theme';
import ModulesNavigator from './ModulesNavigator';
import JournalNavigator from './JournalNavigator';
import CheckInScreen from '../screens/checkin/CheckInScreen';
import ProgressScreen from '../screens/progress/ProgressScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator<MainTabParams>();

function TabIcon({
  focused,
  icon,
  label,
}: {
  focused: boolean;
  icon: string;
  label: string;
}) {
  return (
    <View style={styles.tabItem}>
      <Text style={[styles.tabIcon, focused && styles.tabIconFocused]}>
        {icon}
      </Text>
      <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>
        {label}
      </Text>
    </View>
  );
}

export default function MainNavigator() {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();

  // Lift the tab bar above the Android system navigation (gesture bar / 3-button).
  const tabBarStyle = [
    styles.tabBar,
    {height: 64 + insets.bottom, paddingBottom: insets.bottom + 8},
  ];

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="ModulesTab"
        component={ModulesNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon="◈" label={t('nav.modules')} />
          ),
        }}
      />
      <Tab.Screen
        name="JournalTab"
        component={JournalNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon="◻" label={t('nav.journal')} />
          ),
        }}
      />
      <Tab.Screen
        name="CheckInTab"
        component={CheckInScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon="♡" label={t('nav.checkin')} />
          ),
        }}
      />
      <Tab.Screen
        name="ProgressTab"
        component={ProgressScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon="◎" label={t('nav.progress')} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon="≡" label={t('nav.settings')} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.surface,
    borderTopColor: Colors.border,
    borderTopWidth: 1,
    height: 72,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  tabIcon: {
    fontSize: 20,
    color: Colors.textMuted,
  },
  tabIconFocused: {
    color: Colors.terracotta,
  },
  tabLabel: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    letterSpacing: 0.5,
  },
  tabLabelFocused: {
    color: Colors.terracotta,
  },
});
