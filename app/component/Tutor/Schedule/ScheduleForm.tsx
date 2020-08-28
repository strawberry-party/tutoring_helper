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
import Tag, { TagForm } from '../../Tag';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { ScheduleType } from '../../../types/schedule';
import { TagType } from '../../../types/root';
import dayjs from 'dayjs';
import { name } from 'dayjs/locale/*';

type AddSchedule = (assign: ScheduleType) => void;
type EditSchedule = (id: string, assign: ScheduleType) => void;

type AddModal = 'AddModal';
type EditModal = 'EditModal';

interface ScheduleForm {
  hideModal: () => void;
  onSubmit: AddSchedule | EditSchedule;
  modalType: AddModal | EditModal;
  selectedScheduleId: string;
  selectedSchedule: ScheduleType;
  tags: Map<string, TagType>;
  onAddTag: (tag: TagType) => void;
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

export default function ScheduleForm({
  modalType,
  selectedSchedule,
  onSubmit,
  hideModal,
  selectedScheduleId,
  tags,
  onAddTag,
}: ScheduleForm) {
  const { text, begin, end, tagId } = selectedSchedule;
  const [newText, setText] = useState(text);
  const [newBegin, setBegin] = useState(begin);
  const [newEnd, setEnd] = useState(end);
  const [selectedTagId, selectTag] = useState(tagId);

  const tagKeyList = Array.from(tags.keys());
  const handleSubmit = () => {
    const newSchedule: ScheduleType = {
      ...selectedSchedule,
      text: newText,
      begin: newEnd,
      end: newBegin,
      tagId: selectedTagId,
    };

    switch (modalType) {
      case 'AddModal':
        (onSubmit as AddSchedule)(newSchedule);
        break;
      case 'EditModal':
        (onSubmit as EditSchedule)(selectedScheduleId, newSchedule);
        break;

      default:
        console.error('SOMETHING WENT WRONG in ScheduleForm/handleSubmit');
    }

    hideModal();
  };

  const onConfirmEnd = (date: Date) => {
    setEnd(dayjs(date));
  };
  const onConfirmBegin = (date: Date) => {
    setBegin(dayjs(date));
  };

  function getTagComponents(style = {}) {
    var tagComponents: JSX.Element[] = [];

    for (var index = 1; index < tags.size; index++) {
      var id = tagKeyList[index];
      var tag = tags.get(id);

      tagComponents.push(
        <Tag
          tag={tag}
          style={style}
          id={id}
          key={id}
          isSelected={selectedTagId === id}
          onSelect={(id: string) => {
            console.log(id + ' select');

            if (selectedTagId === id) selectTag('none');
            else selectTag(id);
          }}
        />,
      );
    }
    tagComponents.push(
      <TagForm style={style} onAddTag={onAddTag} key="tagForm" />,
    );

    return tagComponents;
  }

  return (
    <View style={styles.container}>
      <Fab style={styles.button} onPress={handleSubmit}>
        <Icon name="save-endline" />
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
                onConfirm={onConfirmEnd}
                day={newEnd}
                msg={'시작'}
              />
              <MyDatePicker
                onConfirm={onConfirmBegin}
                day={newBegin}
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
  tagContainer: {
    padding: 5,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  container: {
    flexGrow: 1,
    borderColor: 'pink',
    // borderWidth: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  formContainer: {
    borderColor: 'skyblue',
    // borderWidth: 2,
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
