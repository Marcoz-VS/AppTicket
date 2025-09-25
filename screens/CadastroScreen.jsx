import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  matricula: Yup.string()
    .matches(/^[0-9]+$/, 'A matrícula deve conter apenas números')
    .max(10, 'Máximo 10 dígitos')
    .required('Matrícula é obrigatória'),
});


export default function CadastroScreen() {


  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [curso, setCurso] = useState('');

  const handleCadastro = (values, { resetForm }) => {
    console.log('Dados enviados:', values);
    Alert.alert('Sucesso', 'Aluno cadastrado com sucesso!');
    resetForm();
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

      <Formik
                  initialValues={{ matriculaCodigo: '' }}
                  validationSchema={validationSchema}
                  onSubmit={handleCadastro}
                >
      <TextInput style={styles.input}
       placeholder="Nome do Aluno"
       value={nome}
       onChangeText={(text) => setNome(text.replace(/[^A-Za-zÀ-ÿ\s]/g, ''))}
       />
      <TextInput style={styles.input} 
      placeholder="Matrícula (apenas números)"
      value={matricula}
      onChangeText={(text) => setMatricula(text.replace(/[^0-9]/g, '').slice(0, 10))}
  keyboardType="numeric" />
      <TextInput style={styles.input} 
      placeholder="Curso"
      value={curso}
      onChangeText={(text) => setCurso(text.replace(/[^A-Za-zÀ-ÿ\s]/g, ''))} />
      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      </Formik>
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