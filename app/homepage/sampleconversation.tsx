// sampleConversation.tsx

export interface ChatHistoryItem {
  id: string;
  name: string;
  avatar: string;
  conversation: ConversationMessage[];
}

export interface ConversationMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  messageType: "text" | "image" | "document" | "audio" | "location";
}

export const sampleChatHistory: ChatHistoryItem[] = [
  {
    id: "1",
    name: "John Doe",
    avatar: "https://example.com/john-avatar.jpg",
    conversation: [
      {
        id: "11",
        sender: "John Doe",
        message: "Hello there!",
        timestamp: "2023-06-01T10:00:00Z",
        messageType: "text",
      },
      {
        id: "12",
        sender: "You",
        message: "Hi John!",
        timestamp: "2023-06-01T10:01:00Z",
        messageType: "text",
      },
      {
        id: "13",
        sender: "John Doe",
        message: "How's your day going?",
        timestamp: "2023-06-02T14:30:00Z",
        messageType: "text",
      },
    ],
  },
  // Add more chat history items as needed
];