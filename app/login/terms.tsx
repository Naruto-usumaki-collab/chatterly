import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import colors from "../../constants/color";

export default class terms extends Component {
  render() {
    return (
      <View>
        <Text style={styles.SampleText}> terms and koothies </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  SampleText: {
    color: colors.darkPurple,
    fontSize: 18,
    fontWeight: "bold",
  },
})
