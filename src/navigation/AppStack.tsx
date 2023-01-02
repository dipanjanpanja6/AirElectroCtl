import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AddDeviceScreen from 'screens/AddDeviceScreen';
import DeviceScreen from 'screens/DeviceScreen';
import HomeScreen from 'screens/HomeScreen';
import SettingScreen from 'screens/SettingScreen';
import { RootStackParamList } from 'types/Navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ animation: 'slide_from_right', headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Settings" component={SettingScreen} />
      <Stack.Screen name="Device" component={DeviceScreen} />
      <Stack.Screen
        name="AddDevice"
        component={AddDeviceScreen}
        options={{
          presentation: 'transparentModal',

          fullScreenGestureEnabled: true,
          gestureEnabled: true,
          animation: 'fade_from_bottom',
        }}
      />
    </Stack.Navigator>
  );
};
export default AppStack;
