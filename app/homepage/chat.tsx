// chat.tsx
import React from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { sampleChatHistory } from "./sampleconversation";

export default function Chat() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const chatId = params.id as string;
  
  // Find the conversation that matches the passed id
  const chat = sampleChatHistory.find((item) => item.id === chatId);

  if (!chat) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "#fff", alignSelf: "center", marginTop: 20 }}>
          Chat not found
        </Text>
      </View>
    );
  }

  const renderMessageItem = ({ item }: { item: any }) => {
    const isSentByUser = item.sender === "You";
    return (
      <View style={[styles.messageContainer, isSentByUser ? styles.messageRight : styles.messageLeft]}>
        <Text style={styles.messageSender}>{item.sender}</Text>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.messageTime}>{item.time}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={30} color="#1E90FF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{chat.name}</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Chat Conversation */}
      <FlatList
        data={chat.conversation}
        keyExtractor={(item) => item.id}
        renderItem={renderMessageItem}
        contentContainerStyle={styles.conversationContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#000", 
  },
  header: {
    backgroundColor: "#000",
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: "bold", 
    color: "#1E90FF" 
  },
  conversationContainer: {
    padding: 15,
  },
  messageContainer: {
    marginVertical: 8,
    padding: 10,
    borderRadius: 8,
    maxWidth: "80%",
  },
  messageLeft: {
    alignSelf: "flex-start",
    backgroundColor: "#1E90FF20",
  },
  messageRight: {
    alignSelf: "flex-end",
    backgroundColor: "#1E90FF50",
  },
  messageSender: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1E90FF",
    marginBottom: 4,
  },
  messageText: {
    fontSize: 16,
    color: "#fff",
  },
  messageTime: {
    fontSize: 10,
    color: "#888",
    alignSelf: "flex-end",
    marginTop: 4,
  },
});
