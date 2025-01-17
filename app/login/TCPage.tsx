import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import colors from '@/constants/color';
import { saveTerms, getTerms, setTermsAccepted } from '../context'; // Import functions from context.js

export default function TCPage() {
  const [terms, setTerms] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Load terms from local storage or set default
    const loadTerms = async () => {
      const storedTerms = await getTerms();
      if (storedTerms) {
        setTerms(storedTerms);
      } else {
        const defaultTerms = 'Your full terms and conditions go here...';
        setTerms(defaultTerms);
        await saveTerms(defaultTerms); // Save default terms locally
      }
    };
    loadTerms();
  }, []);

  const handleContinue = async () => {
    try {
      await setTermsAccepted(); // Mark terms as accepted
      router.push('../login/terms'); // Redirect to Terms page
    } catch (error) {
      Alert.alert('Error', 'Unable to proceed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 20 }}>
        <Text style={styles.title}>Full Terms and Conditions</Text>
        <Text style={styles.text}>{terms}</Text>
      </ScrollView>
      <Button
        title="Continue"
        onPress={handleContinue}
        color={colors.secondary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    textAlign:'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
});
