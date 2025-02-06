"use client"

import { useState } from "react"
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ActionSheetIOS,
  Platform,
  Alert,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useLocalSearchParams, useRouter } from "expo-router"
import { sampleChatHistory, type ConversationMessage } from "./sampleconversation"
import { Audio } from "expo-av"
import * as ImagePicker from "expo-image-picker"
import * as DocumentPicker from "expo-document-picker"
import * as Location from "expo-location"

export default function Chat() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const chatId = params.id as string
  const [message, setMessage] = useState("")
  const [recording, setRecording] = useState<Audio.Recording | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [conversation, setConversation] = useState<ConversationMessage[]>(
    sampleChatHistory.find((item) => item.id === chatId)?.conversation || [],
  )

  const chat = sampleChatHistory.find((item) => item.id === chatId)

  if (!chat) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "#fff", alignSelf: "center", marginTop: 20 }}>Chat not found</Text>
      </View>
    )
  }

  const renderMessageItem = ({ item }: { item: ConversationMessage }) => {
    const isSentByUser = item.sender === "You"
    return (
      <TouchableOpacity
        onLongPress={() => handleMessageLongPress(item)}
        style={[styles.messageContainer, isSentByUser ? styles.messageRight : styles.messageLeft]}
      >
        <Text style={styles.messageSender}>{item.sender}</Text>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.messageTime}>{item.time}</Text>
      </TouchableOpacity>
    )
  }

  const handleMessageLongPress = (message: ConversationMessage) => {
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Cancel", "Reply", "Copy", "Delete"],
          cancelButtonIndex: 0,
          destructiveButtonIndex: 3,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            // Reply
            setMessage(`@${message.sender} `)
          } else if (buttonIndex === 2) {
            // Copy
            // Implement copy to clipboard functionality
          } else if (buttonIndex === 3) {
            // Delete
            setConversation(conversation.filter((msg) => msg.id !== message.id))
          }
        },
      )
    } else {
      // For Android, you might want to use a custom modal or a third-party library
      Alert.alert("Message Options", "Choose an action", [
        { text: "Reply", onPress: () => setMessage(`@${message.sender} `) },
        {
          text: "Copy",
          onPress: () => {
            /* Implement copy to clipboard functionality */
          },
        },
        { text: "Delete", onPress: () => setConversation(conversation.filter((msg) => msg.id !== message.id)) },
        { text: "Cancel", style: "cancel" },
      ])
    }
  }

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync()
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      })
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY)
      setRecording(recording)
      setIsRecording(true)
    } catch (err) {
      console.error("Failed to start recording", err)
    }
  }

  const stopRecording = async () => {
    if (!recording) return
    setRecording(null)
    setIsRecording(false)
    await recording.stopAndUnloadAsync()
    const uri = recording.getURI()
    console.log("Recording stopped and stored at", uri)
    // Here you would typically send the audio file to your backend
  }

  const handleAttachment = () => {
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Cancel", "Image", "Video", "Document", "Audio", "Location", "Poll"],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) pickImage()
          else if (buttonIndex === 2) pickVideo()
          else if (buttonIndex === 3) pickDocument()
          else if (buttonIndex === 4) pickAudio()
          else if (buttonIndex === 5) pickLocation()
          else if (buttonIndex === 6) createPoll()
        },
      )
    } else {
      // For Android, you might want to use a custom modal or a third-party library
      Alert.alert("Attach", "Choose attachment type", [
        { text: "Image", onPress: pickImage },
        { text: "Video", onPress: pickVideo },
        { text: "Document", onPress: pickDocument },
        { text: "Audio", onPress: pickAudio },
        { text: "Location", onPress: pickLocation },
        { text: "Poll", onPress: createPoll },
        { text: "Cancel", style: "cancel" },
      ])
    }
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      console.log(result.assets[0].uri)
      // Here you would typically send the image to your backend
    }
  }

  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    })

    if (!result.canceled) {
      console.log(result.assets[0].uri)
      // Here you would typically send the video to your backend
    }
  }

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({})
    if (result.assets && result.assets.length > 0) {
      console.log(result.assets[0].uri)
      // Here you would typically send the document to your backend
    }
  }

  const pickAudio = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "audio/*",
    })
    if (result.assets && result.assets.length > 0) {
      console.log(result.assets[0].uri)
      // Here you would typically send the audio file to your backend
    }
  }

  const pickLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied")
      return
    }

    const location = await Location.getCurrentPositionAsync({})
    console.log(location)
    // Here you would typically send the location to your backend
  }

  const createPoll = () => {
    // Implement poll creation logic
    console.log("Create poll")
  }

  const handleSendMessage = () => {
    if (message.trim() === "") return

    const newMessage: ConversationMessage = {
      id: Date.now().toString(),
      sender: "You",
      text: message,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setConversation((prev) => [...prev, newMessage])
    setMessage("")
  }

  const handleMoreOptions = () => {
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Cancel", "Search", "Change Theme", "Block", "Report", "Add Shortcut", "Clear Chat"],
          cancelButtonIndex: 0,
          destructiveButtonIndex: 6,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) handleSearch()
          else if (buttonIndex === 2) handleChangeTheme()
          else if (buttonIndex === 3) handleBlock()
          else if (buttonIndex === 4) handleReport()
          else if (buttonIndex === 5) handleAddShortcut()
          else if (buttonIndex === 6) handleClearChat()
        },
      )
    } else {
      // For Android, you might want to use a custom modal or a third-party library
      Alert.alert("More Options", "Choose an action", [
        { text: "Search", onPress: handleSearch },
        { text: "Change Theme", onPress: handleChangeTheme },
        { text: "Block", onPress: handleBlock },
        { text: "Report", onPress: handleReport },
        { text: "Add Shortcut", onPress: handleAddShortcut },
        { text: "Clear Chat", onPress: handleClearChat },
        { text: "Cancel", style: "cancel" },
      ])
    }
  }

  const handleSearch = () => {
    // Implement search functionality
    console.log("Search")
  }

  const handleChangeTheme = () => {
    // Implement theme change functionality
    console.log("Change theme")
  }

  const handleBlock = () => {
    // Implement block functionality
    console.log("Block user")
  }

  const handleReport = () => {
    // Implement report functionality
    console.log("Report user")
  }

  const handleAddShortcut = () => {
    // Implement add shortcut functionality
    console.log("Add shortcut")
  }

  const handleClearChat = () => {
    // Implement clear chat functionality
    setConversation([])
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1E90FF" />
        </TouchableOpacity>
        <Image source={chat.image} style={styles.profilePic} />
        <Text style={styles.headerTitle}>{chat.name}</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => console.log("Video call")}>
            <Ionicons name="videocam-outline" size={24} color="#1E90FF" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Voice call")}>
            <Ionicons name="call-outline" size={24} color="#1E90FF" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleMoreOptions}>
            <Ionicons name="ellipsis-vertical" size={24} color="#1E90FF" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat Conversation */}
      <FlatList
        data={conversation}
        keyExtractor={(item) => item.id}
        renderItem={renderMessageItem}
        contentContainerStyle={styles.conversationContainer}
      />

      {/* Message Input */}
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={handleAttachment}>
          <Ionicons name="add-circle-outline" size={24} color="#1E90FF" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          placeholderTextColor="#888"
        />
        {message ? (
          <TouchableOpacity onPress={handleSendMessage}>
            <Ionicons name="send" size={24} color="#1E90FF" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={isRecording ? stopRecording : startRecording}>
            <Ionicons name={isRecording ? "stop-circle" : "mic"} size={24} color="#1E90FF" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E90FF",
    marginLeft: 15,
  },
  headerIcons: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 15,
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#1E1E1E",
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: "#2C2C2C",
    borderRadius: 20,
    color: "#fff",
    fontSize: 16,
    height: 50,
  },
})

