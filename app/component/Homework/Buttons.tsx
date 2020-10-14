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
  button: {
    backgroundColor: '#aec6df',
    borderColor: 'transparent',
    width: 60,
    elevation: 0,
  },
});
