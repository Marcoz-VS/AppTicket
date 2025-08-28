import { SafeAreaView, View, Text } from "react-native";
import CustomButton from "../components/CustomButton";

export default function HomeAlunoScreen() {

    return (
        <SafeAreaView>
            <View>
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