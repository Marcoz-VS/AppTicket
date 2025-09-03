import { SafeAreaView, View, Text } from "react-native";
import CustomButton from "../components/CustomButton";

export default function HomeAlunoScreen({route}) {
    const { aluno } = route.params;

    return (
        <SafeAreaView>
            <View>
                <Text>
                    Olá, {aluno.nome}
                </Text>
            </View>
            <View>
                <Text>
                    Pegar Ticket
                </Text>
                <CustomButton
                title={"Ticket"}
                />
            </View>
        </SafeAreaView>
    )
}