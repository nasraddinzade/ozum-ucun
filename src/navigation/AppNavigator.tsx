import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParams} from './types';
import {Colors} from '../theme';
import OnboardingNavigator from './OnboardingNavigator';
import MainNavigator from './MainNavigator';
import {useUserStore} from '../store/userStore';

const Stack = createNativeStackNavigator<RootStackParams>();

export default function AppNavigator() {
  const {user} = useUserStore();
  const onboardingDone = Boolean(user?.onboarding_complete);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: Colors.background},
        animation: 'fade',
      }}
      initialRouteName={onboardingDone ? 'Main' : 'Onboarding'}>
      <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
      <Stack.Screen name="Main" component={MainNavigator} />
    </Stack.Navigator>
  );
}
