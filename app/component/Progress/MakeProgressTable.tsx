import { Checkbox, DataTable } from 'react-native-paper';

import React from 'react';
import { StyleSheet } from 'react-native';

export default function MakeProgressTable({ title, checked }) {
  const [check, setChecked] = React.useState(checked);

  return (
    <DataTable.Row>
      <DataTable.Cell>태그</DataTable.Cell>
      <DataTable.Cell>태그</DataTable.Cell>
      <DataTable.Cell style={styles.textMoreFlex}>{title}</DataTable.Cell>
      <DataTable.Cell style={styles.checkbox}>
        <Checkbox
          status={check ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!check);
          }}
        />
      </DataTable.Cell>
    </DataTable.Row>
  );
}
const styles = StyleSheet.create({
  textMoreFlex: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
