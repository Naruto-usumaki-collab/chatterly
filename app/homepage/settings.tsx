import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import styles from "../Styles_Schema/Settings_Schema";

export default function Settings() {
  const router = useRouter()

  const settingsOptions = [
    { icon: "person-outline", title: "Account" },
    { icon: "notifications-outline", title: "Notifications" },
    { icon: "lock-closed-outline", title: "Privacy" },
    { icon: "color-palette-outline", title: "Appearance" },
    { icon: "chatbubble-outline", title: "Chats" },
    { icon: "help-circle-outline", title: "Help" },
  ]

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#E0E0E0" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      {settingsOptions.map((option, index) => (
        <TouchableOpacity key={index} style={styles.optionItem}>
          <Ionicons name={option.icon as any} size={24} color="#E0E0E0" style={styles.optionIcon} />
          <Text style={styles.optionTitle}>{option.title}</Text>
          <Ionicons name="chevron-forward" size={24} color="#888" />
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

