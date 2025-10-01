import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
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
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case 'HomeAluno':
              return <MaterialIcons name="home" size={size} color={color} />;
            case 'Timer':
              return <MaterialIcons name="timer" size={size} color={color} />;
            case 'Map':
              return <MaterialIcons name="location-on" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="HomeAluno" 
        component={HomeAlunoScreen}
        options={{ title: 'Início' }}
      />
      <Tab.Screen 
        name="Timer" 
        component={TimerScreen}
        options={{ title: 'Intervalo' }}
      />
      <Tab.Screen 
        name="Map" 
        component={MapScreen}
        options={{ title: 'Mapa' }}
      />
    </Tab.Navigator>
  );
}

function TabAdminNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case 'Cadastro':
              return <MaterialIcons name="person-add" size={size} color={color} />;
            case 'UsadosHoje':
              return <FontAwesome5 name="ticket-alt" size={size} color={color} />;
            case 'HistoricoTickets':
              return <MaterialIcons name="history" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="Cadastro" 
        component={CadastroScreen}
        options={{ title: 'Cadastrar' }}
      />
      <Tab.Screen 
        name="UsadosHoje" 
        component={UsadosHojeScreen}
        options={{ title: 'Tickets Hoje' }}
      />
      <Tab.Screen 
        name="HistoricoTickets" 
        component={HistoricoTicketsScreen}
        options={{ title: 'Histórico' }}
      />
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