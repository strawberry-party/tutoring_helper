import React from 'react';
import AppHeader from './AppHeader';
import AppContent from './AppContent';
import AppFooter from './AppFooter';
import { ScrollView } from 'react-native';

export default class Hello extends React.Component {
  render() {
    return (
      <ScrollView>
        <AppHeader />
        <AppContent />
        <AppFooter />
      </ScrollView>
    );
  }
}
