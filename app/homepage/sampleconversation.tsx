export interface ChatHistoryItem {
  id: string
  name: string
  time: string
  lastMessage: string
  unreadCount: number
  image?: { uri: string }
  conversation: ConversationMessage[]
}

export interface ConversationMessage {
  id: string
  sender: string
  text: string
  time: string
}

export const sampleChatHistory: ChatHistoryItem[] = [
  {
    id: "1",
    name: "John Doe",
    time: "10:00 AM",
    lastMessage: "Hello there!",
    unreadCount: 2,
    conversation: [
      {
        id: "11",
        sender: "John Doe",
        text: "Hello!",
        time: "10:00 AM",
      },
      {
        id: "12",
        sender: "You",
        text: "Hi John!",
        time: "10:01 AM",
      },
    ],
  },
  {
    id: "2",
    name: "Jane Smith",
    time: "9:30 AM",
    lastMessage: "How are you?",
    unreadCount: 0,
    conversation: [
      {
        id: "21",
        sender: "Jane Smith",
        text: "How are you doing?",
        time: "9:30 AM",
      },
      {
        id: "22",
        sender: "You",
        text: "I'm good, thanks!",
        time: "9:31 AM",
      },
    ],
  },
  {
    id: "3",
    name: "Peter Jones",
    time: "8:00 AM",
    lastMessage: "Let's meet up!",
    unreadCount: 1,
    conversation: [
      {
        id: "31",
        sender: "Peter Jones",
        text: "Let's meet up later today!",
        time: "8:00 AM",
      },
    ],
  },
]

