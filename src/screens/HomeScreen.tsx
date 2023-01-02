import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AppBar from 'components/AppBar';
import DeviceCard from 'components/DeviceCard';
import Row from 'components/Row';
import React from 'react';
import { FlatList, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useGetDevicesQuery } from 'store/slices/devices';
import { RootStackParamList } from 'types/Navigation';

export default function HomeScreen() {
  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();
  const { data } = useGetDevicesQuery();

  const handleAdd = () => {
    navigate('AddDevice');
  };

  // useLayoutEffect(() => {
  //   if (!data?.length) navigate('AddDevice');
  // }, [data]);

  if (!data?.length)
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <Row center style={{ flex: 1 }}>
          <Text>No devices available. Please add new device.</Text>
        </Row>

        <Button mode="contained" icon="plus" onPress={handleAdd} style={{ marginTop: 12 }}>
          Add device
        </Button>
      </View>
    );
  return (
    <>
      <AppBar title='GSM Devices Controller' settings/>
      <View style={{ flex: 1, padding: 12 }}>
        <FlatList
          data={data}
          renderItem={({ item }) => <DeviceCard key={item.mobile} {...item} />}
          keyExtractor={item => item.mobile}
          ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        />
      </View>
    </>
  );
}
