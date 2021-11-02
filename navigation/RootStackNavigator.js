import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GalleryScreen } from '../screens/GalleryScreen';
import { DetailsScreen } from '../screens/DetailsScreen';

export function RootStackNavigator() {
  const Stack = createNativeStackNavigator();

  return (
  <Stack.Navigator>
    <Stack.Screen name="Gallery" component={GalleryScreen}/>
    <Stack.Screen name="Details" component={DetailsScreen}/>
  </Stack.Navigator>
  )
}