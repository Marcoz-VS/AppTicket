import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView, Text } from 'react-native';
import CustomButton from '../components/CustomButton';
import { registrarTicket, usarTicket, loadTickets } from '../src/slices/ticketSlice';
import { useState, useEffect } from 'react';

export default function TicketScreen({navigation}) {
  const user = useSelector((state) => state.auth.user);
  const [ticket, setTicket] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkOrGenerateTicket = async () => {
      try {
        // First, check if user already has an unused ticket for today
        const result = await dispatch(loadTickets());
        const tickets = result.payload;
        const hoje = new Date().toISOString().split('T')[0];
        
        const existingTicket = tickets.find(
          t => t.matricula === user.matricula && 
          t.data === hoje && 
          !t.usado
        );

        if (existingTicket) {
          // If there's an existing unused ticket, use it
          setTicket(existingTicket);
          return;
        }

        // If no existing ticket, generate a new one
        const response = await dispatch(registrarTicket(user));
        if (response.payload.sucesso) {
          setTicket(response.payload.ticket);
        } else {
          console.error('Erro ao gerar ticket:', response.payload.mensagem);
          navigation.goBack();
        }
      } catch (error) {
        console.error('Erro:', error);
        navigation.goBack();
      }
    };

    checkOrGenerateTicket();
  }, [dispatch, navigation, user]);

  const handleUsarTicket = async () => {
    const response = await dispatch(usarTicket(user.matricula));
    if (response.payload.sucesso) {
      console.log('Ticket usado com sucesso!');
      navigation.goBack();
    } else {
      console.error('Erro ao usar ticket: ' + response.payload.mensagem);
    }
  };

  return (
    <SafeAreaView>
      <Text>Ticket Refeição</Text>
      {ticket && (
        <>
          <Text>Nome: {ticket.nome}</Text>
          <Text>Curso: {ticket.curso}</Text>
          <Text>Data: {ticket.data}</Text>
          <Text>Hora: {ticket.horaCriacao}</Text>
        </>
      )}

      <CustomButton 
        title="Rasgar Ticket" 
        onPress={handleUsarTicket} 
      />
      <CustomButton
        title="Voltar"
        onPress={() => { navigation.goBack(); }}
      />
    </SafeAreaView>
  );
}