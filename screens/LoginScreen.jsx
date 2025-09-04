import { useDispatch } from 'react-redux';
import { login } from '../src/slices/authSlice';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Picker } from '@react-native-picker/picker';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import database from '../database.json';
import React, { useState } from 'react';

const validationSchemaAluno = Yup.object().shape({
  matriculaCodigo: Yup.string()
    .matches(/^\d+$/, 'A matrícula deve conter apenas números')
    .max(10, 'Máx. 10 caracteres')
    .required('Obrigatório'),
});

const validationSchemaAdmin = Yup.object().shape({
  usuario: Yup.string()
    .trim('Sem espaços extras')
    .strict(true)
    .max(50, 'O usuário deve ter no máximo 50 caracteres')
    .required('Usuário é obrigatório'),
  senha: Yup.string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .max(20, 'A senha deve ter no máximo 20 caracteres')
    .required('Senha é obrigatória'),
});

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const [role, setRole] = useState('aluno'); 

  const handleAlunoSubmit = (values) => {
    const alunoEncontrado = database.alunos.find(
      (aluno) => aluno.matricula === values.matriculaCodigo
    );
    if (alunoEncontrado) {
      dispatch(login({ user: alunoEncontrado, role: 'aluno' }));
      navigation.navigate('HomeAluno');
    } else {
      alert(
        'Matrícula ou código não encontrado. Por favor, verifique e tente novamente.'
      );
    }
  };

  const handleAdminSubmit = (values) => {
    const adminEncontrado = database.admins.find(
      (admin) => admin.senha === values.senha && admin.usuario === values.usuario
    );
    if (adminEncontrado) {
      dispatch(login({ user: adminEncontrado, role: 'admin' })); 
      navigation.navigate('HomeAdmin');
    } else {
      alert(
        'Matrícula ou código não encontrado. Por favor, verifique e tente novamente.'
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>MerendaGo</Text>
      <Text>Login</Text>

      <Picker style={styles.picker} selectedValue={role} onValueChange={(value) => setRole(value)}>
        <Picker.Item label="Aluno" value="aluno" />
        <Picker.Item label="Admin" value="admin" />
      </Picker>

      {role === "aluno" ? (
        <>
            <Text>Insira sua matricula ou código para se cadastrar neste aplicativo</Text>
            <Formik
            initialValues={{ matriculaCodigo: '' }}
            validationSchema={validationSchemaAluno}
            onSubmit={handleAlunoSubmit}
            >
            {({ handleChange, handleSubmit, values, errors, touched, isValid, dirty }) => (
                <View>
                <CustomInput
                    value={values.matriculaCodigo}
                    onChangeText={handleChange('matriculaCodigo')}
                    placeholder={'Coloque sua matrícula ou código (máx. 10 caracteres)'}
                    required
                />
                {touched.matriculaCodigo && errors.matriculaCodigo && (
                    <Text style={styles.errorText}>{errors.matriculaCodigo}</Text>
                )}
                <CustomButton
                    title={"Confirmar"}
                    onPress={handleSubmit}
                    disabled={!isValid || !dirty}
                />
                </View>
            )}
            </Formik>
        </>
      ) : (
        <>
            <Text>Insira seu usúario e senha para se cadastrar neste Aplicativo</Text>
            <Formik
            initialValues={{ usuario: '', senha: '' }}
            validationSchema={validationSchemaAdmin}
            onSubmit={handleAdminSubmit}
            >
            {({ handleChange, handleSubmit, values, errors, touched, isValid, dirty }) => (
                <View>
                <CustomInput
                    value={values.usuario}
                    onChangeText={handleChange('usuario')}
                    placeholder={'Coloque o seu usuário (máx. 50 caracteres)'}
                    required
                />
                {touched.usuario && errors.usuario && (
                    <Text style={styles.errorText}>{errors.usuario}</Text>
                )}

                <CustomInput
                    value={values.senha}
                    onChangeText={handleChange('senha')}
                    placeholder={'Coloque sua senha (min. 3 caracteres)'}
                    secureTextEntry
                    required
                />
                {touched.senha && errors.senha && (
                    <Text style={styles.errorText}>{errors.senha}</Text>
                )}
                <CustomButton
                    title={"Confirmar"}
                    onPress={handleSubmit}
                    disabled={!isValid || !dirty}
                />
                </View>
            )}
            </Formik>
        </>
      )}
      <Text>Ao clicar em continuar, você concorda com os nossos Termos de Serviço e com a Política de Privacidade</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
    textAlign: 'center',
  },
  pickerWrapper: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    marginBottom: 30,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#000',
  },
  form: {
    width: '100%',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: '#e53935',
    marginBottom: 10,
  },
});
