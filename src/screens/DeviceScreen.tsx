import { RouteProp, useRoute } from '@react-navigation/native';
import AppBar from 'components/AppBar';
import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import SendSMS from 'react-native-sms';
import { RootStackParamList } from 'types/Navigation';

export default function DeviceScreen() {
  const {
    params: { device },
  } = useRoute<RouteProp<RootStackParamList, 'Device'>>();
  const handleOn = () => {
    SendSMS.send(
      {
        body: 'ON',
        recipients: [device.mobile],
        successTypes: ['sent' as any, 'queued' as any],
        allowAndroidSendWithoutReadPermission: true,
      },
      (completed, cancelled, error) => {
        console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
      },
    );
  };
  return (
    <>
      <AppBar title={device.name} settings back />
      <View>
        <Button onPress={handleOn}>ON</Button>
      </View>
    </>
  );
}
