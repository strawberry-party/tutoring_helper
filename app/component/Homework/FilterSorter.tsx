import {
  Button,
  Form,
  Header,
  Icon,
  Item,
  Picker,
  Text,
  View,
} from 'native-base';
import React, { Component } from 'react';

import { StyleSheet } from 'react-native';
import { filterOptions } from '../../states/assignFilterSorterState';
import { log } from 'react-native-reanimated';

class Sorter extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      sorter: 'default',
    };
  }
  selectSorter(value: string) {
    this.setState({
      sorter: value,
    });
  }

  render() {
    return (
      <View style={styles.selector}>
        <Icon name="albums" />
        <View style={styles.picker}>
          <Picker
            mode="dropdown"
            iosIcon={<Icon style={{ fontSize: 20 }} name="arrow-down" />}
            style={{ fontSize: 15, color: 'black' }}
            placeholderIconColor="#007aff"
            selectedValue={this.state.sorter}
            onValueChange={this.selectSorter.bind(this)}>
            <Picker.Item label="마감일" value="key0" />
            <Picker.Item label="달성률" value="key1" />
            <Picker.Item label="시작일" value="default" />
          </Picker>
        </View>
        <Button
          small
          icon
          style={{ borderRadius: 10, alignSelf: 'center', backgroundColor: '#bbb', marginRight: 15, width: 45 }}
          onPress={() => console.log('hello')}>
          <Icon style={{fontSize: 15}} name="arrow-down" />
        </Button>
      </View>
    );
  }
}

interface FilterProps {
  filterActions: {
    showAll: () => void;
    showCompleted: () => void;
    showIncomplete: () => void;
  };
  activeFilter;
}
function Filter({ filterActions, activeFilter }: FilterProps) {
  const selectFilter = (value: string) => {
    switch (value) {
      case 'ALL':
        filterActions.showAll();
        break;
      case 'COMPLETED':
        filterActions.showCompleted();
        break;
      case 'INCOMPLETED':
        filterActions.showIncomplete();
        break;
      default:
        console.log('something went wrong in FilterSorter');
    }
  };

  return (
    <View style={styles.selector}>
      <Icon name="funnel"> </Icon>
      <View style={styles.picker}>
        <Picker
          mode="dropdown"
          iosIcon={<Icon style={{ fontSize: 20 }} name="arrow-down" />}
          style={{ fontSize: 15, color: 'black' }}
          placeholderIconColor="#007aff"
          selectedValue={activeFilter}
          onValueChange={selectFilter}>
          <Picker.Item label="완료" value="COMPLETED" />
          <Picker.Item label="미완료" value="INCOMPLETED" />
          <Picker.Item label="모두" value="ALL" />
        </Picker>
      </View>
    </View>
  );
}

export default function FilterSorter({ activeFilter, filterActions }) {
  return (
    <View style={styles.container}>
      <Filter activeFilter={activeFilter} filterActions={filterActions} />
      <Sorter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  selector: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    marginLeft: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },

  picker: {
    // width: 50,
    flex: 2,
  },
});
