import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import moment from 'moment';
import React, { useState } from 'react';
import { Card, Text, Title, useTheme } from 'react-native-paper';
import { RootStackParamList } from 'types/Navigation';

export default function DeviceCard(device: Device) {
  const { colors } = useTheme();
  const [state, setState] = useState({ action: false });
  const handleAction = () => setState({ ...state, action: !state.action });
  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  return (
    <Card onPress={() => navigate('Device', { device })} onLongPress={handleAction} style={{ margin: 5 }}>
      <Card.Content>
        <Title>{device.name}</Title>
        <Text>{device.mobile}</Text>
        <Text style={{ color: colors.outline, paddingBottom: 12 }}>{`Created on ${moment(device.created_at).format('ddd, DD MMM yyyy ')}`}</Text>
      </Card.Content>
    </Card>
  );
}
