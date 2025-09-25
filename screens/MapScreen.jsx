import * as Location from 'expo-location';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import { useEffect, useState } from 'react';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const ESCOLA_COORDS = {
    latitude: -27.618337,
    longitude: -48.662516
};
const RAIO = 500;

export default function MapScreen() {
    const [location, setLocation] = useState(null);
    const [status, setStatus] = useState("Carregando...");

    useEffect(() => {
        (async () => {
            console.log("Requesting location permissions...");
            let { status } = await Location.requestForegroundPermissionsAsync();
            console.log("Location permissions status:", status);

            if (status !== 'granted') {
                setStatus('Permissão de acesso à localização negada');
                return;
            }

            console.log("Getting current position...");
            try {
                let location = await Location.getCurrentPositionAsync({});
                console.log("Current position:", location);
                setLocation(location.coords);
                updateStatus(location.coords);
            } catch (error) {
                console.error("Error getting current position:", error);
                setStatus("Erro ao obter a localização");
            }

            getLocation();
        });
    }, []);
    const getLocation = async () => {
            try {
                let location = await Location.getCurrentPositionAsync({});
                setLocation(location.coords);
                updateStatus(location.coords);
            } catch (error) {
                console.error("Error getting current position:", error);
                setStatus("Erro ao obter a localização");
            }
    };
    const updateStatus = (coords) => {
        if (coords) {
            const distance = getDistance(
                coords.latitude,
                coords.longitude,
                ESCOLA_COORDS.latitude,
                ESCOLA_COORDS.longitude
            );

            if (distance <= RAIO) {
                setStatus("Dentro da área");
            } else {
                setStatus("Fora da área");
            }
        } else {
            setStatus("Carregando...");
        }
    };

    useEffect(() => {
        if (location) {
            console.log("Location state updated:", location);
            updateStatus(location);
        }
    }, [location]);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                Mapa de Acesso Escolar
            </Text>
            <Button title="Atualizar Localização" onPress={getLocation} />
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: ESCOLA_COORDS.latitude,
                    longitude: ESCOLA_COORDS.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                <Marker
                    coordinate={ESCOLA_COORDS}
                    title="SENAI Palhoça"
                />
                <Circle
                    center={ESCOLA_COORDS}
                    radius={RAIO}
                    strokeColor="rgba(0, 0, 255, 0.7)"
                    fillColor="rgba(0, 0, 255, 0.2)"
                />

                {location && (
                    <Marker
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }}
                        pinColor='green'
                        title="Sua Localização"
                    />
                )}
            </MapView>
            <View style={styles.statusBox}>
                <Text style={styles.statusText}>{status}</Text>
            </View>
        </SafeAreaView>
    );
}

function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3;
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 10,
    },
    statusBox: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        textAlign: 'center',
        fontSize: 16,
    },
    statusText: {
        fontSize: 16,
        textAlign: 'center',
    },
});