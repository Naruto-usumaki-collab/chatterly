import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  BackHandler,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import colors from '@/constants/color';

const countryData = [
  { name: 'India', code: '+91', minLength: 10, maxLength: 10 },
  { name: 'United States', code: '+1', minLength: 10, maxLength: 10 },
  { name: 'United Kingdom', code: '+44', minLength: 10, maxLength: 10 },
  { name: 'Australia', code: '+61', minLength: 9, maxLength: 9 },
];

export default function PhoneNumber() {
  const router = useRouter();
  const params = useLocalSearchParams<{ countryCode?: string }>();

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [countryCode, setCountryCode] = useState<string>(params.countryCode?.replace('+', '') || '91');
  const [country, setCountry] = useState<string>('Country');
  const [focusedInput, setFocusedInput] = useState<string | null>(null); // Track the focused input

  useEffect(() => {
    // Handle back button press
    const backAction = () => {
      router.back(); // Navigate to the previous page
      return true; // Prevent default back button behavior
    };

    // Add event listener for hardware back button
    BackHandler.addEventListener('hardwareBackPress', backAction);

    // Cleanup event listener on component unmount
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  useEffect(() => {
    if (countryCode) {
      const matchedCountry = countryData.find((c) => c.code === `+${countryCode}`);
      setCountry(matchedCountry ? matchedCountry.name : 'Invalid code');
    }
  }, [countryCode]);

  const handleCountryChange = (input: string) => {
    const numericCode = input.replace(/[^0-9]/g, '');
    setCountryCode(numericCode);

    if (!numericCode) {
      setCountry('Country');
      return;
    }

    const matchedCountry = countryData.find((c) => c.code === `+${numericCode}`);
    setCountry(matchedCountry ? matchedCountry.name : 'Invalid code');
  };

  const validatePhoneNumber = () => {
    const matchedCountry = countryData.find((c) => c.code === `+${countryCode}`);
    if (
      !matchedCountry ||
      phoneNumber.length < matchedCountry.minLength ||
      phoneNumber.length > matchedCountry.maxLength ||
      !/^[0-9]+$/.test(phoneNumber)
    ) {
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (!validatePhoneNumber()) {
      setCountry('Invalid phone number');
      return;
    }
    router.push('../login/otp');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Enter your phone number</Text>
        <Text style={styles.subtitle}>
          Chatterly will need to verify your phone number. Carrier charges may apply.
        </Text>

        {/* Country Selector */}
        <View
          style={[
            styles.countrySelector,
            focusedInput === 'countryCode' && styles.focusedInput, // Highlight on focus
          ]}
        >
          <TextInput
            style={styles.countryCodeInput}
            value={`+${countryCode}`}
            onChangeText={handleCountryChange}
            placeholder="+91"
            keyboardType="phone-pad"
            maxLength={4}
            onFocus={() => setFocusedInput('countryCode')}
            onBlur={() => setFocusedInput(null)} // Remove highlight on blur
          />
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => router.push('../login/country')}
          >
            <Text style={styles.countryName}>{country}</Text>
          </TouchableOpacity>
        </View>

        {/* Phone Number Input */}
        <View
          style={[
            styles.inputContainer,
            focusedInput === 'phoneNumber' && styles.focusedInput, // Highlight on focus
          ]}
        >
          <TextInput
            style={styles.phoneNumberInput}
            placeholder="Phone number"
            placeholderTextColor="#888"
            keyboardType="number-pad"
            maxLength={10}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            onFocus={() => setFocusedInput('phoneNumber')}
            onBlur={() => setFocusedInput(null)} // Remove highlight on blur
          />
        </View>

        {/* Next Button */}
        <TouchableOpacity
          style={[
            styles.nextButton,
            phoneNumber.length >= 10 ? styles.buttonEnabled : styles.buttonDisabled,
          ]}
          onPress={handleNext}
          disabled={phoneNumber.length < 10}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: colors.text,
    fontFamily: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#bbb',
    fontFamily: 'regular',
    textAlign: 'center',
    marginBottom: 30,
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  focusedInput: {
    borderColor: colors.primary, // Highlight color when input is focused
  },
  countryCodeInput: {
    fontSize: 16,
    color: '#fff',
    marginRight: 10,
    flex: 1,
  },
  dropdown: {
    flex: 2,
  },
  countryName: {
    fontSize: 16,
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 5,
    padding: 10,
  },
  phoneNumberInput: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  nextButton: {
    marginTop: 30,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonEnabled: {
    backgroundColor: colors.primary,
  },
  buttonDisabled: {
    backgroundColor: '#555',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
