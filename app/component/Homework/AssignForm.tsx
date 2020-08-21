import { Button, Fab, Icon, Input, Item } from 'native-base';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Tag, { TagForm } from '../Tag';

import { AssignType } from '../../types/homework';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { TagType } from '../../types/root';
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
  tags: Map<string, TagType>;
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

export default function AssignForm({
  modalType,
  selectedAssign,
  onSubmit,
  hideModal,
  selectedAssignId,
  tags,
}: AssignForm) {
  const { text, due, out } = selectedAssign;
  const [newText, setText] = useState(text);
  const [newDue, setDue] = useState(due);
  const [newOut, setOut] = useState(out);
  const tagKeyList = Array.from(tags.keys());
  const handleSubmit = () => {
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
        console.error('SOMETHING WENT WRONG in AssignForm/handleSubmit');
    }

    hideModal();
  };

  const onConfirmOut = (date: Date) => {
    setOut(dayjs(date));
  };
  const onConfirmDue = (date: Date) => {
    setDue(dayjs(date));
  };

  function getTagComponents(style = {}) {
    // return <Text> Hello world </Text>

    var tagComponents: JSX.Element[] = [];
    var tagFrags: JSX.Element[] = [];
    var sumOfNameLen: number = 0;
    for (var index = 0; index < tags.size + 1; index++) {
      if (index === tags.size) {
        tagFrags.push(<TagForm style={style} />);
        sumOfNameLen += 8
      } else {
        var id = tagKeyList[index];
        var tag = tags.get(id);
        sumOfNameLen += tag.name.length;
        tagFrags.push(<Tag tag={tag} style={style} id={id} key={id} />);
      }

      if (sumOfNameLen > 9) {
        tagComponents.push(
          <View style={styles.tagFragContainer} key={index.toString()}>
            {tagFrags}
          </View>,
        );
        tagFrags = [];
        sumOfNameLen = 0;
      }
    }
    tagComponents.push(
      <View style={styles.tagFragContainer} key={'tagForm'}>
        {tagFrags}
      </View>,
    );
    return tagComponents;
  }

  return (
    <View style={styles.container}>
      <Fab style={styles.button} onPress={handleSubmit}>
        <Icon name="save-outline" />
      </Fab>

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

          <View style={styles.inputContainer}>
            <Text style={styles.headline}> 태그 </Text>
            <View style={styles.tagContainer}>
              {getTagComponents({ margin: 3 })}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  tagFragContainer: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagContainer: {
    padding: 5,
  },
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
    position: 'absolute',
    bottom: 340,
    elevation: 2,
    justifyContent: 'center',
    backgroundColor: '#aec6df',
    zIndex: 1,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
