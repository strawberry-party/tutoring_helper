import {
  Accordion,
  Body,
  Button,
  Card,
  CardItem,
  Text,
  View,
} from 'native-base';
import {
  AssignListType,
  AssignType,
  SubAssignType,
} from '../../types/homework';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';

import Moment from 'moment';
import SubAssign from './SubAssign';

interface State {
  isEditing: boolean;
  assignValue: AssignType;
  isOpened: boolean;
}

interface AssignProps extends AssignType {
  onComplete: () => void;
  onIncomplete: () => void;
  onRemove: () => void;
  // isEditing: boolean;
}

const toBeImplemented = (id: any) => alert(id + ': not yet implemented!');

interface AccordionItem {
  raw: AssignType;
}

function Assign({
  title,
  desc,
  due,
  out,
  isCompleted,
  status,
  subAssigns,
  onComplete,
  onIncomplete,
  onRemove,
}: AssignProps) {
  function _renderHeader(item: AccordionItem, expanded: boolean) {
    const { desc, due, out, isCompleted, status, subAssigns } = item.raw;
    const dueDate = Moment(due).format('MM/DD');
    const outDate = Moment(out).format('MM/DD');

    return (
      <Card style={{ backgroundColor: 'white', borderRadius: 10 }}>
        <CardItem
          header
          bordered
          style={{
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#A9DAD6',
          }}>
          <Text
            style={{
              ...styles.text,
              textDecorationLine: isCompleted ? 'line-through' : 'none',
            }}>
            {' '}
            {outDate} 숙제{' '}
          </Text>
          <Text> {status * 100} % 완료 </Text>
          {expanded ? (
            <Text style={{ fontSize: 18 }}>⏫</Text>
          ) : (
            //   <Icon style={{ fontSize: 18 }} name="remove-circle" />
            <Text style={{ fontSize: 18 }}>🔽</Text>

            // <Icon style={{ fontSize: 18 }} name="add-circle" />
          )}
          {isCompleted ? (
            <TouchableOpacity
              onPress={onIncomplete}
              style={{
                margin: 10,
                backgroundColor: '#f9f9f9',
              }}>
              <Text>Un-Complete</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={onComplete}
              style={{
                margin: 10,
                backgroundColor: '#f9f9f9',
              }}>
              <Text>Complete</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={onRemove}
            style={{
              margin: 10,
              backgroundColor: '#f9f9f9',
            }}>
            <Text>Remove</Text>
          </TouchableOpacity>
        </CardItem>

        <CardItem bordered>
          <Body>
            <Text style={{ fontWeight: '700' }}>{title}</Text>
            <Text style={{ fontWeight: '400' }}>{desc}</Text>
          </Body>
        </CardItem>
        <CardItem
          footer
          bordered
          style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <Text>DUE: {dueDate} </Text>
        </CardItem>
      </Card>
    );
  }

  function _renderContent(item: AccordionItem) {
    const { desc, due, out, isCompleted, status, subAssigns } = item.raw;
    const subAssignList = subAssigns.map((subAssign: SubAssignType) => {
      return (
        <Text key={subAssign.id}>{subAssign.text}</Text>
        // <SubAssign
        //   {...subAssign}
        //   incompleteToDo={toBeImplemented}
        //   completeToDo={toBeImplemented}
        //   updateToDo={toBeImplemented}
        //   key={subAssign.id}
        // />
      );
    });

    return (
      <View>
        <Card>
          <CardItem bordered>
            <Body>{subAssignList}</Body>
          </CardItem>
        </Card>
      </View>
    );
  }

  return (
    <Accordion
      style={{
        backgroundColor: 'blue',
        borderRadius: 10,
        padding: 10,
        margin: 5,
      }}
      dataArray={[
        { raw: { title, desc, due, out, isCompleted, status, subAssigns } },
      ]}
      renderHeader={_renderHeader}
      renderContent={_renderContent}
    />
  );
}

export default Assign;

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    marginRight: 20,
  },
  completedCircle: {
    borderColor: '#bbb',
  },
  uncompletedCircle: {
    borderColor: '#F23657',
  },
  text: {
    fontWeight: '600',
    fontSize: 20,
  },
  completedText: {
    color: '#bbb',
    textDecorationLine: 'line-through',
  },
  uncompletedText: {
    color: '#353839',
  },
  column: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width / 2,
  },
  actions: {
    flexDirection: 'row',
  },
  actionText: {},
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  input: {
    width: width / 2,
    marginVertical: 15,
    paddingBottom: 5,
  },
});
