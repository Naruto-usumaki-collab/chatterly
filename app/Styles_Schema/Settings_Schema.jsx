import { StyleSheet } from "react-native";
import FontStyles from "../../constants/fonts";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#2C2C2C",
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: FontStyles.bold, // Use bold font
    color: "#E0E0E0",
    marginLeft: 15,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#2C2C2C",
  },
  optionIcon: {
    marginRight: 15,
  },
  optionTitle: {
    flex: 1,
    fontSize: 16,
    fontFamily: FontStyles.regular, // Use regular font
    color: "#E0E0E0",
  },
});

export default styles;
