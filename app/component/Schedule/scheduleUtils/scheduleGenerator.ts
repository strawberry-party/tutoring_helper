import {
  EndAfterNTimes,
  EndAfterThisDay,
  LessonTime,
  RepeatedScheduleInfo,
  ScheduleType,
  WeeklyScheduleType,
} from '../../../types/schedule';

import dayjs from 'dayjs';
import { getDailyLessonTime } from '../parseDateData';
import getRepeatedSchedules from './getRepeatedSchedules';

const formatString = 'YYYY-MM-DD HH:mm';

export function test_scheduleGenerator() {
  console.log('====================================');
  console.log('test_scheduleGenerator');
  console.log('====================================');

  const repeated = {
    formWorkSchedule: new ScheduleType('repetition_1'),
    endAfter: { numOfTimes: 2 },
    startPoint: dayjs('2020-09-13'),
    weeklySchedule: new WeeklyScheduleType(
      new Map([['mon', getDailyLessonTime('10:30', '13:00')]]),
    ),
  };

  scheduleGenerator(repeated).forEach((schedule) => {
    console.log(
      schedule.time.start.format(formatString) +
        ' ~ ' +
        schedule.time.end.format(formatString),
    );
  });

  const repeated2 = {
    formWorkSchedule: new ScheduleType('repetition_3'),
    // endAfter: { numOfTimes: 12 },
    endAfter: { endDay: dayjs('2020-10-18', 'YYYY-MM-DD') },
    startPoint: dayjs('2020-09-13'),
    weeklySchedule: new WeeklyScheduleType(
      new Map([
        ['tue', getDailyLessonTime('08:30', '13:00')],
        ['sat', getDailyLessonTime('12:30', '17:00')],
      ]),
    ),
  };

  scheduleGenerator(repeated2).forEach((schedule) => {
    console.log(
      schedule.time.start.format(formatString) +
        ' ~ ' +
        schedule.time.end.format(formatString),
    );
  });

}

export default function scheduleGenerator(
  repeatedScheduleInfo: RepeatedScheduleInfo,
): ScheduleType[] {
  const { endAfter } = repeatedScheduleInfo;
  console.log('scheduleGenerator');

  const numOfTimes = (endAfter as EndAfterNTimes).numOfTimes;
  const endDay = (endAfter as EndAfterThisDay).endDay;

  if (numOfTimes) {
    return generateScheduleByTimes(numOfTimes, repeatedScheduleInfo);
  } else if (endDay) {
    return generateScheduleByEndPoint(endDay, repeatedScheduleInfo);
  }

  throw new Error(
    `In function getEndPoint: ${endAfter} is not EndAfterType (= EndAfterNTimes | EndAfterThisDay )`,
  );
}

function generateScheduleByTimes(
  numOfTimes: number,
  repeatedScheduleInfo: RepeatedScheduleInfo,
): ScheduleType[] {
  console.log('generateScheduleByTimes');

  const { startPoint, weeklySchedule, formWorkSchedule } = repeatedScheduleInfo;

  let schedules: ScheduleType[] = [];
  let cnt = 0;
  var groundDay = startPoint;

  const {
    linkedRepeatedScheduleInfoId,
    text,
    studentId,
    tagId,
    memo,
  } = formWorkSchedule;

  while (cnt < numOfTimes) {
    if (weeklySchedule[groundDay.day()]) {
      let { start, end } = weeklySchedule[groundDay.day()];
      var startTime = start.format('HH:mm');
      var endTime = end.format('HH:mm');
      var current = groundDay.format('YYYY-MM-DD');

      var currentTime = new LessonTime(
        dayjs(current + ' ' + startTime, formatString),
        dayjs(current + ' ' + endTime, formatString),
      );

      schedules.push(
        new ScheduleType(
          linkedRepeatedScheduleInfoId,
          text,
          studentId,
          tagId,
          currentTime,
          memo,
        ),
      );
      cnt++;
    }

    groundDay = groundDay.add(1, 'd');
  }

  return schedules;
}

function generateScheduleByEndPoint(
  endPoint: dayjs.Dayjs,
  repeatedScheduleInfo: RepeatedScheduleInfo,
) {
  console.log('generateScheduleByEndPoint');

  const { startPoint, weeklySchedule, formWorkSchedule } = repeatedScheduleInfo;

  var schedules: ScheduleType[] = [];
  var groundDay = startPoint;
  for (let i = 0; i < 7; i++) {
    if (groundDay.add(i, 'd').day() === i && weeklySchedule[i]) {
      schedules = schedules.concat(
        getRepeatedSchedules(
          groundDay.add(i, 'd'),
          endPoint,
          weeklySchedule[i],
          formWorkSchedule,
        ),
      );
    }
  }
  return schedules;
}
