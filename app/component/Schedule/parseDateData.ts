import {
  EndAfterType,
  LessonTime,
  RepeatedScheduleInfo,
  ScheduleType,
  WeeklyScheduleType,
} from './../../types/schedule';

import dayjs from 'dayjs';
import { times } from 'lodash';

export interface DailyAgendasType {
  date: string;
  data: ScheduleType[];
}

/// 현재 선택된 날짜를 기준으로, 이전 3일 + 이후 9일 총 12일어치만 불러옴
const today = new Date().toISOString().split('T')[0];
const fastDate = getPastDate(3);
const futureDates = getFutureDates(9);

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

const dates = [fastDate, today].concat(futureDates);
var weekday = require('dayjs/plugin/weekday');
dayjs.extend(weekday);

/// 반복 설정한 스케줄의 정보를 저장하는 리스트
/// 파이어베이스 도입 완료하면 파이어베이스에서 불러옴
const repeatedScheduleInfoList: RepeatedScheduleInfo[] = [
  {
    formWorkSchedule: new ScheduleType('default'),
    endAfter: { numOfWeek: 2 },
    startPoint: dayjs('2020-09-13'),
    weeklySchedule: new WeeklyScheduleType(
      new Map([
        ['mon', { start: dayjs('2020-09-13'), end: dayjs('2020-09-14') }],
      ]),
    ),
  },

  {
    formWorkSchedule: new ScheduleType('default'),
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
const formatString = 'YYYY-MM-DD';

/// ScheduleType들을 일별 일정으로 정리하는 함수 (같은 날짜 내용 합치기)
var dateToIndexMap: Map<string, number> = new Map([
  ['2020-09-13', 0],
  ['2020-10-18', 1],
]);

function sortIntoDailyAgendas(schedules: ScheduleType[]): DailyAgendasType[] {
  var dailyAgendas: DailyAgendasType[] = [];

  schedules.forEach((schedule: ScheduleType) => {
    var startPoint = schedule.time.start.format(formatString);
    if (dateToIndexMap.has(startPoint))
      dailyAgendas[dateToIndexMap.get(startPoint)].data.push(schedule);
    else {
      dailyAgendas.push({ date: startPoint, data: [schedule] });
      dateToIndexMap.set(startPoint, dailyAgendas.length);
    }
  });
  return dailyAgendas;
}

// TODO: 현재 렌더링할 날짜들 (dates 배열) 중 schedule 없는 날이 있으면 data는 []이 되어야 함
// TODO: mockData : schedule 더 쓰기

// mockData

/// 화면에 AgendaCard 컴포넌트 및 캘린더의 marked dot으로 렌더링되는 ScheduleType 데이터
/// 파이어베이스 도입 완료하면 파이어베이스에서 불러옴
const schedules: ScheduleType[] = [
  new ScheduleType(),
  new ScheduleType('none', '과외', 'student_2', 'tag_2', {
    start: dayjs('2020-09-13'),
    end: dayjs('2020-09-14'),
  }),
  new ScheduleType('none', '과외', 'student_2', 'tag_2', {
    start: dayjs('2020-09-13'),
    end: dayjs('2020-09-14'),
  }),
  new ScheduleType('none', '과외', 'student_2', 'tag_2', {
    start: dayjs('2020-09-13'),
    end: dayjs('2020-09-14'),
  }),
];

export const dailyAgendas: DailyAgendasType[] = sortIntoDailyAgendas(schedules);
