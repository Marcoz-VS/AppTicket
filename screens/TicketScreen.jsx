import { useEffect, useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { registrarTicket, usarTicket, loadTickets } from '../src/slices/ticketSlice';
import CustomButton from '../components/CustomButton';

export default function TicketScreen({ navigation }) {
  const user = useSelector((state) => state.auth.user);
  const [ticket, setTicket] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkOrGenerateTicket = async () => {
      const result = await dispatch(loadTickets());
      const tickets = result.payload;
      const hoje = new Date().toISOString().split('T')[0];

      const existingTicket = tickets.find(
        (t) => t.matricula === user.matricula && t.data === hoje && !t.usado
      );

      if (existingTicket) {
        setTicket(existingTicket);
      } else {
        const response = await dispatch(registrarTicket(user));
        if (response.payload.sucesso) {
          setTicket(response.payload.ticket);
        } else {
          alert(response.payload.mensagem);
          navigation.goBack();
        }
      }
    };

    checkOrGenerateTicket();
  }, [dispatch, navigation, user]);

  const handleUsarTicket = async () => {
    const response = await dispatch(usarTicket(user.matricula));
    if (response.payload.sucesso) {
      alert('Ticket usado!');
      navigation.goBack();
    } else {
      alert(response.payload.mensagem);
    }
  };

  return (
    <SafeAreaView style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Ticket Refeição</Text>

      {ticket && (
        <>
          <Text>Nome: {ticket.nome}</Text>
          <Text>Curso: {ticket.curso}</Text>
          <Text>Data: {ticket.data}</Text>
          <Text>Hora: {ticket.horaCriacao}</Text>
        </>
      )}

      <CustomButton title="Rasgar Ticket" onPress={handleUsarTicket} />
      <CustomButton title="Voltar" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
}
