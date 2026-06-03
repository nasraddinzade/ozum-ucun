import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {JournalStackParams} from './types';
import {Colors} from '../theme';
import JournalScreen from '../screens/journal/JournalScreen';
import JournalEntryScreen from '../screens/journal/JournalEntryScreen';

const Stack = createNativeStackNavigator<JournalStackParams>();

export default function JournalNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: Colors.background},
      }}>
      <Stack.Screen name="JournalList" component={JournalScreen} />
      <Stack.Screen name="JournalEntry" component={JournalEntryScreen} />
    </Stack.Navigator>
  );
}
