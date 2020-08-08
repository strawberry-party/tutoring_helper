import React, { Component } from 'react';

import Schedule from './Schedule/Schedule';
import TutorMain from './TutorMain';
import TutoringHelper from '../../container/Homework';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

class Tutor extends Component {
  render() {
    return (
      <Tab.Navigator initialRouteName="TutorMain">
        <Tab.Screen name="TutorMain" component={TutorMain} />
        <Tab.Screen name="Schedule" component={Schedule} />
        <Tab.Screen name="숙제 관리" component={TutoringHelper} />
      </Tab.Navigator>
    );
  }
}

export default Tutor;