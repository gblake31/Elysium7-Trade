import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import WelcomeScreen from './app/screens/WelcomeScreen';
import { useRouter } from 'expo-router';

// prevents autohiding splash screen during font loading
SplashScreen.preventAutoHideAsync();
LogBox.ignoreAllLogs();

export default function App() {

  // load fonts with expo-font
  const [fontsLoaded] = useFonts({
    'Abibas': require('./assets/fonts/Abibas.otf')
  });

  // keeps splash screen open until fonts are loaded
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  // displays welcome screen, allows login and register
  return (
    <WelcomeScreen onLayout={onLayoutRootView}/>
  );
}

const styles = StyleSheet.create({
  container: 
  {
    flex: 1,
    backgroundColor: '#c5825b',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
