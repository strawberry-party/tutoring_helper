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

import { AssignType } from '../../types/homework';
import FormExample from './FormExample';

interface AddAssignButtonProps {
  visible: boolean;
  showModal: () => void;
}

export function AddAssignButton({ visible, showModal }: AddAssignButtonProps) {
  return (
    <Fab
      active={!visible}
      direction="up"
      containerStyle={{backgroundColor: 'black',}}
      style={{ backgroundColor: '#bbb' }}
      position="bottomRight"
      onPress={showModal}>
      <Text style={{ fontSize: 24 }}>➕</Text>
    </Fab>
  );
}

export default AddAssignButton;
