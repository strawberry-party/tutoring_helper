import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { Button, Fab, Icon } from 'native-base';
import React, { useState } from 'react';

import AddScheduleForm from './ScheduleForm/AddScheduleForm';
import EditScheduleForm from './ScheduleForm/EditScheduleForm';
import { ScheduleType } from '../../types/schedule';
import { TagType } from '../../types/root';

interface ScheduleModalProps {
  modalVisible: boolean;
  hideModal: () => void;
  onSubmit: any;
  selectedScheduleId: string;
  selectedSchedule: ScheduleType;
  modalType: 'AddModal' | 'EditModal';
  tags: Map<string, TagType>;
  onAddTag: (tag: TagType) => void;
}

export function AddScheduleModal({
  modalVisible,
  hideModal,
  addSchedule,
  addRepeatInfo,
}) {
  return (
    <View style={styles.modalView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={hideModal}>
        <View style={styles.modalView}>
          <AddScheduleForm
            addSchedule={addSchedule}
            hideModal={hideModal}
            addRepeatInfo={addRepeatInfo}
          />
        </View>
      </Modal>
    </View>
  );
}

export function EditScheduleModal({
  modalVisible,
  hideModal,
  selectedSchedule,
  editSchedule,
  addRepeatInfo,
  editRepeatInfo,
  repeatedScheduleInfo,
  removeRepeatInfo,
  removeSchedule,
  addSchedule,
}) {
  return (
    <View style={styles.modalView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={hideModal}>
        <View style={styles.modalView}>
          <EditScheduleForm
            onHide={hideModal}
            selectedSchedule={selectedSchedule}
            repeatedScheduleInfo={repeatedScheduleInfo}
            editSchedule={editSchedule}
            removeSchedule={removeSchedule}
            addRepeatInfo={addRepeatInfo}
            editRepeatInfo={editRepeatInfo}
            removeRepeatInfo={removeRepeatInfo}
            addSchedule={addSchedule}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',

    elevation: 5,
  },
});
