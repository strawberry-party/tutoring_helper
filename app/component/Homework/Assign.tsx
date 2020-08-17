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

  const cardStyle = isCompleted ? styles.completedCard : styles.incompletedCard;
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
        <Card style={cardStyle}>
          <CardItem
            header
            bordered
            style={{
              flex: 1,
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
            <Text> </Text>
            <Text style={{ fontWeight: '400', flex: 2 }}>태그</Text>
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
            <Text> {outDate} 부터 </Text>

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
  incompletedCard: { backgroundColor: 'white', borderRadius: 20, flex: 5 },
  completedCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    flex: 5,
    opacity: 0.3,
  },
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
});
