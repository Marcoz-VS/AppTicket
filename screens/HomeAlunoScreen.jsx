import { SafeAreaView } from "react-native";
import CustomButton from "../components/CustomButton";

export default function HomeAlunoScreen() {

    return (
        <SafeAreaView>
            <View>
                <Text>
                    SENAI
                </Text>
                <Text>
                    Palhoça
                </Text>
                <Text>
                    Matrícula:
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