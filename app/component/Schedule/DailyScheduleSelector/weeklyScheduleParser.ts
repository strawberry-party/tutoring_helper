import {
  LessonTime,
  Week,
  WeeklyScheduleFormVersion,
  WeeklyScheduleType,
  nones,
} from './../../../types/schedule';

import dayjs from 'dayjs';

export default function weeklyScheduleParser(
  weeklySchedule: WeeklyScheduleType,
): WeeklyScheduleFormVersion {
  var startTimes = nones;
  var endTimes = nones;
  var selectedDays: number[] = [];

  for (let i = 0; i < 7; i++) {
    let iThSchedule = weeklySchedule[i.toString()];
    if (iThSchedule) {
      startTimes[i] = iThSchedule.start;
      endTimes[i] = iThSchedule.end;
      selectedDays.push(i);
    }
  }
  return new WeeklyScheduleFormVersion(startTimes, endTimes, selectedDays);
}

export function getWeeklySchedule(
  startTimes: Week,
  endTimes: Week,
  selectedDays: Array<number>,
): WeeklyScheduleType {
  var weeklyScheduleList = [];
  for (let index = 0; index < 7; index++) {
    if (selectedDays.includes(index))
      weeklyScheduleList.push([
        index,
        new LessonTime(
          startTimes[index] as dayjs.Dayjs,
          endTimes[index] as dayjs.Dayjs,
        ),
      ]);
  }
  return new WeeklyScheduleType(new Map(weeklyScheduleList));
}
