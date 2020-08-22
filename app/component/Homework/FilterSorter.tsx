import {
  Button,
  Form,
  Header,
  Icon,
  Item,
  Picker,
  Text,
  View,
} from 'native-base';
import React, { Component } from 'react';

import { StyleSheet } from 'react-native';
import { filterOptions } from '../../states/assignFilterSorterState';
import { log } from 'react-native-reanimated';

interface SorterProps {
  sorterActions: {
    sortDue: () => void;
    sortOut: () => void;
    sortTitle: () => void;
  };
  activeSorter;

  sorterDirActions: {
    sortDsc: () => void;
    sortAsc: () => void;
  };

  activeSorterDir;
}
function Sorter({
  sorterActions,
  activeSorter,
  sorterDirActions,
  activeSorterDir,
}: SorterProps) {
  const selectSorter = (value: string) => {
    switch (value) {
      case 'DUE':
        sorterActions.sortDue();
        break;
      case 'OUT':
        sorterActions.sortOut();
      case 'TITLE':
        sorterActions.sortTitle();
      default:
        console.error('SOMETHING WENT WRONG in FilterSorter/getSorter');
    }
  };

  const onChangeSortDir = () => {
    switch (activeSorterDir) {
      case 'ASC':
        sorterDirActions.sortDsc();
        break;
      case 'DSC':
        sorterDirActions.sortAsc();
        break;
      default:
        console.error('SOMETHING WENT WRONG in FilterSorter/onChangeSortDir');
    }
  };

  return (
    <View style={styles.selector}>
      <Icon name="albums" />
      <View style={styles.picker}>
        <Picker
          mode="dropdown"
          iosIcon={<Icon style={{ fontSize: 20 }} name="arrow-down" />}
          style={{ fontSize: 15, color: 'black' }}
          placeholderIconColor="#007aff"
          selectedValue={activeSorter}
          onValueChange={selectSorter}>
          <Picker.Item label="마감일" value="DUE" />
          <Picker.Item label="시작일" value="OUT" />
          <Picker.Item label="제목" value="TITLE" />
        </Picker>
      </View>
      <Button
        small
        icon
        style={{
          borderRadius: 10,
          alignSelf: 'center',
          backgroundColor: '#bbb',
          marginRight: 15,
          width: 45,
        }}
        onPress={onChangeSortDir}>
        {activeSorterDir === 'ASC' ? (
          <Icon style={{ fontSize: 15 }} name="arrow-down" />
        ) : (
          <Icon style={{ fontSize: 15 }} name="arrow-up" />
        )}
      </Button>
    </View>
  );
}

interface FilterProps {
  filterActions: {
    showAll: () => void;
    showCompleted: () => void;
    showIncomplete: () => void;
  };
  activeFilter;
}
function Filter({ filterActions, activeFilter }: FilterProps) {
  const selectFilter = (value: string) => {
    switch (value) {
      case 'ALL':
        filterActions.showAll();
        break;
      case 'COMPLETED':
        filterActions.showCompleted();
        break;
      case 'INCOMPLETED':
        filterActions.showIncomplete();
        break;
      default:
        console.error('SOMETHING WENT WRONG in FilterSorter/selectFilter');
    }
  };

  return (
    <View style={styles.selector}>
      <Icon name="funnel"> </Icon>
      <View style={styles.picker}>
        <Picker
          mode="dropdown"
          iosIcon={<Icon style={{ fontSize: 20 }} name="arrow-down" />}
          style={{ fontSize: 15, color: 'black' }}
          placeholderIconColor="#007aff"
          selectedValue={activeFilter}
          onValueChange={selectFilter}>
          <Picker.Item label="완료" value="COMPLETED" />
          <Picker.Item label="미완료" value="INCOMPLETED" />
          <Picker.Item label="모두" value="ALL" />
        </Picker>
      </View>
    </View>
  );
}

export default function FilterSorter({
  activeFilter,
  filterActions,
  activeSorterDir,
  activeSorter,
  sorterDirActions,
  sorterActions,
}) {
  return (
    <View style={styles.container}>
      <Filter activeFilter={activeFilter} filterActions={filterActions} />

      {/* <Sorter // #TODO: 나중에 Sorter 다시 만들기 
        activeSorter={activeSorter}
        activeSorterDir={activeSorterDir}
        sorterActions={sorterActions}
        sorterDirActions={sorterDirActions}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  selector: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    marginLeft: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },

  picker: {
    // width: 50,
    flex: 2,
  },
});
