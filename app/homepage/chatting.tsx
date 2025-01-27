import React from "react";
import { StyleSheet, View, FlatList, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ChatItem {
  id: string;
  name: string;
  message: string;
  time: string;
  image: any; // This is kept as 'any' for now
}

const chats: ChatItem[] = [
  {
    id: "1",
    name: "Bala Anna",
    message: "Apram full slow mo podava illa speed ra...",
    time: "6:01 PM",
    image: require("../../../../assets/images/avatar1.png"), // Corrected path to images folder
  },
  {
    id: "2",
    name: "BALTHAA BOYS 🔥 👑",
    message: "~ Fasil: This message was deleted",
    time: "5:51 PM",
    image: require("../../../../assets/images/avatar2.png"), // Corrected path
  },
  {
    id: "3",
    name: "Maha",
    message: "Hmm",
    time: "3:32 PM",
    image: require("../../../../assets/images/avatar3.png"), // Corrected path
  },
  {
    id: "4",
    name: "Alan Machan",
    message: "Reacted 😂 to a link",
    time: "3:31 PM",
    image: { uri: "http://example.com/icon.png" }, // Temporarily test with an online image
  },
];

export default function ChatList() {
  const renderItem = ({ item }: { item: ChatItem }) => (
    <TouchableOpacity style={styles.chatItem}>
      <Image source={item.image} style={styles.avatar} />
      <View style={styles.chatDetails}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.chatMessage} numberOfLines={1}>
          {item.message}
        </Text>
      </View>
      <Text style={styles.chatTime}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>WhatsApp</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="camera-outline" size={24} color="#fff" style={styles.icon} />
          <Ionicons name="search-outline" size={24} color="#fff" style={styles.icon} />
          <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={20} color="#888" />
        <Text style={styles.searchText}>Search or start new chat</Text>
      </View>

      {/* Chat List */}
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.chatList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111B21",
  },
  header: {
    backgroundColor: "#075E54",
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 20,
  },
  searchBar: {
    backgroundColor: "#202C33",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 20,
    marginVertical: 10,
  },
  searchText: {
    color: "#888",
    marginLeft: 10,
  },
  chatList: {
    paddingBottom: 20,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#2A3942",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  chatDetails: {
    flex: 1,
  },
  chatName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  chatMessage: {
    color: "#8899A6",
    fontSize: 14,
    marginTop: 5,
  },
  chatTime: {
    color: "#8899A6",
    fontSize: 12,
  },
});
