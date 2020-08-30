import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { Button } from 'react-native-paper';
import LocalNotification from '../../utils/LocalNotification';

export default function PushController() {

  return (
    <View style={{width: 175, borderRadius: 20, borderWidth: 1, height: 40, alignContent: 'center', justifyContent: 'center'}}>
      <Button onPress={() => LocalNotification._unRegisterAllLocalNotification()}> 모든 알람 꺼버리기 </Button>
    </View>
  );
}
