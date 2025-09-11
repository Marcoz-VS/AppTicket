import { SafeAreaView, View, Text } from "react-native";
import Cronometro from "../components/Cronometro";

export default function TimerScreen() {
    const tempoIntervalo = 15 * 60;
    const [deveIniciar, setDeveIniciar] = useState(false);

    useEffect(() => {
        const verificarTempo = () => {
        const agora = new Date();
        const horaAtual = agora.getHours();
        const minutoAtual = agora.getMinutes();
      
        if (horaAtual === 9 && minutoAtual === 20) {
            setDeveIniciar(true);
        }
        };

        const intervalo = setInterval(verificarHorario, 60000);
        verificarHorario();
    
        return () => clearInterval(intervalo);
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 20 }}>SENAI</Text>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 20, marginBottom: 10 }}>Intervalo</Text>
                <Text style={{ fontSize: 16, marginBottom: 20 }}>09:20 - 09:35</Text>
                <Cronometro 
                TempoInicial={tempoIntervalo}
                iniciar={deveIniciar}
                />
            </View>
        </SafeAreaView>
    );
}