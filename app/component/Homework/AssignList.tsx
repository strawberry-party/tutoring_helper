import { AssignListType, AssignType } from '../../types/homework';
import {
  FilterState,
  sorterDirOptions,
  sorterOptions,
} from '../../states/assignFilterSorterState';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { List, Separator } from 'native-base';
import React, { Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Assign from './Assign';
import { Paragraph } from 'react-native-paper';
import { TagType } from '../../types/root';
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
  tags: Map<string, TagType>;
  activeTagFilter: Set<string>;
}

const noAssign = (
  <View>
    <Text style={{ fontSize: 20, flexWrap: 'wrap' }}>
      숙제가 없네요! 새 숙제를 추가해보세요
    </Text>
  </View>
);

// const noAssign = <Text> Hello world </Text>


function AssignList({
  assignMap,
  tags,

  showEditModal, // showEditModal

  onCompleteAssign,
  onIncompleteAssign,
  onRemoveAssign,

  activeFilter,
  activeSorter,
  activeSorterDir,
  activeTagFilter,
}: AssignListProps) {
  const getFiltered = () => {
    switch (activeFilter) {
      case 'ALL':
        var newAssignMap = new Map<string, AssignType>();
        for (let [key, assign] of assignMap) {
          if (activeTagFilter.has(assign.tagId)) newAssignMap.set(key, assign);
        }
        return newAssignMap;
      case 'COMPLETED':
        var newAssignMap = new Map<string, AssignType>();
        for (let [key, assign] of assignMap) {
          if (assign.isCompleted && activeTagFilter.has(assign.tagId))
            newAssignMap.set(key, assign);
        }
        return newAssignMap;

      case 'INCOMPLETED':
        var newAssignMap = new Map<string, AssignType>();
        for (let [key, assign] of assignMap) {
          if (!assign.isCompleted && activeTagFilter.has(assign.tagId))
            newAssignMap.set(key, assign);
        }
        return newAssignMap;
      default:
        console.error(
          `SOMETHING WENT WRONG in AssignList/filtered ${activeFilter}`,
        );
    }
  };

  // const getSorter = () => {
  //   switch (activeSorter) {
  //     case sorterOptions.OUT:
  //       return 'out';
  //     case sorterOptions.DUE:
  //       return 'due';
  //     case sorterOptions.TITLE:
  //       return 'title';
  //     default:
  //       console.error(
  //         `SOMETHING WENT WRONG in AssignList/getSorter ${activeSorter}`,
  //       );
  //   }
  // };

  // const getSortDir = () => {
  //   switch (activeSorterDir) {
  //     case sorterDirOptions.ASC:
  //       return 'asc';
  //     case sorterDirOptions.DSC:
  //       return 'desc';
  //     default:
  //       console.error('SOMETHING WENT WRONG in AssignList/getSortDir');
  //   }
  // };

  // TODO: assignMap에서 sort 구현
  // const getSorted = _.orderBy(filtered(), [getSorter()], [getSortDir()]);
  const sorted: Map<string, AssignType> = getFiltered();

  const outDates: Set<string> = new Set();
  var items: Array<JSX.Element> = [];

  for (const [key, assign] of sorted) {
    if (!assign.out) continue;
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
        tags={tags}
      />
    );
    items.push(comp);
  }
  return (
    <View style={{ borderColor: 'red' }}>
      <Paragraph>
        <Text style={{ fontSize: 15 }}>여기는 AssignStatus가 올 자리</Text>
      </Paragraph>
      <List style={{ backgroundColor: 'white' }}>
        {items.length === 0 ? noAssign : items}
      </List>
    </View>
  );
}

export default AssignList;
