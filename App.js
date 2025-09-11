import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeAlunoScreen from './screens/HomeAlunoScreen';
import TicketScreen from './screens/TicketScreen';
import HomeAdminScreen from './screens/HomeAdminScreen';
import TimerScreen from './screens/TimerScreen';
import { Provider } from 'react-redux';
import { store } from './src/store';
import CadastroScreen from './screens/CadastroScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabAlunoNavigator({ navigation }) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeAluno" component={HomeAlunoScreen} />
      <Tab.Screen name="Timer" component={TimerScreen} />
    </Tab.Navigator>
  );
}

function TabAdminNavigator({ navigation }) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="AdminDashboard" component={HomeAdminScreen} />
      <Tab.Screen name="Cadastro" component={CadastroScreen} />
    </Tab.Navigator>
  );
}

function HomeAlunoStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeAlunoTab"
        component={TabAlunoNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
      name="Ticket" 
      component={TicketScreen} 
      options={{ title: 'Ticket' }}
      />
    </Stack.Navigator>
  );
}

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
          <Stack.Screen
            name="HomeAdmin"
            component={TabAdminNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}