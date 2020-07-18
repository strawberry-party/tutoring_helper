import React from 'react';
import { Text, View } from 'react-native';
import AssignList, { AssignListProps } from './AssignList';
import { AssignProps } from './Assign';

const assign1: AssignProps = {
  id: '1',
  title: '수학의 정석 10단원',
  desc: '풀어와',
  due: new Date('2020-07-18'),
  out: new Date('2020-07-18'),
  isCompleted: false,
  status: 0,
  subAssigns: {},
};
const assign2: AssignProps = {
  id: '2',
  title: '수학의 정석 9단원',
  desc: '풀어와',
  due: new Date('2020-07-16'),
  out: new Date('2020-07-16'),
  isCompleted: true,
  status: 1,
  subAssigns: {},
};

const assignList: AssignListProps = {
  assigns: [assign1, assign2],
};
export default class Homework extends React.Component<any, any> {
  render() {
    return (
      <View>
        <Text>Homework Body</Text>
        <AssignList {...assignList} />
      </View>
    );
  }
}
