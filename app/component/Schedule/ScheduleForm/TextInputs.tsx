import React, { useState } from 'react';
import {
  Text,
  TextInput,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'
import styles from './styles';

export function TitleInput({ value, onChangeText }) {
  return (
    <View style={[styles.inputContainer, { borderBottomColor: 'transparent' }]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={[styles.inputText, { fontSize: 20, color: 'black' }]}
        placeholder={'제목 추가'}
      />
    </View>
  );
}

export function MemoBox({ newMemo, onChangeMemo }) {
  return (
    <View style={styles.inputContainerWithBorder}>
      <Icon name="document-text-outline" size={30} color="#bbb" style={{marginRight: 30}}/>
      <TextInput
        value={newMemo}
        onChangeText={onChangeMemo}
        style={[styles.inputText, styles.memoContainer]}
        placeholder={"메모"}
        multiline
      />
    </View>
  );
}
