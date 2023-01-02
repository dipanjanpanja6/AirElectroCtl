import AsyncStorage from '@react-native-async-storage/async-storage';
import Row from 'components/Row';
import { DEVICE_LIST_KEY } from 'constants';
import React, { useEffect, useState } from 'react';
import { Title } from 'react-native-paper';

export default function LoginScreen() {
  const [state, _setState] = useState({ username: 'guest' });
  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.setItem(DEVICE_LIST_KEY, state.username);
    }, 1000);
  }, []);

  return (
    <Row style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
      <Title>Auto login as {state.username}...</Title>
    </Row>
  );
}
