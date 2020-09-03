import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Calendar } from 'react-native-toggle-calendar';
import CalendarDayComponent from './CalendarDayComponent'
import CalendarFooterComponent from './CalendarFooterComponent'
import CalendarHeaderComponent from './CalendarDayComponent';
import React from 'react';
import moment from 'moment';

let selectedCalendarDate = moment();
const minimumDate = moment().add(-1, 'day'); // one day before for midnight check-in usecase
const currentDate = moment();

export default class ToggleCalendarExample extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedCalendarDateString: selectedCalendarDate.format('YYYY-MM-DD'),
      selectedCalendarMonthString: selectedCalendarDate.format('YYYY-MM-DD'),
      calendarHeaderData: {},
      calendarMarkedDates: {
        '2019-09-01': {
          fullySoldOut: false,
          partiallySoldOut: false,
          fullyBlocked: false,
          partiallyBlocked: true,
          inventory: 14,
          highDemand: false,
          selected: false
        },
        '2019-10-01': {
          fullySoldOut: false,
          partiallySoldOut: false,
          fullyBlocked: false,
          partiallyBlocked: true,
          inventory: 14,
          highDemand: true,
          selected: false
        },
        '2019-11-01': {
          fullySoldOut: false,
          partiallySoldOut: false,
          fullyBlocked: false,
          partiallyBlocked: true,
          inventory: 14,
          highDemand: false,
          selected: false
        }
      },
      horizontal: true,
      ratesInventoryDataArray: [],
      saveButtonClicked: false,
      calendarLoading: true
    };

    this.onPressArrowLeft = this.onPressArrowLeft.bind(this);
    this.onPressArrowRight = this.onPressArrowRight.bind(this);
    this.onPressListView = this.onPressListView.bind(this);
    this.onPressGridView = this.onPressGridView.bind(this);
  }

  updateSelectedCalendarMonth(selectedCalendarMonthString) {
    this.setState({
      selectedCalendarMonthString,
      calendarLoading: true
    });
  }

  onDayPress(date) {
    selectedCalendarDate = moment(date.dateString);
    const selectedCalendarDateString = selectedCalendarDate.format(
      'YYYY-MM-DD'
    );
    this.setState({
      ratesInventoryDataArray: [], // reset inventory data
      selectedCalendarDateString,
      selectedCalendarMonthString: selectedCalendarDateString
    });
    /*this.fetchDemandData(selectedCalendarDateString);
    this.fetchMultiDaysInventoryData(selectedCalendarDateString);
    this.fetchRatesAndInventoryData(selectedCalendarDateString);*/
  }

  onPressArrowLeft(currentMonth, addMonthCallback) {
    const monthStartDate = moment(currentMonth.getTime()).startOf('month');

    // don't go back for past months
    if (monthStartDate > currentDate) {
      addMonthCallback(-1);
      const selectedCalendarMonthString = moment(currentMonth.getTime())
        .add(-1, 'month')
        .format('YYYY-MM-DD');
      this.updateSelectedCalendarMonth(selectedCalendarMonthString);
    }
  }

  onPressArrowRight(currentMonth, addMonthCallback) {
    addMonthCallback(1);
    const selectedCalendarMonthString = moment(currentMonth.getTime())
      .add(1, 'month')
      .format('YYYY-MM-DD');
    this.updateSelectedCalendarMonth(selectedCalendarMonthString);
  }

  onPressListView() {
    this.setState({ horizontal: true });
  }

  onPressGridView() {
    this.setState({ horizontal: false });
  }

  render() {
    return (
      <View>
        {/* <StatusBar barStyle="dark-content" /> */}
        <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center' }}>
          {/* <Calendar
            current={this.state.calendarDate}
            dayComponent={CalendarDayComponent}
            calendarHeaderComponent={CalendarHeaderComponent}
            headerData={{
              calendarDate: calendarDate.format('DD MMM, YYYY')
            }}
            style={{
              paddingLeft: 0, paddingRight: 0
            }}
            onPressArrowLeft={this.onPressArrowLeft}
            onPressArrowRight={this.onPressArrowRight}
            onPressListView={this.onPressListView}
            onPressGridView={this.onPressGridView}
            markedDates={{
              '2019-02-23': { soldOut: false, blocked: false, inventory: 2 },
              '2019-02-24': { soldOut: false, blocked: false, inventory: 2 },
              '2019-02-25': { soldOut: false, blocked: true, inventory: 0 },
              '2019-02-26': { soldOut: true, blocked: true, inventory: 2 }
            }}
            horizontal={this.state.horizontal}
            onDayPress={this.onDayPress}
          /> */}

          {/* CalendarDayComponent.propTypes = {
            children: PropTypes.any,
  state: PropTypes.string,
  marking: PropTypes.any,
  horizontal: PropTypes.bool,
  date: PropTypes.object,
  onPress: PropTypes.func.isRequired,
  current: PropTypes.string
}; */}

          {/* <View style={{ marginTop: 100, }}>
            <CalendarDayComponent
              state='today'
              marking={{}}
              horizontal={true}
              date={{ dateString: '2020-10-18', weekDay: 0 }}
              onPress={(date) => console.warn('pressed date')}
              current={'2020-10-18'}
              text='hello' />

            <CalendarHeaderComponent
              headerData={{ calendarDate: '2020-08-14', }}
              onPressArrowLeft={this.onPressArrowLeft}
              onPressArrowRight={this.onPressArrowRight}
              onPressListView={this.onPressListView}
              onPressGridView={this.onPressGridView}
              horizontal={true}
            >
            </CalendarHeaderComponent>

          </View> */}

          <Calendar
            // current={this.state.selectedCalendarMonthString}
            // minDate={minimumDate.format('YYYY-MM-DD')}
            // // dayComponent={Hello}
            // calendarHeaderComponent={CalendarHeaderComponent}
            // headerData={this.state.calendarHeaderData}
            // style={styles.calendar}
            // onPressArrowLeft={this.onPressArrowLeft}
            // onPressArrowRight={this.onPressArrowRight}
            // onPressListView={this.onPressListView}
            // onPressGridView={this.onPressGridView}
            // markedDates={this.state.calendarMarkedDates}
            // horizontal={this.state.horizontal}
            // onDayPress={this.onDayPress}
            // showPastDatesInHorizontal={1}
            // horizontalEndReachedThreshold={50}
            // horizontalStartReachedThreshold={0}
            // loading={this.state.calendarLoading}
          />
          {/* <CalendarFooterComponent
            calendarDateString={selectedCalendarDate.format('DD MMM, YYYY')}
          /> */}
        </SafeAreaView>
      </View>);
  }
};

const styles = StyleSheet.create({
  scrollView: {
  }
});


const Hello = () => <Text> Hello </Text>