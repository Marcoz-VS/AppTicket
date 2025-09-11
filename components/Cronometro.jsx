import { View, Text } from "react-native";
import { useEffect, useState } from "react";

const Cronometro = ({ TempoInicial, shouldStart, onTimerEnd }) => {
    const [tempoDecorrido, setTempoDecorrido] = useState(TempoInicial);
    const [iniciado, setIniciado] = useState(false);
    const [horaInicio, setHoraInicio] = useState(null);

    const resetarCronometro = () => {
        setTempoDecorrido(TempoInicial);
        setIniciado(false);
        setHoraInicio(null);
    };

    useEffect(() => {
        if (shouldStart && !iniciado) {
        setIniciado(true);
        setHoraInicio(new Date());
        } else if (!shouldStart && iniciado) {
        resetarCronometro();
        }
    }, [shouldStart, iniciado, TempoInicial]);


    useEffect(() => {
        let intervalo;

        if (iniciado && horaInicio) {
            const sincronizar = () => {
            const agora = new Date();
            const tempoPassado = Math.floor((agora - horaInicio) / 1000);
            const tempoRestante = Math.max(0, TempoInicial - tempoPassado);

            setTempoDecorrido(tempoRestante);

            if (tempoRestante <= 0) {
            resetarCronometro();
            if (onTimerEnd) onTimerEnd();
            }
        };

        sincronizar();
        intervalo = setInterval(sincronizar, 1000);
        }

        return () => {
        if (intervalo) clearInterval(intervalo);
        };
    }, [iniciado, horaInicio, TempoInicial, onTimerEnd]);

    const formatarTempo = (segundos) => {
        const minutos = Math.floor(segundos / 60);
        const segs = segundos % 60;
        return `${minutos.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`;
    };

    return (
        <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <Text style={{ fontSize: 24, textAlign: 'center', marginVertical: 20 }}>
            {formatarTempo(tempoDecorrido)}
        </Text>
        <Text style={{ textAlign: 'center', fontSize: 12, color: 'gray' }}>
            {iniciado ? 'Intervalo em andamento' : 'Aguardando 09:20'}
        </Text>
        </View>
    );
};

export default Cronometro;