import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { Appbar, List } from 'react-native-paper';

import ConfirmModal from '../common/ConfirmModal';
import React from 'react';
import ScheduleForm from './ScheduleForm';
import { ScheduleType } from '../../types/schedule';
import { TagType } from '../../types/root';

function ScheduleDetailModal({
  modalVisible,
  selectedSchedule,
  hideModal,
  removeSchedule,
  repeatedScheduleInfos,
  selectedScheduleId,
  showFormModal,
  showModal,
}) {
  const [confirmModalVisible, setConfirmModalVisible] = React.useState(false);

  const onStartEdit = () => {
    hideModal();
    showFormModal();
    showModal();
  };

  const {
    text,
    studentId,
    tagId,
    time,
    linkedRepeatedScheduleInfoId,
    memo,
  } = selectedSchedule;

  const onRemove = () => {
    hideModal();
    removeSchedule(selectedScheduleId);
  };

  const hideConfirmModal = () => {
    setConfirmModalVisible(false);
  };

  const showConfirmModal = () => {
    setConfirmModalVisible(true);
  };

  const onCancel = () => {
    hideConfirmModal();
    showModal();
  };

  return (
    <View style={styles.modalView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={hideModal}>
        <View style={styles.modalView}>
          <Appbar style={styles.appbar}>
            <Appbar.Action icon="square-edit-outline" onPress={onStartEdit} />

            <Appbar.Action
              icon="trash-can-outline"
              onPress={showConfirmModal}
            />
          </Appbar>
          <Text> {text} </Text>
          <Text> {memo} </Text>
          <Text>누가 스타일링 좀 해봐</Text>
          <Text>진도 보여줘야함 </Text>
        </View>
      </Modal>

      <ConfirmModal
        title={'계속할까요?'}
        isVisible={confirmModalVisible}
        cancelText={'취소'}
        confirmText={'일정 삭제'}
        onCancel={onCancel}
        onConfirm={onRemove}
        hideModal={hideConfirmModal}
      />
    </View>
  );
}

export default ScheduleDetailModal;

const styles = StyleSheet.create({
  appbar: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    elevation: 0,
  },
  modalView: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});
