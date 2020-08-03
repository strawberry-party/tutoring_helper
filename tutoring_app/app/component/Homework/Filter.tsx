import { Form, Header, Icon, Item, Picker, Text, View } from 'native-base';
import React, { Component } from 'react';

export default class Filter extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'default',
    };
  }
  selectFilter(value: string) {
    this.setState({
      filter: value,
    });
  }
  render() {
    return (
      <Form
        style={{
          flexGrow: 1,
          alignContent: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Item style={{ flexGrow: 1 }}>
          <Text>필터</Text>
        </Item>

        <Item picker style={{ flexGrow: 2 }}>
          <Picker
            mode="dropdown"
            iosIcon={<Icon style={{ fontSize: 20 }} name="arrow-down" />}
            style={{ fontSize: 15, color: '#bfc6ea' }}
            placeholderIconColor="#007aff"
            selectedValue={this.state.filter}
            onValueChange={this.selectFilter.bind(this)}>
            <Picker.Item label="완료한 과제만" value="key0" />
            <Picker.Item label="완료하지 못한 과제만" value="key1" />
            <Picker.Item label="전부 보기" value="default" />
          </Picker>
        </Item>

        <Item picker style={{ flexGrow: 2 }}>
          <Picker
            mode="dropdown"
            iosIcon={<Icon style={{ fontSize: 20 }} name="arrow-down" />}
            style={{ fontSize: 15, color: '#bfc6ea' }}
            placeholderIconColor="#007aff"
            selectedValue={this.state.filter}
            onValueChange={this.selectFilter.bind(this)}>
            <Picker.Item label="마감 날짜 순" value="key0" />
            <Picker.Item label="달성률 순" value="key1" />
            <Picker.Item label="입력 날짜 순" value="default" />
          </Picker>
        </Item>
      </Form>
    );
  }
}
