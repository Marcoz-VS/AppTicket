import { View, Text, } from "react-native";
import { useEffect, useState } from "react";

const Cronometro = ({TempoInicial}) => {
  const [tempoDecorrido, setTempoDecorrido] = useState(TempoInicial);
  const [iniciado, setIniciado] = useState(false);

    useEffect(() => {
        const verificarTempo = () => {
            const agora = new Date();
            const horaAtual = agora.getHours();
            const minutoAtual = agora.getMinutes();

            if (horaAtual === 9 && minutoAtual === 20) {
                setIniciado(true);
            }
        };

        const intervaloVerificacao = setInterval(verificarTempo, 60000);

        verificarTempo();

        return () => clearInterval(intervaloVerificacao);
    }, [iniciado]);

    useEffect(() => {
        let intervalo;

        if (iniciado) {
            intervalo = setInterval(() => {
                setTempoDecorrido((prevTempo) => {
                    if (prevTempo <= 1) {
                    setIniciado(false);
                    return 0;
                    }
            return prevTempo - 1;
            });
        }, 1000);
        } else {
            clearInterval(intervalo);
        }
        return () => clearInterval(intervalo);
    }, [iniciado]);
    
    const formatarTempo = (segundos) => {
        const minutos = Math.floor((segundos % 3600) / 60);
        const segs = segundos % 60;

        return `${minutos.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`;
    }

    return (
        <View style={{ fontSize: 24, textAlign: 'center', marginVertical: 20 }}>
            <Text style={{ fontSize: 24, textAlign: 'center', marginVertical: 20 }}>
                {formatarTempo(tempoDecorrido)}
            </Text>
            <Text style={{ textAlign: 'center', fontSize: 12, color: 'gray' }}>
                {iniciado ? 'Intervalo em andamento' : 'Aguardando 09:20'}
            </Text>
        </View>
    );
}

export default Cronometro;