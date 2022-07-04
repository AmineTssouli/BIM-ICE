import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from '../screens/LandingScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';



const Stack = createNativeStackNavigator();

const AuthStack = () => {

  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen component={OnboardingScreen} name='Onboarding'  />
      <Stack.Screen component={LandingScreen} name='Landing' />
      <Stack.Screen component={SignupScreen} name='Signup' />
      <Stack.Screen component={LoginScreen} name='Login'  />
    </Stack.Navigator>
  )
}

export default AuthStack;