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

import AddAssignButton from './AddAssignButton';
import { AssignType } from '../../types/homework';
import FormExample from './FormExample';

interface AddAssignModalProps {
  addModalVisible: boolean;
  hideAddModal: () => void;
  showAddModal: () => void;
  addAssign: (assign: AssignType) => void;
}
const now = new Date(Date.now());
const defaultAssign: AssignType = {
  id: 'none',
  title: '',
  desc: '',
  isCompleted: false,
  due: now,
  out: now,
  status: 0,
  subAssigns: [],
};
export function AddAssignModal({
  addModalVisible,
  showAddModal,
  hideAddModal,
  addAssign,
}: AddAssignModalProps) {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={addModalVisible}
        onRequestClose={hideAddModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FormExample
              selectedAssignId={'none'}
              onSubmit={addAssign}
              hideModal={hideAddModal}
              modalType={'AddModal'}
              selectedAssign={defaultAssign}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default AddAssignModal;

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
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
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
