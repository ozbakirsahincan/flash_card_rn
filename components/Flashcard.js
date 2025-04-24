// components/Flashcard.js
import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";

// Resim ve ses importları
const images = {
    Apfel: require("../assets/apfel.png"),
    Hund: require("../assets/hund.png"),
    Haus: require("../assets/haus.png"),
};

const sounds = {
    Apfel: require("../assets/apfel.mp3"),
    Hund: require("../assets/hunde.mp3"),
    Haus: require("../assets/haus.mp3"),
};

const Flashcard = ({ card }) => {
    const [showTranslation, setShowTranslation] = useState(false);
    const [sound, setSound] = useState();

    if (!card) {
        return (
            <View style={styles.card}>
                <Text style={styles.errorText}>Kart verisi bulunamadı</Text>
            </View>
        );
    }

    const cardImage = images[card.german];
    const cardSound = sounds[card.german];

    const playSound = async () => {
        if (cardSound) {
            const { sound } = await Audio.Sound.createAsync(cardSound);
            setSound(sound);
            await sound.playAsync();
        }
    };

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    const handlePress = () => {
        setShowTranslation(!showTranslation);
        playSound();
    };

    return (
        <TouchableOpacity activeOpacity={0.9} style={styles.card} onPress={handlePress}>
            <Text style={styles.germanWord}>{card.german || "Kelime yok"}</Text>

            {cardImage ? (
                <Image source={cardImage} style={styles.image} resizeMode="contain" />
            ) : (
                <View style={styles.fallbackImage}>
                    <Text style={styles.fallbackText}>{card.german}</Text>
                </View>
            )}

            {showTranslation ? (
                <View style={styles.translationContainer}>
                    <Text style={styles.turkishWord}>{card.turkish || "Çeviri yok"}</Text>
                </View>
            ) : (
                <View style={styles.hintContainer}>
                    <Text style={styles.hintText}>Çeviri için dokun</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        margin: 20,
        padding: 30,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
        width: 300,
        height: 400,
    },
    germanWord: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#1f2937",
    },
    image: {
        width: 200,
        height: 200,
        marginVertical: 20,
        borderRadius: 10,
    },
    fallbackImage: {
        width: 200,
        height: 200,
        marginVertical: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6b7280",
    },
    fallbackText: {
        color: "white",
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
    },
    translationContainer: {
        backgroundColor: "#f0f9ff",
        padding: 15,
        borderRadius: 8,
        width: "100%",
        alignItems: "center",
    },
    turkishWord: {
        fontSize: 22,
        color: "#0369a1",
        fontWeight: "600",
    },
    hintContainer: {
        marginTop: 15,
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderStyle: "dashed",
    },
    hintText: {
        color: "#6b7280",
        fontSize: 14,
    },
    errorText: {
        color: "#ef4444",
        fontSize: 16,
    },
});

export default Flashcard;
