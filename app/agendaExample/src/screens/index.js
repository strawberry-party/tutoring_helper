import AgendaScreen from './agenda';
import CalendarsList from './calendarsList';
import CalendarsScreen from './calendars';
import ExpandableCalendar from './expandableCalendar';
import HorizontalCalendarList from './horizontalCalendarList';
import MenuScreen from './menu';
import { Navigation } from 'react-native-navigation';
import TimelineCalendar from './timelineCalendar';

export function registerScreens() {
  return <AgendaScreen />;
}