import { LinearGradient } from 'expo-linear-gradient';
import colors from '@/constants/color';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Alert } from 'react-native';

const OtpScreen = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleInputChange = (text: string) => {
    setOtp(text);
  };
  
  const handleSubmit = () => {
    if (!/^[0-9]{6}$/.test(otp)) {
      setError('Please enter a valid 6-digit OTP.');
      return;
    }

    // Navigate to the next page on valid OTP
    router.push('/login/nickname');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter the OTP</Text>

      <TextInput
        style={[styles.input, error && styles.errorInput]}
        placeholder="Enter 6-digit OTP"
        placeholderTextColor={colors.secondary}
        keyboardType="numeric"
        maxLength={6}
        value={otp}
        onChangeText={handleInputChange}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <LinearGradient colors={["#4CAF50", "#8BC34A"]} style={styles.submitButton}>
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    color: colors.primary,
    textAlign: 'center',
    fontFamily: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 18,
    color: colors.text,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  submitButton: {
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginBottom: 20,
    elevation: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'bold',
  },
});

export default OtpScreen;
