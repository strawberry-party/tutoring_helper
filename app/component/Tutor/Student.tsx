import React, { Component } from 'react';

import Homework from '../Homework/Homework';
import Progress from './Progress/Progress';
import Schedule from './Schedule/Schedule';
import { View } from 'react-native';

class Student extends Component {
  render() {
    return (
      <View>
        <Schedule />
        <Progress />
        <Homework />
      </View>
    );
  }
}

export default Student;