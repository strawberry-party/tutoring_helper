import { RadioButton, TextInput } from 'react-native-paper';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

import MyDatePicker from '../../common/MyDatePicker';
import styles from './styles';

export default function EndPointSelector({
  startPoint,
  setEndPointMode,
  endPointMode,
  endAfterNumTimes,
  setEndAfterNumTimes,
  onConfirmLastDay,
  lastDay,
}) {
  const hasError = () => {
    return startPoint.isAfter(lastDay);
  };

  return (
    <View style={[styles.inputContainer, {}]}>
      <Text style={styles.headline}>종료일</Text>

      <View style={{ justifyContent: 'center' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <RadioButton
            value="lastDay"
            status={endPointMode === 'lastDay' ? 'checked' : 'unchecked'}
            onPress={() => setEndPointMode('lastDay')}
          />

          <MyDatePicker
            onConfirm={onConfirmLastDay}
            day={lastDay}
            mode="date"
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center',
            }}
            dateTextStyle={
              !(endPointMode === 'lastDay')
                ? { fontSize: 15, fontWeight: '100', color: '#bbb' }
                : hasError()
                ? { fontSize: 15, fontWeight: '100', color: 'red' }
                : {
                    fontSize: 15,
                    fontWeight: '100',
                    color: '#6D7EE9',
                  }
            }
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <RadioButton
            value="times"
            status={endPointMode === 'times' ? 'checked' : 'unchecked'}
            onPress={() => {
              setEndPointMode('times');
            }}
          />
          <TextInput
            mode="outlined"
            style={{ height: 25, marginRight: 10, marginLeft: 62 }}
            keyboardType="number-pad"
            onChangeText={(text) => {
              if (/^\d+$/.test(text)) {
                setEndAfterNumTimes(Number(text));
              } else if (text === '') {
                setEndAfterNumTimes(0);
              }
            }}
            value={endAfterNumTimes !== 0 ? endAfterNumTimes.toString() : ''}
            disabled={!(endPointMode === 'times')}
            maxLength={2}
          />
          <Text style={[{ fontSize: 15, marginRight: 15 }]}>회 후</Text>
        </View>
      </View>
    </View>
  );
}

export function StartPointSelector({ startPoint, onConfirmStartPoint }) {
  return (
    <View style={[styles.inputContainer]}>
      <Text style={[styles.headline]}>시작일</Text>
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
    </View>
  );
}
