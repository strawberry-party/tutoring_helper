import {
  Button,
  DatePicker,
  Form,
  Icon,
  Input,
  Item,
  Label,
} from 'native-base';
import React, { Component, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import { AssignType } from '../../types/homework';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
  out: dayjs.Dayjs;
  title: string;
}

const now = dayjs();

export default class FormExample extends Component<
  FormExampleProps,
  FormInputState
> {
  constructor(props) {
    super(props);
    const { modalType, selectedAssign } = this.props;
    const { title, due, out } = selectedAssign;

    this.state = {
      title,
      due,
      out,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, due, out } = this.state;
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
      out,
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
    const { title, out, due } = this.state;
    return (
      <View
        style={{
          flexGrow: 1,
          borderColor: 'pink',
          borderWidth: 2,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <ScrollView
          style={{
            borderColor: 'skyblue',
            borderWidth: 2,
            width: 270,
          }}>
          <View
            style={{
              padding: 15,
            }}>
            <View style={styles.inputContainer}>
              <Text style={styles.headline}> 제목 </Text>
              <Item>
                <Input
                  value={title}
                  onChange={({ nativeEvent: { text } }) => {
                    this.setState({ title: text });
                  }}
                  style={{ fontSize: 18 }}
                />
              </Item>
            </View>
            {/* README: out */}
            <View style={styles.inputContainer}>
              <Text style={styles.headline}> 기한 </Text>
              <View style={{ padding: 10 }}>
                <View style={styles.dateContainer}>
                  <Text style={styles.dateHeadline}>시작</Text>
                  <DatePicker
                    defaultDate={now.toDate()}
                    locale={'kr'}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={'fade'}
                    androidMode={'default'}
                    placeHolderText={out.format('MM/DD').toString()}
                    textStyle={{ color: 'black' }}
                    placeHolderTextStyle={{ color: 'black' }}
                    onDateChange={(date: Date) =>
                      this.setState({ out: dayjs(date) })
                    }
                    disabled={false}
                  />
                </View>

                <View style={styles.dateContainer}>
                  <Text style={styles.dateHeadline}>마감</Text>
                  <DatePicker
                    defaultDate={now.toDate()}
                    locale={'kr'}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={'fade'}
                    androidMode={'default'}
                    placeHolderText={due.format('MM/DD').toString()}
                    textStyle={{ color: 'black' }}
                    placeHolderTextStyle={{ color: 'black' }}
                    onDateChange={(date: Date) =>
                      this.setState({ due: dayjs(date) })
                    }
                    disabled={false}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            width: 150,
            paddingVertical: 10,
          }}>
          <Button
            style={{ ...styles.openButton, backgroundColor: '#bbb' }}
            onPressIn={this.handleSubmit}>
          
            <Icon name="save-outline" />
          </Button>

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
  inputContainer: {
    padding: 10,
    justifyContent: 'flex-start',
  },
  dateHeadline: {
    fontSize: 15,
    fontWeight: '700',
    color: 'black',
    minWidth: 30,
    alignSelf: 'center',
  },
  headline: {
    fontSize: 15,
    fontWeight: '700',
    color: '#bbb',
  },
  dateContainer: {
    minWidth: 150,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    flex: 1,
    width: 100,
    justifyContent: 'center',
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
