import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Tutor from './Tutor/Tutor';

class AppContent extends Component {
  render() {
    return (
      <View>
        <Tutor />
      </View>
    );
  }
}

export default AppContent;