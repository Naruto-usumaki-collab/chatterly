import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

const BackupPage: React.FC = () => {
  const [isBackingUp, setIsBackingUp] = useState<boolean>(false);
  const [isSkipped, setIsSkipped] = useState<boolean>(false);

  // Simulated backup process
  const handleBackup = async () => {
    setIsBackingUp(true);
    setIsSkipped(false);

    try {
      // Simulate a network request or backup process
      await new Promise((resolve) => setTimeout(resolve, 3000));
      Alert.alert("Success", "Backup completed successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to complete the backup process.");
    } finally {
      setIsBackingUp(false);
    }
  };

  const handleSkip = () => {
    setIsSkipped(true);
    Alert.alert("Skipped", "You have chosen to skip the backup process.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Backup Your Data</Text>
      {!isSkipped ? (
        isBackingUp ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#007BFF" />
            <Text style={styles.message}>Backing up your data...</Text>
          </View>
        ) : (
          <View>
            <Text style={styles.message}>
              Would you like to create a backup of your app data now?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleBackup}>
                <Text style={styles.buttonText}>Start Backup</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.skipButton]}
                onPress={handleSkip}
              >
                <Text style={styles.buttonText}>Skip</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      ) : (
        <Text style={styles.message}>
          Backup process was skipped. You can start it later from settings.
        </Text>
      )}
    </View>
  );
};

export default BackupPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  message: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    margin: 5,
  },
  skipButton: {
    backgroundColor: "#FF6347",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  loaderContainer: {
    alignItems: "center",
  },
});
