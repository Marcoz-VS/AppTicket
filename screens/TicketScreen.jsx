import { useSelector } from 'react-redux';
import { SafeAreaView, Text } from 'react-native';
import CustomButton from '../components/CustomButton';

export default function TicketScreen(navigation) {
  const user = useSelector((state) => state.auth.user);

  return (
    <SafeAreaView>
      <Text>Ticket Screen</Text>
      <Text>Bem-vindo, {user.nome}!</Text>
      <CustomButton 
        title="Pegar Ticket" 
        onPress={() => { /* Lógica para pegar ticket */ }} 
      />
      <CustomButton
        title={"Voltar"}
        onPress={() => { navigation.goBack(); }}
      />

    </SafeAreaView>
  );
}