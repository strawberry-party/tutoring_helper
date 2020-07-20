import React from 'react';
import { Text, View } from 'react-native';
import AppHeader from './AppHeader';
import AppContent from './AppContent';
import AppFooter from './AppFooter';

export default class Hello extends React.Component<any, any> {
  render() {
    return (
      <View>
        <AppHeader />
        <AppContent />
        <AppFooter />
      </View>
    );
  }
}
