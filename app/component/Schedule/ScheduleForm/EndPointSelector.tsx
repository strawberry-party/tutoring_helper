import { Button, Input, Item } from 'native-base';
import { Chip, FAB, RadioButton, TextInput } from 'react-native-paper';
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
    <View style={[styles.inputContainer]}>
      <Text style={styles.headline}> 반복 종료 시점 </Text>
      <View>
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
              dateTextStyle={{fontSize: 15, color: 'black' }}
            />
          </View>
        </Pressable>
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
            <Text style={[styles.inputText]}>회 후</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
