import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { flashcards } from './data/flashcards';
import SwipeableCard from './components/SwipeableCard';

export default function App() {
    const [index, setIndex] = useState(0);

    const handleNext = () => {
        if (index < flashcards.length - 1) {
            setIndex(index + 1);
        } else {
            // Loop back to the first card when reaching the end
            setIndex(0);
        }
    };

    const handlePrev = () => {
        if (index > 0) {
            setIndex(index - 1);
        } else {
            // Loop to the last card when at the beginning
            setIndex(flashcards.length - 1);
        }
    };

    return (
        <GestureHandlerRootView style={styles.root}>
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
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
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
