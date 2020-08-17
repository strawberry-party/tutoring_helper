import React from 'react';
import { Text, View, SectionList, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Week from './Week';
import { Button } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 17,
    fontWeight: 'bold',
    backgroundColor: '#fdf5f8',
  },
  item: {
    backgroundColor: '#ffffff',
  },
})

export default function WeeklyProgress(props) {
  const progressData = props.route.params.progress;
  const sectionItems = progressData.map(progress => {
    return {title: progress.lessonNum + '회차', data: [<Week content={progress}/>]} 
  })
  return (
    <View>
      <SectionList
        sections={sectionItems} 
        renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
        renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button icon={<Ionicons name='add' size={20} />} onPress={props.navigation.navigate('진도추가')} />
    </View>
    
  );
}

