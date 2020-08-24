import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Paragraph } from 'react-native-paper';

import React from 'react';

interface ConfirmModalProps {
  cancelText: string;
  confirmText: string;
  title: string;
}

export function ConfirmModal({
  title,
  isVisible,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  hideModal,
}) {
  const handleCancel = () => {
    onCancel();
    hideModal();
  };

  const handleConfirm = () => {
    onConfirm();
    hideModal();
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={handleCancel}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Paragraph style={{ marginBottom: 30 }}>
            <Text style={styles.textStyle}>{title}</Text>
          </Paragraph>
          <Paragraph>
            <Button onPress={handleCancel}>{cancelText}</Button>
            <Button onPress={handleConfirm}>{confirmText}</Button>
          </Paragraph>
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
    elevation: 10,
  },
  textStyle: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    backgroundColor: 'white',
  },
});

/*

<ConfirmModal
  addModalVisible=
  hideAddModal=
  showAddModal=
  cancelText="아니요, 계속 진행합니다"
  confirmText="네, 취소합니다"
  title="정말 취소하시겠어요?"
  next=onRemove(id) />
*/
