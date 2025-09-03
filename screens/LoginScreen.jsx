import { SafeAreaView, StyleSheet, View, Text, Button } from "react-native";
import { Formik } from "formik";
import * as Yup from 'yup';
import { Picker } from "@react-native-picker/picker";
import CustomInput from "../components/CustomInput.jsx";
import { useState } from "react";
import CustomButton from "../components/CustomButton.jsx";
import database from "../database.json";

const validationSchemaAluno = Yup.object().shape({
  matriculaCodigo: Yup.string()
    .max(10, 'A matrícula ou código deve ter no máximo 10 caracteres')
    .required('Obrigatório'),
});

const validationSchemaAdmin = Yup.object().shape({
  usuario: Yup.string()
    .max(50, 'Usuário deve ter no máximo 50 caracteres')
    .required('Obrigatório'),
  senha: Yup.string()
    .min(3, 'A senha não deve ter menos de 3 caracteres')
    .required('Obrigatório'),
});

export default function LoginScreen({navigation}) {
  const [role, setRole] = useState("aluno");

  const handleAlunoSubmit = (values) => {
    const alunoEncontrado = database.alunos.find(aluno => aluno.matricula === values.matriculaCodigo);
    if (alunoEncontrado) {
      navigation.navigate("HomeAluno", { aluno: alunoEncontrado });
    } else {
      alert("Matrícula ou código não encontrado. Por favor, verifique e tente novamente.");
  }};

  const handleAdminSubmit = (values) => {
    const adminEncontrado = database.admins.find(admin => admin.senha === values.senha && admin.usuario === values.usuario);
    if (adminEncontrado) {
      navigation.navigate("HomeAdminScreen", { admin: adminEncontrado });
    } else {
      alert("Matrícula ou código não encontrado. Por favor, verifique e tente novamente.");
  }};

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
