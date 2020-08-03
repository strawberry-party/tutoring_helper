import AppContent from './AppContent';
import React from 'react';
import { View } from 'react-native';

export default class Root extends React.Component {
  render() {
    return (
      <View>
        <AppContent />
      </View>
    );
  }
}
