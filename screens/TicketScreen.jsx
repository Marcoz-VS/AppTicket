import { useSelector } from 'react-redux';
import { SafeAreaView, Text } from 'react-native';

export default function TicketScreen() {
  const user = useSelector((state) => state.auth.user);

  return (
    <SafeAreaView>
      <Text>Ticket Screen</Text>
      <Text>Bem-vindo, {user.nome}!</Text>
    </SafeAreaView>
  );
}