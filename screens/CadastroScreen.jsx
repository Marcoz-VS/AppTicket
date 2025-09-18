import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import { useState } from 'react';

export default function CadastroScreen() {
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [curso, setCurso] = useState('');

  const handleCadastro = () => {
    if (!nome || !matricula || !curso) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    Alert.alert('Sucesso', 'Aluno cadastrado com sucesso!');
    console.log({ nome, matricula, curso });

    setNome('');
    setMatricula('');
    setCurso('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Alunos</Text>
      <TextInput style={styles.input}
       placeholder="Nome do Aluno"
       value={nome}
       onChangeText={(text) => setNome(text.replace(/[^A-Za-zÀ-ÿ\s]/g, ''))}
       />
      <TextInput style={styles.input} 
      placeholder="Matrícula (apenas números)"
      value={matricula}
      onChangeText={(text) => setMatricula(text.replace(/[^0-9]/g, ''))}
  keyboardType="numeric" />
      <TextInput style={styles.input} 
      placeholder="Curso"
      value={curso}
      onChangeText={(text) => setCurso(text.replace(/[^A-Za-zÀ-ÿ\s]/g, ''))} />
      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});