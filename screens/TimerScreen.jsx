import { SafeAreaView, View, Text } from "react-native";
import { useState, useEffect } from "react";
import Cronometro from "../components/Cronometro";

export default function TimerScreen() {
    const tempoIntervalo = 15 * 60;
    const [deveIniciar, setDeveIniciar] = useState(false);

    const verificarSeDeveEstarAtivo = () => {
        const agora = new Date();
        const horaAtual = agora.getHours();
        const minutoAtual = agora.getMinutes();

        const minutosDoDia = horaAtual * 60 + minutoAtual;
        const inicioIntervalo = 9 * 60 + 20;
        const fimIntervalo = 9 * 60 + 35;

        return minutosDoDia >= inicioIntervalo && minutosDoDia < fimIntervalo;
    };

    useEffect(() => {
        const verificarTempo = () => {
        const deveEstarAtivo = verificarSeDeveEstarAtivo();
        setDeveIniciar(deveEstarAtivo);
        };

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