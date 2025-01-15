import { Stack } from "expo-router";
import {useFonts} from "expo-font";
export default function RootLayout() {

  useFonts({
    'regular':require('../assets/fonts/Raleway-Regular.ttf'),
    'light':require('../assets/fonts/Raleway-LightItalic.ttf'),
    'bold':require('../assets/fonts/Raleway-Bold.ttf'),



  })

  return (
    <Stack
      screenOptions={{
        headerShown: false, // Ensures headers are not displayed
      }}
    />
  );
}
