import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

import Status from './Status';

class Homework extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.titleText}>숙제 관리</Text>
        <Status />
      </SafeAreaView>
    );
  }
}

export default Homework;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    margin: 40,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
