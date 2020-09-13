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

import styles from './styles';

export default function SubmitOptionModal({ visible, onSubmit, onHide }) {
  const [value, setValue] = useState('NONE')

  const handleHide = () => {
    // onSubmit('NONE');
    onHide();
  }

  return (
    <Modal
      visible={visible}
      onRequestClose={handleHide}
      animationType="slide"
      transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* <Dialog.Title> 어떻게 할까요? </Dialog.Title> */}
          <Dialog.Content>
            <RadioButton.Group
              onValueChange={(value) => setValue(value)}
              value={value}>
              <RadioButton.Item label="이번 일정만 변경" value="ONLY_THIS" />
              <RadioButton.Item label="모든 일정에 적용" value="ALL" />
              <RadioButton.Item
                label="앞으로의 일정에만 적용"
                value="FORWARD"
              />
            </RadioButton.Group>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => onSubmit(value)} style={styles.action}>
              저장
            </Button>
          </Dialog.Actions>
        </View>
      </View>
    </Modal>
  );
}
