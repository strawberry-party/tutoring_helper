import { DataTable } from 'react-native-paper';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native';

export default function MakeAchievementTable({ title }) {
  const [text, setText] = React.useState('');

  return (
    <DataTable.Row>
      <DataTable.Cell style={styles.textCell}>{title}</DataTable.Cell>
      <DataTable.Cell style={styles.textCell}>A단계</DataTable.Cell>
      <TextInput
        value={text}
        onChangeText={(text) => setText(text)}
        textAlign="right"
        placeholder="입력"
      />
      <DataTable.Cell numeric>10</DataTable.Cell>
      <DataTable.Cell numeric>50</DataTable.Cell>
    </DataTable.Row>
  );
}
const styles = StyleSheet.create({
  textCell: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
