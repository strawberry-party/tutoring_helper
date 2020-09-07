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

import ScheduleForm from './ScheduleForm';
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

function ScheduleModal({
  modalVisible,
  selectedSchedule,
  hideModal,
  addSchedule,
  editSchedule,
  selectedScheduleId,
  // tags,
  // onAddTag,
}) {
  const onSubmitToAdd = (schedule: ScheduleType) => {
    addSchedule(schedule);
    hideModal();
  };

  const onSubmitToEdit = (schedule: ScheduleType, scheduleId: number) => {
    editSchedule(schedule, scheduleId);
    hideModal();
  };

  return (
    <View style={styles.modalView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={hideModal}>
        <View style={styles.modalView}>
          <ScheduleForm
            selectedScheduleId={selectedScheduleId}
            selectedSchedule={selectedSchedule}
            onSubmitToAdd={onSubmitToAdd}
            onSubmitToEdit={onSubmitToEdit}
          />
        </View>
      </Modal>
    </View>
  );
}

export default ScheduleModal;

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',

    elevation: 5,
  },
});
