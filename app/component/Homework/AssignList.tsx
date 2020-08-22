import { AssignListType, AssignType } from '../../types/homework';
import {
  FilterState,
  filterOptions,
  sorterDirOptions,
  sorterOptions,
} from '../../states/assignFilterSorterState';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { List, Separator } from 'native-base';
import React, { Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Assign from './Assign';
import _ from 'lodash';

// presentational component of AssignList

interface AssignListProps extends AssignListType {
  onCompleteAssign: (id: string) => void;
  onIncompleteAssign: (id: string) => void;
  onRemoveAssign: (id: string) => void;
  showEditModal: (id: string, assign: AssignType) => void;
  activeFilter: FilterState; // 나중에 types 에 filter type 정의해서 import
  activeSorter;
  activeSorterDir;
}

function AssignList({
  assigns,

  showEditModal, // showEditModal

  onCompleteAssign,
  onIncompleteAssign,
  onRemoveAssign,

  activeFilter,
  activeSorter,
  activeSorterDir,
}: AssignListProps) {
  const outDates: Set<string> = new Set();

  const filtered = () => {
    switch (activeFilter) {
      case filterOptions.ALL:
        return assigns;
      case filterOptions.COMPLETED:
        return assigns.filter((assign: AssignType) => assign.isCompleted);
      case filterOptions.INCOMPLETED:
        return assigns.filter((assign: AssignType) => !assign.isCompleted);
      default:
        console.error(
          `SOMETHING WENT WRONG in AssignList/filtered ${activeFilter}`,
        );
    }
  };

  const getSorter = () => {
    switch (activeSorter) {
      case sorterOptions.OUT:
        return 'out';
      case sorterOptions.DUE:
        return 'due';
      case sorterOptions.TITLE:
        return 'title';
      default:
        console.error(
          `SOMETHING WENT WRONG in AssignList/getSorter ${activeSorter}`,
        );
    }
  };

  const getSortDir = () => {
    switch (activeSorterDir) {
      case sorterDirOptions.ASC:
        return 'asc';
      case sorterDirOptions.DSC:
        return 'desc';
      default:
        console.error('SOMETHING WENT WRONG in AssignList/getSortDir');
    }
  };

  const sortDir = 'desc';
  const sorted = _.orderBy(filtered(), [getSorter()], [getSortDir()]);

  var items = [];
  for (let index = 0; index < sorted.length; index++) {
    let assign = sorted[index];

    if (!outDates.has(assign.out.toString())) {
      items.push(
        <Separator bordered key={assign.out.toString()}>
          <Text>{assign.out.format('MM월 DD일').toString()}</Text>
        </Separator>,
      );
      outDates.add(assign.out.toString());
    }

    let comp = (
      <Assign
        key={assign.id}
        {...assign}
        onStartEdit={() => {
          showEditModal(assign.id, assign);
        }}
        onComplete={() => {
          onCompleteAssign(assign.id);
          // console.log(`${assign.id} Completed`);
        }}
        onIncomplete={() => {
          onIncompleteAssign(assign.id);
          // console.log(`${assign.id} canceled Complete`);
        }}
        onRemove={() => {
          onRemoveAssign(assign.id);
          // console.log(`${assign.id} deleted`);
        }}
      />
    );
    items.push(comp);
  }

  const noAssign = (
    <Text style={{ fontSize: 20 }}> 새 숙제를 추가해보세요</Text>
  );

  return (
    <View style={{ backgroundColor: 'red' }}>
      <Text style={{ fontSize: 15 }}>AssignList</Text>
      <List style={{ backgroundColor: 'white' }}>
        {assigns.length !== 0 ? items : noAssign}
      </List>
    </View>
  );
}

export default AssignList;
