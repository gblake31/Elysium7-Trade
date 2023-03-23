import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './app/screens/WelcomeScreen';

export default function App() {
  return (
    <WelcomeScreen />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c5825b',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
