import { Button, Paragraph } from 'react-native-paper';
import { Modal, StyleSheet, Text, View } from 'react-native';

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
});
