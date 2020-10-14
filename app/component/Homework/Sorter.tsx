import { StyleSheet, View } from 'react-native';

import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-community/picker';
import React from 'react';

function Sorter({
  sorterActions,
  activeSorter,
  sorterDirActions,
  activeSorterDir,
}) {
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
          // iosIcon={<Icon style={{ fontSize: 20 }} name="arrow-down" />}
          style={{ fontSize: 15, color: 'black' }}
          // placeholderIconColor="#007aff"
          selectedValue={activeSorter}
          onValueChange={selectSorter}>
          <Picker.Item label="마감일" value="DUE" />
          <Picker.Item label="시작일" value="OUT" />
          <Picker.Item label="제목" value="TITLE" />
        </Picker>
      </View>
      <Button style={styles.button} onPress={onChangeSortDir}>
        {activeSorterDir === 'ASC' ? (
          <Icon size={15} name="arrow-down" />
        ) : (
          <Icon size={15} name="arrow-up" />
        )}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: '#bbb',
    marginRight: 15,
    width: 45,
  },

  selector: {},
  picker: {},
});
