import { AssignListType, AssignType } from '../../types/homework';
import { List, Separator } from 'native-base';
import { Text, View } from 'react-native';

import Assign from './Assign';
import React from 'react';
import { TagPrimitiveType } from '../../types/root';
import _ from 'lodash';
import dayjs from 'dayjs';

// presentational component of AssignList

interface AssignListProps extends AssignListType {
  onCompleteAssign: (id: string) => void;
  onIncompleteAssign: (id: string) => void;
  onRemoveAssign: (id: string) => void;
  showEditModal: (id: string, assign: AssignType) => void;
  activeFilter: string; // 나중에 types 에 filter type 정의해서 import
  activeSorter;
  activeSorterDir;
  assignMap: Map<string, AssignType>;
  activeTagFilter: Set<string>;

  bookTags: TagPrimitiveType[];
  subjectTags: TagPrimitiveType[];
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
  assigns,
  bookTags,
  subjectTags,

  showEditModal, // showEditModal

  onCompleteAssign,
  onIncompleteAssign,
  onRemoveAssign,

  activeFilter,
  activeSorter,
  activeSorterDir,
  visibleSubjectTagIds,
}) {
  const getFiltered = () => {
    switch (activeFilter) {
      case 'ALL':
        return assigns.filter((assign) =>
          visibleSubjectTagIds.includes(assign.subjectTagId),
        );
      case 'COMPLETED':
        return assigns.filter(
          (assign) =>
            assign.isCompleted &&
            visibleSubjectTagIds.includes(assign.subjectTagId),
        );

      case 'INCOMPLETED':
        return assigns.filter(
          (assign) =>
            !assign.isCompleted &&
            visibleSubjectTagIds.includes(assign.subjectTagId),
        );

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
  const sorted = getFiltered();
  // const sorted = assigns;
  const outDates: Set<string> = new Set();
  var items: Array<JSX.Element> = [];

  sorted.forEach((assign) => {
    if (assign.out) {
      var out: string = dayjs(assign.out).format('YYYY/MM/DD').toString();
      if (!outDates.has(out)) {
        items.push(
          <Separator bordered key={out}>
            <Text>{dayjs(assign.out).format('MM월 DD일')}</Text>
          </Separator>,
        );
        outDates.add(out);
      }

      let comp = (
        <Assign
          key={assign.id}
          id={assign.id}
          {...assign}
          due={dayjs(assign.due)}
          out={dayjs(assign.out)}
          onStartEdit={() => {
            showEditModal(assign.id, assign);
          }}
          onComplete={() => {
            onCompleteAssign(assign.id);
            console.log(`${assign.id} Completed`);
          }}
          onIncomplete={() => {
            onIncompleteAssign(assign.id);
            console.log(`${assign.id} canceled Complete`);
          }}
          onRemove={() => {
            onRemoveAssign(assign.id);
            console.log(`${assign.id} deleted`);
          }}
          subjectTag={subjectTags.find(
            (item) => item.id === assign.subjectTagId,
          )}
          bookTag={bookTags.find((item) => item.id === assign.bookTagId)}
        />
      );
      items.push(comp);
    }
  });

  return (
    <View style={{ borderColor: 'red' }}>
      <List style={{ backgroundColor: 'white' }}>
        {items.length === 0 ? noAssign : items}
      </List>
    </View>
  );
}

export default AssignList;
