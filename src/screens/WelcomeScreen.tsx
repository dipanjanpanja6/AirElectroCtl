import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEVICE_LIST_KEY } from 'constants';
import AppStack from 'navigation/AppStack';
import AuthStack from 'navigation/AuthStack';
import React, { useEffect, useState } from 'react';
import { StatusBar, View } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function WelcomeScreen() {
  const { colors } = useTheme();
  const [state, setState] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      const devices = (await AsyncStorage.getItem(DEVICE_LIST_KEY)) || '';
      setState(devices);
    };
    fetchInitialData();
  }, []);

  if (state === null) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.primary,
        }}>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        {/* <Image source={require('assets/logo.png')} /> */}
      </View>
    );
  } else if (state) {
    return <AppStack />;
  } else return <AuthStack />;
}
