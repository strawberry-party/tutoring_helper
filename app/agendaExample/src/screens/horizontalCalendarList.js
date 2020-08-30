import { CalendarList } from 'react-native-calendars';
import React from 'react';

export default function HorizontalCalendarList(){

  const [selectedDate, setSelectedDate] = React.useState('2020-08-16');
  const [markedDates, setMarkedDates] = React.useState({});

  const setNewDaySelected = (date) => {
    const markedDate = Object.assign({});
    markedDate[date] = {
      selected: true,
      selectedColor: '#DFA460'
    };
    setSelectedDate(date);
    setMarkedDates(markedDate);
  };

  return (
    <CalendarList
      markedDates={markedDates}
      current={selectedDate}
      pastScrollRange={24}
      futureScrollRange={24}
      horizontal
      pagingEnabled
      onDayPress={(day) => {
        console.warn('what the');
        setNewDaySelected(day.dateString);
      }}
    />
  );
};
