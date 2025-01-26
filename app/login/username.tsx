import colors from '@/constants/color';
import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
  ScrollView,
  RefreshControl,
} from 'react-native';

export default function PaymentPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    if (option === 'Low') setAmount(1);
    if (option === 'Normal') setAmount(100);
    if (option === 'Advance') setAmount(200);
  };

  const handlePayment = () => {
    if (!selectedOption) {
      Alert.alert('Error', 'Please select an amount option.');
      return;
    }

    const upiUrl = `upi://pay?pa=mabirami533@oksbi&pn=Shiva%20Siva&am=${amount}&cu=INR`;
    Linking.openURL(upiUrl)
      .then(() => console.log('Redirected to GPay'))
      .catch(() => {
        Alert.alert(
          'Error',
          'Unable to open Google Pay. Please ensure you have a UPI app installed.'
        );
      });
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate a network request or refresh logic
    setTimeout(() => {
      setSelectedOption(null);
      setAmount(0);
      setRefreshing(false);
    }, 1000); // Refresh complete after 1 second
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.title}>Payment Page</Text>
      <Text style={styles.subtitle}>Select your plan:</Text>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {['Low', 'Normal', 'Advance'].map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              selectedOption === option && styles.selectedOptionButton,
            ]}
            onPress={() => handleOptionSelect(option)}
          >
            <Text style={styles.optionText}>
              {option} {option === 'Low' ? '(₹10)' : option === 'Normal' ? '(₹100)' : '(₹200)'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Payment */}
      <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
        <Text style={styles.paymentButtonText}>Proceed to Pay with GPay</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '30%',
  },
  selectedOptionButton: {
    backgroundColor: colors.primary,
  },
  optionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  paymentButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
