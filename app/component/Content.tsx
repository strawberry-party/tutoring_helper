import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Tutor from './Tutor/Tutor';

export interface ContentProps {
  mode: 'tutor' | 'tutee'
}

class Content extends Component<ContentProps, any> {
  render() {
    return (
      <View>
        <Tutor />
      </View>
    );
  }
}

export default Content;