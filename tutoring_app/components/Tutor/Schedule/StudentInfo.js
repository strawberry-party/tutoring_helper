import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

class StudentInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['학생', '날짜', '상세보기'],
      tableData: [
        ['김태형', '월, 수 18:00~19:30', 'Button'],
        ['최상아', '수, 금 16:00~17:30', 'Button'],
      ]
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={this.state.tableData} style={styles.row} textStyle={styles.text}/>
        </Table>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  row: { height: 50 },
  text: { margin: 6 }
});

export default StudentInfo;