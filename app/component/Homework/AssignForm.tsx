import { Button, Fab, Icon, Input, Item } from 'native-base';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Tag, { TagForm } from '../common/Tag';

import { AssignType } from '../../types/homework';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MyDatePicker from '../common/MyDatePicker';
import { TagPrimitiveType } from '../../types/root';
import dayjs from 'dayjs';

type AddAssign = (assign: AssignType) => void;
type EditAssign = (id: string, assign: AssignType) => void;

type AddModal = 'AddModal';
type EditModal = 'EditModal';

interface AssignFormProps {
  hideModal: () => void;
  onSubmit: AddAssign | EditAssign;
  modalType: AddModal | EditModal;
  selectedAssignId: string;
  selectedAssign: AssignType;
  bookTags: TagPrimitiveType[];
  subjectTags: TagPrimitiveType[];
}

export default function AssignForm({
  modalType,
  selectedAssign,
  onSubmit,
  hideModal,
  selectedAssignId,
  bookTags,
  subjectTags,
}: AssignFormProps) {
  const { text, due, out, tagId } = selectedAssign;
  const [newText, setText] = useState(text);
  const [newDue, setDue] = useState(due);
  const [newOut, setOut] = useState(out);
  const [selectedTagId, selectTag] = useState(tagId);

  const handleSubmit = () => {
    const newAssign: AssignType = {
      ...selectedAssign,
      text: newText,
      out: newOut,
      due: newDue,
      tagId: selectedTagId,
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

  function getTagComponents(style = {}, tags) {
    var tagComponents: JSX.Element[] = [];

    for (var index = 1; index < tags.length; index++) {
      var tag = tags[index];
      tagComponents.push(
        <Tag
          tagInfo={tag.info}
          style={style}
          id={tag.key}
          key={tag.key}
          isSelected={selectedTagId === tag.key}
          onSelect={(id: string) => {
            console.log(id + ' selected');
            if (selectedTagId === id) selectTag('none');
            else selectTag(id);
          }}
        />,
      );
    }

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
            <Text style={styles.headline}> 과목 태그 </Text>
            <View style={styles.tagContainer}>
              {getTagComponents({ margin: 3 }, subjectTags)}
            </View>
          </View>

          {/* <View style={styles.inputContainer}>
            <Text style={styles.headline}> 교재 태그 </Text>
            <View style={styles.tagContainer}>
              {getTagComponents({ margin: 3 }, bookTags)}
            </View>
          </View> */}
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
