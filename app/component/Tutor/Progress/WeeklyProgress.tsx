import React, { Component } from 'react';
import { Text, View, SectionList, StyleSheet, ScrollView } from 'react-native';

import Week from './Week';

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

export default function WeeklyProgress() {
  return (
    <ScrollView >
      <SectionList
        sections={[
          {title: '1회차', data: [<Week />]},
          {title: '2회차', data: [<Week />]},
          {title: '3회차', data: [<Week />]},
          {title: '4회차', data: [<Week />]},
          {title: '5회차', data: [<Week />]},
        ]} 
        renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
        renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
        />
    </ScrollView>
  );
}

