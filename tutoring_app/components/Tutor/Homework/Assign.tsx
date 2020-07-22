import {
  Accordion,
  Body,
  Card,
  CardItem,
  Container,
  Content,
  Header,
  Icon,
  Text,
  View,
} from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';
import LoremScroll, { Lorem } from './LoremScroll';
import React, { Component } from 'react';
import SubAssign, { SubAssignProps } from './SubAssign';

import Moment from 'moment';

export interface AssignProps {
  id: string;
  title: string;
  desc: string;
  due: Date;
  out: Date;
  isCompleted: boolean;
  status: number;
  subAssigns: Array<SubAssignProps>;
}

interface State {
  isEditing: boolean;
  assignValue: AssignProps;
  isOpened: boolean;
}

const toBeImplemented = () => alert('not yet implemented!');

class Assign extends Component<AssignProps, State> {
  _renderHeader(item, expanded) {
    const {
      title,
      desc,
      due,
      out,
      isCompleted,
      status,
      subAssigns,
    }: AssignProps = item.raw;
    console.log(due);

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
          <Text style={styles.text}> {outDate} 숙제 </Text>
          {expanded ? (
            <Icon style={{ fontSize: 18 }} name="remove-circle" />
          ) : (
            <Icon style={{ fontSize: 18 }} name="add-circle" />
          )}
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

  _renderContent(item) {
    const { desc, due, out, isCompleted, status, subAssigns } = item.raw;
    const subAssignList = subAssigns.map((subAssign) => {
      return (
        <SubAssign
          {...subAssign}
          uncompleteToDo={toBeImplemented}
          completeToDo={toBeImplemented}
          updateToDo={toBeImplemented}
          key={subAssign.id}
        />
      );
    });
    return (
      <View>
        <Card>
          <CardItem bordered>
            {/* <Body>{subAssignList}</Body> */}
            <Body>
              {Lorem}
              {Lorem}
              {Lorem}
            </Body>
          </CardItem>
        </Card>
      </View>
    );
  }

  render() {
    const { title } = this.props;

    const data = [{ title: title, raw: this.props }];
    return (
      <Accordion
        style={{
          backgroundColor: 'blue',
          borderRadius: 10,
          padding: 10,
          margin: 5,
        }}
        dataArray={data}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
      />
    );
  }
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
