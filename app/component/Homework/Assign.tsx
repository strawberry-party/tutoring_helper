import {
  Accordion,
  Body,
  Button,
  Card,
  CardItem,
  Icon,
  Text,
  View,
} from 'native-base';
import { AssignListType, AssignType } from '../../types/homework';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';

import { CheckBox } from 'react-native-elements';
import SwipeRow from './SwipeRow';

interface State {
  isEditing: boolean;
  assignValue: AssignType;
  isOpened: boolean;
}

interface AssignProps extends AssignType {
  onComplete: () => void;
  onIncomplete: () => void;
  onRemove: () => void;
  onStartEdit: () => void;
}

function Assign({
  title,
  desc,
  due,
  out,
  isCompleted,
  status,

  onComplete,
  onIncomplete,
  onRemove,
  onStartEdit,
  id,
}: AssignProps) {
  const dueDate = due.format('MM/DD');
  const outDate = out.format('MM/DD');

  return (
    <SwipeRow onSwipe={onRemove} swipeThreshold={-100}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderColor: '#eee',
          borderBottomWidth: 0.5,
          padding: 5,
        }}>
        <Card style={{ backgroundColor: 'white', borderRadius: 20, flex: 5 }}>
          <CardItem
            header
            bordered
            style={{
              flex:1,
              flexDirection: 'row',
              padding: 5,
              justifyContent: 'space-evenly',
              alignItems: 'center',
              borderRadius: 20,
            }}>
            <Text
              style={{
                fontWeight: '700',
                flex: 1,
                borderRightColor: '#bbb',
                borderRightWidth: 1,

              }}>
              {title}
            </Text>
            <Text>  </Text>
            <Text style={{ fontWeight: '400', flex: 2 }}>{desc}</Text>
          </CardItem>

          <CardItem
            footer
            bordered
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderRadius: 20,
            }}>
            <Text style={{ flex: 4 }}> </Text>
            <Text> {dueDate} 까지 </Text>
          </CardItem>
        </Card>

        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: '#eee',
            padding: 5,
          }}>
          <CheckBox
            size={36}
            checked={isCompleted}
            onPress={isCompleted ? onIncomplete : onComplete}
          />

          <Button
            icon={true}
            onPress={onStartEdit}
            style={{ borderRadius: 20, backgroundColor: '#bbb' }}>
            <Icon name="pencil" />
          </Button>
        </View>
      </View>
    </SwipeRow>
  );
}

export default Assign;

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  cardView: {
    margin: 5,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 20,
  },
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
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  input: {
    width: width / 2,
    marginVertical: 15,
    paddingBottom: 5,
  },
  leftAction: {
    backgroundColor: '#FFFFFB',
    flexGrow: 1,
    marginVertical: 5,
    marginHorizontal: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 20,
    paddingLeft: 40,
  },
  textAction: {
    fontSize: 30,
    color: 'white',
  },
});
