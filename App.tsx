import { DarkTheme as reactNavigationDark, DefaultTheme as reactNavigationLight, NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import React from 'react';
import { useColorScheme } from 'react-native';
import { adaptNavigationTheme, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import WelcomeScreen from 'screens/WelcomeScreen';
import store, { persistor } from 'store';
import getTheme, { darkTheme, theme } from 'theme';
 
const App = () => {
  const navigationRef = useNavigationContainerRef();
  const isDarkMode = useColorScheme() === 'dark';
  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight,
    materialLight: theme,
    reactNavigationDark,
    materialDark: darkTheme,
  });
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <PaperProvider theme={getTheme(isDarkMode)}>
            <NavigationContainer ref={navigationRef} theme={isDarkMode ? DarkTheme : LightTheme}>
              <WelcomeScreen />
            </NavigationContainer>
          </PaperProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
