import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {OnboardingStackParams} from './types';
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import OrientationScreen from '../screens/onboarding/OrientationScreen';
import PainPointScreen from '../screens/onboarding/PainPointScreen';
import CommitmentScreen from '../screens/onboarding/CommitmentScreen';
import StartingPointScreen from '../screens/onboarding/StartingPointScreen';

const Stack = createNativeStackNavigator<OnboardingStackParams>();

export default function OnboardingNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'fade'}}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Orientation" component={OrientationScreen} />
      <Stack.Screen name="PainPoint" component={PainPointScreen} />
      <Stack.Screen name="Commitment" component={CommitmentScreen} />
      <Stack.Screen name="StartingPoint" component={StartingPointScreen} />
    </Stack.Navigator>
  );
}
