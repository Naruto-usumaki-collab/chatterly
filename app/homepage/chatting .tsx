// chatting.tsx
import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

export default class Chatting extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Homepage for chatting</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontSize: 18,
    color: "#333",
  },
});
