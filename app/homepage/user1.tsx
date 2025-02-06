import React, { useState } from "react";
import { StyleSheet, View, FlatList, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ImageSourcePropType } from "react-native";

export default function Message() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProfile, setSelectedProfile] = useState<ImageSourcePropType | null>(null);
  const router = useRouter();

  interface ChatItem {
    id: string;
    name: string;
    message: string;
    time: string;
    image: ImageSourcePropType;
  }

  const defaultDp: ImageSourcePropType = require("../../assets/images/images/default_dp.png");

  const chats: ChatItem[] = [
    { id: "1", name: "Bala Anna", message: "Apram full slow mo podava illa speed ra...", time: "6:01 PM", image: defaultDp },
    { id: "2", name: "BALTHAA BOYS🔥 👑", message: "~ Fasil: This message was deleted", time: "5:51 PM", image: defaultDp },
    { id: "3", name: "Riya", message: "Hmm", time: "3:32 PM", image: defaultDp },
  ];

  const filteredChats = chats.filter((chat) => chat.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const renderChatItem = ({ item }: { item: ChatItem }) => (
    <View style={styles.chatItem}>
      <TouchableOpacity onPress={() => setSelectedProfile(item.image)}>
        <Image source={item.image} style={styles.avatar} />
      </TouchableOpacity>
      <View style={styles.chatDetails}>
        <TouchableOpacity
          onPress={() => router.push(`/homepage/chatting/${item.id}`)} // Updated routing to dynamic chat page
        >
          <Text style={styles.chatName}>{item.name}</Text>
        </TouchableOpacity>
        <Text style={styles.chatMessage}>{item.message}</Text>
      </View>
      <Text style={styles.chatTime}>{item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="search-outline" size={24} color="#1E90FF" style={styles.icon} />
          <Ionicons name="settings-outline" size={24} color="#1E90FF" style={styles.icon} />
        </View>
      </View>
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={20} color="#1E90FF" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name"
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      {selectedProfile && (
        <View style={styles.profileModal}>
          <TouchableOpacity onPress={() => setSelectedProfile(null)} style={styles.backButton}>
            <Ionicons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
          <Image source={selectedProfile} style={styles.profileImage} />
        </View>
      )}
      <FlatList data={filteredChats} renderItem={renderChatItem} keyExtractor={(item) => item.id} style={styles.chatList} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black", // Black background for the app
  },
  header: {
    backgroundColor: "black", // Header stays black
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10, // Slightly pushed down to avoid text hiding
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E90FF", // Blue text color
  },
  headerIcons: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 15, // Added missing style
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333", // Dark grey background for search
    margin: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
    color: "#fff", // White text for search input
  },
  chatList: {
    flex: 1,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#555", // Dark line between chats
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  chatDetails: {
    flex: 1,
    marginLeft: 10,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E90FF", // Blue text for name
  },
  chatMessage: {
    fontSize: 14,
    color: "#fff", // White text for the message
  },
  chatTime: {
    fontSize: 12,
    color: "#888", // Light grey text for time
  },
  profileModal: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.8)", // Black transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Slight background for the back arrow for visibility
    padding: 10,
    borderRadius: 20,
  },
});
