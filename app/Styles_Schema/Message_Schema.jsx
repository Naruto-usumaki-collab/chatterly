import { StyleSheet } from "react-native";
import FontStyles from "../../constants/fonts";

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
  headerTitle: {
    fontSize: 20,
    fontFamily: FontStyles.bold, // Use bold font
    color: "#1E90FF",
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
    fontFamily: FontStyles.regular, // Use regular font
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
    fontFamily: FontStyles.bold, // Use bold font
    color: "#fff",
  },
  chatTime: {
    fontSize: 12,
    fontFamily: FontStyles.light, // Use light font
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
    fontFamily: FontStyles.regular, // Use regular font
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
    fontFamily: FontStyles.bold, // Use bold font
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

export default styles;
