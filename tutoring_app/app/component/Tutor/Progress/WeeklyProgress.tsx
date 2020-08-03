import React, { Component } from 'react';
import { Text, View } from 'react-native';

import Week from './Week';

// TODO: 여러개의 Week 컴포넌트가 들어감

// const data = [week1, week2, ... ]

export default function WeeklyProgress() {
  return (
    <View>
      <Week />
    </View>
  );
}
