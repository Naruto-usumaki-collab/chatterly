import { StyleSheet } from "react-native";
import FontStyles from "../../constants/fonts";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    width: "90%",
  },
  title: {
    fontSize: 24,
    fontFamily: FontStyles.bold, // Use bold font
    color: "#333",
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    fontFamily: FontStyles.regular, // Use regular font
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: FontStyles.bold, // Use bold font instead of fontWeight
  },
  skipButton: {
    position: 'absolute',
    top: 20,
    right: 10,
    zIndex: 1,
  },
  skipText: {
    fontSize: 18,
    color: 'green',
    textAlign: 'right',
    padding: 20,
    fontFamily: FontStyles.bold, // Use bold font
  },
});

export default styles;
