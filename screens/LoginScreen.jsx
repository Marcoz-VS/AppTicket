import { SafeAreaView, StyleSheet, View, Text, Button } from "react-native";
import { Formik } from "formik";
import * as Yup from 'yup';
import { Picker } from "@react-native-picker/picker";
import CustomInput from "../components/CustomInput.jsx";
import { useState } from "react";
import CustomButton from "../components/CustomButton.jsx";

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

  const handleAlunoSubmit = (values, { setSubmitting }) => {
    console.log(values);
    navigation.navigate("HomeAluno");
    setSubmitting(false);
  };

  const handleAdminSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>MerendaGo</Text>
      <Text>Login</Text>

      <Picker selectedValue={role} onValueChange={(value) => setRole(value)}>
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
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4
  }
});