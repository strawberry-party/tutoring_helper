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
  SubAssignType,
} from '../../types/homework';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';

import AddSubAssign from './AddSubAssign';
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
            borderRadius: 20,
          }}>
          <Text
            style={{
              ...styles.text,
              textDecorationLine: isCompleted ? 'line-through' : 'none',
            }}>
            {' '}
            {outDate} 숙제{' '}
          </Text>
          {expanded ? (
            <Text style={{ fontSize: 18 }}>⏫</Text>
          ) : (
            //   <Icon style={{ fontSize: 18 }} name="remove-circle" />
            <Text style={{ fontSize: 18 }}>🔽</Text>

            // <Icon style={{ fontSize: 18 }} name="add-circle" />
          )}

          <TouchableOpacity
            onPress={() => console.log('수정 아직 구현안함')}
            style={{
              margin: 10,
              backgroundColor: '#f9f9f9',
            }}>
            <Text style={{ fontSize: 20 }}>✏</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onRemove}
            style={{
              margin: 10,
              backgroundColor: '#f9f9f9',
            }}>
            <Text>❌</Text>
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
          <Text style={{flex: 4}}>DUE: {dueDate} </Text>
          <Text style={{flex: 2}}> {status * 100} % 완료 </Text>

          {isCompleted ? (
            <TouchableOpacity
              onPress={onIncomplete}
              style={{
                margin: 10,
                backgroundColor: '#f9f9f9',
              }}>
              <Text>■</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={onComplete}
              style={{
                margin: 10,
                backgroundColor: '#f9f9f9',
              }}>
              <Text>□</Text>
            </TouchableOpacity>
          )}
        </CardItem>
      </Card>
    );
  }

  function _renderContent(item: AccordionItem) {
    const { desc, due, out, isCompleted, status, subAssigns } = item.raw;
    const subAssignList = subAssigns.map((subAssign: SubAssignType) => {
      return (
        <SubAssign
          {...subAssign}
          incompleteSubAssign={toBeImplemented}
          completeSubAssign={toBeImplemented}
          updateSubAssign={toBeImplemented}
          key={subAssign.id}
        />
      );
    });

    return (
      <View>
        <Card>
          <CardItem bordered header>
            <AddSubAssign addSubAssign={() => console.log('dd')}/>
          </CardItem>
          <CardItem bordered style={{ borderRadius: 20 }}>
          
            <Body>{subAssignList}</Body>
          </CardItem>
        </Card>
      </View>
    );
  }

  return (
    <Accordion
      style={
        // backgroundColor: 'blue',
        // borderRadius: 10,
        // padding: 10,
        // margin: 5,
        styles.cardView
      }
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
  cardView: {
    margin: 5,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 20,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
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
