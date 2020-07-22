import Content, { ContentProps, }  from './Content';
import { Text, View } from 'react-native';

import Footer from './Footer';
import Header from './Header';
import React from 'react';
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

