import { Body, Card, CardItem } from 'native-base';
import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Status extends Component<any, any> {
  render() {
    return (
      <Card style={{ width: 300 }}>
        <CardItem header bordered>
          <Text style={{fontSize: 15}}>학생의 숙제 status</Text>
        </CardItem>
        <CardItem bordered>
          <Body>
            <Text>데이터 없음</Text>
          </Body>
        </CardItem>
      </Card>
    );
  }
}

export default Status;
