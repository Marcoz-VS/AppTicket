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

function TabNavigator (){
  return(
    <Tab.Navigator
    screenOptions = {({route}) => ({
      tabBarIcon: ({color, size})=>{
        let iconName;
        if(route.name==='Tarefas') iconName = 'home';
        else if (route.name === 'Tarefas') iconName= ' person';
        else if (route.name === 'Configurações') iconName= 'settings';
        return <Icon name = {iconName} size ={size} color = {color}/>
      },
      tabBarActiveTintColor :'#007bff',
      tabBarInactiveTintColor:'#666',
      tabBarStyle:{backgroundColor: '#f5f5f5'},
    })}
    >
      <Tab.Screen name= 'home' component = {LoginScreen} options ={{headerShown:false}}/>
    </Tab.Navigator>
  )
}

function TabAlunoNavigator({ navigation }) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeAluno" component={HomeAlunoScreen} />
      <Tab.Screen name="Timer" component={TimerScreen} />
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
          <Stack.Screen name="HomeAdmin" component={HomeAdminScreen} options={{ title: 'Home Admin' }} />
          <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ title: 'Cadastro' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}