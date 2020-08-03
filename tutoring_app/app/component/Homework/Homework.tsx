import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';

import Body from './Body';
import { Container } from 'native-base';
import FormWrapper from './AddAssignModal';
import Status from './Status';

class Homework extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.titleText}>숙제 관리</Text>
        <Status />
        <Body />
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
