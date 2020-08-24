import {
  Button,
  Dialog,
  IconButton,
  Paragraph,
  Portal,
  RadioButton,
} from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';

import LocalNotification from '../../container/LocalNotification';
import React from 'react';

function AlarmDialog() {
  const [visible, setVisible] = React.useState(false);
  const [value, setValue] = React.useState('first');

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  return (
    <View>
      <IconButton
        icon="alarm"
        style={styles.button}
        onPress={() => {
          showDialog();
          LocalNotification.set('Hello world');
          LocalNotification.register();
          console.warn('여기에 push notification 설정 구현하기');
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
                  label="1분 뒤 (테스트 용)"
                  value="first"
                  style={styles.radioButton}
                />
                <RadioButton.Item
                  label="과외 시작 15분 전"
                  value="second"
                  style={styles.radioButton}
                />
              </RadioButton.Group>
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog} style={styles.action}>
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

  radioButton: {

  },

  radioButtonContainer: {
    // justifyContent: 'center',
    // alignContent: 'center',
    // paddingVertical: 10,
  },

  action: {
    marginHorizontal: 15,
  }
});
