import React, { Component } from 'react';
import { View } from 'react-native';
import { CheckBox } from 'react-native-elements';

class CheckingProgress extends Component {
  state = {
    checked1: false,
    checked2: false,
  }
  render() {
    return (
      <View>
        <CheckBox
          title='내용 1'
          checked={this.state.checked1}
          onPress={() => this.setState({ checked1: !this.state.checked1 })}
        />
        <CheckBox
          title='내용 2'
          checked={this.state.checked2}
          onPress={() => this.setState({ checked2: !this.state.checked2 })}
        />
      </View>
    );
  }
}

export default CheckingProgress;