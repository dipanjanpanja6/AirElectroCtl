import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {login} from 'constants';
import React from 'react';
import LoginScreen from 'screens/LoginScreen';
import {AuthStackParamList} from 'types/Navigation';

const Stack = createNativeStackNavigator<AuthStackParamList>();
const AuthStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name={login} component={LoginScreen} />
  </Stack.Navigator>
);

export default AuthStack;
