import { Button, Fab, Icon } from 'native-base';

import React from 'react';

interface AddButtonProps {
  visible: boolean;
  show: () => void;
}

export function AddButton({ visible, show }: AddButtonProps) {
  return (
    <Fab
      active={!visible}
      direction="up"
      style={{ backgroundColor: '#bbb' }}
      position="bottomRight"
      onPress={show}>
      <Icon name="add" />
    </Fab>
  );
}

export default AddButton;
