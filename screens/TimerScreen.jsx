import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { TurnoSchedules } from '../src/turnos';
import { calcularDuracao, estaNoIntervaloPorHHMM, hhmmToMinutes } from '../src/timeUtils';

export default function TimerScreen() {
  const user = useSelector(state => state.auth.user);
  const turno = user?.turno || 'manha';
  const { inicio, fim } = TurnoSchedules[turno];
  const tempoIntervalo = calcularDuracao(inicio, fim);
  const [timeLeft, setTimeLeft] = useState('Aguardando intervalo');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      if (estaNoIntervaloPorHHMM(inicio, fim, now)) {
        const totalSeconds = tempoIntervalo;
        const secondsNow = (now.getHours() * 60 + now.getMinutes() - hhmmToMinutes(inicio)) * 60 + now.getSeconds();
        const remainingSeconds = totalSeconds - secondsNow;
        if (remainingSeconds <= 0) {
          setTimeLeft('Aguardando intervalo');
        } else {
          const minutes = Math.floor(remainingSeconds / 60);
          const seconds = remainingSeconds % 60;
          setTimeLeft(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        }
      } else {
        setTimeLeft('Aguardando intervalo');
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [inicio, fim, tempoIntervalo]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nome da Instituição</Text>
      <View style={styles.card}>
        <Text style={styles.intervalo}>Intervalo</Text>
        <Text style={styles.timeRange}>{inicio} - {fim}</Text>
        <Text style={styles.timer}>{timeLeft}</Text>
        <Text style={styles.label}>Tempo Restante</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '80%',
  },
  intervalo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  timeRange: {
    fontSize: 16,
    marginBottom: 20,
  },
  timer: {
    fontSize: 60,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
});