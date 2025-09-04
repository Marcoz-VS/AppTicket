import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeAlunoScreen from './screens/HomeAlunoScreen';
import TicketScreen from './screens/TicketScreen';
import HomeAdminScreen from './screens/HomeAdminScreen';
import { Provider } from 'react-redux';
import { store } from './src/store';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
          <Stack.Screen
            name="HomeAluno"
            component={HomeAlunoStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="HomeAdmin" component={HomeAdminScreen} options={{ title: 'Home Admin' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}