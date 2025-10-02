import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const validationSchema = Yup.object().shape({
  nome: Yup.string().min(3).max(50).required('Nome é obrigatório'),
  matricula: Yup.string()
    .matches(/^[0-9]+$/, 'A matrícula deve conter apenas números')
    .min(3).max(10).required('Matrícula é obrigatória'),
  curso: Yup.string().min(3).max(50).required('Curso é obrigatório'),
  turno: Yup.string()
    .oneOf(['manha', 'tarde', 'noite'], 'Turno inválido')
    .required('Turno é obrigatório'),
  turma: Yup.string().min(1).max(10).required('Turma é obrigatória'),
});

export default function CadastroScreen() {
  const [alunos, setAlunos] = useState([]);
  const admin = useSelector((state) => state.auth.user);

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
    const { nome, matricula, curso, turma, turno } = values;
    if (alunos.find((a) => a.matricula === matricula)) {
      Alert.alert('Erro', 'Já existe aluno com essa matrícula');
      return;
    }
    const novoAluno = { nome, matricula, curso, local: 'SENAI Palhoça', turma, turno };
    const novaLista = [...alunos, novoAluno];
    setAlunos(novaLista);
    salvarAlunos(novaLista);
    Alert.alert('Sucesso', `Aluno ${nome} cadastrado!`);
    resetForm();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bem-Vindo</Text>
      <Text style={styles.subtitle}>{admin?.usuario || 'Administrador'}</Text>
      <Text style={styles.cargo}>{admin?.cargo || ''}</Text>
      <Text style={styles.title}>Cadastrar novo usuário</Text>
      <Formik
        initialValues={{ nome: '', matricula: '', curso: '', turma: '', turno: 'manha' }}
        validationSchema={validationSchema}
        onSubmit={handleCadastro}
      >
        {({ handleChange, handleSubmit, values, errors, touched, setFieldValue }) => (
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

            <CustomInput
              placeholder="Turma (ex: 3A)"
              value={values.turma}
              onChangeText={handleChange('turma')}
            />
            {touched.turma && errors.turma && <Text style={styles.error}>{errors.turma}</Text>}

            <Text style={{ marginTop: 8 }}>Turno</Text>
            <Picker
              selectedValue={values.turno}
              onValueChange={v => setFieldValue('turno', v)}
              style={{ marginBottom: 12 }}
            >
              <Picker.Item label="Manhã" value="manha" />
              <Picker.Item label="Tarde" value="tarde" />
              <Picker.Item label="Noite" value="noite" />
            </Picker>
            {touched.turno && errors.turno && <Text style={styles.error}>{errors.turno}</Text>}

            <CustomButton title="Cadastrar" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 18, color: '#333', marginBottom: 4 },
  cargo: { fontSize: 16, color: '#555', marginBottom: 16 },
  error: { color: 'red', marginBottom: 8, marginLeft: 4 },
});