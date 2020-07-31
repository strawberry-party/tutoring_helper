import { AssignListType, AssignType } from '../../types/homework';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { List, ListItem } from 'native-base';
import React, { Component } from 'react';

import Assign from './Assign';

interface AssignListProps extends AssignListType {
  addAssign: any;
  completeAssign: (string) => void;
  incompleteAssign: (string) => void;
}
function AssignList() {
  const assigns = useSelector(
    (state: RootState) => state.assignReducer.assigns,
  );

  const dispatch = useDispatch();

  const onAddAssign = (assign: AssignType) => {
    dispatch(assignActions.addAssign(assign));
    console.log('added');
  };

  const onCompleteAssign = (id: string) => {
    dispatch(this.props.completeAssign(id));
    console.log('comopleted');
  };

  const onIncompleteAssign = (id: string) => {
    console.log('completed');
  };

  const onRemoveAssign = (id: string) => {
    console.log('removed');
  };

  return (
    <View style={{ backgroundColor: 'red' }}>
      <Text style={{ fontSize: 15 }}>AssignList</Text>
      <List style={{ backgroundColor: 'white' }}>
        {assigns.map((item: AssignType) => (
          <Assign
            key={item.id}
            {...item}
            onComplete={onCompleteAssign}
            onIncomplete={onIncompleteAssign}
          />
        ))}
      </List>
    </View>
  );
}

export default AssignList;
