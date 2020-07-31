import React, { Component } from 'react';
import { Text, View } from 'react-native';

import AssignList from '../component/AssignList';
import { Button } from 'native-base';
import { completeSubAssignment } from '../state';
import { getNextAssign } from '../../common/mockData';
import store from '../../common/store';

export default class AssignMain extends Component {
  state = {
    assigns: store.getState().assigns,
  };
  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.setState({
        assigns: store.getState().assigns,
      }),
    );
  }
  componentWillUnMount() {
    this.unsubscribe();
  }

  _completeSubAssign = () => {
    const assign = getNextAssign();
    store.dispatch(
      completeSubAssignment({ assignId: assign.id, subAssignId: 0 }),
    );
  };
  render() {
    console.log('AssignMain render');
    console.log(store);
    return (
      <View>
        <Text> AssignMain </Text>
        <Button onClick={this._completeSubAssign}>
          <Text>완료</Text>
        </Button>
        <AssignList assigns={this.state.assigns} />
        <Text>Assigns</Text>
      </View>
    );
  }
}
