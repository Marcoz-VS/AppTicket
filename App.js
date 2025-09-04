import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeAlunoScreen from './screens/HomeAlunoScreen';

const Stack = createStackNavigator();

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

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="HomeAluno" component={HomeAlunoScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
