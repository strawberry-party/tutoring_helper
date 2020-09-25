import { Button, IconButton, RadioButton, Switch } from 'react-native-paper';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import React, { useState } from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

export function RepeatSelector({ setRepeat, repeat }) {
  return (
    <View
      style={[
        styles.inputContainerWithBorder,
        {
          height: 50,
        },
      ]}>
      <Icon
        name="repeat-outline"
        size={30}
        color="#bbb"
        style={{ marginRight: 30 }}
      />

      {repeat ? (
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Button onPress={() => {}}> 반복 중 </Button>
          <IconButton
            icon="close-circle"
            color="#bbb"
            onPress={() => setRepeat(false)}
          />
        </View>
      ) : (
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Button onPress={() => setRepeat(true)}> 반복하기 </Button>
          <IconButton
            icon="plus-circle-outline"
            color="#bbb"
            onPress={() => setRepeat(true)}
          />
        </View>
      )}
    </View>
  );
}
