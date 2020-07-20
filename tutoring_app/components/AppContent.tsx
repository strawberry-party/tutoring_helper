import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Tutor from './Tutor/Tutor';
import Tutee from './Tutee/Tutee';

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