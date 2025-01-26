import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Country() {
  const router = useRouter();

  const countries = [
    { name: 'India', code: '+91' },
    { name: 'United States', code: '+1' },
    { name: 'United Kingdom', code: '+44' },
    { name: 'Australia', code: '+61' },
  ];

  const selectCountry = (code: string) => {
    router.replace({ pathname: '../login/phoneNumber', params: { countryCode: code } });
  };

  return (
    <View style={styles.container}>
      {countries.map((country) => (
        <TouchableOpacity
          key={country.code}
          style={styles.country}
          onPress={() => selectCountry(country.code)}
        >
          <Text style={styles.text}>{`${country.name} (${country.code})`}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  country: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
});
