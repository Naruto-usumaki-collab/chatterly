// context.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const CONTEXT_KEY = 'termsAndConditions';

export const saveTerms = async (terms) => {
  try {
    await AsyncStorage.setItem(CONTEXT_KEY, terms);
  } catch (error) {
    console.error('Error saving terms:', error);
  }
};

export const getTerms = async () => {
  try {
    const terms = await AsyncStorage.getItem(CONTEXT_KEY);
    return terms || '';
  } catch (error) {
    console.error('Error retrieving terms:', error);
    return '';
  }
};

export const setTermsAccepted = async () => {
  try {
    await AsyncStorage.setItem('termsAccepted', 'true');
  } catch (error) {
    console.error('Error setting terms accepted:', error);
  }
};

export const isTermsAccepted = async () => {
  try {
    const accepted = await AsyncStorage.getItem('termsAccepted');
    return accepted === 'true';
  } catch (error) {
    console.error('Error checking if terms accepted:', error);
    return false;
  }
};