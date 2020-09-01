import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { Icon } from 'react-native-paper'
import PropTypes from 'prop-types';
import React from 'react';

const weekDaysNames = ['일', '월', '화', '수', '목', '금', '토'];

export default class CalendarHeaderComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.dateText}>
            {this.props.headerData.calendarDate}
          </Text>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={this.props.onPressArrowLeft}
          >
            <Icon
              style={[styles.icon, styles.leftIcon]}
              name={'heart'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={this.props.onPressArrowRight}
          >
            <Icon
              style={[styles.icon]}
              name={'heart'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.iconContainer, {
                opacity: this.props.horizontal ? 0.2 : 1
              }
            ]}
            onPress={this.props.onPressListView}
            disabled={this.props.horizontal}
          >
            <Text> 주별보기 </Text>
            {/* <Image
              style={styles.icon}
              source={require('../../images/list.png')}
            /> */}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.iconContainer, {
                opacity: this.props.horizontal ? 1 : 0.2
              }
            ]}
            onPress={this.props.onPressGridView}
            disabled={!this.props.horizontal}
          >
            <Text> 월별보기 </Text>
            {/* <Image
              style={styles.icon}
              source={require('../../images/grid.png')}
            /> */}
          </TouchableOpacity>
        </View>
        {
          // not showing week day in case of horizontal calendar, this will be handled by day component
          this.props.horizontal ?
            null
            :
            <View style={styles.week}>
              {weekDaysNames.map((day, index) => (
                <Text key={index} style={styles.weekName} numberOfLines={1}>
                  {day}
                </Text>
              ))}
            </View>
        }
      </View>
    );
  }
}

CalendarHeaderComponent.propTypes = {
  headerData: PropTypes.object.isRequired,
  horizontal: PropTypes.bool,
  onPressArrowRight: PropTypes.func.isRequired,
  onPressArrowLeft: PropTypes.func.isRequired,
  onPressListView: PropTypes.func.isRequired,
  onPressGridView: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#eceef1'
  },
  week: {
    marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  weekName: {
    marginTop: 2,
    marginBottom: 7,
    width: 32,
    textAlign: 'center',
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#7c7c7c'
  },
  dateText: {
    flex: 6,
    fontSize: 18
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftIcon: {
    transform: [{ rotate: '180deg' }]
  },
  icon: {
    width: 24,
    height: 24
  }
});
