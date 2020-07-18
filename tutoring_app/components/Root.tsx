import React from 'react';
import { Text, View } from 'react-native';
import Homework from './Homework/Body';

export default class Hello extends React.Component<any, any> {
  render() {
    return (
      <View>
        <Text>Root</Text>
        <Homework />
      </View>
    );
  }
}
