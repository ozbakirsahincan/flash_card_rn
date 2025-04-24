import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

export default function AddCardScreen() {
    const [word, setWord] = useState('');

    const handleGenerate = () => {
        console.log('Gönderilecek kelime:', word);
        // Buraya backend POST /tts/save ve POST /image/save istekleri gelecek
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Yeni kelime gir:</Text>
            <TextInput
                value={word}
                onChangeText={setWord}
                placeholder="Örn: Hund"
                style={styles.input}
            />
            <Button title="Ses ve görsel oluştur" onPress={handleGenerate} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
    },
});
