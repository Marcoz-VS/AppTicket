import { useEffect } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getHistoricoTickets } from '../src/slices/ticketSlice';

export default function HistoricoTicketsScreen() {
  const dispatch = useDispatch();
  const historico = useSelector((state) => state.tickets.historico || []);

  useEffect(() => {
    dispatch(getHistoricoTickets());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Histórico de Tickets</Text>
      <FlatList
        data={historico}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.nome} - {item.curso} - {item.data} - {item.horaUso}
          </Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  item: { fontSize: 16, marginBottom: 8 },
});
