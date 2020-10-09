import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { Appbar, List } from 'react-native-paper';
import React, { useState } from 'react';

import ConfirmModal from '../common/ConfirmModal';
import SubmitOptionModal from './SubmitOptionModal';

function ScheduleDetailModal({
  modalVisible,
  selectedSchedule,
  hideModal,
  removeSchedule,
  removeRepeatInfo,
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

  const onStartRemove = () => {
    onShowSubmitOptionModal();
  };

  const onSaveSubmitOption = (
    value: 'ONLY_THIS' | 'ALL' | 'FORWARD' | 'NONE',
  ) => {
    switch (value) {
      case 'ONLY_THIS': // TODO: 이 일정: 이 일정만 수정
        removeSchedule(selectedScheduleId);
        break;
      case 'ALL': // TODO: 모든 일정: 일정 수정, 반복 정보 수정
        removeRepeatInfo(selectedScheduleId.linkedRepeatedScheduleInfoId);
        break;
      case 'FORWARD': // TODO: 이 일정 및 향후 일정
        console.warn('어서 일해라');
        break;
      default:
        break;
    }
    hideModal();
  };

  const hideConfirmModal = () => {
    setConfirmModalVisible(false);
  };

  const showConfirmModal = () => {
    onHideSubmitOptionModal();
    setConfirmModalVisible(true);
  };

  const onCancel = () => {
    hideConfirmModal();
    showModal();
  };
  const onHideSubmitOptionModal = () => {
    setSubmitOptionModalVisible(false);
  };

  const onShowSubmitOptionModal = () => {
    setSubmitOptionModalVisible(true);
  };

  const [submitOptionModalVisible, setSubmitOptionModalVisible] = useState(
    false,
  );

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

            <Appbar.Action icon="trash-can-outline" onPress={onStartRemove} />
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
        confirmText={'삭제'}
        onCancel={onCancel}
        onConfirm={onSaveSubmitOption}
        hideModal={hideConfirmModal}
      />
      <SubmitOptionModal
        visible={submitOptionModalVisible}
        onSubmit={showConfirmModal}
        onHide={onHideSubmitOptionModal}
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
