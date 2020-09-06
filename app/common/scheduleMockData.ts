import {
  DailyAgendasType,
  LessonTime,
  RepeatedScheduleInfo,
  ScheduleType,
  WeeklyScheduleType,
} from '../types/schedule';

import dayjs from 'dayjs';
import scheduleGenerator from '../component/Schedule/scheduleUtils/scheduleGenerator';
import sortIntoDailyAgendas from '../component/Schedule/scheduleUtils/sortIntoDailyAgendas';

const fullFormatString = 'YYYY-MM-DD HH:mm';
const timeOnlyFormatString = 'HH:mm';

/// 파이어베이스 도입 완료하면 파이어베이스에서 불러옴

/// 반복 설정한 스케줄의 정보를 저장하는 리스트
const r1: RepeatedScheduleInfo = {
  formWorkSchedule: new ScheduleType('repetition_1'),
  endAfter: { numOfTimes: 2 },
  startPoint: dayjs('2020-09-13'),
  weeklySchedule: new WeeklyScheduleType(
    new Map([[1, getDailyLessonTime('10:30', '13:00')]]),
  ),
};

const r2: RepeatedScheduleInfo = {
  formWorkSchedule: new ScheduleType('repetition_2'),
  endAfter: { numOfTimes: 4 },
  startPoint: dayjs('2020-09-13'),
  weeklySchedule: new WeeklyScheduleType(
    new Map([
      [1, getDailyLessonTime('18:30', '21:00')],
      [3, getDailyLessonTime('12:30', '14:00')],
    ]),
  ),
};

const r3: RepeatedScheduleInfo = {
  formWorkSchedule: new ScheduleType('repetition_3'),
  endAfter: { endDay: dayjs('2020-10-18', 'YYYY-MM-DD') },
  startPoint: dayjs('2020-09-13'),
  weeklySchedule: new WeeklyScheduleType(
    new Map([
      [2, getDailyLessonTime('08:30', '13:00')],
      [6, getDailyLessonTime('12:30', '17:00')],
    ]),
  ),
};

export const repeatedScheduleInfoMap: Map<
  string,
  RepeatedScheduleInfo
> = new Map([
  ['repetition_1', r1],
  ['repetition_2', r2],
  ['repetition_3', r3],
]);

export const repeatedScheduleInfoList: RepeatedScheduleInfo[] = Array.from(
  repeatedScheduleInfoMap.values(),
);

// schedule examples
export function getDailyLessonTime(startString, endString): LessonTime {
  return new LessonTime(
    dayjs(startString, timeOnlyFormatString),
    dayjs(endString, timeOnlyFormatString),
  );
}

const schedulesWithOutRepetition: ScheduleType[] = [
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

export const schedules: ScheduleType[] = schedulesWithOutRepetition.concat(
  repeatedScheduleInfoList
    .map((repeatedScheduleInfo) => scheduleGenerator(repeatedScheduleInfo))
    .reduce((acc, val) => acc.concat(val), []),
);

export const dailyAgendas: DailyAgendasType[] = sortIntoDailyAgendas(schedules);
