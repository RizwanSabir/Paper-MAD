import { View, Text, Pressable } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { styled } from 'nativewind'
import { SafeAreaView } from 'react-native-safe-area-context'
import { collection, getDoc, doc } from "firebase/firestore";
import { auth, db } from '../Firebase/Firebase'
import { getAuth, signOut } from 'firebase/auth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Settings from './bottomBar/Settings';

import HomeScreen from './bottomBar/HomeScreen';

const Tab = createBottomTabNavigator();


const StyledText = styled(Text)
const StyledPressable = styled(Pressable)
export default function MainPage({ navigation, route }) {


  return (

    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  )
}