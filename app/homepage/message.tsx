"use client"

import { useState, useCallback, useEffect } from "react"
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
  ActionSheetIOS,
  Platform,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { sampleChatHistory, type ChatHistoryItem } from "./sampleconversation"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import * as ImagePicker from "expo-image-picker"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated"
import {
  PinchGestureHandler,
  State,
  GestureHandlerRootView,
  LongPressGestureHandler,
} from "react-native-gesture-handler"
import styles from "../Styles_Schema/Message_Schema";

const defaultDp: any = require("../../assets/images/images/default_dp.png")

export default function Messages() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProfile, setSelectedProfile] = useState<any>(null)
  const [chats, setChats] = useState<ChatHistoryItem[]>(sampleChatHistory)
  const [isZoomed, setIsZoomed] = useState(false)

  const scale = useSharedValue(1)

  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    }
  })

  useEffect(() => {
    loadProfilePictures()
  }, [])

  const loadProfilePictures = async () => {
    try {
      const savedPictures = await AsyncStorage.getItem("profilePictures")
      if (savedPictures) {
        const picturesObject = JSON.parse(savedPictures)
        const updatedChats = chats.map((chat) => ({
          ...chat,
          image: picturesObject[chat.id] ? { uri: picturesObject[chat.id] } : chat.image,
        }))
        setChats(updatedChats)
      }
    } catch (error) {
      console.error("Error loading profile pictures:", error)
    }
  }

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync()
    if (status !== "granted") {
      Alert.alert("Permission needed", "Please grant permission to access your camera.")
      return
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled && result.assets && result.assets.length > 0) {
      Alert.alert("Photo Captured", "Your photo has been captured successfully!")
    }
  }

  const filteredChats = chats.filter((chat) => chat.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleLongPress = (item: ChatHistoryItem) => {
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Cancel", "Hide", "Delete", "Pin"],
          cancelButtonIndex: 0,
          destructiveButtonIndex: 2,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            // Hide
            setChats(chats.filter((chat) => chat.id !== item.id))
          } else if (buttonIndex === 2) {
            // Delete
            setChats(chats.filter((chat) => chat.id !== item.id))
          } else if (buttonIndex === 3) {
            // Pin
            const updatedChats = chats.filter((chat) => chat.id !== item.id)
            updatedChats.unshift(item)
            setChats(updatedChats)
          }
        },
      )
    } else {
      // For Android, you might want to use a custom modal or a third-party library
      Alert.alert("Chat Options", "Choose an action", [
        { text: "Hide", onPress: () => setChats(chats.filter((chat) => chat.id !== item.id)) },
        { text: "Delete", onPress: () => setChats(chats.filter((chat) => chat.id !== item.id)) },
        {
          text: "Pin",
          onPress: () => {
            const updatedChats = chats.filter((chat) => chat.id !== item.id)
            updatedChats.unshift(item)
            setChats(updatedChats)
          },
        },
        { text: "Cancel", style: "cancel" },
      ])
    }
  }

  const renderChatHistoryItem = useCallback(
    ({ item }: { item: ChatHistoryItem }) => (
      <LongPressGestureHandler
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.ACTIVE) {
            handleLongPress(item)
          }
        }}
        minDurationMs={800}
      >
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
      </LongPressGestureHandler>
    ),
    [router, handleLongPress], // Added handleLongPress as a dependency
  )

  const onPinchGestureEvent = useCallback(
    (event: any) => {
      scale.value = event.nativeEvent.scale
    },
    [scale],
  )

  const onPinchHandlerStateChange = useCallback(
    (event: any) => {
      if (event.nativeEvent.oldState === State.ACTIVE) {
        scale.value = withSpring(1)
        setIsZoomed(!isZoomed)
      }
    },
    [scale, setIsZoomed, isZoomed],
  )

  return (
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
            <PinchGestureHandler onGestureEvent={onPinchGestureEvent} onHandlerStateChange={onPinchHandlerStateChange}>
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
  )
}


