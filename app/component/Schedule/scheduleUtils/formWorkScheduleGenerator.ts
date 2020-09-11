import {
  EndAfterNTimes,
  EndAfterThisDay,
  FormWorkScheduleType,
  LessonTime,
  RepeatedScheduleInfo,
  ScheduleType,
  WeeklyScheduleType,
} from '../../../types/schedule';

import dayjs from 'dayjs';
import { getDailyLessonTime } from '../../../common/scheduleMockData';
import getRepeatedFormWorkSchedules from './getRepeatedFormWorkSchedules';

const formatString = 'YYYY-MM-DD HH:mm';

// export function test_formWorkScheduleGenerator() {
//   console.log('====================================');
//   console.log('test_formWorkScheduleGenerator');
//   console.log('====================================');

//   const repeated = {
//     formWorkSchedule: new ScheduleType(1),
//     endAfter: { numOfTimes: 2 },
//     startPoint: dayjs('2020-09-13'),
//     weeklySchedule: new WeeklyScheduleType(
//       new Map([[1, getDailyLessonTime('10:30', '13:00')]]),
//     ),
//   };

//   formWorkScheduleGenerator(repeated).forEach((schedule) => {
//     console.log(
//       schedule.time.start.format(formatString) +
//         ' ~ ' +
//         schedule.time.end.format(formatString),
//     );
//   });

//   const repeated2 = {
//     formWorkSchedule: new ScheduleType(3),
//     // endAfter: { numOfTimes: 12 },
//     endAfter: { endDay: dayjs('2020-10-18', 'YYYY-MM-DD') },
//     startPoint: dayjs('2020-09-13'),
//     weeklySchedule: new WeeklyScheduleType(
//       new Map([
//         [2, getDailyLessonTime('08:30', '13:00')],
//         [6, getDailyLessonTime('12:30', '17:00')],
//       ]),
//     ),
//   };

//   formWorkScheduleGenerator(repeated2).forEach((schedule) => {
//     console.log(
//       schedule.time.start.format(formatString) +
//         ' ~ ' +
//         schedule.time.end.format(formatString),
//     );
//   });
// }

export default function formWorkScheduleGenerator(
  repeatedScheduleInfo: RepeatedScheduleInfo,
): FormWorkScheduleType[] {
  console.log('formWorkScheduleGenerator');
  const { endAfter } = repeatedScheduleInfo;

  const numOfTimes = (endAfter as EndAfterNTimes).numOfTimes;
  const endDay = (endAfter as EndAfterThisDay).endDay;

  if (numOfTimes) {
    return generateFormWorkScheduleByTimes(numOfTimes, repeatedScheduleInfo);
  } else if (endDay) {
    return generateFormWorkScheduleByEndPoint(endDay, repeatedScheduleInfo);
  }

  throw new Error(
    `In function getEndPoint: ${endAfter} is not EndAfterType (= EndAfterNTimes | EndAfterThisDay )`,
  );
}

function generateFormWorkScheduleByTimes(
  numOfTimes: number,
  repeatedScheduleInfo: RepeatedScheduleInfo,
): FormWorkScheduleType[] {
  console.log('====================================');
  console.log('generateFormWorkScheduleByTimes');
  console.log('====================================');
  const { startPoint, weeklySchedule, formWorkSchedule } = repeatedScheduleInfo;

  let formWorkSchedules: FormWorkScheduleType[] = [];
  let cnt = 0;
  var groundDay = startPoint;

  const { text, studentId, tagId, memo } = formWorkSchedule;

  while (cnt < numOfTimes) {
    if (weeklySchedule[groundDay.day().toString()]) {
      let lessonTime: LessonTime = weeklySchedule[groundDay.day().toString()];
      let start = lessonTime.start;
      let end = lessonTime.end;
      var startTime = start.format('HH:mm');
      var endTime = end.format('HH:mm');
      var current = groundDay.format('YYYY-MM-DD');

      var currentTime = new LessonTime(
        dayjs(current + ' ' + startTime, formatString),
        dayjs(current + ' ' + endTime, formatString),
      );

      formWorkSchedules.push(
        new FormWorkScheduleType(text, studentId, tagId, currentTime, memo),
      );

      console.log('generating: ' + text);
      cnt++;
    }

    groundDay = groundDay.add(1, 'd');
  }

  return formWorkSchedules;
}
const dayList = ['일', '월', '화', '수', '목', '금', '토'];

function generateFormWorkScheduleByEndPoint(
  endPoint: dayjs.Dayjs,
  repeatedScheduleInfo: RepeatedScheduleInfo,
) {
  console.log('====================================');
  console.log('generateFormWorkScheduleByEndPoint');
  console.log('====================================');

  const { startPoint, weeklySchedule, formWorkSchedule } = repeatedScheduleInfo;

  repeatedScheduleInfo.print();

  var formWorkSchedules: FormWorkScheduleType[] = [];
  var groundDay = startPoint;

  for (let i = 0; i < 7; i++) {
    var dayOfGroundDay = groundDay.add(i, 'd').day();

    if (weeklySchedule[dayOfGroundDay.toString()]) {
      console.log(`${dayList[dayOfGroundDay]}요일 일정 추가 중`);
      formWorkSchedules = formWorkSchedules.concat(
        getRepeatedFormWorkSchedules(
          groundDay.add(i, 'd'),
          endPoint,
          weeklySchedule[dayOfGroundDay.toString()],
          formWorkSchedule,
        ),
      );
    }
  }
  return formWorkSchedules;
}
