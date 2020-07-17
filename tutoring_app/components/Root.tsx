import React from 'react';
import { Text, View } from 'react-native';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

export default class Hello extends React.Component<any, any> {
  render() {
    return (
      <View>
        <Header />
        <Content />
        <Footer />
      </View>
    )
    }
}