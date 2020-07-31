import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Student from "./Student";

class TutorMain extends Component {
  render() {
    return (
      <View>
        <Text>
          To Student 1 Button
        </Text>

      <Student/>

      </View>
    );
  }
}

export default TutorMain;