import {
  AgendaCardType,
  DailyAgendasType,
  EndAfterType,
  LessonTime,
  RepeatedScheduleInfo,
  ScheduleType,
  WeeklyScheduleType,
} from './../../types/schedule';

import dayjs from 'dayjs';

const today = new Date().toISOString().split('T')[0];
const fastDate = getPastDate(3);
const futureDates = getFutureDates(9);
const dates = [fastDate, today].concat(futureDates);
var weekday = require('dayjs/plugin/weekday');
dayjs.extend(weekday);

/// 반복 설정한 스케줄의 정보를 저장하는 리스트
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

// TODO (규빈)
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
  //     schedules.concat(getRepeatedSchedules(startPoint, endPoint, weeklySchedule[i] ));
  //   }
  // }

  return schedules;
}

// TODO (규빈)
function getRepeatedSchedules(
  startPoint: dayjs.Dayjs,
  endPoint: dayjs.Dayjs,
  dailyLessonTime: LessonTime,
): ScheduleType[] {
  return [];
}

// TODO (규빈)
function getEndPoint(
  endAfter: EndAfterType,
  startPoint: dayjs.Dayjs,
): dayjs.Dayjs {
  // TODO: EndAfterType : week / times / endPoint

  return dayjs();
}

// TODO (규빈)
/// 일별 일정으로 정리하는 함수
function sortIntoDailyAgendas(schedules: ScheduleType[]): DailyAgendasType[] {
  return [];
}

// TODO: data에도 어떤 config에서 generate 됐는지 알려주는 id가 필요함. 그래야 나중에 선택 -> 수정했을 때 넘길 수 있음
// TODO: 현재 렌더링할 영역 (dates 배열) 전부에 대해 agenda가 없다면 data: [{}]으로 자동 초기화
export const dailyAgendas: DailyAgendasType[] = [
  {
    date: dates[0],
    data: [
      { startPoint: '12:30', endPoint: '14:30', text: '과외' },
      { startPoint: '12:30', endPoint: '14:30', text: '과외' },
      { startPoint: '12:30', endPoint: '14:30' },
    ],
  },

  { date: dates[4], data: [{}] },
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
