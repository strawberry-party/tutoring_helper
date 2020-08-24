import {
  Button,
  Form,
  Header,
  Icon,
  Item,
  Text,
  View,
} from 'native-base';
import React, { Component } from 'react';

import { IconButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';

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
        <Button> </Button>
        {/* <Picker
          mode="dropdown"
          iosIcon={<Icon style={{ fontSize: 20 }} name="arrow-down" />}
          style={{ fontSize: 15, color: 'black' }}
          placeholderIconColor="#007aff"
          selectedValue={activeSorter}
          onValueChange={selectSorter}>
          <Picker.Item label="마감일" value="DUE" />
          <Picker.Item label="시작일" value="OUT" />
          <Picker.Item label="제목" value="TITLE" />
        </Picker> */}
        
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

export function FilterButton({ showFilterModal }) {
  return (
    <Button style={styles.button} onPress={() => showFilterModal()}>
      <Icon name="funnel" />
    </Button>
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

  button: {
    margin: 5,
    backgroundColor: '#aec6df',
    borderRadius: 20,
    borderColor: 'transparent',
    elevation: 0,
  },

  picker: {
    flex: 2,
  },
});
