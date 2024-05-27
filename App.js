// In App.js in a new project

import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './Components/LoginPage';


import SignUp from './Components/SignUp';
import MainPage from './Components/MainPage';


import SplashScreen from './Components/SplashScreen';



import AddItem from './Components/bottomBar/AddItem';
import HomeScreen from './Components/bottomBar/HomeScreen';
const Stack = createNativeStackNavigator();

function App() {

  return (

    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='SplashScreen' >
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginPage} />
          <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUp} />
          <Stack.Screen options={{ headerShown: false }} name="SplashScreen" component={SplashScreen} />
          <Stack.Screen options={{ headerShown: false }} name="AddItem" component={AddItem} />
         
          <Stack.Screen name="MainPage" component={MainPage} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;