import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, IconButton } from 'react-native-paper';

import React from 'react';

interface AgendaCardProps {}

export function EmptyCard() {
  return (
    <View style={styles.emptyItem}>
      <Text style={styles.emptyItemText}>일정이 없어요! </Text>
    </View>
  );
}

function AgendaCard({ item, itemPressed }) {
  return (
    <TouchableOpacity
      onPress={() => itemPressed(item.text)}
      style={styles.item}>
      <Text style={styles.itemTitleText}>{item.text}</Text>
      <Text style={styles.itemTimeText}>
        {item.startPoint + ' ~ ' + item.endPoint}
      </Text>
    </TouchableOpacity>
  );
}

export default AgendaCard;

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 10,
    marginVertical: 4,
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#c7ceea',
  },
  itemTimeText: {
    color: '#f8f8f8',
    fontSize: 14,
  },
  itemTitleText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
  },
  emptyItemText: {
    color: '#bbb',
    fontSize: 14,
  },
});
