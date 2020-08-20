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
import dayjs from 'dayjs';

// presentational component of AssignList

interface AssignListProps extends AssignListType {
  onCompleteAssign: (id: string) => void;
  onIncompleteAssign: (id: string) => void;
  onRemoveAssign: (id: string) => void;
  showEditModal: (id: string, assign: AssignType) => void;
  activeFilter: FilterState; // 나중에 types 에 filter type 정의해서 import
  activeSorter;
  activeSorterDir;
  assignMap: Map<string, AssignType>;
}

const noAssign = <Text style={{ fontSize: 20 }}> 새 숙제를 추가해보세요</Text>;

function AssignList({
  assignMap,

  showEditModal, // showEditModal

  onCompleteAssign,
  onIncompleteAssign,
  onRemoveAssign,

  activeFilter,
  activeSorter,
  activeSorterDir,
}: AssignListProps) {
  const getFiltered = () => {
    switch (activeFilter) {
      case filterOptions.ALL:
        return assignMap;
      case filterOptions.COMPLETED:
        var newAssignMap = new Map<string, AssignType>();
        for (let [key, assign] of assignMap) {
          if (assign.isCompleted) newAssignMap.set(key, assign);
        }
        return newAssignMap;

      case filterOptions.INCOMPLETED:
        var newAssignMap = new Map<string, AssignType>();
        for (let [key, assign] of assignMap) {
          if (!assign.isCompleted) newAssignMap.set(key, assign);
        }
        return newAssignMap;
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

  // TODO: assignMap에서 sort 구현
  // const getSorted = _.orderBy(filtered(), [getSorter()], [getSortDir()]);
  const sorted: Map<string, AssignType> = getFiltered();

  const outDates: Set<string> = new Set();
  var items: Array<JSX.Element> = [];

  for (const [key, assign] of sorted) {
    var out: string = assign.out.format('YYYY/MM/DD').toString();
    if (!outDates.has(out)) {
      items.push(
        <Separator bordered key={out}>
          <Text>{assign.out.format('MM월 DD일')}</Text>
        </Separator>,
      );
      outDates.add(out);
    }

    let comp = (
      <Assign
        key={key}
        id={key}
        {...assign}
        onStartEdit={() => {
          showEditModal(key, assign);
        }}
        onComplete={() => {
          onCompleteAssign(key);
          console.log(`${key} Completed`);
        }}
        onIncomplete={() => {
          onIncompleteAssign(key);
          console.log(`${key} canceled Complete`);
        }}
        onRemove={() => {
          onRemoveAssign(key);
          console.log(`${key} deleted`);
        }}
      />
    );
    items.push(comp);
  }
  return (
    <View style={{ backgroundColor: 'red' }}>
      <Text style={{ fontSize: 15 }}>AssignList</Text>
      <List style={{ backgroundColor: 'white' }}>
        {Array.from(assignMap.keys()).length === 0 ? noAssign : items}
      </List>
    </View>
  );
}

export default AssignList;
