import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import colors from '../../constants/color';

export default function WelcomePage() {
  const router = useRouter();
  const [slideAnim] = useState(new Animated.Value(-500)); // Start position of the sliding animation (off-screen)

  useEffect(() => {
    // Animate the slide-in effect when the page is mounted
    Animated.timing(slideAnim, {
      toValue: 0,  // End position (fully on-screen)
      duration: 1000,  // Duration of the animation (in ms)
      useNativeDriver: true,
    }).start();
    
    // Reset animation when navigating back
    return () => {
      slideAnim.setValue(-500); // Reset the animation when the page unmounts
    };
  }, [slideAnim]);

  const handleGetStarted = () => {
    // Slide out the screen before navigating
    Animated.timing(slideAnim, {
      toValue: 500,  // Move off-screen (right side)
      duration: 500,  // Duration of the animation
      useNativeDriver: true,
    }).start(() => {
      router.push('/login/terms'); // Navigate to the Terms page after the animation ends
    });
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slideContainer, { transform: [{ translateX: slideAnim }] }]}>
        <Text style={styles.title}>Welcome to Chatterly</Text>
        <Text style={styles.subtitle}>
          Hey guys, welcome to Chatterly App. This is our first app, so please support us!
          We’re sure you'll enjoy the app with its exciting features for fun and connection. Enjoy exploring the app!
        </Text>
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={handleGetStarted} // Trigger the navigation with animation
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  slideContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    color: colors.text,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text,
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 22,
  },
  getStartedButton: {
    backgroundColor: colors.accent,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  getStartedText: {
    color: colors.background,
    fontSize: 18,
    fontWeight: "bold",
  },
});
