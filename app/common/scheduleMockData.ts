import {
  DailyAgendasType,
  FormWorkScheduleType,
  LessonTime,
  RepeatedScheduleInfo,
  ScheduleType,
  Week,
  WeeklyScheduleType,
} from '../types/schedule';

import _ from 'lodash';
import dayjs from 'dayjs';
import formWorkScheduleGenerator from '../component/Schedule/scheduleUtils/formWorkScheduleGenerator';
import { generateWeek } from '../component/Schedule/ScheduleForm/AddScheduleForm';
import { getWeeklySchedule } from '../component/Schedule/DailyScheduleSelector/weeklyScheduleParser';
import sortIntoDailyAgendas from '../component/Schedule/scheduleUtils/sortIntoDailyAgendas';

const fullFormatString = 'YYYY-MM-DD HH:mm';
const timeOnlyFormatString = 'HH:mm';

/// 파이어베이스 도입 완료하면 파이어베이스에서 불러옴

/// 반복 설정한 스케줄의 정보를 저장하는 리스트
const r1: RepeatedScheduleInfo = new RepeatedScheduleInfo(
  'repeat_00',
  new FormWorkScheduleType('repeated schedule 0'),
  { numOfTimes: 2 },
  dayjs('2020-09-13'),
  getWeeks([[1, '10:30', '13:00']]),
);

const r2: RepeatedScheduleInfo = new RepeatedScheduleInfo(
  'repeat_01',
  new FormWorkScheduleType('repeated schedule 1'),
  { numOfTimes: 4 },
  dayjs('2020-09-13'),
  getWeeks([
    [1, '18:30', '21:00'],
    [3, '12:30', '14:00'],
  ]),
);

const r3: RepeatedScheduleInfo = new RepeatedScheduleInfo(
  'repeat_03',
  new FormWorkScheduleType('repeated schedule 2'),
  { endDay: dayjs('2020-10-18', 'YYYY-MM-DD') },
  dayjs('2020-09-13'),
  getWeeks([
    [2, '08:30', '13:00'],
    [6, '12:30', '17:00'],
  ]),
);

export const repeatedScheduleInfoList: RepeatedScheduleInfo[] = [r1, r2, r3];

// schedule examples

type DayData = [number, string, string];

export function getWeeks(data: DayData[]): WeeklyScheduleType {
  const current: string = dayjs().format('YYYY-MM-DD');

  var selectedDays: number[] = [];
  var startTimes: Week = generateWeek(dayjs());
  var endTimes: Week = generateWeek(dayjs());
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    const dayCode = element[0];
    const startString = element[1];
    const endString = element[2];

    startTimes[dayCode] = dayjs(current + ' ' + startString, fullFormatString);
    endTimes[dayCode] = dayjs(current + ' ' + endString, fullFormatString);
    selectedDays.push(dayCode);
  }

  return getWeeklySchedule(startTimes, endTimes, selectedDays);
}

const schedulesWithOutRepetition: ScheduleType[] = [
  new ScheduleType(
    'schedule_01',
    'none',
    new FormWorkScheduleType(
      '방금 막 따끈따끈하게 만들어진 반복일정없는 스케쥴 ',
    ),
  ),
  new ScheduleType(
    'schedule_02',
    'none',
    new FormWorkScheduleType('과외', 'student_2', 'tag_2', {
      start: dayjs('2020-09-13 10:00', fullFormatString),
      end: dayjs('2020-09-13 12:00', fullFormatString),
    }),
  ),
  new ScheduleType(
    'schedule_03',
    'none',
    new FormWorkScheduleType('과외', 'student_3', 'tag_2', {
      start: dayjs('2020-09-14 15:00', fullFormatString),
      end: dayjs('2020-09-14 18:00', fullFormatString),
    }),
  ),

  new ScheduleType(
    'schedule_04',
    'none',
    new FormWorkScheduleType('과외', 'student_2', 'tag_2', {
      start: dayjs('2020-09-23 09:00', fullFormatString),
      end: dayjs('2020-09-23 18:00', fullFormatString),
    }),
  ),
];

var schedulesWithRepetition = [];
for (let index = 0; index < repeatedScheduleInfoList.length; index++) {
  const repeatedScheduleInfo = repeatedScheduleInfoList[index];
  let formWorkSchedules: FormWorkScheduleType[] = formWorkScheduleGenerator(
    repeatedScheduleInfo,
  );

  formWorkSchedules.forEach((item) =>
    schedulesWithRepetition.push(
      generateScheduleFromFormWorkSchedule(repeatedScheduleInfo.id, item),
    ),
  );
}

var idCounter = 0;
function generateScheduleFromFormWorkSchedule(
  repeatedScheduleInfoId,
  formWork: FormWorkScheduleType,
): ScheduleType {
  idCounter++;
  return new ScheduleType(
    'initial_schedule_' + idCounter,
    repeatedScheduleInfoId,
    formWork,
  );
}
export const schedules = schedulesWithOutRepetition.concat(
  schedulesWithRepetition,
);
// export const schedules: ScheduleType[] = [];
export const dailyAgendas: DailyAgendasType[] = sortIntoDailyAgendas(schedules);
