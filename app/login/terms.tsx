import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Animated, BackHandler, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import colors from '@/constants/color';
import { Checkbox } from 'react-native-paper';

export default function TermsPage() {
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState(false); // To track checkbox error state
  const [slideAnim] = useState(new Animated.Value(-500)); // Start off-screen to the left
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
    // On back press, animate slide-out to the right
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
      router.push('../login/phoneNumber');
      setError(false); // Reset error
    } else {
      setError(true); // Show error if checkbox is not checked
    }
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX: slideAnim }] }]}>
      <Text style={styles.title}>Terms and Conditions</Text>
      <Text style={styles.text}>
        If you want to continue using the Chatterly app, you must accept the{' '}
        <Text
          style={styles.link}
          onPress={() => router.push('/login/TCPage')} // Navigate to TCPage when pressed
        >
          Terms and Conditions
        </Text>
        . Please read them carefully before proceeding.
      </Text>
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={agree ? 'checked' : 'unchecked'}
          onPress={() => setAgree(!agree)}
          color={colors.secondary}
        />
        <Text style={styles.checkboxText}>I agree to the Terms and Conditions</Text>
      </View>
      {error && <Text style={styles.errorText}>Please tick the checkbox to proceed</Text>}
      <TouchableOpacity
      style={styles.checkbox}
      onPress={handleContinue}>
      <Text style={styles.boxText}>Agree and Continue</Text>
      </TouchableOpacity>

    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: colors.secondary,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  link: {
    color: colors.text,
    textDecorationLine: 'underline',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  checkbox:{
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  boxText:{
    color: colors.text,
    fontSize: 18,
    fontFamily: 'bold',
  },
});
