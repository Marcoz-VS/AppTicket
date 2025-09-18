import { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import CustomButton from '../components/CustomButton';
import { logout } from '../src/slices/authSlice';
import { loadTickets } from '../src/slices/ticketSlice';

const ESCOLA_COORDS = { 
  latitude: -27.618337, 
  longitude: -48.662516 
};
const RAIO = 500;
const HORA_INICIO = "09:20";
const HORA_FIM = "09:35";

export default function HomeAlunoScreen({ navigation }) {
  const user = useSelector((state) => state.auth.user);
  const tickets = useSelector((state) => state.tickets.tickets);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("Carregando...");
  const [podePegar, setPodePegar] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setStatus("Permissão negada");
        return;
      }
      
      // Load tickets first
      await dispatch(loadTickets());
      
      let loc = await Location.getCurrentPositionAsync({});
      validarTicket(loc.coords);
    })();
  }, []);

  const validarTicket = (coords) => {
    const agora = new Date();
    const hoje = agora.toISOString().split('T')[0];
    const horaAtual = agora.toTimeString().slice(0, 5);

    // Check if user already used a ticket today
    const ticketUsadoHoje = tickets.find(
      t => t.matricula === user.matricula && 
      t.data === hoje && 
      t.usado
    );

    if (ticketUsadoHoje) {
      setStatus("Já utilizou o ticket hoje");
      setPodePegar(false);
      return;
    }

    if (horaAtual < HORA_INICIO || horaAtual > HORA_FIM) {
      setStatus("Fora do horário do recreio");
      setPodePegar(false);
      return;
    }

    const distancia = getDistance(
      coords.latitude, coords.longitude,
      ESCOLA_COORDS.latitude, ESCOLA_COORDS.longitude
    );

    if (distancia > RAIO) {
      setStatus("Fora da área da escola");
      setPodePegar(false);
      return;
    }

    setStatus("Pode pegar ticket");
    setPodePegar(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Olá, {user?.nome || "Aluno"}</Text>
        <Text style={styles.status}>{status}</Text>
      </View>

      <View>
        <CustomButton
          title="Pegar Ticket"
          onPress={podePegar ? () => navigation.navigate('Ticket') : null}
        />
      </View>

      <View>
        <CustomButton
          title="Logout"
          onPress={() => {
            dispatch(logout());
            navigation.navigate("Login");
          }}
        />
      </View>
    </SafeAreaView>
  );
}

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  status: { fontSize: 16, marginBottom: 20 }
});
