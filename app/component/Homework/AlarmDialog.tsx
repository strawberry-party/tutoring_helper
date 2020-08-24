import {
  Button,
  Dialog,
  IconButton,
  Paragraph,
  Portal,
  RadioButton,
} from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';

import LocalNotification from '../../utils/LocalNotification';
import React from 'react';

function AlarmDialog({ text }) {
  const [visible, setVisible] = React.useState(false);
  const [value, setValue] = React.useState('first');

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const onSubmit = () => {
    switch (value) {
      case 'first':
        LocalNotification.triggerOneTimeLocalNotification(text, '딸기과외 한번 알림', 10);
        break;
      case 'second':
        LocalNotification.triggerRepeatedLocalNotification(text, '딸기과외 반복 알림', new Date(), 10000);
        break;
      default:
        console.warn("SOMETHING WENT WRONG in AlarmDialog/onSubmit");
    }
    hideDialog();
  };

  return (
    <View>
      <IconButton
        icon="alarm"
        color="white"
        style={styles.button}
        onPress={() => {
          showDialog();
        }}
      />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title> 리마인더 설정 </Dialog.Title>
          <Dialog.Content>
            <Paragraph style={styles.radioButtonContainer}>
              <RadioButton.Group
                onValueChange={(value) => setValue(value)}
                value={value}>
                <RadioButton.Item
                  label="10초 뒤에 한번 알림 (테스트 용)"
                  value="first"
                  style={styles.radioButton}
                />
                <RadioButton.Item
                  label="10초 간격으로 반복 알림 (테스트 용)"
                  value="second"
                  style={styles.radioButton}
                />
              </RadioButton.Group>
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={onSubmit} style={styles.action}>
              저장
            </Button>
            <Button onPress={hideDialog} style={styles.action}>
              취소
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

export default AlarmDialog;
const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(0, 120, 255, 1)',
    borderRadius: 30,
    marginHorizontal: 15,
    justifyContent: 'center',
  },

  radioButton: {},

  radioButtonContainer: {
    // justifyContent: 'center',
    // alignContent: 'center',
    // paddingVertical: 10,
  },

  action: {
    marginHorizontal: 15,
  },
});
