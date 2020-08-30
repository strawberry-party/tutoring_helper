import { Button, Fab, Icon } from 'native-base';

import React from 'react';

interface AddButtonProps {
  addModalVisible: boolean;
  showAddModal: () => void;
}

export function AddButton({ addModalVisible, showAddModal }: AddButtonProps) {
  return (
    <Fab
      active={!addModalVisible}
      direction="up"
      style={{ backgroundColor: '#bbb' }}
      position="bottomRight"
      onPress={showAddModal}>
      <Icon name="add" />
    </Fab>
  );
}

export default AddButton;
