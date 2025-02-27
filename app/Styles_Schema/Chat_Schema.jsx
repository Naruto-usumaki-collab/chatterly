//Chat_Schema.jsx
import { StyleSheet } from "react-native";

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
    color: "#000",
    marginLeft: 15,
  },
  headerIcons: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 15,
    color: "#1E90FF",
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
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  documentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  audioContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2C2C2C",
    borderRadius: 20,
    marginLeft: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    height: 40,
  },
  blockedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  blockedText: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 10,
  },
  unblockText: {
    color: "#1E90FF",
    fontSize: 16,
  },
  // Modal styles for Calendar Picker
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#1E1E1E",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  modalButtonContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  modalButton: {
    backgroundColor: "#1E90FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
})

export default styles;