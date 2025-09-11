import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button } from "react-native";

export default function CadastroScreen() {
    const [user, setUser] = useState('');
    const [matricula, setMatricula] = useState('');
    const [escola, setEscola] = useState('');


    const handleCadastro = () => {
        console.log({ user, matricula, escola});
        Alert('Usuário Cadastrado!');
    };
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Cadastrar Novo Usuário</Text>
            </View>

            <View style={styles.form}>
                <Text>User</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite o User"
                    value={user}
                    onChangeText={setUser}
                />

                <Text>Matricula</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite a Matricula"
                    value={matricula}
                    onChangeText={setMatricula}
                />

                <Text>Escola</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite a Escola"
                    value={escola}
                    onChangeText={setEscola}
                />
                <Button title="Cadastrar" onPress={handleCadastro}/>
            </View>
        </>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        alignItems:'center',
        backgroundColor:"#fff",
    },
    title:{
        fontSize:32,
        fontWeight:'bold',
        marginTop:20,
    },
    form:{
        width:'100%',
        backgroundColor:'#f9f9f9',
        padding:20,
        borderRadius:10,
    },
    input:{
        borderWidth:1,
        borderColor:'#ddd',
        borderRadius:8,
        padding:10,
        marginBottom:15,
        backgroundColor:'#fff',
    },
});