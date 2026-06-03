import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ModulesStackParams} from './types';
import {Colors} from '../theme';
import ModulesListScreen from '../screens/modules/ModulesListScreen';
import ModuleDetailScreen from '../screens/modules/ModuleDetailScreen';
import ConceptCardScreen from '../screens/modules/ConceptCardScreen';
import ReflectionScreen from '../screens/modules/ReflectionScreen';
import PracticeScreen from '../screens/modules/PracticeScreen';
import QuizScreen from '../screens/modules/QuizScreen';

const Stack = createNativeStackNavigator<ModulesStackParams>();

export default function ModulesNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: Colors.background},
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="ModulesList" component={ModulesListScreen} />
      <Stack.Screen name="ModuleDetail" component={ModuleDetailScreen} />
      <Stack.Screen name="ConceptCard" component={ConceptCardScreen} />
      <Stack.Screen name="Reflection" component={ReflectionScreen} />
      <Stack.Screen name="Practice" component={PracticeScreen} />
      <Stack.Screen name="Quiz" component={QuizScreen} />
    </Stack.Navigator>
  );
}
