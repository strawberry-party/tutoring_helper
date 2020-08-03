import React, { Component } from 'react';
import { View } from 'react-native';
import Week from './Week';
import { Accordion } from "native-base";

const dataArray = [
  { title: "1주차", content: <Week /> },
  { title: "2주차", content: <Week /> },
  { title: "3주차", content: <Week /> }
];

class WeeklyProgress extends Component {
  render() {
    return (
      <View>
        <Accordion dataArray={dataArray} />
      </View>
    );
  }
}

export default WeeklyProgress;