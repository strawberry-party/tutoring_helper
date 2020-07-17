import React, { Component } from 'react';
import { View } from 'react-native';
import Todo from './Todo';

class TodoList extends Component {
  render() {
    return (
      <View>
        <Todo />
      </View>
    );
  }
}

export default TodoList;