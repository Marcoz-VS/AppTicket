import { SafeAreaView, View, Text } from "react-native";
import { useState, useEffect } from "react";
import Cronometro from "../components/Cronometro";

export default function TimerScreen() {
    const HORA_INICIO = 9 * 60 + 20;
    const HORA_FIM = 9 * 60 + 35;
    const tempoIntervalo = (HORA_FIM - HORA_INICIO) * 60;
    const [deveIniciar, setDeveIniciar] = useState(false);

    const verificarSeDeveEstarAtivo = () => {
        const agora = new Date();
        const minutosDoDia = agora.getHours() * 60 + agora.getMinutes();
        return minutosDoDia >= HORA_INICIO && minutosDoDia < HORA_FIM;
    };

    useEffect(() => {
        const verificarTempo = () => setDeveIniciar(verificarSeDeveEstarAtivo());
        verificarTempo();
        const intervalo = setInterval(verificarTempo, 60000);
        return () => clearInterval(intervalo);
    }, []);

    const handleTimerEnd = () => {
        setDeveIniciar(false);
    };

    return (
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 20 }}>SENAI</Text>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 20, marginBottom: 10 }}>Intervalo</Text>
                <Text style={{ fontSize: 16, marginBottom: 20 }}>09:20 - 09:35</Text>
                <Cronometro 
                TempoInicial={tempoIntervalo}
                shouldStart={deveIniciar}
                onTimerEnd={handleTimerEnd}
                />
            </View>
        </SafeAreaView>
    );
}