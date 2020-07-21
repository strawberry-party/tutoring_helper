import React from 'react';
import { Text, View } from 'react-native';
import Header from './Header';
import Content, { ContentProps, }  from './Content';
import Footer from './Footer';

import ToDoList from './Tutor/Homework/ToDoList';

const mode: ContentProps = { mode: 'tutor'}

export default class Hello extends React.Component<any, any> {
  render() {
    return (
      <View>
        <Header />
        <Content {...mode} />
        <Footer />
      </View>
    );
  }
}
