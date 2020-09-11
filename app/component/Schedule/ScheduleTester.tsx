import React, { Component } from 'react';

import { Button } from 'react-native-paper';
import { Text } from 'native-base';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { test_getRepeatedSchedules } from './scheduleUtils/getRepeatedFormWorkSchedules';
import { test_scheduleGenerator } from './scheduleUtils/formWorkScheduleGenerator';

class Tester extends Component {

  render() {
    return (
      <View
        style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <Button onPress={() => test_scheduleGenerator()}>
          Press Me To Test
        </Button>
      </View>
    );
  }
}

export default Tester;
