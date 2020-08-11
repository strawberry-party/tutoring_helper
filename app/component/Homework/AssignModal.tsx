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

import AddAssignButton from './AddAssignButton'
import { AssignType } from '../../types/homework';
import FormExample from './FormExample';

interface AssignModalProps {
  visible: boolean;
  hideAddModal: () => void;
  showAddModal: () => void;
  onSubmit: any;
}

interface EditAssignModalProps extends AssignModalProps {
  onSubmit: (newAssign: AssignType, id: string) => void;
}

interface AddAssignModalProps extends AssignModalProps {
  onSubmit: (assign: AssignType) => void;
}

function AssignModal({visible, hideAddModal, showAddModal, onSubmit}: AssignModalProps){
  <View style={styles.centeredView}>
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={hideAddModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <FormExample onSubmit={onSubmit} hideAddModal={hideAddModal} />
        </View>
      </View>
    </Modal>
  </View>
}



export function AddAssignModal({
  visible,
  showAddModal,
  hideAddModal,
  onSubmit,
}: AddAssignModalProps) {
  return (

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
});
