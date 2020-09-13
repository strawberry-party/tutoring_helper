import { Button, Chip, FAB, RadioButton, TextInput } from 'react-native-paper';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import React, { useState } from 'react';

import MyDatePicker from '../../common/MyDatePicker';
import { Picker } from '@react-native-community/picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';

export default function EndPointSelector({
  setEndPoint,
  newEndPoint,
  endAfterNumTimes,
  setEndAfterNumTimes,
  onConfirmLastDay,
  newLastDay,
}) {
  return (
    <View
      style={[
        styles.inputContainer,
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        },
      ]}>
      <Text style={styles.headline}>종료일</Text>

      {/* <Picker
        style={{ flex: 1 }}
        selectedValue={newEndPoint}
        onValueChange={(itemValue, itemIndex) => setEndPoint(itemValue)}
        mode="dropdown"
        itemStyle={{ fontSize: 16, justifyContent: 'center' }}>
        <Picker.Item label={newLastDay.format('MM월 DD일')} value={'lastDay'} />
        <Picker.Item label={`${endAfterNumTimes} 회 후`} value={'times'} />
      </Picker> */}

      <View style={{ flexDirection: 'row' }}>
        <Pressable
          onPress={() => {
            setEndPoint('times');
          }}>
          <View style={styles.radioButtonContainer}>
            <RadioButton
              value="times"
              status={newEndPoint === 'times' ? 'checked' : 'unchecked'}
              onPress={() => {
                setEndPoint('times');
              }}
            />
            <TextInput
              mode="outlined"
              style={{ height: 25, marginRight: 10 }}
              keyboardType="number-pad"
              onChangeText={(text) => {
                setEndAfterNumTimes(Number(text));
              }}
              value={endAfterNumTimes !== 0 ? endAfterNumTimes.toString() : ''}
              disabled={!(newEndPoint === 'times')}
              maxLength={2}
            />
            <Text style={[{ fontSize: 15 }]}>회 후</Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => {
            setEndPoint('false');
          }}>
          <View style={styles.radioButtonContainer}>
            <RadioButton
              value="lastDay"
              status={newEndPoint === 'lastDay' ? 'checked' : 'unchecked'}
              onPress={() => setEndPoint('lastDay')}
            />

            <MyDatePicker
              onConfirm={onConfirmLastDay}
              day={newLastDay}
              mode="date"
              style={{
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              dateTextStyle={{
                fontSize: 15,
                fontWeight: '100',
                color: '#6D7EE9',
              }}
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

export function StartPointSelector({ startPoint, onConfirmStartPoint }) {
  return (
    <View
      style={[
        styles.inputContainer,
        {
          flexDirection: 'row',
          borderBottomColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'space-around',
        },
      ]}>
      <Text style={[styles.headline]}>시작일</Text>
      <TouchableOpacity onPress={() => {}}>
        <MyDatePicker
          onConfirm={onConfirmStartPoint}
          day={startPoint}
          mode="date"
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}
          dateTextStyle={{
            fontSize: 15,
            fontWeight: '100',
            color: '#6D7EE9',
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
