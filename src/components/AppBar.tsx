import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { RootStackParamList } from 'types/Navigation';

export default function AppBar(props: { title: string; settings?: boolean; back?: boolean | (() => void) }) {
  const { colors } = useTheme();
  const { goBack, canGoBack, navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();
  const handleBack = () => {
    if (typeof props.back === 'boolean') canGoBack() ? goBack() : null;
    else if (typeof props.back === 'function') props.back();
  };
  const state = { iconColor: colors.onSecondary };
  return (
    <View>
      <StatusBar backgroundColor="#25215d" barStyle="light-content" />
      <Appbar.Header style={{ backgroundColor: colors.secondary }}>
        {props.back ? <Appbar.BackAction {...state} onPress={handleBack} /> : null}
        <Appbar.Content title={props.title} color={colors.onSecondary} />

        {props.settings && <Appbar.Action {...state} icon={props => <Icon name="settings" {...props} />} onPress={() => navigate('Settings')} />}
      </Appbar.Header>
    </View>
  );
}
