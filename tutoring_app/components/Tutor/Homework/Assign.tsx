import React, { Component } from 'react';
import { View, Text } from 'react-native';

export interface AssignProps {
  id: string;
  title: string;
  desc: string;
  due: Date;
  out: Date;
  isCompleted: Boolean;
  status: number;
  subAssigns: Object;
}

interface State {
  isEditing: Boolean;
  assignValue: AssignProps;
}

class Assign extends Component<AssignProps, State> {
  render() {
    const {id, title, desc, due, out, isCompleted, status, subAssigns} = this.props;
    return (
      <View>

        <Text>Assign {id} </Text>

      </View>
    );
  }
}

export default Assign;
