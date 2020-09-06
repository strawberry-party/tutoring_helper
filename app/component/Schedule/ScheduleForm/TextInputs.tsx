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

export function TitleInput({ value, onChangeText }) {
  return (
    <View style={[styles.inputContainer, { borderBottomColor: 'transparent' }]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={[styles.inputText, { fontSize: 20, color: '#bbb' }]}
        placeholder={'제목 추가'}
      />
    </View>
  );
}

export function MemoBox({ newMemo, onChangeMemo }) {
  return (
    <View style={[styles.inputContainer, { borderBottomColor: 'transparent' }]}>
      <Text style={styles.headline}> 메모 </Text>
      <TextInput
        value={newMemo}
        onChangeText={onChangeMemo}
        style={[styles.inputText, styles.memoContainer]}
        multiline
      />
    </View>
  );
}