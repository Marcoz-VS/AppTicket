import { useSelector } from 'react-redux';
import { SafeAreaView, View, Text } from 'react-native';
import CustomButton from '../components/CustomButton';

export default function HomeAlunoScreen({ navigation }) {
  const user = useSelector((state) => state.auth.user)

  return (
    <SafeAreaView>
      <View>
        {user.nome ? 
        <Text>Olá, {user.nome}</Text>
        :
        <Text>Olá, Aluno</Text>
        }
      </View>
      <View>
        <Text>Pegar Ticket</Text>
        <CustomButton
          title={'Ticket'}
          onPress={() => navigation.navigate('Ticket')} 
        />
      </View>
    </SafeAreaView>
  );
}