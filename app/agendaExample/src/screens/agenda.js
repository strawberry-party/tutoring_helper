import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { Component } from 'react';

import { Agenda } from 'react-native-calendars';

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: {}
    };
  }

  render() {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={'2020-08-16'}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
      />
    );
  }

  loadItems(day) {

    const items = {
      "2020-08-01": [{ "height": 61, "name": "Item for 2020-08-01 #0" }],
      "2020-08-02": [
        { "height": 50, "name": "Item for 2020-08-02 #0" },
        { "height": 111, "name": "Item for 2020-08-02 #1" },
        { "height": 108, "name": "Item for 2020-08-02 #2" }],
      "2020-08-03": [{ "height": 87, "name": "Item for 2020-08-03 #0" }],
    }

    this.setState({
      items: items
    });
  }

  renderItem(item) {
    return (
      <TouchableOpacity
        style={[styles.item, { height: item.height }]}
        onPress={() => Alert.alert(item.name)}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});
