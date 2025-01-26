import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import { SchedulableTriggerInputTypes } from 'expo-notifications';  // Import the enum

export default function NotificationPage() {
  useEffect(() => {
    // Request permission to show notifications
    const requestPermission = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'You need to allow notifications to use this feature.');
      }
    };

    requestPermission();

    // Listen for notification responses
    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Notification clicked:', response);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const scheduleNotification = async () => {
    try {
      // Define the trigger type using the correct enum value
      const trigger: Notifications.TimeIntervalTriggerInput = {
        seconds: 5,  // Time interval in seconds
        repeats: false,  // Set this to false for one-time notification
        type: SchedulableTriggerInputTypes.TIME_INTERVAL,  // Correct enum value for timeInterval
      };

      console.log('Scheduling notification...');
      // Schedule the notification
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Chatterly",
          body: "This is our first nottification.",
        },
        trigger,  // Trigger for the notification
      });

      console.log('Notification scheduled!');
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  };

  const sendNotificationNow = async () => {
    try {
      console.log('Sending immediate notification...');
      // Send a notification immediately
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Immediate Notification",
          body: "This notification was sent immediately.",
        },
        trigger: null,  // Null to trigger immediately
      });

      console.log('Immediate notification sent!');
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification Page</Text>

      <Button title="Schedule Notification in 5 seconds" onPress={scheduleNotification} />
      <Button title="Send Immediate Notification" onPress={sendNotificationNow} />
    </View>
  );
}

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
    color: '#fff',
    marginBottom: 20,
  },
});
