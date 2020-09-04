import {
  Days,
  EndAfterType,
  LessonTime,
  RepeatedScheduleInfo,
  ScheduleType,
  WeeklyScheduleType,
} from './../../types/schedule';

import dayjs from 'dayjs';
import scheduleGenerator from './scheduleUtils/scheduleGenerator';

export interface DailyAgendasType {
  title: string;
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

const timeOnlyFormatString = 'HH:mm';
const fullFormatString = 'YYYY-MM-DD HH:mm';

export function getDailyLessonTime(startString, endString): LessonTime {
  return new LessonTime(
    dayjs(startString, timeOnlyFormatString),
    dayjs(endString, timeOnlyFormatString),
  );
}

export const repeatedScheduleInfoList: RepeatedScheduleInfo[] = [
  {
    formWorkSchedule: new ScheduleType('repetition_1'),
    endAfter: { numOfTimes: 2 },
    startPoint: dayjs('2020-09-13'),
    weeklySchedule: new WeeklyScheduleType(
      new Map([['mon', getDailyLessonTime('10:30', '13:00')]]),
    ),
  },

  {
    formWorkSchedule: new ScheduleType('repetition_2'),
    endAfter: { numOfTimes: 4 },
    startPoint: dayjs('2020-09-13'),
    weeklySchedule: new WeeklyScheduleType(
      new Map([
        ['mon', getDailyLessonTime('18:30', '21:00')],
        ['wed', getDailyLessonTime('12:30', '14:00')],
      ]),
    ),
  },

  {
    formWorkSchedule: new ScheduleType('repetition_3'),
    endAfter: { endDay: dayjs('2020-10-18', 'YYYY-MM-DD') },
    startPoint: dayjs('2020-09-13'),
    weeklySchedule: new WeeklyScheduleType(
      new Map([
        ['tue', getDailyLessonTime('08:30', '13:00')],
        ['sat', getDailyLessonTime('12:30', '17:00')],
      ]),
    ),
  },
];

var scheduleGenerated: ScheduleType[] = [];

for (let index = 0; index < repeatedScheduleInfoList.length; index++) {
  const repeatedScheduleInfo = repeatedScheduleInfoList[index];
  var a = scheduleGenerator(repeatedScheduleInfo);
  a.forEach((schedule) => {
    console.log(
      schedule.time.start.format(formatString) +
        ' ~ ' +
        schedule.time.end.format(formatString),
    );
  });
  scheduleGenerated = scheduleGenerated.concat(
    scheduleGenerator(repeatedScheduleInfo),
  );
}

const formatString = 'YYYY-MM-DD';

/// ScheduleType들을 일별 일정으로 정리하는 함수 (같은 날짜 내용 합치기)
// var dateToIndexMap: Map<string, number> = new Map([
//   ['2020-09-13', 0],
//   ['2020-10-18', 1],
// ]);

function sortIntoDailyAgendas(schedules: ScheduleType[]): DailyAgendasType[] {
  var dailyAgendas: DailyAgendasType[] = [];
  var dateToIndexMap: Map<string, number> = new Map<string, number>();

  schedules.forEach((schedule: ScheduleType) => {
    var startPoint = schedule.time.start.format(formatString);
    if (dateToIndexMap.has(startPoint)) {
      var index: number = dateToIndexMap.get(startPoint);
      dailyAgendas[index].data.push(schedule);
    } else {
      dateToIndexMap.set(startPoint, dailyAgendas.length);
      dailyAgendas.push({ title: startPoint, data: [schedule] });
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
    start: dayjs('2020-09-13 10:00', fullFormatString),
    end: dayjs('2020-09-13 12:00', fullFormatString),
  }),
  new ScheduleType('none', '과외', 'student_3', 'tag_2', {
    start: dayjs('2020-09-14 15:00', fullFormatString),
    end: dayjs('2020-09-14 18:00', fullFormatString),
  }),
  new ScheduleType('none', '과외', 'student_2', 'tag_2', {
    start: dayjs('2020-09-23 09:00', fullFormatString),
    end: dayjs('2020-09-23 18:00', fullFormatString),
  }),
];

export const dailyAgendas: DailyAgendasType[] = sortIntoDailyAgendas(
  scheduleGenerated,
);
