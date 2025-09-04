import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView, Text } from 'react-native';
import CustomButton from '../components/CustomButton';
import { registrarTicket, usarTicket } from '../src/slices/ticketSlice';
import { useState, useEffect } from 'react';

export default function TicketScreen({navigation}) {
  const user = useSelector((state) => state.auth.user);
  const [ticket, setTicket] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const gerarTicket = async () => {
      const response = await dispatch(registrarTicket(user));
      if (response.payload.sucesso) {
        setTicket(response.payload.ticket);
      } else {
        console.error('Erro ao gerar ticket:', response.payload.mensagem);
        navigation.goBack();
      }
    };
    gerarTicket();
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
        title={"Voltar"}
        onPress={() => { navigation.goBack(); }}
      />

    </SafeAreaView>
  );
}