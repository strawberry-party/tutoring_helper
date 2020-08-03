import { Container, Content, DatePicker, Form, Input, Item } from 'native-base';
import React, { Component } from 'react';

export default class FormExample extends Component {
  constructor(props) {
    super(props);
    this.state = { chosenDate: new Date() };
    this.setDate = this.setDate.bind(this);
  }
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  render() {
    const now = Date.now();
    return (
      <Container
        style={{
          paddingBottom: 30,
          width: 250,
          maxHeight: 250,
        }}>
        <Content
          style={{
            backgroundColor: 'white',
          }}>
          <Form>
            <Item>
              <Input placeholder="숙제 제목" />
            </Item>
            <Item>
              <Input placeholder="설명" multiline={true} />
            </Item>
            <Item last>
              <DatePicker
                defaultDate={new Date(now)}
                locale={'kr'}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={'fade'}
                androidMode={'default'}
                placeHolderText="듀"
                textStyle={{ color: 'black' }}
                placeHolderTextStyle={{ color: 'black' }}
                onDateChange={this.setDate}
                disabled={false}
              />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}
