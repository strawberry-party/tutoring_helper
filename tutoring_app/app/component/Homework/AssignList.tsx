import { AssignListType, AssignType } from '../../types/homework';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { List, ListItem } from 'native-base';
import React, { Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Assign from './Assign';
import { RootState } from '../../states';
import { actions as assignActions } from '../../states/assignState';

// presentational component of AssignList

interface AssignListProps extends AssignListType {
  // addAssign: (any) => void;
  onCompleteAssign: (string) => void;
  onIncompleteAssign: (string) => void;
  onRemoveAssign: (string) => void;
}

function AssignList({
  assigns,
  onCompleteAssign,
  onIncompleteAssign,
  onRemoveAssign,
}: AssignListProps) {
  return (
    <View style={{ backgroundColor: 'red' }}>
      <Text style={{ fontSize: 15 }}>AssignList</Text>
      <List style={{ backgroundColor: 'white' }}>
        { (assigns.length>0) ? (
          assigns.map((item: AssignType) => (
            <Assign
              key={item.id}
              {...item}
              onComplete={() => {
                onCompleteAssign(item.id);
                console.log(`${item.id} Completed`);
              }}
              onIncomplete={() => {
                onIncompleteAssign(item.id);
                console.log(`${item.id} canceled Complete`);
              }}
              onRemove={() => {
                onRemoveAssign(item.id);
                console.log(`${item.id} deleted`);
              }}
              
            />
          ))
        ) : (
          <Text style={{fontSize: 20}}> 새 숙제를 추가해보세요</Text>
        )}
      </List>
    </View>
  );
}

export default AssignList;
