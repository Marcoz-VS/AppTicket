/*import { SafeAreaView } from "react-native";
import {View, Text, StyleSheet, Alert} from "react-native"
import { useSelector } from 'react-redux';
import CustomButton from "../components/CustomButton";


  


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
            <CustomButton
            title="Cadastrar Alunos"
            style={styles.button}
            onPress={() => navigation.navigate("Cadastro")}
            />

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
        marginTop:10,
    },
    buttonText:{
        color:"#fff",
        fontSize:18,
        fontWeight:'bold'
    },
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    error: { color: 'red', marginBottom: 10 },
});*/