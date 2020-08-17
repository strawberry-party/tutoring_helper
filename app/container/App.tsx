import DrawerContent from '../component/DrawerContent';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import React from 'react';
import Tabs from '../component/Tutor/Tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { navigationRef } from '../component/RootNavigation';
import store from '../common/store';

const Drawer = createDrawerNavigator();
const progressArray = [ //진도 현황 배열 - 여기선 밖으로 빼놨지만 구현할 때는 각 원소가 studentArray의 progress에 안에 있도록
  [{weekId: 1, lessonNum: 1, progress: [{id: 1, title: '2단원', isDone: true}, {id: 2, title: '3단원', isDone: false}], file: '', test: [{content: '1단원', score: '90'}]}, 
  {weekId: 2, lessonNum: 2, progress: [{id: 1, title: '4단원', isDone: false}], file: '', test: [{content: '2단원', score: '95'}, {content: '3단원', score: '100'}]},
  {weekId: 3, lessonNum: 3, progress: [], file: '', test: []},]
]

const studentArray = [ //학생 정보 담은 배열 - drawer에서 학생 추가 시 이용되는 배열
  {studentId: 1, name: '김태형', subject: '수학', address: '한국', time:'11:00~13:00', progress: progressArray[0]},
  {studentId: 2, name: '최상아', subject: '과학', address: '대한민국', time:'10:00~13:00', progress: []},
  {studentId: 3, name: '이규빈', subject: '화학', address: '한반도', time:'9:00~13:00', progress: []},
  {studentId: 4, name: '전승규', subject: '지구과학', address: '남한', time:'8:00~13:00', progress: []},
]

const drawerItem = studentArray.map(student => <Drawer.Screen key={student.name} name={student.name+' 학생'} component={Tabs} initialParams={student} />);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <Drawer.Navigator initialRouteName="김태형 학생" drawerContent={props => <DrawerContent {...props} />}>
          {drawerItem}
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}