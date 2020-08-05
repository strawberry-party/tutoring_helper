import {
  Alert,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { Button, Input } from 'native-base';
import React, { useState } from 'react';

import FormExample from './FormExample';
import { SubAssignType } from '../../types/homework';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface AddSubAssignProps {
  onAdd: (subAssign: SubAssignType) => void;
}

export function AddSubAssign({ onAdd }: AddSubAssignProps) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    console.log('handleSubmit' + text);
    onAdd({ text, isCompleted: false, id: text });
    setText('');
  };

  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        placeholder="새로운 숙제추가!"
        value={text}
        onChange={({ nativeEvent: { text } }) => {
          console.log(text);

          setText(text);
        }}
      />
      <Button style={styles.button} onPress={handleSubmit}>
        <Text style={styles.text}>추가</Text>
      </Button>
    </View>
  );
}

export default AddSubAssign;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    flexGrow: 1,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 5,
    backgroundColor: '#bbb',
    justifyContent: 'center',
    flexGrow: 1,
    marginTop: 5,
  },

  text: {
    fontWeight: '600',
    fontSize: 15,
    marginVertical: 10,
  },

  input: {
    flexGrow: 6,
  },
});
