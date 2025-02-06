// sampleconversation.tsx
import { ImageSourcePropType } from "react-native";

// Interface for individual messages in a conversation.
export interface ConversationMessage {
  id: string;
  sender: "You" | string;
  text: string;
  time: string;
}

// Interface for a chat history item (a conversation thread).
export interface ChatHistoryItem {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  conversation: ConversationMessage[];
  image: ImageSourcePropType; // Added property for the profile image
  unreadCount: number;        // Added property for unread message count
}

// Use your default image asset. Adjust the path if needed.
const defaultImage: ImageSourcePropType = require("../../assets/images/images/default_dp.png");

export const sampleChatHistory: ChatHistoryItem[] = [
  {
    id: "1",
    name: "Bala Anna",
    lastMessage: "Same here. Great to catch up!",
    time: "6:05 PM",
    conversation: [
      {
        id: "1",
        sender: "You",
        text: "Hello! How are you?",
        time: "6:01 PM",
      },
      {
        id: "2",
        sender: "Bala Anna",
        text: "I'm good, thanks! And you?",
        time: "6:02 PM",
      },
      {
        id: "3",
        sender: "You",
        text: "Doing well. What are you up to?",
        time: "6:03 PM",
      },
      {
        id: "4",
        sender: "Bala Anna",
        text: "Just working on some projects. How about you?",
        time: "6:04 PM",
      },
      {
        id: "5",
        sender: "You",
        text: "Same here. Great to catch up!",
        time: "6:05 PM",
      },
    ],
    image: defaultImage,
    unreadCount: 2,
  },
  {
    id: "2",
    name: "John Doe",
    lastMessage: "See you soon!",
    time: "5:30 PM",
    conversation: [
      {
        id: "1",
        sender: "John Doe",
        text: "Hey, how's it going?",
        time: "5:00 PM",
      },
      {
        id: "2",
        sender: "You",
        text: "Pretty good, what about you?",
        time: "5:05 PM",
      },
      {
        id: "3",
        sender: "John Doe",
        text: "All good here. See you soon!",
        time: "5:30 PM",
      },
    ],
    image: defaultImage,
    unreadCount: 0,
  },
  {
    id: "3",
    name: "Alice",
    lastMessage: "Let's catch up later!",
    time: "4:20 PM",
    conversation: [
      {
        id: "1",
        sender: "Alice",
        text: "Hi, long time no see!",
        time: "4:00 PM",
      },
      {
        id: "2",
        sender: "You",
        text: "Yeah, it's been a while",
        time: "4:10 PM",
      },
      {
        id: "3",
        sender: "Alice",
        text: "Let's catch up later!",
        time: "4:20 PM",
      },
    ],
    image: defaultImage,
    unreadCount: 1,
  },
];
