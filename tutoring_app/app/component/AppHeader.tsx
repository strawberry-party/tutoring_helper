import React, { Component } from 'react';

import { Header } from 'react-native-elements';
import { View } from 'react-native';

function AppHeader() {
  return (
    <View>
      <Header
        placement="left"
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: '딸과 앱', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
      />
    </View>
  );
}

export default AppHeader;
