import Assign, { AssignProps } from './Assign';
import { FlatList, ScrollView, Text, View } from 'react-native';
import React, { Component } from 'react';

export interface AssignListProps {
  assigns: Array<AssignProps>;
}

interface State {}

class AssignList extends Component<AssignListProps, State> {
  constructor(props) {
    super(props);
  }

  render() {
    const { assigns } = this.props;
    const assignList = assigns.map((item) => <Assign key={item.id} {...item} />)

    return (
      <View style={{backgroundColor: "red"}}>
        <Text style={{ fontSize: 15 }}>AssignList</Text>
        {assignList}
      </View>
    );
  }
}

export default AssignList;
