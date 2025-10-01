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

      {historico.length === 0 ? (
        <Text style={styles.empty}>Nenhum ticket usado em dias anteriores.</Text>
      ) : (
        <FlatList
          data={[...historico].reverse()}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style={styles.item}>
              <Text style={styles.nome}>{item.nome}</Text> - {item.curso} {"\n"}
              <Text style={styles.data}>
                Data: {item.data} - Hora: {item.horaUso}
              </Text>
            </Text>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  item: { fontSize: 16, marginBottom: 12, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  nome: { fontWeight: 'bold' },
  data: { fontSize: 14, color: '#555' },
  empty: { fontSize: 16, color: '#777', textAlign: 'center', marginTop: 20 },
});
