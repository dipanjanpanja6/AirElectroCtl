import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

export const theme = {
  ...MD3LightTheme,
  roundness: 2,
  colors: {
    ...MD3LightTheme.colors,

    primary: '#64dd17',
    onPrimary: '#ffffff',
    primaryContainer: '#5efc82',
    onPrimaryContainer: '#00c853',

    secondary: '#5d4037',
  },
};
export const darkTheme = {
  ...MD3DarkTheme,
  roundness: 1,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#00c853',
    onPrimary: '#000000',

    secondary: '#3e2723',
    onSecondary: '#FFFFFF',
  },
};

export default function getTheme(dark: boolean) {
  return dark ? darkTheme : theme;
}
