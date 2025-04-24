import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import SwipeableCard from '../components/SwipeableCard';
import { flashcards } from '../data/flashcards';

export default function HomeScreen() {
    const [index, setIndex] = useState(0);

    const handleNext = () => {
        setIndex((prev) => (prev + 1) % flashcards.length);
    };

    const handlePrev = () => {
        setIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Almanca Kartları</Text>
                <Text style={styles.counter}>{index + 1} / {flashcards.length}</Text>
            </View>

            <SwipeableCard
                card={flashcards[index]}
                onSwipeLeft={handleNext}
                onSwipeRight={handlePrev}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    counter: {
        fontSize: 16,
        color: '#4b5563',
        fontWeight: '500',
    }
});
