import { AssignListType, AssignType } from '../../types/homework';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { List, ListItem } from 'native-base';
import React, { Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Assign from './Assign';
import { RootState } from '../../states';
import { actions as assignActions } from '../../states/assignState';
import { log } from 'react-native-reanimated';

// presentational component of AssignList

interface AssignListProps extends AssignListType {
  onCompleteAssign: (id: string) => void;
  onIncompleteAssign: (id: string) => void;
  onRemoveAssign: (id: string) => void;
  subAssignActions: any;
  showEditModal: (id: string, assign: AssignType) => void;
}

function AssignList({
  assigns,

  showEditModal, // showEditModal

  onCompleteAssign,
  onIncompleteAssign,
  onRemoveAssign,
  subAssignActions,
}: AssignListProps) {
  return (
    <View style={{ backgroundColor: 'red' }}>
      <Text style={{ fontSize: 15 }}>AssignList</Text>
      <List style={{ backgroundColor: 'white' }}>
        {assigns.length > 0 ? (
          assigns.map((item: AssignType) => (
            <Assign
              key={item.id}
              {...item}
              onStartEdit={() => {
                showEditModal(item.id, item);                
              }}
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
              subAssignActions={subAssignActions}
            />
          ))
        ) : (
          <Text style={{ fontSize: 20 }}> 새 숙제를 추가해보세요</Text>
        )}
      </List>
    </View>
  );
}

export default AssignList;
