import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from 'react-native-table-component';

const Achievement = ({lessonId, bookArray}) => {
  // console.log(bookArray[0].info.contents);
  // const chapters = bookArray.forEach(book => {
  //   book.info.contents
  // });
  
  const [state, setState] = useState({
    tableHead: ['맞은 문제 수', '총 문제 수', '소요시간'],
    tableTitle: [],
    data: [],
  });

  return (
    <View style={styles.container}>
      <Table borderStyle={{ borderWidth: 1 }}>
        <Row
          data={state.tableHead}
          style={styles.head}
          textStyle={styles.text}
        />
        <TableWrapper style={styles.wrapper}>
          <Col
            data={state.tableTitle}
            style={styles.title}
            heightArr={[28, 28]}
            textStyle={styles.text}
          />
          <Rows
            data={state.data}
            flexArr={[2, 1, 1]}
            style={styles.row}
            textStyle={styles.text}
          />
        </TableWrapper>
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  head: {
    height: 40,
    backgroundColor: '#f1f8ff',
  },
  wrapper: {
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    backgroundColor: '#f6f8fa',
  },
  row: {
    height: 28,
  },
  text: {
    margin: 6,
  },
});
const mapStateToProps = (state) => {
  return {
    bookArray: state.currentStudentReducer.book,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Achievement);
