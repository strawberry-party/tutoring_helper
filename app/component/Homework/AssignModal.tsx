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

import { AssignType } from '../../types/homework';
import FormExample from './FormExample';
import dayjs from 'dayjs';

interface AssignModalProps {
  modalVisible: boolean;
  hideModal: () => void;
  onSubmit: any;
  selectedAssignId: string;
  selectedAssign: AssignType;
  modalType: 'AddModal' | 'EditModal';
}

function AssignModal({
  modalVisible,
  hideModal,
  onSubmit,
  modalType,
  selectedAssignId,
  selectedAssign,
}: AssignModalProps) {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onSubmit}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FormExample
              onSubmit={onSubmit}
              hideModal={hideModal}
              selectedAssignId={selectedAssignId}
              modalType={modalType}
              selectedAssign={selectedAssign}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

interface AddAssignModalProps {
  addModalVisible: boolean;
  hideAddModal: () => void;
  addAssign: (assign: AssignType) => void;
}
const now: dayjs.Dayjs = dayjs();
const defaultAssign: AssignType = new AssignType('', '', now);

export function AddAssignModal({
  addModalVisible,
  hideAddModal,
  addAssign,
}: AddAssignModalProps) {
  return (
    <AssignModal
      modalVisible={addModalVisible}
      hideModal={hideAddModal}
      onSubmit={addAssign}
      modalType={'AddModal'}
      selectedAssignId={'none'}
      selectedAssign={defaultAssign}
    />
  );
}

interface EditAssignModalProps {
  editModalVisible: boolean;
  hideEditModal: () => void;
  editAssign: (id: string, assign: AssignType) => void;
  selectedAssignId: string;
  selectedAssign: AssignType;
}

export function EditAssignModal({
  editModalVisible,
  hideEditModal,
  editAssign,
  selectedAssignId,
  selectedAssign,
}: EditAssignModalProps) {
  return (
    <AssignModal
      modalVisible={editModalVisible}
      hideModal={hideEditModal}
      onSubmit={editAssign}
      modalType={'EditModal'}
      selectedAssignId={selectedAssignId}
      selectedAssign={selectedAssign}
    />
  );
}

export default AssignModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    padding: 20,
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
    height: 350,
  },
});
