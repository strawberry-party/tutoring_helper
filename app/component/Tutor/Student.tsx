import React, { Component } from 'react';
<<<<<<< HEAD:app/component/Tutor/Student.tsx

import Homework from '../Homework/Homework';
import Progress from './Progress/Progress';
import Schedule from './Schedule/Schedule';
=======
import Progress from './Progress/Progress';
import Homework from './Homework/Homework';
>>>>>>> ProgressAndSchedule:tutoring_app/components/Tutor/Student.tsx
import { View } from 'react-native';

class Student extends Component {
  render() {
    return (
      <View>
        <Progress />
        <Homework />
      </View>
    );
  }
}

export default Student;