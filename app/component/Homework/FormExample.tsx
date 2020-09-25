import { Container, Content, DatePicker, Form, Input, Item } from 'native-base';
import React, { Component, useState } from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native'

import { AssignType } from '../../types/homework';

interface FormExampleProps {
  addAssign: (assign: AssignType) => void;
  hideModal: () => void;
}

interface FormInputState {
  due: Date;
  title: string;
  desc: string;
}

const now = new Date(Date.now());

export default class FormExample extends Component<
  FormExampleProps,
  FormInputState
> {
  constructor(props) {
    super(props);
    this.state = {
      due: now,
      title: '',
      desc: '',
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, desc, due } = this.state;
    console.log('handleSubmit');
    
    console.log(title, desc, due);
    this.props.addAssign({
      title,
      desc,
      due,
      out: now,
      isCompleted: false,
      status: 0,
      subAssigns: [],
      id: title, // id 어떻게 추가할지 수정해야함
    });
  };

  render() {
    const { title, desc, due } = this.state;

    return (
      <Container
        style={{
          paddingBottom: 30,
          width: 250,
          maxHeight: 250,
        }}>
        <Content
          style={{
            backgroundColor: 'white',
          }}>
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
                defaultDate={now}
                locale={'kr'}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={'fade'}
                androidMode={'default'}
                placeHolderText="제출 기한"
                textStyle={{ color: 'black' }}
                placeHolderTextStyle={{ color: 'black' }}
                onDateChange={(date) => this.setState({ due: date })}
                disabled={false}
              />
            </Item>
          </Form>
          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
            onPress={this.handleSubmit}>
            <Text style={styles.textStyle}>새로운 숙제 추가하기</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: 'red' }}
            onPress={this.props.hideModal}>
            <Text style={styles.textStyle}>취소</Text>
          </TouchableHighlight>
        </Content>
      </Container>
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
