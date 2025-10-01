import { SafeAreaView, View, Text, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../src/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const validationSchemaAluno = Yup.object().shape({
  matriculaCodigo: Yup.string().required('Obrigatório'),
});

const validationSchemaAdmin = Yup.object().shape({
  usuario: Yup.string().required('Usuário obrigatório'),
  senha: Yup.string().required('Senha obrigatória'),
});

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const [role, setRole] = useState('aluno');

  const handleAlunoSubmit = async (values) => {
    try {
      const asyncData = await AsyncStorage.getItem('alunos');
      const asyncAlunos = asyncData ? JSON.parse(asyncData) : [];
      const databaseAlunos = require('../database.json').alunos;

      const alunoAsyncStorage = asyncAlunos.find(
        (a) => a.matricula === values.matriculaCodigo
      );

      const alunoDatabase = databaseAlunos.find(
        (a) => a.matricula === values.matriculaCodigo
      );

      if (alunoAsyncStorage || alunoDatabase) {
        const alunoEncontrado = alunoAsyncStorage || alunoDatabase;

        if (!alunoAsyncStorage && alunoDatabase) {
          const updatedAlunos = [...asyncAlunos, alunoDatabase];
          await AsyncStorage.setItem('alunos', JSON.stringify(updatedAlunos));
        }

        dispatch(login({ user: alunoEncontrado, role: 'aluno' }));
        navigation.navigate('HomeAluno');
      } else {
        Alert.alert('Erro', 'Matrícula não encontrada');
      }
    } catch (error) {
      console.error('Erro ao verificar matrícula:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao verificar a matrícula');
    }
  };

  const handleAdminSubmit = (values) => {
    const admins = [
      { usuario: 'Bruno', senha: 'SpiderMan01', cargo: 'Professor' },
      { usuario: 'adm', senha: '123456', cargo: 'Coordenador' },
    ];
    const admin = admins.find(
      (a) => a.usuario === values.usuario && a.senha === values.senha
    );

    if (admin) {
      dispatch(login({ user: admin, role: 'admin' }));
      navigation.navigate('HomeAdmin');
    } else {
      Alert.alert('Erro', 'Usuário ou senha incorretos');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>MerendaGo</Text>

      <Picker selectedValue={role} onValueChange={setRole}>
        <Picker.Item label="Aluno" value="aluno" />
        <Picker.Item label="Admin" value="admin" />
      </Picker>

      {role === 'aluno' ? (
        <Formik
          initialValues={{ matriculaCodigo: '' }}
          validationSchema={validationSchemaAluno}
          onSubmit={handleAlunoSubmit}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <View>
              <CustomInput
                value={values.matriculaCodigo}
                onChangeText={handleChange('matriculaCodigo')}
                placeholder="Matrícula"
              />
              {touched.matriculaCodigo && errors.matriculaCodigo && (
                <Text style={styles.error}>{errors.matriculaCodigo}</Text>
              )}
              <CustomButton title="Entrar" onPress={handleSubmit} />
            </View>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={{ usuario: '', senha: '' }}
          validationSchema={validationSchemaAdmin}
          onSubmit={handleAdminSubmit}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <View>
              <CustomInput
                value={values.usuario}
                onChangeText={handleChange('usuario')}
                placeholder="Usuário"
              />
              {touched.usuario && errors.usuario && (
                <Text style={styles.error}>{errors.usuario}</Text>
              )}

              <CustomInput
                value={values.senha}
                onChangeText={handleChange('senha')}
                placeholder="Senha"
                secureTextEntry
              />
              {touched.senha && errors.senha && (
                <Text style={styles.error}>{errors.senha}</Text>
              )}
              <CustomButton title="Entrar" onPress={handleSubmit} />
            </View>
          )}
        </Formik>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  error: { color: 'red', marginBottom: 10 },
});