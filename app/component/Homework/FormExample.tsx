import { Container, Content, DatePicker, Form, Input, Item } from 'native-base';
import React, { Component, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import { AssignType } from '../../types/homework';
import dayjs from 'dayjs';

type AddAssign = (assign: AssignType) => void;
type EditAssign = (id: string, assign: AssignType) => void;

type AddModal = 'AddModal';
type EditModal = 'EditModal';

interface FormExampleProps {
  hideModal: () => void;
  onSubmit: AddAssign | EditAssign;
  modalType: AddModal | EditModal;
  selectedAssignId: string;
  selectedAssign: AssignType;
}

interface FormInputState {
  due: dayjs.Dayjs;
  title: string;
  desc: string;
}

const now = dayjs();

export default class FormExample extends Component<
  FormExampleProps,
  FormInputState
> {
  constructor(props) {
    super(props);
    const { modalType, selectedAssign } = this.props;
    const { title, desc, due } = selectedAssign;

    this.state = {
      title,
      desc,
      due,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, desc, due } = this.state;
    const {
      onSubmit,
      modalType,
      hideModal,
      selectedAssign,
      selectedAssignId,
    } = this.props;

    const newAssign: AssignType = {
      ...selectedAssign,
      title,
      desc,
      due,
    };

    switch (modalType) {
      case 'AddModal':
        (onSubmit as AddAssign)(newAssign);
        break;
      case 'EditModal':
        (onSubmit as EditAssign)(selectedAssignId, newAssign);
        break;

      default:
        console.log('something went wrong');
    }

    hideModal();
  };

  render() {
    const { title, desc, due } = this.state;

    return (
      <View
        style={{
          width: 250,
          flexGrow: 1,
          height: 300,
          backgroundColor: 'pink',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <ScrollView
          style={{ backgroundColor: 'skyblue', height: 100, width: 250 }}>
          <View>
            <Form>
              <Item>
                <Input
                  placeholder="숙제 제목"
                  value={title}
                  onChange={({ nativeEvent: { text } }) => {
                    this.setState({ title: text });
                  }}
                />
              </Item>
              <Item>
                <Input
                  placeholder="설명"
                  multiline={true}
                  value={desc}
                  onChange={({ nativeEvent: { text } }) => {
                    this.setState({ desc: text });
                  }}
                />
              </Item>
              <Item last>
                <DatePicker
                  defaultDate={now.toDate()}
                  locale={'kr'}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={'fade'}
                  androidMode={'default'}
                  placeHolderText="제출 기한"
                  textStyle={{ color: 'black' }}
                  placeHolderTextStyle={{ color: 'black' }}
                  onDateChange={(date: Date) => this.setState({ due: dayjs(date) })}
                  disabled={false}
                />
              </Item>
            </Form>
          </View>
        </ScrollView>

        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            width: 150,
            paddingVertical: 10,
          }}>
          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
            onPress={this.handleSubmit}>
            <Text style={styles.textStyle}>저장</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: 'red' }}
            onPress={this.props.hideModal}>
            <Text style={styles.textStyle}>취소</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 300,
    height: 350,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    backgroundColor: 'white',
  },
});
