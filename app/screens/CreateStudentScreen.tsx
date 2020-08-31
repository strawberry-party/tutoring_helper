import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import CreateStudent from '../component/CreateStudent';

const CreateStudentStack = createStackNavigator();

interface CreateStudentStackProps {
  navigation: any;
}

function CreateStudentScreen({ navigation }: CreateStudentStackProps) {
  return (
    <CreateStudentStack.Navigator
      initialRouteName="학생추가"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#e91e63',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: () => (
          <Ionicons.Button
            name="menu"
            size={35}
            backgroundColor="#e91e63"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
      }}>
      <CreateStudentStack.Screen name="학생추가" component={CreateStudent} />
    </CreateStudentStack.Navigator>
  );
}

export default CreateStudentScreen;
