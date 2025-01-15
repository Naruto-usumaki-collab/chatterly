import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet
} from "react-native";
import { useRouter } from "expo-router";
import colors from "../../constants/color";

  const LanguageScreen = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const router = useRouter();

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

    const selectLanguage = (language) => {
      setSelectedLanguage(language);
      toggleModal();
    };

    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome to Chatterly</Text>
        <Text style={styles.subtitleText}>Choose your language to get started</Text>

        {/* Touchable box for language selection */}
        <TouchableOpacity onPress={toggleModal} style={styles.languageBox}>
          <Text style={styles.languageText}>{selectedLanguage || "Select Language"}</Text>
          <Text style={styles.arrowMark}>▼</Text>
        </TouchableOpacity>

        {/* Modal for language selection */}
        <Modal
          transparent={true}
          visible={isModalVisible}
          animationType="slide"
          onRequestClose={toggleModal}
        >
          <TouchableOpacity style={styles.modalOverlay} onPress={toggleModal}>
            <View style={styles.modalContent}>
              <FlatList
                data={["English", "தமிழ்"]}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => selectLanguage(item)}
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
        <TouchableOpacity
          onPress={() => router.push("/login/terms")}
          style={styles.nextButton}
        >
          <Text style={styles.nextButtonText}>→</Text>
        </TouchableOpacity>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkerPurple,
    padding: 20,
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 24,
    color: colors.lightBackground,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },
  subtitleText: {
    fontSize: 16,
    color: colors.lightPurple,
    textAlign: "center",
    marginBottom: 20,
  },
  languageBox: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: colors.darkPurple,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  languageText: {
    color: colors.lightBackground,
    fontSize: 16,
  },
  arrowMark: {
    color: colors.lightPurple,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: colors.mediumPurple,
    borderRadius: 10,
    padding: 15,
  },
  modalOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightPurple,
  },
  modalOptionText: {
    color: colors.lightBackground,
    fontSize: 16,
  },
  nextButton: {
    alignSelf: "flex-end",
    backgroundColor: colors.darkPurple,
    padding: 15,
    borderRadius: 10,
  },
  nextButtonText: {
    color: colors.lightBackground,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LanguageScreen;
