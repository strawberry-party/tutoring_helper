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

import AssignForm from './AssignForm';
import { AssignType } from '../../types/homework';
import { TagType } from '../../types/root';
import dayjs from 'dayjs';

interface AssignModalProps {
  modalVisible: boolean;
  hideModal: () => void;
  onSubmit: any;
  selectedAssignId: string;
  selectedAssign: AssignType;
  modalType: 'AddModal' | 'EditModal';
  tags: Map<string, TagType>;
}

function AssignModal({
  modalVisible,
  hideModal,
  onSubmit,
  modalType,
  selectedAssignId,
  selectedAssign,
  tags,
}: AssignModalProps) {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={hideModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <AssignForm
              onSubmit={onSubmit}
              hideModal={hideModal}
              selectedAssignId={selectedAssignId}
              modalType={modalType}
              selectedAssign={selectedAssign}
              tags={tags}
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
  tags: Map<string, TagType>;
}
const defaultAssign: AssignType = new AssignType();

export function AddAssignModal({
  addModalVisible,
  hideAddModal,
  addAssign,
  tags,
}: AddAssignModalProps) {
  return (
    <AssignModal
      modalVisible={addModalVisible}
      hideModal={hideAddModal}
      onSubmit={addAssign}
      modalType={'AddModal'}
      selectedAssignId={'none'}
      selectedAssign={defaultAssign}
      tags={tags}
    />
  );
}

interface EditAssignModalProps {
  editModalVisible: boolean;
  hideEditModal: () => void;
  editAssign: (id: string, assign: AssignType) => void;
  selectedAssignId: string;
  selectedAssign: AssignType;
  tags: Map<string, TagType>;
}

export function EditAssignModal({
  editModalVisible,
  hideEditModal,
  editAssign,
  selectedAssignId,
  selectedAssign,
  tags,
}: EditAssignModalProps) {
  return (
    <AssignModal
      modalVisible={editModalVisible}
      hideModal={hideEditModal}
      onSubmit={editAssign}
      modalType={'EditModal'}
      selectedAssignId={selectedAssignId}
      selectedAssign={selectedAssign}
      tags={tags}
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
