import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import colors from '../../constants/color'; // Import colors

export default function TermsPage() {
  const [slideAnim] = useState(new Animated.Value(-500)); // Start off-screen to the left

  useEffect(() => {
    // Slide-in effect from left to right (no end effect)
    Animated.timing(slideAnim, {
      toValue: 0,  // Final position (on-screen)
      duration: 1000,  // Duration of the slide-in animation
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX: slideAnim }] }]}>
      <Text style={styles.title}>Terms and Conditions</Text>
      <Text style={styles.text}>
        Here are the terms and conditions of using Chatterly. Please read carefully.
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    color: colors.primary, // Use primary color from imported colors
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: colors.text, // Use text color from imported colors
    textAlign: 'center',
    marginBottom: 20,
  },
});
