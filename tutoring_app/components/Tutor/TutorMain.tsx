import React, { Component } from 'react';
import { View } from 'react-native';
import Student from "./Student";
import { Button, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as RootNavigation from '../RootNavigation';

class TutorMain extends Component {
  render() {
    return (
      <View>
        <Text h3 style={{textAlign: "center"}}>
          관리할 학생을 선택하세요.
        </Text>
        <Button 
          icon={<Icon name='face-profile' size={15} color='white' />} 
          title='김태형 학생'
          onPress={() => {
            RootNavigation.navigate('Student')
          }}
          />
        <Button 
          icon={<Icon name='face-profile-woman' size={15} color='white' />} 
          title='최상아 학생'
          onPress={() => {
            RootNavigation.navigate('Student')
          }}
          />
      </View>
    );
  }
}

export default TutorMain;