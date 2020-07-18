import React, { Component } from 'react';
import { View, Text } from 'react-native';

export interface SubAssignProps {
  text: string;
  isCompleted: boolean;
  deleteToDo: any;
  id: string;
  uncompleteToDo: any;
  completeToDo: any;
  updateToDo: any;
}

interface State {
  isEditing: boolean;
  toDoValue: string;
}

class SubAssign extends Component<SubAssignProps,State> {


  render() {
    return (
      <View>
        <Text>SubAssign</Text>
      </View>
    );
  }
}

export default SubAssign;
