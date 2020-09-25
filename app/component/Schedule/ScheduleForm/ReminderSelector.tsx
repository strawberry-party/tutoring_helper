import {
  Button,
  Dialog,
  IconButton,
  Menu,
  Paragraph,
  Portal,
  RadioButton,
} from 'react-native-paper';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import React, { useState } from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

export default function ReminderSelector({ defaultReminder, onSubmitDialog }) {
  const [dialogVisible, setDialogVisible] = useState(false);
  const handleSubmit = (time: number) => {
    onSubmitDialog(time);
    setDialogVisible(false);
  };

  const onHideDialog = () => {
    setDialogVisible(false);
  };

  const onShowDialog = () => {
    console.warn('onShowDialog!');
    setDialogVisible(true);
  };

  const getTitle = () => {
    if (defaultReminder === 0) {
      return '리마인더 없음';
    } else return defaultReminder.toString() + '분 전 리마인드';
  };

  return (
    <View style={styles.inputContainer}>
      <Icon
        name="notifications-outline"
        size={30}
        color="#bbb"
        style={{ marginRight: 30 }}
      />
      <Button
        onPress={() => {
          onShowDialog();
        }}>
        {getTitle()}
      </Button>
      <AlarmDialog
        visible={dialogVisible}
        handleSubmit={handleSubmit}
        onHide={onHideDialog}
        defaultReminder={defaultReminder.toString()}
      />
    </View>
  );
}

function AlarmDialog({ defaultReminder, visible, handleSubmit, onHide }) {
  const [value, setValue] = React.useState(defaultReminder);
  const onSubmit = () => {
    handleSubmit(Number(value));
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={onHide}
      animationType="slide"
      transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Dialog.Title> 리마인더 설정 </Dialog.Title>
          <Dialog.Content>
            <RadioButton.Group
              onValueChange={(value) => setValue(value)}
              value={value}>
              <RadioButton.Item label="알리지 않음" value="0" />
              <RadioButton.Item label="5분 전에 알림" value="5" />
              <RadioButton.Item label="15분 전에 알림" value="15" />
              <RadioButton.Item label="30분 전에 알림" value="30" />
              <RadioButton.Item label="1시간 전에 알림" value="60" />
              <RadioButton.Item label="2시간 전에 알림" value="120" />
            </RadioButton.Group>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={onSubmit} style={styles.action}>
              저장
            </Button>
          </Dialog.Actions>
        </View>
      </View>
    </Modal>
  );
}
