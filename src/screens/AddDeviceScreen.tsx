import { useNavigation } from '@react-navigation/native';
import Row from 'components/Row';
import React, { useState } from 'react';
import { Alert, PermissionsAndroid, TouchableWithoutFeedback, View } from 'react-native';
import { getContactsMatchingString } from 'react-native-contacts';
import { Button, Divider, TextInput, Title, useTheme } from 'react-native-paper';
import { useGetDevicesQuery } from 'store/slices/devices';

export default function AddDeviceScreen() {
  const { addDevice, data } = useGetDevicesQuery();
  const { colors } = useTheme();
  const { goBack } = useNavigation();
  const [state, setState] = useState<{ device_name: string; device_mobile: string; suggestContacts: { value: string; label: string }[] }>({
    device_name: '',
    device_mobile: '',
    suggestContacts: [],
  });
  const handleChange = (key: keyof typeof state) => (text: string) => {
    setState({ ...state, [key]: text });
    // if (key === 'device_mobile' && text?.length > 2) handleContacts();
  };
  const handleAdd = () => {
    if (data?.find(d => d.mobile == state.device_mobile)) return Alert.alert('Error', 'This device is already available!');
    addDevice({ mobile: state.device_mobile, name: state.device_name });
    goBack();
  };
  const handleContacts = async () => {
    const response = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    });

    if (response === 'granted') {
      const contacts = await getContactsMatchingString(state.device_mobile);
      setState({ ...state, suggestContacts: contacts.map(c => c.phoneNumbers.map(p => ({ value: p.number.replace(/\D/g, ''), label: c.givenName }))).flat() });
    } else {
      Alert.alert('Error', 'Please allow contacts read permission.');
    }
  };
  const handleClose = () => goBack();
  
  return (
    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={{ flex: 1, backgroundColor: colors.backdrop }}></View>
      </TouchableWithoutFeedback>
      <View style={{ minHeight: 400, padding: 12, backgroundColor: colors.background }}>
        <View style={{ paddingBottom: 12 }}>
          <Title>Add new device</Title>
        </View>
        <Divider />
        <TextInput autoCapitalize="words" autoFocus mode="outlined" label="Device Name" onChangeText={handleChange('device_name')} value={state.device_name} style={{ marginVertical: 12 }} />
        <TextInput
          mode="outlined"
          label="Device Mobile Number"
          keyboardType="number-pad"
          onChangeText={handleChange('device_mobile')}
          value={state.device_mobile}
          right={<TextInput.Icon icon="contacts" iconColor={colors.primary} size={20} />}
          style={{ marginBottom: 12 }}
        />
        <View style={{ flex: 1 }} />
        <Row style={{ justifyContent: 'space-between' }}>
          <Button mode="outlined" textColor={colors.error} onPress={handleClose} style={{ marginTop: 12, width: '49%' }}>
            Close
          </Button>
          <Button mode="contained" icon="arrow-right" onPress={handleAdd} style={{ marginTop: 12, width: '49%' }} contentStyle={{ flexDirection: 'row-reverse' }}>
            Save
          </Button>
        </Row>
      </View>
    </View>
  );
}
