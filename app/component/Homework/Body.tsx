import {} from 'react-native';

import AssignList, { AssignListType } from './AssignList';
import { Form, Input, Item } from 'native-base';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Assign } from './Assign';
import React from 'react';
import { SubAssign } from './SubAssign';

const subAssign1: Array<SubAssign> = [
  { text: '10-1 단원 풀어오기', isCompleted: false, id: '1' },
  { text: '10-2 단원 풀어오기', isCompleted: false, id: '2' },
  { text: '10-3 단원 풀어오기', isCompleted: false, id: '3' },
];

const assign1: Assign = {
  id: '1',
  title: '수학의 정석 10단원',
  desc: '풀어와',
  due: new Date('2020-07-18'),
  out: new Date('2020-07-18'),
  isCompleted: false,
  status: 0,
  subAssigns: subAssign1,
};

const subAssign2: Array<SubAssign> = [
  { text: '9-1 단원 풀어오기', isCompleted: false, id: '1' },
  { text: '9-2 단원 풀어오기', isCompleted: false, id: '2' },
  { text: '9-3 단원 풀어오기', isCompleted: false, id: '3' },
];

const assign2: Assign = {
  id: '2',
  title: '수학의 정석 9단원',
  desc: '풀어와',
  due: new Date('2020-07-16'),
  out: new Date('2020-07-16'),
  isCompleted: true,
  status: 1,
  subAssigns: subAssign2,
};

const assignList: AssignListType = {
  assigns: [assign1, assign2],
};
export default class Homework extends React.Component<any, any> {
  render() {
    return (
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={{ backgroundColor: 'blue', padding: 10, flexGrow: 1 }}>
            <Text>Homework Body</Text>
            <AssignList {...assignList} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: 500,
    width: '100%',
    padding: 30,
    flexGrow: 1,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
