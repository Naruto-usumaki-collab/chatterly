import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Animated, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import colors from '@/constants/color';

export default function TermsPage() {
  const [agree, setAgree] = useState(false);
  const [slideAnim] = useState(new Animated.Value(500)); // Start off-screen to the right for reverse animation
  const router = useRouter();

  useEffect(() => {
    // Animation for entering the Terms Page: Smooth slide from left to right
    Animated.timing(slideAnim, {
      toValue: 0, // Move to the center of the screen
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Check if the user already accepted the terms
    const checkAgreement = async () => {
      const agreement = await AsyncStorage.getItem('termsAccepted');
      if (agreement === 'true') setAgree(true);
    };
    checkAgreement();

    // Handle the back button press on Android
    const backAction = () => {
      handleBackAnimation(); // Trigger reverse animation on back press
      return true; // Prevent default back action
    };

    // Add back button listener
    BackHandler.addEventListener('hardwareBackPress', backAction);

    // Clean up the listener on component unmount
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  const handleBackAnimation = () => {
    // On back press, animate slide-out from right to left (reverse animation)
    Animated.timing(slideAnim, {
      toValue: 500, // Move off-screen to the right
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      // After animation, navigate to the Welcome Page
      router.push('/login/welcomePage');
    });
  };

  const handleContinue = () => {
    if (agree) {
      // If terms are accepted, navigate to the Phone Number page
      router.push('../../login/phoneNumber');
    }
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX: slideAnim }] }]}>
      <Text style={styles.title}>Terms and Conditions</Text>
      <Text style={styles.text}>
        If you want to continue using the Chatterly app, you must accept the Terms and Conditions.
        Please read them carefully before proceeding.
      </Text>
      <Text
        style={styles.link}
        onPress={() => router.push('/login/TCPage')} // Navigate to TCPage
      >
        Terms and Conditions
      </Text>
      {agree && (
        <Button title="Agree and Continue" onPress={handleContinue} color={colors.secondary} />
      )}
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    
  },
  title: {
    fontSize: 24,
    color:colors.secondary,
    fontFamily: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: colors.text,
    fontFamily:'regular',
    textAlign: 'center',
    marginBottom: 20,
  },
  link: {
    fontSize: 16,
    color: colors.accent,
    fontFamily:'light',
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
});
