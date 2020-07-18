import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Body from './Body';
import EditButton from './EditButton';
import Status from './Status';

class Homework extends Component {
  render() {
    return (
      <View>
        <Text>Homework</Text>
        <EditButton />
        <Status />
        <Body />
      </View>
    );
  }
}

export default Homework;
