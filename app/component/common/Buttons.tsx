import { IconButton } from 'react-native-paper';
import React from 'react';
import { StyleSheet } from 'react-native';

export function FilterButton({ showFilterModal }) {
  return (
    <IconButton
      icon="filter"
      color="white"
      style={styles.button}
      onPress={() => showFilterModal()}
    />
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
    backgroundColor: '#aec6df',
    borderColor: 'transparent',
    width: 60,
    elevation: 0,
  },

  picker: {
    flex: 2,
  },
});
