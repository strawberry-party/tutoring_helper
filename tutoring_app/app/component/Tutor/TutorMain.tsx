import * as RootNavigation from '../RootNavigation';

import { Button, Text } from 'react-native-elements';
import React, { Component } from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Student from './Student';
import { View } from 'react-native';

interface StudentType {
  name: string;
}

const student1: StudentType = { name: '상아' };
const student2: StudentType = { name: '태형' };

const students = [student1, student2];

export default function TutorMain() {
  return (
    <View>
      <Text h3 style={{ textAlign: 'center' }}>
        관리할 학생을 선택하세요.
      </Text>
      <Button
        icon={<Icon name="face-profile" size={15} color="white" />}
        title="김태형 학생"
        onPress={() => {
          RootNavigation.navigate('Student');
        }}
      />
      <Button
        icon={<Icon name="face-profile-woman" size={15} color="white" />}
        title="최상아 학생"
        onPress={() => {
          RootNavigation.navigate('Student');
        }}
      />
    </View>
  );
}
