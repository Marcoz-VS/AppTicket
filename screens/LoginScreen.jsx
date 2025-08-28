import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import { Formik } from "formik";
import * as Yup from 'yup';
import CustomInput from "../components/CustomInput.jsx";

const validationSchema = Yup.object().shape({
    matricula: Yup.number().max(10, 'A matricula deve ter 10 numeros'),
    codigo: Yup.number().max(10, 'O codigo deve ter 8 numeros'),
    usuario: Yup.string().max(50, 'Usúario deve ter no máximo 50 caracteres'),
    senha: Yup.number().min(3, 'A senha não deve ter menos de 3 caracteres')
});

export default function LoginScreen() {

    return(
        <SafeAreaView style={styles.container}>
            <Text>
            MerendaGo
            </Text>
            <Formik
                initialValues={{matricula: '', codigo: '', usuario: '', senha: ''}}
                validationSchema={validationSchema}
                onSubmit={values => console.log(values)}
            >
            {({handleChange, handleSubmit, values, errors, touched}) => (
                <View>
                    <CustomInput
                        value={values.matricula}
                        onChangeText={handleChange('matricula')}
                        placeholder={'coloque a sua matricula (máx. 10 caracteres'}
                        required
                    />

                    <Button onPress={handleSubmit} title="Submit" />
                </View>
            )}
            </Formik>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});