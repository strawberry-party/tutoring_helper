import React, { Component } from 'react';
import Progress from './Progress/Progress';
import Homework from './Homework/Homework';
import { View } from 'react-native';

class Student extends Component {
  render() {
    return (
      <View>
        <Progress />
        {/* <Homework /> */}
      </View>
    );
  }
}

export default Student;