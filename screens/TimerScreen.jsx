import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TimerScreen() {
  const [timeLeft, setTimeLeft] = useState('Aguardando intervalo');
  const startHour = 9 * 60 + 20;
  const endHour = 9 * 60 + 35

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const localHours = now.getHours();
      const localMinutes = now.getMinutes();
      const localSeconds = now.getSeconds();
      const currentMinutes = localHours * 60 + localMinutes;

      if (currentMinutes >= startHour && currentMinutes < endHour) {
        const totalSeconds = (endHour - startHour) * 60;
        const elapsedMinutes = currentMinutes - startHour;
        const elapsedSeconds = elapsedMinutes * 60 + localSeconds;
        const remainingSeconds = totalSeconds - elapsedSeconds;

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
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nome da Instituição</Text>
      <View style={styles.card}>
        <Text style={styles.intervalo}>Intervalo</Text>
        <Text style={styles.timeRange}>09:20 - 09:35</Text>
        <Text style={styles.timer}>{timeLeft}</Text>
        <Text style={styles.label}>Tempo Restante</Text>
      </View>
    </View>
  );
};

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