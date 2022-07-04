import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileInfoChange from '../screens/ProfileInfoChange';
import ProfileScreen from '../screens/ProfileScreen';
import PasswordChange from '../screens/PasswordChange';

const Stack = createNativeStackNavigator();

const ProfileNavigator = () => {

  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen component={ProfileScreen} name ='ProfileScreen' />
        <Stack.Screen component={ProfileInfoChange} name='ProfileInfoChange' />
        <Stack.Screen component={PasswordChange} name='PasswordChange' />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;