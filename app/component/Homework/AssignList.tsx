import { AssignListType, AssignType } from '../../types/homework';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { List, ListItem } from 'native-base';
import React, { Component, } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Assign from './Assign';
import { RootState } from '../../states'
import { actions as assignActions } from '../../states/assignState';

// presentational component of AssignList

interface AssignListProps extends AssignListType {
  addAssign: (any) => void;
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
    console.log(id + 'completed');
  };

  const onIncompleteAssign = (id: string) => {
    console.log(id + 'incompleted');
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
            onComplete={() => onCompleteAssign(item.id)}
            onIncomplete={() => onIncompleteAssign(item.id)}
            onRemove={() => console.log("To be implemented")}
            isEditing={false}
          />
        ))}
      </List>
    </View>
  );
}

export default AssignList;
