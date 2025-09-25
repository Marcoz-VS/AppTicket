import { useEffect } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getTicketsHoje } from '../src/slices/ticketSlice';

export default function UsadosHojeScreen() {
  const dispatch = useDispatch();
  const ticketsHoje = useSelector((state) => state.tickets.ticketsHoje || []);

  useEffect(() => {
    dispatch(getTicketsHoje());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tickets Usados Hoje</Text>
      <FlatList
        data={ticketsHoje}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.nome} - {item.curso} - {item.horaUso}
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
