import React, { Component } from 'react';
import { Text, View } from 'react-native';

import Tutee from './Tutee/Tutee';
import Tutor from './Tutor/Tutor';

export interface ContentProps {
  mode: 'tutor' | 'tutee';
}

class AppContent extends Component<any, any> {
  render() {
    return (
      <View>
        <Tutor />
      </View>
    );
  }
}

export default AppContent;
