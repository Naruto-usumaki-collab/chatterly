import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

const UsernameLogin = () => {
  return (
    <LinearGradient
      colors={["#4A0D66", "#C92A2A"]}
      start={{ x: 0.95, y: 0.05 }} // 135-degree angle
      end={{ x: 0.05, y: 0.95 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.appTitle}>Chatterly</Text>

        <BlurView intensity={50} style={styles.loginBox}>
          <Text style={styles.title}>Login</Text>

          <TextInput
            placeholder="Username, email or mobile number"
            placeholderTextColor="#ddd"
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#ddd"
            secureTextEntry
            style={styles.input}
          />

          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.buttonText}>L o g  i n</Text>
          </TouchableOpacity>

          <Text style={styles.signUpText}>
            Do you not have an account? <Text style={styles.boldText}>Sign in</Text>
          </Text>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </BlurView>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "85%",
    alignItems: "center",
  },
  appTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  loginBox: {
    width: "100%",
    padding: 20,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 15,
    letterSpacing: 1,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    paddingHorizontal: 15,
    color: "#fff",
    marginBottom: 15,
  },
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  signUpText: {
    color: "#bbb",
    textAlign: "center",
    marginTop: 15,
  },
  boldText: {
    color: "#fff",
    fontWeight: "bold",
  },
  forgotPassword: {
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
  },
});

export default UsernameLogin;
