import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './src/store';
import LoginScreen from './screens/LoginScreen';
import HomeAlunoScreen from './screens/HomeAlunoScreen';
import TicketScreen from './screens/TicketScreen';
import TimerScreen from './screens/TimerScreen';
import MapScreen from './screens/MapScreen';
import CadastroScreen from './screens/CadastroScreen';
import UsadosHojeScreen from './screens/UsadosHojeScreen';
import HistoricoTicketsScreen from './screens/HistoricoTicketsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabAlunoNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeAluno" component={HomeAlunoScreen} />
      <Tab.Screen name="Timer" component={TimerScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
    </Tab.Navigator>
  );
}

function TabAdminNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Cadastro" component={CadastroScreen} />
      <Tab.Screen name="UsadosHoje" component={UsadosHojeScreen} />
      <Tab.Screen name="HistoricoTickets" component={HistoricoTicketsScreen} />
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

function HomeAdminStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeAdminTab"
        component={TabAdminNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ title: 'Login' }} 
          />
          <Stack.Screen
            name="HomeAluno"
            component={HomeAlunoStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeAdmin"
            component={HomeAdminStack}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}