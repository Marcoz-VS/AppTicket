import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';


const validationSchema = Yup.object().shape({
  nome: Yup.string().min(3).max(50).required('Nome é obrigatório'),
  matricula: Yup.string()
    .matches(/^[0-9]+$/, 'A matrícula deve conter apenas números')
    .min(3).max(10).required('Matrícula é obrigatória'),
  curso: Yup.string().min(3).max(50).required('Curso é obrigatório'),
});

export default function CadastroScreen() {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    const carregarAlunos = async () => {
      const data = await AsyncStorage.getItem('alunos');
      if (data) setAlunos(JSON.parse(data));
    };
    carregarAlunos();
  }, []);
  const salvarAlunos = async (lista) => {
    await AsyncStorage.setItem('alunos', JSON.stringify(lista));
  };

  const handleCadastro = (values, { resetForm }) => {
    const { nome, matricula, curso } = values;

    if (alunos.find((a) => a.matricula === matricula)) {
      Alert.alert('Erro', 'Já existe aluno com essa matrícula');
      return;
    }
    const novoAluno = { nome, matricula, curso, local: 'SENAI Palhoça' };
    const novaLista = [...alunos, novoAluno];
    setAlunos(novaLista);
    salvarAlunos(novaLista);
    Alert.alert('Sucesso', `Aluno ${nome} cadastrado!`);
    resetForm();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bem-Vindo</Text>
      <Text style={styles.subtitle}>Usuário</Text>
      <Text style={styles.title}>Cadastrar novo usuário</Text>

      <Formik
        initialValues={{ nome: '', matricula: '', curso: '' }}
        validationSchema={validationSchema}
        onSubmit={handleCadastro}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <View>
            <CustomInput
              placeholder="Nome do Aluno"
              value={values.nome}
              onChangeText={handleChange('nome')}
            />
            {touched.nome && errors.nome && <Text style={styles.error}>{errors.nome}</Text>}

            <CustomInput
              placeholder="Matrícula"
              value={values.matricula}
              onChangeText={handleChange('matricula')}
              keyboardType="numeric"
            />
            {touched.matricula && errors.matricula && <Text style={styles.error}>{errors.matricula}</Text>}

            <CustomInput
              placeholder="Curso"
              value={values.curso}
              onChangeText={handleChange('curso')}
            />
            {touched.curso && errors.curso && <Text style={styles.error}>{errors.curso}</Text>}

            <CustomButton title="Cadastrar" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginVertical:15,
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  CustomButton: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    marginVertical: 10,
  },
  CustomInput: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    marginVertical: 5,
    fontSize: 16,
  },
});
