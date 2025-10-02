import { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import CustomButton from '../components/CustomButton';
import { logout } from '../src/slices/authSlice';
import { loadTickets } from '../src/slices/ticketSlice';
import { TurnoSchedules } from '../src/turnos';
import { estaNoIntervaloPorHHMM } from '../src/timeUtils';

const ESCOLA_COORDS = {
  latitude: -27.618337,
  longitude: -48.662516,
};
const RAIO = 500;

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const toRad = (v) => (v * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function HomeAlunoScreen({ navigation }) {
  const user = useSelector((state) => state.auth.user);
  const tickets = useSelector((state) => state.tickets.tickets);
  const dispatch = useDispatch();
  const [status, setStatus] = useState('Carregando...');
  const [podePegar, setPodePegar] = useState(false);
  const [coords, setCoords] = useState(null);

  const validarTicket = (coords) => {
    const agora = new Date();
    const hoje = agora.toISOString().split('T')[0];

    const ticketUsadoHoje = tickets.find(
      (t) => t.matricula === user.matricula && t.data === hoje && t.usado
    );
    if (ticketUsadoHoje) {
      setStatus('Já utilizou o ticket hoje');
      setPodePegar(false);
      return;
    }

    const turno = user?.turno || 'manha';
    const schedule = TurnoSchedules[turno];

    if (!estaNoIntervaloPorHHMM(schedule.inicio, schedule.fim)) {
      setStatus(`Fora do horário (${schedule.inicio} - ${schedule.fim})`);
      setPodePegar(false);
      return;
    }

    const distancia = getDistance(
      coords.latitude,
      coords.longitude,
      ESCOLA_COORDS.latitude,
      ESCOLA_COORDS.longitude
    );
    if (distancia > RAIO) {
      setStatus('Fora da área da escola');
      setPodePegar(false);
      return;
    }

    setStatus('Pode pegar ticket');
    setPodePegar(true);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setStatus('Permissão negada');
        setPodePegar(false);
        return;
      }

      await dispatch(loadTickets());

      try {
        let loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
          maximumAge: 0,
          timeout: 15000,
        });
        setCoords(loc.coords);
        validarTicket(loc.coords);
      } catch (error) {
        setStatus('Erro ao obter localização');
        setPodePegar(false);
      }
    })();
  }, []);

  useEffect(() => {
    const intervalo = setInterval(() => {
      if (coords) {
        validarTicket(coords);
      }
    }, 60000);
    return () => clearInterval(intervalo);
  }, [coords, tickets]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bem-vindo {user?.nome}!</Text>
      <Text style={styles.sub}>{user?.turma ? `Turma: ${user.turma}` : ''}</Text>
      <Text style={styles.sub}>{user?.turno ? `Turno: ${user.turno}` : ''}</Text>
      <Text style={styles.status}>{status}</Text>
      {podePegar && (
        <CustomButton title="Pegar Ticket" onPress={() => navigation.navigate('Ticket')} />
      )}
      <CustomButton title="Sair" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  sub: { fontSize: 16, marginBottom: 4 },
  status: { fontSize: 16, color: '#333', marginVertical: 12 },
});