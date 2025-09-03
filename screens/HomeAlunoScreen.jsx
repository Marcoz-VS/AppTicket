import { useSelector } from 'react-redux';

export default function HomeAlunoScreen({ navigation }) {
  const user = useSelector((state) => state.auth.user)

  return (
    <SafeAreaView>
      <View>
        <Text>Olá, {user.nome}</Text>
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