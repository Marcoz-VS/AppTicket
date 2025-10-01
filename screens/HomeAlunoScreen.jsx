import { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import CustomButton from '../components/CustomButton';
import { logout } from '../src/slices/authSlice';
import { loadTickets } from '../src/slices/ticketSlice';

const ESCOLA_COORDS = {
  latitude: -27.618337,
  longitude: -48.662516,
};
const RAIO = 500;
const HORA_INICIO = 9 * 60 + 20;
const HORA_FIM = 9 * 60 + 35;

export default function HomeAlunoScreen({ navigation }) {
  const user = useSelector((state) => state.auth.user);
  const tickets = useSelector((state) => state.tickets.tickets);
  const dispatch = useDispatch();
  const [status, setStatus] = useState('Carregando...');
  const [podePegar, setPodePegar] = useState(false);
  const [coords, setCoords] = useState(null);

  const verificarHorario = () => {
    const agora = new Date();
    const localHours = agora.getHours();
    const localMinutes = agora.getMinutes();
    const minutosDoDia = localHours * 60 + localMinutes;
    console.log('Minutos do dia:', minutosDoDia, 'Horário atual:', agora.toLocaleTimeString());
    return minutosDoDia >= HORA_INICIO && minutosDoDia < HORA_FIM;
  };

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

    if (!verificarHorario()) {
      setStatus('Fora do horário do recreio');
      setPodePegar(false);
      return;
    }

    const distancia = getDistance(
      coords.latitude,
      coords.longitude,
      ESCOLA_COORDS.latitude,
      ESCOLA_COORDS.longitude
    );
    console.log('Distância:', distancia);
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
        console.log('Localização obtida:', loc.coords);
        setCoords(loc.coords);
        validarTicket(loc.coords);
      } catch (error) {
        console.error('Erro ao obter localização:', error);
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
  }, [coords]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Olá, {user?.nome || 'Aluno'}</Text>
        <Text style={styles.status}>{status}</Text>
      </View>

      <View>
        <CustomButton
          title="Pegar Ticket"
          onPress={podePegar ? () => navigation.navigate('Ticket') : null}
          disabled={!podePegar}
        />
      </View>

      <View>
        <CustomButton
          title="Logout"
          onPress={() => {
            dispatch(logout());
            navigation.goBack();
          }}
        />
      </View>
    </SafeAreaView>
  );
}

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  status: { fontSize: 16, marginBottom: 20 },
});