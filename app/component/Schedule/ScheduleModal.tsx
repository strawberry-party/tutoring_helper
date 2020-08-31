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

import ScheduleForm from './ScheduleForm';
import { ScheduleType } from '../../types/schedule';
import { TagType } from '../../types/root';

interface ScheduleModalProps {
  modalVisible: boolean;
  hideModal: () => void;
  onSubmit: any;
  selectedScheduleId: string;
  selectedSchedule: ScheduleType;
  modalType: 'AddModal' | 'EditModal';
  tags: Map<string, TagType>;
  onAddTag: (tag: TagType) => void;
}

function ScheduleModal({
  modalVisible,
  selectedSchedule,
  hideModal,

  // onSubmit,
  // selectedScheduleId,
  // tags,
  // onAddTag,
}) {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={hideModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScheduleForm selectedSchedule={selectedSchedule} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

interface AddScheduleModalProps extends ScheduleModalProps {}


export default ScheduleModal;

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
    width: '80%',
    height: '80%',
  },
});
