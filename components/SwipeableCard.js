import React from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    runOnJS,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Flashcard from './Flashcard';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.3;

const SwipeableCard = ({ card, onSwipeLeft, onSwipeRight }) => {
    // Animation values
    const translateX = useSharedValue(0);
    const rotate = useSharedValue(0);

    // Handle pan gesture
    const onGestureEvent = (event) => {
        translateX.value = event.nativeEvent.translationX;
        // Calculate rotation based on swipe distance (max 20 degrees)
        rotate.value = (event.nativeEvent.translationX / width) * 20;
    };

    // Handle end of gesture
    const onGestureEnd = (event) => {
        const { translationX } = event.nativeEvent;

        if (translationX > SWIPE_THRESHOLD) {
            // Swiped right - go to previous card
            finishSwipeAnimation(width, onSwipeRight);
        } else if (translationX < -SWIPE_THRESHOLD) {
            // Swiped left - go to next card
            finishSwipeAnimation(-width, onSwipeLeft);
        } else {
            // Not enough swipe - return to center
            resetCardPosition();
        }
    };

    // Complete the swipe animation
    const finishSwipeAnimation = (destination, callback) => {
        translateX.value = withTiming(destination, { duration: 300 }, () => {
            runOnJS(executeCallback)(callback);
            runOnJS(resetCardPosition)();
        });
    };

    // Helper to safely execute callbacks
    const executeCallback = (callback) => {
        if (typeof callback === 'function') {
            callback();
        }
    };

    // Reset card position
    const resetCardPosition = () => {
        translateX.value = withTiming(0, { duration: 300 });
        rotate.value = withTiming(0, { duration: 300 });
    };

    // Card animation styles
    const cardStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { rotate: `${rotate.value}deg` }
            ]
        };
    });

    // Navigation buttons
    const handlePrev = () => {
        if (onSwipeRight) {
            finishSwipeAnimation(width, onSwipeRight);
        }
    };

    const handleNext = () => {
        if (onSwipeLeft) {
            finishSwipeAnimation(-width, onSwipeLeft);
        }
    };

    return (
        <View style={styles.container}>
            <PanGestureHandler
                onGestureEvent={onGestureEvent}
                onEnded={onGestureEnd}
            >
                <Animated.View style={[styles.cardContainer, cardStyle]}>
                    <Flashcard card={card} />
                </Animated.View>
            </PanGestureHandler>

            {/* Navigation buttons for easier use */}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={handlePrev}>
                    <Text style={styles.buttonText}>← Önceki</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleNext}>
                    <Text style={styles.buttonText}>Sonraki →</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 40,
        width: '80%',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#4b5563',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    }
});

export default SwipeableCard;
