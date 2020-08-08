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

interface AddAssignModalProps {
  visible: boolean;
  hideModal: () => void;
  showModal: () => void;
  addAssign: (assign: AssignType) => void;
}

export function AddAssignModal({
  visible,
  showModal,
  hideModal,
  addAssign,
}: AddAssignModalProps) {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={hideModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FormExample addAssign={addAssign} hideModal={hideModal} />
          </View>
        </View>
      </Modal>
      {/* <AddAssignButton visible={visible} showModal={showModal} /> */}

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
    margin: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
