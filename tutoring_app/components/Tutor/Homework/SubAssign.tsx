import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';

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

class SubAssign extends Component<SubAssignProps, State> {
  render() {
    const { text, isCompleted, id } = this.props;
    return (
      <View>
        <ListItem></ListItem>
        <Text>SubAssign</Text>
      </View>
    );
  }
}

export default SubAssign;
