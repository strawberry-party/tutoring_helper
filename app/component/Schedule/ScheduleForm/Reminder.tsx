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
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import React, { useState } from 'react';

import styles from './styles';

export function Reminder({ defaultReminder, onSubmitDialog }) {
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
      <Menu.Item
        icon="alarm"
        onPress={() => {
          onShowDialog();
        }}
        title={getTitle()}
      />
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
    <View style={{ zIndex: 1 }}>
      <Portal>
        <Dialog visible={visible} onDismiss={onHide}>
          <Dialog.Title> 리마인더 설정 </Dialog.Title>
          <Dialog.Content>
              <RadioButton.Group
                onValueChange={(value) => setValue(value)}
                value={value}
                >
                <RadioButton.Item label="알리지 않음" value="0"/>
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
        </Dialog>
      </Portal>
    </View>
  );
}
