import { SafeAreaView } from "react-native";
import {View, Text,TouchableOpacity, StyleSheet, Alert} from "react-native"
import { useSelector } from 'react-redux';

export default function HomeAdminScreen({ navigation }) {
  const user = useSelector((state) => state.auth.user);

    const handleResetTickets= () => {
        Alert.alert(
            "Resetar Tickets",
            "Tem certeza que deseja resetar todos os tickets?",
            [
                {text: "Cancelar", style:"cancel"},
                {text: "Confirmar", onPress:()=> console.log("Tickets Resetados!")},
            ]
        );
    };

    return(
        <SafeAreaView>
            <View>
                <Text>
                    Olá, {user.usuario}!
                </Text>
                <Text>
                    SENAI Palhoça
                </Text>
                

            </View>
            <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Cadastro")}>
                <Text style={styles.buttonText}>Cadastrar Alunos</Text>
                
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("AlunosTickets")}>
                <Text style={styles.buttonText}>Ver alunos com ticket</Text>
                
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("HistoricoTickets")}>
                <Text style={styles.buttonText}>Ver historico dos tickets</Text>
            </TouchableOpacity>


            <TouchableOpacity
            style={[styles.button, styles.resetButton]}
            onPress={handleResetTickets}>
                <Text style={styles.buttonText}>Resetar Tickets</Text>
            </TouchableOpacity>
        </SafeAreaView>

    );
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:20,
        backgroundColor:'#fff'
    },
    text:{
        fontSize:24,
        fontWeight:'bold',
        marginBottom:10,
    },
    button:{
        backgroundColor:"black",
        padding:15, 
        borderRadius:10,
        alignItems:'center',
        marginBottom:20,
    },
    resetButton:{
        backgroundColor:"black",
    },
    buttonText:{
        color:"#fff",
        fontSize:18,
        fontWeight:'bold'
    },
});