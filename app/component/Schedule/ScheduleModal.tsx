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
  hideModal,
  onSubmit,
  modalType,
  selectedScheduleId,
  selectedSchedule,
  tags,
  onAddTag,
}: ScheduleModalProps) {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={hideModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScheduleForm
              onSubmit={onSubmit}
              hideModal={hideModal}
              selectedScheduleId={selectedScheduleId}
              modalType={modalType}
              selectedSchedule={selectedSchedule}
              tags={tags}
              onAddTag={onAddTag}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

interface AddScheduleModalProps extends ScheduleModalProps {}

export function AddScheduleModal({
  modalVisible,
  hideModal,
  onSubmit,
  tags,
  modalType,
  onAddTag,
  selectedScheduleId,
  selectedSchedule,
}: AddScheduleModalProps) {
  return (
    <ScheduleModal
      modalVisible={modalVisible}
      hideModal={hideModal}
      onSubmit={onSubmit}
      modalType={modalType}
      selectedScheduleId={selectedScheduleId}
      selectedSchedule={selectedSchedule}
      tags={tags}
      onAddTag={onAddTag}
    />
  );
}

interface EditScheduleModalProps extends ScheduleModalProps {
}

export function EditScheduleModal({
  modalVisible,
  hideModal,
  selectedScheduleId,
  selectedSchedule,
  tags,
  onAddTag,
  onSubmit,
  modalType,
}: EditScheduleModalProps) {
  return (
    <ScheduleModal
      modalVisible={modalVisible}
      hideModal={hideModal}
      onSubmit={onSubmit}
      modalType={modalType}
      selectedScheduleId={selectedScheduleId}
      selectedSchedule={selectedSchedule}
      tags={tags}
      onAddTag={onAddTag}
    />
  );
}

export default ScheduleModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    paddingVertical: 15,
    backgroundColor: 'white',
    borderRadius: 20,
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
    height: 500,
  },
});
