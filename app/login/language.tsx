// app/language.tsx
import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Modal, FlatList, Alert } from "react-native";
import { NavigationProp } from "@react-navigation/native";  // Import for navigation
import { useRouter } from 'expo-router'

// Defining interface for Props and State
interface Props {
  navigation: NavigationProp<any>;
}

interface State {
  selectedLanguage: string;
  isModalVisible: boolean;
}

export default class Language extends Component<Props, State> {
  // Correctly initializing state in the constructor
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedLanguage: "",  // Tracks the selected language
      isModalVisible: false, // Controls visibility of the dropdown modal
    };
  }

  // Method to toggle the modal visibility for language selection
  toggleModal = () => {
    this.setState((prevState) => ({ isModalVisible: !prevState.isModalVisible }));
  };

  // Method to handle language selection
  selectLanguage = (language: string) => {
    this.setState({ selectedLanguage: language, isModalVisible: false });
  };

  // Navigate to the next screen or show error if no language is selected
  navigateToNext = () => {
    const { selectedLanguage } = this.state;
    if (!selectedLanguage) {
      Alert.alert("Error", "Please select a language.");
      return;
    }
    const { navigation } = this.props;
    navigation.navigate("Login"); // Navigate to Login screen (or Terms if needed)
  };

  render() {
    const { selectedLanguage, isModalVisible } = this.state;
    const router=useRouter();
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome to Chatterly</Text>
        <Text style={styles.subtitleText}>Choose your language to get started</Text>

        {/* Touchable box for language selection */}
        <TouchableOpacity onPress={this.toggleModal} style={styles.languageBox}>
          <Text style={styles.languageText}>{selectedLanguage || "Select Language"}</Text>
          <Text style={styles.arrowMark}>▼</Text> {/* Downward arrow for dropdown */}
        </TouchableOpacity>

        {/* Modal for language selection */}
        <Modal
          transparent={true}
          visible={isModalVisible}
          animationType="slide"
          onRequestClose={this.toggleModal}
        >
          <TouchableOpacity style={styles.modalOverlay} onPress={this.toggleModal}>
            <View style={styles.modalContent}>
              <FlatList
                data={["English", "தமிழ்"]}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => this.selectLanguage(item)}
                    style={styles.modalOption}
                  >
                    <Text style={styles.modalOptionText}>{item}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item}
              />
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Right-aligned arrow button to navigate */}
        <TouchableOpacity onPress={() => router.push('/login/terms')} style={styles.nextButton}>
           <Text style={styles.nextButtonText}>→</Text> {/* Right arrow mark */}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Ensure this is only declared once in the relevant styles
    alignItems: "center",
    backgroundColor: "#121212",
    padding: 20,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  subtitleText: {
    fontSize: 18,
    color: "#bbb",
    marginBottom: 30,
  },
  languageBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // This one should be the same as above. No duplicates.
    width: "60%",
    padding: 12,
    backgroundColor: "#333",
    borderRadius: 8,
    marginBottom: 20,
  },
  languageText: {
    fontSize: 18,
    color: "#fff",
  },
  arrowMark: {
    fontSize: 20,
    color: "#fff",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center", // Centered overlay
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
  },
  modalOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  modalOptionText: {
    fontSize: 18,
    color: "#333",
  },
  nextButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#007BFF",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 20,
  },
}); 
