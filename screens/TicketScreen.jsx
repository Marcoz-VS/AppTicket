import { useSelector } from 'react-redux';

export default function TicketScreen() {
  const user = useSelector((state) => state.auth.user);

  return (
    <SafeAreaView>
      <Text>Ticket Screen</Text>
      <Text>Bem-vindo, {user.nome}!</Text>
    </SafeAreaView>
  );
}