import React, { Component } from 'react';

import Homework from '../Homework/Homework';
import Progress from './Progress/Progress';
<<<<<<< HEAD:tutoring_app/app/component/Tutor/Student.tsx
import Schedule from './Schedule/Schedule';
import { View } from 'react-native';

=======
import Homework from './Homework/Homework';
>>>>>>> ProgressAndSchedule:tutoring_app/components/Tutor/Student.tsx
class Student extends Component {
  render() {
    return (
      <View>
        <Schedule />
        <Progress />
        {/* <Homework /> */}
      </View>
    );
  }
}

export default Student;