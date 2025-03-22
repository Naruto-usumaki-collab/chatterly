import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // Explicitly define the state type
  const router = useRouter();

  useEffect(() => {
    // Simulate a login check
    setTimeout(() => {
      const userLoggedIn = false; // Change this to true to simulate a logged-in user
      setIsLoggedIn(userLoggedIn);

      if (userLoggedIn) {
        router.replace("../chatting");
      } else {
        router.replace("/login/username");
      }
    }, 2000); // Simulate a delay for loading
  }, []);

  if (isLoggedIn === null) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={Colors.secondary} />
        <Text>Loading...</Text>
      </View>
    );
  }

  return null; // This will not be shown as the navigation will replace this screen
}
