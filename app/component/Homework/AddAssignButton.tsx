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
  addModalVisible: boolean;
  showAddModal: () => void;
}

export function AddAssignButton({
  addModalVisible,
  showAddModal,
}: AddAssignButtonProps) {
  return (
    <Fab
      active={!addModalVisible}
      direction="up"
      containerStyle={{ backgroundColor: 'black' }}
      style={{ backgroundColor: '#bbb' }}
      position="bottomRight"
      onPress={showAddModal}>
      <Text style={{ fontSize: 24 }}>➕</Text>
    </Fab>
  );
}

export default AddAssignButton;
