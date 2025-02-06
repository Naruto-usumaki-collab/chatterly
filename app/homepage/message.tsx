import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { sampleChatHistory, ChatHistoryItem } from "./sampleconversation";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { PinchGestureHandler, State, GestureHandlerRootView } from "react-native-gesture-handler";

const defaultDp: any = require("../../assets/images/images/default_dp.png");

export default function Messages() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [chats, setChats] = useState<ChatHistoryItem[]>(sampleChatHistory);
  const [isZoomed, setIsZoomed] = useState(false);

  const scale = useSharedValue(1);

  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  useEffect(() => {
    loadProfilePictures();
  }, []);

  const loadProfilePictures = async () => {
    try {
      const savedPictures = await AsyncStorage.getItem("profilePictures");
      if (savedPictures) {
        const picturesObject = JSON.parse(savedPictures);
        const updatedChats = chats.map((chat) => ({
          ...chat,
          image: picturesObject[chat.id] ? { uri: picturesObject[chat.id] } : chat.image,
        }));
        setChats(updatedChats);
      }
    } catch (error) {
      console.error("Error loading profile pictures:", error);
    }
  };

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission needed", "Please grant permission to access your camera.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      Alert.alert("Photo Captured", "Your photo has been captured successfully!");
    }
  };

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderChatHistoryItem = useCallback(
    ({ item }: { item: ChatHistoryItem }) => (
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() => router.push({ pathname: "/homepage/chat", params: { id: item.id } })}
      >
        <TouchableOpacity onPress={() => setSelectedProfile(item.image)}>
          <Image source={item.image || defaultDp} style={styles.avatar} />
        </TouchableOpacity>
        <View style={styles.chatDetails}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatName}>{item.name}</Text>
            <Text style={styles.chatTime}>{item.time}</Text>
          </View>
          <View style={styles.chatFooter}>
            <Text style={styles.lastMessage} numberOfLines={1} ellipsizeMode="tail">
              {item.lastMessage}
            </Text>
            {item.unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadCount}>{item.unreadCount}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    ),
    [router]
  );

  const onPinchGestureEvent = useCallback((event: any) => {
    scale.value = event.nativeEvent.scale;
  }, [scale]);

  const onPinchHandlerStateChange = useCallback(
    (event: any) => {
      if (event.nativeEvent.oldState === State.ACTIVE) {
        scale.value = withSpring(1);
        setIsZoomed(!isZoomed);
      }
    },
    [scale, setIsZoomed, isZoomed]
  );

  return (
    // Wrap your component tree with GestureHandlerRootView
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#1E90FF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Chats</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={handleTakePhoto}>
              <Ionicons name="camera-outline" size={24} color="#1E90FF" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/homepage/settings")}>
              <Ionicons name="settings-outline" size={24} color="#1E90FF" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#888" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name"
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <FlatList
          data={filteredChats}
          keyExtractor={(item) => item.id}
          renderItem={renderChatHistoryItem}
          contentContainerStyle={styles.conversationContainer}
        />
        <Modal
          visible={!!selectedProfile}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setSelectedProfile(null)}
        >
          <View style={styles.profileModal}>
            <TouchableOpacity onPress={() => setSelectedProfile(null)} style={styles.backButton}>
              <Ionicons name="arrow-back" size={30} color="white" />
            </TouchableOpacity>
            <PinchGestureHandler
              onGestureEvent={onPinchGestureEvent}
              onHandlerStateChange={onPinchHandlerStateChange}
            >
              <Animated.Image
                source={selectedProfile || defaultDp}
                style={[styles.profileImage, animatedImageStyle]}
                resizeMode="contain"
              />
            </PinchGestureHandler>
          </View>
        </Modal>
      </SafeAreaView>
    </GestureHandlerRootView>
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
  headerIcons: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2C2C2C",
    margin: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
  },
  searchInput: {
    flex: 1,
    height: 50,
    paddingLeft: 10,
    color: "#E0E0E0",
    fontSize: 16,
  },
  conversationContainer: {
    padding: 15,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1E90FF20",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  chatDetails: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chatName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  chatTime: {
    fontSize: 12,
    color: "#888",
  },
  chatFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: "#ccc",
    flex: 1,
  },
  unreadBadge: {
    backgroundColor: "#1E90FF",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 10,
  },
  unreadCount: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  profileModal: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  profileImage: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
});
