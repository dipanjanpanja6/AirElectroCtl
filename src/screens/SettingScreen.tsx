import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AppBar from 'components/AppBar';
import Row from 'components/Row';
import React from 'react';
import { ScrollView } from 'react-native';
import { Divider, IconButton, List, Text, useTheme } from 'react-native-paper';
import { useGetDevicesQuery } from 'store/slices/devices';
import { RootStackParamList } from 'types/Navigation';

export default function SettingsScreen() {
  const { deleteDevices, data } = useGetDevicesQuery();
  const { colors } = useTheme();
  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Settings'>>();

  return (
    <>
      <AppBar title="Settings" back />
      <ScrollView style={{ flex: 1 }}>
        <List.Item title="Add devices" onPress={() => navigate('AddDevice')} />
        <List.Item title="Delete all devices" onPress={() => deleteDevices(true)} />
        <Divider />
        <List.Subheader>All Devices</List.Subheader>
        {data?.length ? (
          data.map(d => (
            <List.Item key={d.mobile} title={d.name} description={d.mobile} right={() => <IconButton icon="delete" iconColor={colors.error} onPress={() => deleteDevices(d.mobile)} />} />
          ))
        ) : (
          <Row center style={{ padding: 12 }}>
            <Text style={{ color: colors.error }}>No devices available.</Text>
          </Row>
        )}
      </ScrollView>
    </>
  );
}
