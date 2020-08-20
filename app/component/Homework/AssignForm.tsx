import { Button, Icon, Input, Item } from 'native-base';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import React, { useState } from 'react';

import { AssignType } from '../../types/homework';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';

type AddAssign = (assign: AssignType) => void;
type EditAssign = (id: string, assign: AssignType) => void;

type AddModal = 'AddModal';
type EditModal = 'EditModal';

interface AssignForm {
  hideModal: () => void;
  onSubmit: AddAssign | EditAssign;
  modalType: AddModal | EditModal;
  selectedAssignId: string;
  selectedAssign: AssignType;
}

interface MyDatePickerProps {
  day: dayjs.Dayjs;
  onConfirm: (date: Date) => void;
  msg: string;
}

function MyDatePicker({ onConfirm, day, msg }: MyDatePickerProps) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    onConfirm(date);
    hideDatePicker();
  };
  return (
    <Pressable style={styles.dateContainer} onPress={showDatePicker}>
      <Text style={styles.dateHeadline}> {msg} </Text>
      <Text style={styles.dateHeadline}>
        {day.format('MM월 DD일').toString()}
      </Text>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={new Date()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </Pressable>
  );
}

export default function FormExample({
  modalType,
  selectedAssign,
  onSubmit,
  hideModal,
  selectedAssignId,
}: AssignForm) {
  const { text, due, out } = selectedAssign;
  const [newText, setText] = useState(text);
  const [newDue, setDue] = useState(due);
  const [newOut, setOut] = useState(out);

  const handleSubmit = (e) => {
    console.log(typeof e);
    e.preventDefault();

    const newAssign: AssignType = {
      ...selectedAssign,
      text: newText,
      out: newOut,
      due: newDue,
    };

    switch (modalType) {
      case 'AddModal':
        (onSubmit as AddAssign)(newAssign);
        break;
      case 'EditModal':
        (onSubmit as EditAssign)(selectedAssignId, newAssign);
        break;

      default:
        console.error('SOMETHING WENT WRONG in FormExample/handleSubmit');
    }

    hideModal();
  };

  const onConfirmOut = (date: Date) => {
    console.warn('날짜 선택(시작): ', dayjs(date).format('MM/DD').toString());
    setOut(dayjs(date));
  };
  const onConfirmDue = (date: Date) => {
    console.warn('날짜 선택(마감): ', dayjs(date).format('MM/DD').toString());
    setDue(dayjs(date));
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.formContainer}>
        <View
          style={{
            padding: 15,
          }}>
          <View style={styles.inputContainer}>
            <Text style={styles.headline}> 제목 </Text>
            <Item>
              <Input
                value={newText}
                onChange={({ nativeEvent: { text } }) => {
                  setText(text);
                }}
                style={{ fontSize: 18 }}
              />
            </Item>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.headline}> 기한 </Text>
            <View style={{ padding: 10 }}>
              <MyDatePicker
                onConfirm={onConfirmOut}
                day={newOut}
                msg={'시작'}
              />
              <MyDatePicker
                onConfirm={onConfirmDue}
                day={newDue}
                msg={'마감'}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          style={{
            ...styles.button,
            backgroundColor: '#bbb',
          }}
          onPressIn={handleSubmit}>
          <Icon name="save-outline" />
        </Button>

        <TouchableHighlight
          style={{
            ...styles.button,
            backgroundColor: 'red',
          }}
          onPress={hideModal}>
          <Text style={styles.buttonText}>취소</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    borderColor: 'pink',
    borderWidth: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formContainer: {
    borderColor: 'skyblue',
    borderWidth: 2,
    width: 270,
  },
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
    marginBottom: 10,
    height: 40,
  },

  buttonContainer: {
    flex: 1,
    justifyContent: 'space-between',
    width: 150,
    paddingVertical: 10,
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    flex: 1,
    width: 100,
    justifyContent: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
