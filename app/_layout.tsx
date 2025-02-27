import React from 'react';
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { Appearance, View, StyleSheet, Text } from "react-native";
import FontStyles from "../constants/fonts"; 

// Define dark theme colors
const darkColors = {
  background: "#121212",
  text: "#EAEAEA",
  primary: "#BB86FC",
  accent: "#03DAC6",
};

export default function RootLayout() {
  // Detect current theme (light or dark)
  const colorScheme = Appearance.getColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [fontsLoaded] = useFonts({
    'Raleway-Regular': require('../assets/fonts/Raleway-Regular.ttf'),
    'Raleway-LightItalic': require('../assets/fonts/Raleway-LightItalic.ttf'),
    'Raleway-Bold': require('../assets/fonts/Raleway-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // or a loading indicator
  }

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? darkColors.background : '#ffffff' }]}>
      <StatusBar 
        style={isDarkMode ? "light" : "dark"}
        backgroundColor={isDarkMode ? darkColors.background : "#ffffff"}
      />
      <Text style={{ fontFamily: FontStyles.regular, fontSize: 18, color: isDarkMode ? darkColors.text : "#000" }}>
        This text uses the regular font.
      </Text>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
