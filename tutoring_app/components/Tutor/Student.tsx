import React, { Component } from 'react';
import { View } from 'react-native';
import Schedule from './Schedule/Schedule';
import Progress from './Progress/Progress';
import Homework from './Homework/Homework';
class Student extends Component {
  render() {
    return (
      <View>
        <Schedule />
        <Progress />
        {/* <Homework /> */}
      </View>
    );
  }
}

export default Student;