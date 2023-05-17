import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './src/pages/Login';
import Register from './src/pages/Register';
import Camera from './src/pages/Camera';
import Home from './src/pages/Home';
import Settings from './src/pages/Settings';
import { useAuthentication } from './src/utils/hooks/useAuthentication';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const isAuth = useAuthentication()
  return (
    <NavigationContainer>
      {isAuth?.user?.email ?
        (
          <Tab.Navigator initialRouteName='Home'>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Presenca" component={Camera} />
            <Tab.Screen name="Settings" component={Settings} />
          </Tab.Navigator>
        ) :
        (
          <Stack.Navigator initialRouteName='Camera'>
            <Stack.Screen name='Login' component={Login} options={{
              title: 'Sicoob - Login', headerStyle: {
                backgroundColor: '#003641',
              }, headerTintColor: '#fff',
            }} />
            <Stack.Screen name='Register' component={Register} options={{ title: 'Sicoob - Cadastro' }} />
          </Stack.Navigator >
        )}

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
