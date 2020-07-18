import React from 'react';
import { Text, View } from 'react-native';
import ToDoList from './ToDoList';

export default class Homework extends React.Component<any, any> {
  render() {
    return (
      <View>
        <Text>Homework Body</Text>
        <ToDoList />
      </View>
    );
  }
}
