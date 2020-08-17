import {
  Button,
  DatePicker,
  Form,
  Icon,
  Input,
  Item,
  Label,
} from 'native-base';
import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import { AssignType } from '../../types/homework';
import DateTimePicker from '@react-native-community/datetimepicker';
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
  dueDateTimeModalVisible: boolean;
  outDateTimeModalVisible: boolean;
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
      dueDateTimeModalVisible: false,
      outDateTimeModalVisible: false,
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
    const {
      title,
      out,
      due,
      dueDateTimeModalVisible,
      outDateTimeModalVisible,
    } = this.state;
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
                    console.log(outDateTimeModalVisible);
                  }}
                  style={{ fontSize: 18 }}
                />
              </Item>
            </View>
            {/* README: out */}
            <View style={styles.inputContainer}>
              <Text style={styles.headline}> 기한 </Text>
              <View style={{ padding: 10 }}>
                <Button
                  style={styles.dateContainer}
                  onPress={() => {
                    console.log('outDateTimeModalVisible');
                    this.setState({ dueDateTimeModalVisible: true });
                  }}>
                  <Text style={styles.dateHeadline}>시작</Text>
                  {!outDateTimeModalVisible ? (
                    <Text style={styles.dateHeadline}>
                      {out.format('MM월 DD일').toString()}
                    </Text>
                  ) : (
                    <DateTimePicker
                      value={now.toDate()}
                      mode={'date'}
                      display={'calendar'}
                      onChange={(e, date: Date) =>
                        this.setState({ out: dayjs(date) })
                      }
                      onResponderTerminate={() => {
                        console.log('outDateTimeModalVisible false');
                        this.setState({ outDateTimeModalVisible: false });
                      }}
                    />
                  )}
                </Button>

                <Button
                  style={styles.dateContainer}
                  onPress={() => {
                    console.log('dueDateTimeModalVisible');
                    this.setState({ dueDateTimeModalVisible: true });
                  }}>
                  <Text style={styles.dateHeadline}>마감</Text>

                  {!dueDateTimeModalVisible ? (
                    <Text style={styles.dateHeadline}>
                      {due.format('MM월 DD일').toString()}
                    </Text>
                  ) : (
                    <DateTimePicker
                      value={now.toDate()}
                      mode={'date'}
                      display={'calendar'}
                      onChange={(e, date: Date) =>
                        this.setState({ due: dayjs(date) })
                      }
                      onResponderTerminate={() => {
                        console.log('dueDateTimeModalVisible false');
                        this.setState({ dueDateTimeModalVisible: false });
                      }}
                    />
                  )}
                </Button>
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
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
    minWidth: 30,
    alignSelf: 'center',
    marginRight: 15,
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
    backgroundColor: '#bbb',
    margin: 5,
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
