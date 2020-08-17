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
      <Icon name="add" />
    </Fab>
  );
}

export default AddAssignButton;
