import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import styles from "../Styles_Schema/Backup_Schema";

export default function Welcome() {
    const router = useRouter();

    const handleGetStarted = async () => {
        try {
            router.push("../login/terms");
        } catch (error) {}
    };

    const handleSkip = async () => {
        try {
            console.log("Skip button pressed");
            router.push("/homepage/message");
        } catch (error) {}
    };

    return (
        <>
            {/* Skip Button */}
            <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            <View style={styles.container}>
                <View style={styles.card}>
                    <Ionicons name="cloud-upload-outline" size={60} color="#4CAF50" />
                    <Text style={styles.title}>Backup your Data</Text>
                    <Text style={styles.description}>
                        If you have data in your mail ID, retrieve the data.
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
                        <Text style={styles.buttonText}>Start Backup</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}
