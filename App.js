import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import Camera from './src/pages/Camera';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} options={{
          title: 'Sicoob - Login', headerStyle: {
            backgroundColor: '#003641',
          }, headerTintColor: '#fff',
        }} />
        <Stack.Screen name='Register' component={Register} options={{ title: 'Sicoob - Cadastro' }} />
        <Stack.Screen name='Camera' component={Camera} options={{ title: 'Sicoob - Camera' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
