import { Modal, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';

import { TagType } from '../../types/root';

export interface MyModalProps {
  modalVisible: boolean;
  hideModal: () => void;
  onSubmit: any;
  tags: Map<string, TagType>;
  data: any;
  style?: Object;
  children: JSX.Element;
}

export default function MyModal({
  modalVisible,
  hideModal,
  onSubmit,
  tags,
  data,
  style,

  children,
}: MyModalProps) {
  const childrenWithProps = React.Children.map(children, (child) => {
    const props = {};
    if (React.isValidElement(child)) {
      return React.cloneElement(child, props);
    }
    return child;
  });

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={hideModal}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, style]}>{childrenWithProps}</View>
        </View>
      </Modal>
    </View>
  );
}

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
