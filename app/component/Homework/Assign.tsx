import {
  Accordion,
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Text,
  View,
} from 'native-base';
import {
  AssignListType,
  AssignType,
} from '../../types/homework';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';

import Moment from 'moment';
import SwipeRow from './SwipeRow';
import { log } from 'react-native-reanimated';

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
  
  onComplete,
  onIncomplete,
  onRemove,
  onStartEdit,
  id,
}: AssignProps) {
  function _renderHeader(item: AccordionItem, expanded: boolean) {
    const { desc, due, out, isCompleted, status } = item.raw;
    const dueDate = due.format('MM/DD');
    const outDate = out.format('MM/DD');
    return (
      <Card style={{ backgroundColor: 'white', borderRadius: 20 }}>
        <CardItem
          header
          bordered
          style={{
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 20,
          }}>
          <Text
            style={{
              ...styles.text,
              textDecorationLine: isCompleted ? 'line-through' : 'none',
            }}>
            {outDate} 숙제{' '}
          </Text>

          {/* <TouchableOpacity>
            {expanded ? (
              <Text style={{ fontSize: 18 }}>⏫</Text>
            ) : (
              //   <Icon style={{ fontSize: 18 }} name="remove-circle" />
              <Text style={{ fontSize: 18 }}>🔽</Text>
              // <Icon style={{ fontSize: 18 }} name="add-circle" />
            )}
          </TouchableOpacity> */}
          {/* 
          <Button
            onPress={() => console.log('button pressed')}>
            {expanded ? (
              <Text style={{ fontSize: 18 }}>접기</Text>
            ) : (
              <Text style={{ fontSize: 18 }}>펼치기</Text>
            )}
          </Button> */}

          <TouchableOpacity
            onPress={onStartEdit}
            style={{
              margin: 10,
              backgroundColor: '#f9f9f9',
            }}>
            <Text style={{ fontSize: 20 }}>✏</Text>
          </TouchableOpacity>
        </CardItem>

        <CardItem bordered style={{ borderRadius: 20 }}>
          <Body>
            <Text style={{ fontWeight: '700' }}>{title}</Text>
            <Text style={{ fontWeight: '400' }}>{desc}</Text>
          </Body>
        </CardItem>
        <CardItem
          footer
          bordered
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: 20,
          }}>
          <Text style={{ flex: 4 }}>DUE: {dueDate} </Text>
          <Text style={{ flex: 2 }}> {status * 100} % 완료 </Text>

          {isCompleted ? (
            <TouchableOpacity
              onPress={onIncomplete}
              style={{
                margin: 10,
                backgroundColor: '#f9f9f9',
              }}>
              <Text style={{ fontSize: 30 }}>■</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={onComplete}
              style={{
                margin: 10,
                backgroundColor: '#f9f9f9',
              }}>
              <Text style={{ fontSize: 30 }}>□</Text>
            </TouchableOpacity>
          )}
        </CardItem>
      </Card>
    );
  }

  function _renderContent(item: AccordionItem) {
    const { desc, due, out, isCompleted, status, id } = item.raw;

    return (
      <View>
        <Card>
          <CardItem bordered header>
            <Text> Content Header </Text>
          </CardItem>
          <CardItem bordered style={{ borderRadius: 20 }}>
            <Text> Content Body </Text>
          </CardItem>
        </Card>
      </View>
    );
  }

  return (
    <SwipeRow onSwipe={onRemove} swipeThreshold={-100}>
      <Accordion
        style={styles.cardView}
        dataArray={[
          {
            raw: { title, desc, due, out, isCompleted, status, id },
          },
        ]}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
      />
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
