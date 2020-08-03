import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import Tutee from './Tutee/Tutee';
import Tutor from './Tutor/Tutor';

class AppContent extends Component {
  render() {
    return (
      <ScrollView>
        <Tutor />
      </ScrollView>
    );
  }
}

export default AppContent;