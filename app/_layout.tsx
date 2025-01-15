import React from 'react';
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { Appearance, View, StyleSheet } from "react-native";

// Define dark theme colors
const darkColors = {
  background: "#121212", // Default background color
  text: "#EAEAEA", // Light text for dark background
  primary: "#BB86FC", // Purple for primary elements
  accent: "#03DAC6", // Teal for accent elements
};

export default function RootLayout() {

   // Detect current theme (light or dark)
  const colorScheme = Appearance.getColorScheme();
  
  // Set the theme based on system preference or dark mode
  const isDarkMode = colorScheme === 'dark';

  useFonts({
      'regular':require('../assets/fonts/Raleway-Regular.ttf'),
      'light':require('../assets/fonts/Raleway-LightItalic.ttf'),
      'bold':require('../assets/fonts/Raleway-Bold.ttf'),

  })

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? darkColors.background : '#ffffff' }]}>
      {/* Change the status bar color and style */}
      <StatusBar 
        style={isDarkMode ? "light" : "dark"}  // Adjust text color based on dark/light mode
        backgroundColor={isDarkMode ? darkColors.background : "#ffffff"} // Set background color based on dark/light mode
      />

      {/* Stack navigation without headers */}
      <Stack
        screenOptions={{
          headerShown: false, // Ensures headers are not displayed
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  // Ensures it fills the whole screen
  },
});
