import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import React, { useState } from 'react';

import AddAssignButton from './AddAssignButton';
import { AssignType } from '../../types/homework';
import FormExample from './FormExample';

interface EditAssignModalProps {
  editModalVisible: boolean;
  selectedAssignId: string;
  hideEditModal: () => void;
  editAssign: (id: string, assign: AssignType) => void;
}

export function EditAssignModal({
  editModalVisible,
  hideEditModal,
  editAssign,
  selectedAssignId,
}: EditAssignModalProps) {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={hideEditModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FormExample onSubmit={editAssign} hideModal={hideEditModal} modalType={"EditModal"} selectedAssignId={selectedAssignId}/>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default EditAssignModal;

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
