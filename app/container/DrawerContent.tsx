import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity  } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth';

const db = database();

function DrawerContent({tutorId, studentNum, studentArray, navigation}) {
  const handleDelete = (key) => {
    db.ref(`tutors/${tutorId}`).update({
      studentNum: studentNum - 1,
    })
    db.ref(`tutors/${tutorId}/studentArray/${key}`).remove()
  }
  
  const signOutUser = () => {
    auth()
      .signOut()
      .then(() => console.log('로그아웃'));
  };

  const handleUpdate = (key) => {
    navigation.navigate(key+ '_U')
  }

  const updateInfo = () => {
    navigation.navigate('선생님정보 수정')
  }

  const contents = [];
  studentArray.map(student => {
    const subjects = student.info.subjectTag === undefined ? <Text style={{fontStyle: 'italic', fontSize: 14, color: '#ff0000'}}>과목을 추가하세요!</Text> : Object.entries(student.info.subjectTag).map(([, value]) => value.name).join(', ')
    contents.push(
      <View key={student.key} >
        <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate(student.key)}>
          <View style={styles.item}>
            <View style={{marginTop: 5, alignItems: 'center'}}>
              <Text style={{fontSize: 25}}>{student.info.name} 학생</Text>
            </View>
            <View style={{marginLeft: 20,}}>
              <Text>과외 과목: {subjects}</Text>
              <Text>과외 요일: {student.info.nextTime}</Text>
              <Text>과외 장소: {student.info.address}</Text>
            </View>
          </View>
        </TouchableOpacity >
        <TouchableOpacity style={{position: "absolute", right: 15, top: 5, zIndex: 1}} onPress={() => handleDelete(student.key)}>
          <MaterialCommunityIcons name="delete-forever-outline" size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={{position: "absolute", right: 15, bottom: 5, zIndex: 1}} onPress={() => handleUpdate(student.key)}>
          <MaterialCommunityIcons name="account-edit" size={20} />
        </TouchableOpacity>
      </View>
    )
  })
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={signOutUser}>
        <Text>로그아웃</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.updateInfoButton} onPress={updateInfo}>
        <Text>정보수정</Text>
      </TouchableOpacity>
      <View style={styles.profile}>
        <Text style={{width: 40, height: 40}}>선생님 아이콘</Text>
        <Text style={styles.text}>{auth().currentUser.displayName} 선생님</Text>
      </View>
      <DrawerContentScrollView showsVerticalScrollIndicator={false} style={styles.contentContainer}>
        {contents}
      </DrawerContentScrollView>
      <View>
        <DrawerItem
          icon={({color, size}) => {
            return <AntDesign name='plus' color={color} size={size} />;
          }}
          label="학생추가"
          onPress={() => {
            // console.warn('아직 완벽히 구현되지 않은 페이지 입니다.');
            navigation.navigate('학생추가')
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  logoutButton: {
    position: 'absolute',
    top: 5,
    left: 5,
    zIndex: 3,
  },
  updateInfoButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 3,
  },
  profile: {
    flex: 0.25,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fceaf0',
    borderBottomColor: '#fad2df',
    borderBottomWidth: 1.5,
  },
  contentContainer: {
    // borderTopColor: '#740f31',
    // borderTopWidth: 1.5,
  },
  itemContainer: {
    flex: 1,
    height: 100,
    backgroundColor: '#ffffff',
    borderBottomColor: '#740f31',
    borderBottomWidth: 0.25,
  },
  item: {
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    paddingTop: 5,
    fontSize: 30,
    fontWeight: 'bold',
  },
});

const mapStateToProps = (state) => {
  return {
    tutorId: state.tutorReducer.uid,
    studentNum: state.tutorReducer.studentNum,
    studentArray: state.tutorReducer.studentArray,
  };
};

const mapDispatchToProps = () => {
  return{};
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)
