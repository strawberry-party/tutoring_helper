import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import Assign, { AssignProps } from './Assign';
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
    return (
      <View>
        <Text>AssignList</Text>
        <FlatList
          data={assigns}
          renderItem={({item}) => (
            <Assign key={item.id} {...item}/>
          )}
        />
      </View>
    );
  }
}

export default AssignList;
