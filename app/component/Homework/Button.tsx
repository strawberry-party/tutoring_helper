import { Button, Fab, Icon } from 'native-base';
import React, { Component } from 'react';
import { Text, View } from 'react-native';

class AddButton extends Component {
  state = {
    active: false,
  };

  render() {
    return (
        <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={() => {
            if (this.state.active) alert("수정 모드!");
            else alert("수정 모드 해제");
            this.setState({ active: !this.state.active })
          }
          }>
          <Icon name="share" />
        </Fab>
    );
  }
}

export default AddButton;
