import {
  EndAfterType,
  RepeatedScheduleInfo,
  ScheduleType,
  WeeklyScheduleType,
} from './../../types/schedule';
import { forEach, forIn } from 'lodash';

import dayjs from 'dayjs';

const today = new Date().toISOString().split('T')[0];
const fastDate = getPastDate(3);
const futureDates = getFutureDates(9);
const dates = [fastDate, today].concat(futureDates);
var weekday = require('dayjs/plugin/weekday');
dayjs.extend(weekday);

const repeatedScheduleInfoList: RepeatedScheduleInfo[] = [
  {
    endAfter: { numOfWeek: 2 },
    startPoint: dayjs('2020-09-13'),
    weeklySchedule: new WeeklyScheduleType(
      new Map([
        ['mon', { start: dayjs('2020-09-13'), end: dayjs('2020-09-14') }],
      ]),
    ),
  },

  {
    endAfter: { numOfTimes: 4 },
    startPoint: dayjs('2020-09-13'),
    weeklySchedule: new WeeklyScheduleType(
      new Map([
        ['mon', { start: dayjs('2020-09-13'), end: dayjs('2020-09-14') }],
        ['tue', { start: dayjs('2020-09-13'), end: dayjs('2020-09-14') }],
      ]),
    ),
  },
];

function scheduleGenerator(
  repeatedScheduleInfo: RepeatedScheduleInfo,
  repeatedScheduleInfoId: string,
  text: string,
  studentId: string,
  tagId: string,
  memo?: string,
): ScheduleType[] {
  const { endAfter, startPoint, weeklySchedule } = repeatedScheduleInfo;
  const endPoint = getEndPoint(endAfter, startPoint);
  // startPoint 부터 endPoint까지 weeklySchedule에 있는 요일에 대해 스케쥴 생성

  let schedules: ScheduleType[] = [];
  let groundDay = startPoint;

  // for (let i = 0; i < 7; i++) {
  //   let code = i.toString();
  //   if (dayjs(groundDay).day() === i) {
  //     schedules.concat([]);
  //   }
  // }

  return schedules;
}

function getEndPoint(
  endAfter: EndAfterType,
  startPoint: dayjs.Dayjs,
): dayjs.Dayjs {
  // TODO
  return dayjs();
}

// 일별 일정으로 정리
const dailySchedule = [
  {
    date: '2020-09-13',
    data: [
      {
        start: '4pm',
        end: '1h',
        text: 'text',
        studentId: 'student_1',
        tagId: 'tag_1',
      },
      {
        start: '6pm',
        end: '1h',
        text: 'text',
        studentId: 'student_2',
        tagId: 'tag_2',
      },
    ],
  },

  {
    date: '2020-09-15',
    data: [
      { start: '4pm', end: '1h', text: 'text', studentId: 'student_1' },
      { start: '6pm', end: '1h', text: 'text', studentId: 'student_2' },
    ],
  },
]; // data에도 어떤 config에서 generate 됐는지 알려주는 id가 필요함. 그래야 나중에 선택 -> 수정했을 때 넘길 수 있음



export interface AgendaCardType {
  startPoint: string; // dayjs.Dayjs;
  endPoint: string; // dayjs.Dayjs;

  text?: string;
  memo?: string;
}

export interface DailyAgendasType {
  title: string;
  data: ({} | AgendaCardType)[];
}

export const dailyAgendas: DailyAgendasType[] = [
  {
    title: dates[0],
    data: [
      { startPoint: '12:30', endPoint: '14:30', text: '과외' },
      { startPoint: '12:30', endPoint: '14:30', text: '과외' },
      { startPoint: '12:30', endPoint: '14:30', },
    ],
  },

  { title: dates[4], data: [{}] },
];

function getFutureDates(days: number) {
  const array = [];
  for (let index = 1; index <= days; index++) {
    const date = new Date(Date.now() + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
    const dateString = date.toISOString().split('T')[0];
    array.push(dateString);
  }
  return array;
}

function getPastDate(days: number) {
  return new Date(Date.now() - 864e5 * days).toISOString().split('T')[0];
}
