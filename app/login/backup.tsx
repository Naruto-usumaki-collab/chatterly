import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Icon library, ensure you have expo/vector-icons installed
import { useRouter } from "expo-router";

export default function Welcome() {
    const router = useRouter();

    const handleGetStarted = async () => {
        try {
            router.push('../login/terms');
        } catch (error) {}
    };

    const handleSkip = async () => {
        try {
            console.log('Skip button pressed');
            router.push('/homepage/message');
        } catch (error) {}
    };

    return (
        <>
            {/* Skip Button with TouchableOpacity */}
            <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            <View style={styles.container}>
                <View style={styles.card}>
                <Ionicons name="cloud-upload-outline" size={60} color="#4CAF50" />
                    <Text style={styles.title}>Backup your Data</Text>
                    <Text style={styles.description}>
                    If your have data in your mail id to retrive the data.
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
                        <Text style={styles.buttonText}> Start Backup</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E8F5E9",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        width: "90%",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginVertical: 10,
    },
    description: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#4CAF50",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },

    // Skip Text Styling
    skipButton: {
        position: 'absolute',
        top: 20, // Make sure this places it below any top bar
        right: 10,
        zIndex: 1,  // Ensure the skip button stays above other content
    },
    skipText: {
      fontSize: 18,
      color: 'blue',
      textAlign: 'right',
      padding: 20,
    },
});
