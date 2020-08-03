import React from 'react';
import AppHeader from './AppHeader';
import AppContent from './AppContent';
import AppFooter from './AppFooter';
import { View } from 'react-native';

export default class Root extends React.Component {
  render() {
    return (
      <View>
        {/* <AppHeader /> */}
        <AppContent />
        {/* <AppFooter /> */}
      </View>
    );
  }
}
