import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, ListItem, Button, Icon, Overlay } from 'react-native-elements';


export interface AssignProps {
  id: string;
  title: string;
  desc: string;
  due: Date;
  out: Date;
  isCompleted: boolean;
  status: number;
  subAssigns: Object;
}

interface State {
  isEditing: boolean;
  assignValue: AssignProps;
  isOpened: boolean;
}

class Assign extends Component<AssignProps, State> {
  state: State = {
    isOpened: false,
    assignValue: this.props,
    isEditing: false,
  };

  _toggleButton = () => {
    alert("Whatthe");
    this.setState({
      isOpened: !this.state.isOpened,
      ...this.state,
    });
  };

  render() {
    const {
      id,
      title,
      desc,
      due,
      out,
      isCompleted,
      status,
      subAssigns,
    } = this.props;
    return (
      <View>
        <Card title={title}>
          <Text>{desc}</Text>
          <Button title="더보기" onPress={this._toggleButton}>
              <Overlay isVisible={this.state.isOpened}>
              <Text>Hi!!</Text>

              </Overlay>
          </Button>
        </Card>
      </View>
    );
  }
}

export default Assign;
