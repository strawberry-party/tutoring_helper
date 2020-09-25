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

export function Header({ handleSubmit, label }) {
  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.title}> {label} </Text>

      <FAB
        style={styles.button}
        onPress={handleSubmit}
        icon="content-save"
        label="저장하기"></FAB>
    </View>
  );
}