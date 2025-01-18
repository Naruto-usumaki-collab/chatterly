import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Button, TouchableOpacity } from 'react-native';
import colors from '@/constants/color';

export default function PhoneNumber() {
  // Define state or any logic here if needed
  const handleotp = () => {
    console.log("Get OTP pressed");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor="#888"
        keyboardType="phone-pad"
        maxLength={10}
      />
      <TouchableOpacity
        style={styles.Otp}
        onPress={handleotp}>
        <Text style={styles.Textbox}>Get OTP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'bold',
    color: colors.secondary,
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: colors.accent,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontFamily:'regular',
    color:colors.text,
    backgroundColor: colors.background,
    fontSize: 16,
  },
  Otp:{
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderColor:'white',
    borderRadius: 8,
  },
  Textbox:{
    color: colors.text,
    fontSize: 18,
    fontFamily: 'bold',
  },
});
