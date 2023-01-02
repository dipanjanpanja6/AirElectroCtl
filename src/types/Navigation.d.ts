import * as string from 'constants';

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  Device: { device: Device };
  AddDevice: undefined;
};
export type AuthStackParamList = {
  [string.login]: undefined;
};
