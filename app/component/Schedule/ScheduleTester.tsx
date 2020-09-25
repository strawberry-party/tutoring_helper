import { Button, Card, DataTable } from 'react-native-paper';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { lightThemeColor, themeColor } from './scheduleThemeProvider';

import _ from 'lodash';

// import { test_getRepeatedSchedules } from './scheduleUtils/getRepeatedFormWorkSchedules';
// import { test_scheduleGenerator } from './scheduleUtils/formWorkScheduleGenerator';
const dayList = ['일', '월', '화', '수', '목', '금', '토'];

function Tester({ repeatInfos, schedules, dailyAgendas }) {
  return (
    <ScrollView>
      <View style={{ padding: 10, margin: 10, justifyContent: 'center' }}>
        <Text style={styles.title}> Schedules </Text>
        <View style={{ margin: 10 }}>
          <ScrollView horizontal>
            <View>
              <DataTable>
                <DataTable.Header style={{ marginRight: 20 }}>
                  <DataTable.Title style={styles.titleCell}>id</DataTable.Title>
                  <DataTable.Title style={styles.titleCell}>
                    text
                  </DataTable.Title>
                  <DataTable.Title style={styles.titleCell}>
                    startTime
                  </DataTable.Title>
                  <DataTable.Title style={styles.titleCell}>
                    endTime
                  </DataTable.Title>
                </DataTable.Header>

                {schedules.map((item, index) => (
                  <DataTable.Row key={index}>
                    <DataTable.Cell style={styles.cell}>
                      {item.id}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.cell}>
                      {item.text}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.cell}>
                      {item.time.start.format('MM/DD HH:mm') +
                        ` ${dayList[item.time.start.day()]}요일`}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.cell}>
                      {item.time.end.format('MM/DD HH:mm') +
                        ` ${dayList[item.time.end.day()]}요일`}
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}
              </DataTable>
            </View>
          </ScrollView>
        </View>

        <Text style={styles.title}> RepeatInfos </Text>
        <View style={{ margin: 10 }}>
          {repeatInfos.map((item, index) => (
            <View key={index} style={styles.tempStyle}>
              <Text> id: {item.id} </Text>
              <Text style={styles.subTitle}> formWorkSchedule </Text>
              <ScrollView horizontal>
                <View>
                  <DataTable.Row key={index}>
                    <DataTable.Cell style={styles.cell}>
                      {item.formWorkSchedule.text}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.cell}>
                      {item.formWorkSchedule.time.start.format('MM/DD HH:mm') +
                        ` ${
                          dayList[item.formWorkSchedule.time.start.day()]
                        }요일`}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.cell}>
                      {item.formWorkSchedule.time.end.format('MM/DD HH:mm') +
                        ` ${dayList[item.formWorkSchedule.time.end.day()]}요일`}
                    </DataTable.Cell>
                  </DataTable.Row>
                </View>
              </ScrollView>
              <Text style={styles.subTitle}> weeklySchedule </Text>
              <Text> {item.weeklySchedule.toString()} </Text>
            </View>
          ))}
        </View>

        <Text style={styles.title}> dailyAgendas </Text>
        {dailyAgendas.map((item, index) => {
          <Text> title: {item.title}</Text>;
        })}
      </View>
    </ScrollView>
  );
}

export default Tester;
const styles = StyleSheet.create({
  subTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  titleCell: {
    marginRight: 30,
  },
  cell: {
    borderRightColor: 'black',
    borderRightWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tempStyle: {
    borderBottomColor: 'black',
    borderBottomWidth: 4,
  },
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
    overflow: 'hidden',
  },
  section: {
    backgroundColor: lightThemeColor,
    color: 'grey',
    alignItems: 'flex-start',
    borderRadius: 10,
    margin: 5,
    padding: 10,
  },

  sectionTextStyle: {
    fontSize: 15,
  },
});
