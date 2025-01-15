import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import colors from "../../constants/color";
//import fonts from '../../constants/fonts'; // Import the fonts object

export default class terms extends Component {
  render() {
    return (
      <View>
        <Text style={{
          fontSize:30,
          textAlign:'center',
          
        }}> terms and Conditions </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  SampleText: {
    color: colors.darkPurple,
    fontSize: 18,
 
   },
});
