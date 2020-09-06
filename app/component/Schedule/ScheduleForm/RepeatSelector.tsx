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

import styles from './styles';

export function RepeatSelector({ setRepeat, repeat }) {
  return (
    <View style={[styles.inputContainer, { borderBottomColor: 'transparent' }]}>
      <View>
        <Pressable
          onPress={() => {
            setRepeat('false');
          }}>
          <View style={styles.radioButtonContainer}>
            <RadioButton
              value="false"
              status={repeat === 'false' ? 'checked' : 'unchecked'}
              onPress={() => setRepeat('false')}
            />
            <Text style={styles.inputText}>한 번만</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            setRepeat('true');
          }}>
          <View style={styles.radioButtonContainer}>
            <RadioButton
              value="true"
              status={repeat === 'true' ? 'checked' : 'unchecked'}
              onPress={() => {
                setRepeat('true');
              }}
            />
            <Text style={styles.inputText}>반복하기</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
