<<<<<<< HEAD:tutoring_app/app/component/Root.tsx
import Content, { ContentProps, }  from './Content';
import { Text, View } from 'react-native';

import Footer from './Footer';
import Header from './Header';
import React from 'react';

const mode: ContentProps = { mode: 'tutor'}

export default class Hello extends React.Component<any, any> {
  render() {
    return (
      <View>
        <Header />
        <Content {...mode} />
        <Footer />
      </View>
=======
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
>>>>>>> ProgressAndSchedule:tutoring_app/components/Root.tsx
    );
  }
}

