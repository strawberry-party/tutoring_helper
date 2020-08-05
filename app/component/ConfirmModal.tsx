import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Fab, Icon } from 'native-base';
import React, { useState } from 'react';

interface ConfirmModalProps {
  visible: boolean;
  hideModal: () => void;
  showModal: () => void;
  cancelText: string;
  confirmText: string;
  title: string;
  next: () => void;
}

export function ConfirmModal({
  visible,
  showModal,
  hideModal,
  cancelText,
  confirmText,
  title,
  next,
}: ConfirmModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>{title}</Text>
          <Button onPress={hideModal}>
            <Text>{cancelText}</Text>
          </Button>
          <TouchableOpacity onPress={next}>
            <Text>confirmText</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default ConfirmModal;

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


/*

<ConfirmModal
  visible=
  hideModal=
  showModal=
  cancelText="아니요, 계속 진행합니다"
  confirmText="네, 취소합니다"
  title="정말 취소하시겠어요?"
  next=onRemove(id) />
*/