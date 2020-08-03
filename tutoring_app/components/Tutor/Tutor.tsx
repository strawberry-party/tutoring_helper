import React, { Component } from 'react';
import TutorMain from './TutorMain';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Schedule from './Schedule/Schedule';

const Tab = createBottomTabNavigator();

class Tutor extends Component {
  render() {
    return (
      <Tab.Navigator initialRouteName="TutorMain">
        <Tab.Screen name="TutorMain" component={TutorMain} />
        <Tab.Screen name="Schedule" component={Schedule} />
      </Tab.Navigator>
    );
  }
}

export default Tutor;