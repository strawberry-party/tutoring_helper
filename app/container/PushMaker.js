import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { Button } from 'react-native-paper';
import LocalNotification from '../utils/LocalNotification';

export default function PushController() {

  return (
    <View>
      <Button onPress={() => LocalNotification._unRegisterAllLocalNotification()}> 모든 알람 꺼버리기 </Button>
    </View>
  );
}
