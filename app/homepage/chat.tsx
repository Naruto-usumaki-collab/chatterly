import React, { useState, useRef, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  Alert,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Audio } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import * as Location from "expo-location";
import CalendarPicker from "react-native-calendar-picker";
import { sampleChatHistory, ChatHistoryItem, ConversationMessage } from "./sampleconversation";
import styles from "../Styles_Schema/Chat_Schema";


interface CustomDocumentPickerSuccessResult {
  canceled: false
  uri: string
  name: string
  size?: number
}

interface CustomDocumentPickerCanceledResult {
  canceled: true
}

type CustomDocumentPickerResult =
  | CustomDocumentPickerSuccessResult
  | CustomDocumentPickerCanceledResult


export default function Chat() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const chatId = params.id as string;
  const [message, setMessage] = useState("");
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tempDate, setTempDate] = useState(new Date());

  const flatListRef = useRef<FlatList>(null);
  const chat = sampleChatHistory.find((item) => item.id === chatId);

  useEffect(() => {
    if (chat) {
      setConversation(chat.conversation);
    }
  }, [chat]);

  if (!chat) {
    return (
      <View style={styles.container}>
        <Text style={styles.messageText}>Chat not found</Text>
      </View>
    );
  }

   // --- NEW: Real-time filtering ---
  const displayedConversation = isSearching
    ? conversation.filter((msg) =>
        msg.message.toLowerCase().includes(searchText.toLowerCase())
      )
    : conversation;

  const handleSend = () => {
    if (message.trim()) {
      const newMessage: ConversationMessage = {
        id: Date.now().toString(),
        sender: "You",
        message: message,
        timestamp: new Date().toISOString(),
        messageType: "text",
      };
      setConversation([...conversation, newMessage]);
      setMessage("");
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    if (!result.canceled) {
      const newMessage: ConversationMessage = {
        id: Date.now().toString(),
        sender: "You",
        message: result.assets[0].uri,
        timestamp: new Date().toISOString(),
        messageType: "image"
      }
      setConversation([...conversation, newMessage])
      flatListRef.current?.scrollToEnd({ animated: true })
    }
  }

  const handleDocumentPick = async () => {
    const result = (await DocumentPicker.getDocumentAsync({
      type: "*/*"
    })) as unknown as CustomDocumentPickerResult

    if (!result.canceled) {
      const newMessage: ConversationMessage = {
        id: Date.now().toString(),
        sender: "You",
        message: result.uri,
        timestamp: new Date().toISOString(),
        messageType: "document"
      }
      setConversation([...conversation, newMessage])
      flatListRef.current?.scrollToEnd({ animated: true })
    }
  }

  const handleLocationPick = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied")
      return
    }

    let location = await Location.getCurrentPositionAsync({})
    const newMessage: ConversationMessage = {
      id: Date.now().toString(),
      sender: "You",
      message: `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`,
      timestamp: new Date().toISOString(),
      messageType: "location"
    }
    setConversation([...conversation, newMessage])
    flatListRef.current?.scrollToEnd({ animated: true })
  }

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync()
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true
      })
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      )
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
    if (uri) {
      const newMessage: ConversationMessage = {
        id: Date.now().toString(),
        sender: "You",
        message: uri,
        timestamp: new Date().toISOString(),
        messageType: "audio"
      }
      setConversation([...conversation, newMessage])
      flatListRef.current?.scrollToEnd({ animated: true })
    }
  }

  const handleBlock = () => {
    setIsBlocked(!isBlocked);
  };

  const handleSearch = () => {
    setIsSearching(!isSearching);
  };

  const showDatePicker = () => {
    setTempDate(selectedDate);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = () => {
    setSelectedDate(tempDate);
    hideDatePicker();
    // Filter messages based on the selected date
    const filteredMessages = conversation.filter(
      (msg) => new Date(msg.timestamp).toDateString() === tempDate.toDateString()
    );
    setConversation(filteredMessages);
  };

  const renderMessage = ({ item }: { item: ConversationMessage }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "You" ? styles.messageRight : styles.messageLeft,
      ]}
    >
      <Text style={styles.messageSender}>{item.sender}</Text>
      {item.messageType === "text" && (
        <Text style={styles.messageText}>{item.message}</Text>
      )}
      {item.messageType === "image" && (
        <Image source={{ uri: item.message }} style={styles.messageImage} />
      )}
      {item.messageType === "document" && (
        <View style={styles.documentContainer}>
          <Ionicons name="document" size={24} style={styles.icon} />
          <Text style={styles.messageText}>{item.message}</Text>
        </View>
      )}
      {item.messageType === "audio" && (
        <View style={styles.audioContainer}>
          <Ionicons name="mic" size={24} style={styles.icon} />
          <Text style={styles.messageText}>Audio message</Text>
        </View>
      )}
      {item.messageType === "location" && (
        <Text style={styles.messageText}>{item.message}</Text>
      )}
      <Text style={styles.messageTime}>
        {new Date(item.timestamp).toLocaleTimeString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: chat.avatar }} style={styles.profilePic} />
        <Text style={styles.headerTitle}>{chat.name}</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={handleSearch}>
            <Ionicons name="search" size={24} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleBlock}>
            <Ionicons
              name={isBlocked ? "lock-closed" : "lock-open"}
              size={24}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Blocked view */}
      {isBlocked ? (
        <View style={styles.blockedContainer}>
          <Text style={styles.blockedText}>This user is blocked</Text>
          <TouchableOpacity onPress={handleBlock}>
            <Text style={styles.unblockText}>Unblock</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            ref={flatListRef}
            data={conversation}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.conversationContainer}
          />

          <View style={styles.inputContainer}>
            {isSearching ? (
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search messages..."
                  placeholderTextColor="#fff"
                  value={searchText}
                  onChangeText={setSearchText}
                />
                <TouchableOpacity onPress={showDatePicker}>
                  <Ionicons name="calendar" size={24} style={styles.icon} />
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <TouchableOpacity onPress={handleImagePick}>
                  <Ionicons name="image" size={24} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDocumentPick}>
                  <Ionicons name="document" size={24} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLocationPick}>
                  <Ionicons name="location" size={24} style={styles.icon} />
                </TouchableOpacity>
                <TextInput
                  style={styles.input}
                  placeholder="Type a message..."
                  placeholderTextColor="#fff"
                  value={message}
                  onChangeText={setMessage}
                />
                {isRecording ? (
                  <TouchableOpacity onPress={stopRecording}>
                    <Ionicons name="stop" size={24} color="red" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={startRecording}>
                    <Ionicons name="mic" size={24} style={styles.icon} />
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={handleSend}>
                  <Ionicons name="send" size={24} style={styles.icon} />
                </TouchableOpacity>
              </>
            )}
          </View>
        </>
      )}

      {/* Calendar Date Picker Modal */}
      <Modal visible={isDatePickerVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select a Date</Text>
            <CalendarPicker
              onDateChange={(date: Date) => setTempDate(date)}
              selectedStartDate={tempDate}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={hideDatePicker}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleConfirm}>
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

