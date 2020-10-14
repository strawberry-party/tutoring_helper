import {
  FormWorkScheduleType,
  LessonTime,
  ScheduleType,
} from '../../../types/schedule';

import dayjs from 'dayjs';

var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);
const formatString = 'YYYY-MM-DD HH:mm';

// export function test_getRepeatedFormWorkSchedules() {
//   const startPoint = dayjs('2020-10-18 00:00', formatString);
//   console.log(startPoint);

//   const endPoint = dayjs('2020-12-18 00:00', formatString);

//   const start = dayjs('2020-10-18 10:00', formatString);
//   const end = dayjs('2020-10-18 12:00', formatString);

//   const dailyLessonTime = { start, end };
//   const formWorkSchedule = new ScheduleType(
//     'repetition_1',
//     '이규빈 과외',
//     'student_3',
//     'tag_2',
//     {
//       start: dayjs('2020-10-16 14:00', formatString),
//       end: dayjs('2020-10-16 16:00', formatString),
//     },
//     '메모는 메모메모하다',
//   );

//   console.log('====================================');
//   console.log('test_getRepeatedFormWorkSchedules');
//   console.log('====================================');
//   console.log('====================================');

//   const schedules = getRepeatedFormWorkSchedules(
//     startPoint,
//     endPoint,
//     dailyLessonTime,
//     formWorkSchedule,
//   );

//   if (schedules.length === 0) {
//     console.log('====================================');
//     console.log('schedules is empty');
//     console.log('====================================');
//   }

//   schedules.forEach((schedule) => {
//     console.log('====================================');
//     console.log(
//       `start: ${schedule.time.start.format(formatString).toString()}`,
//     );
//     console.log(`end: ${schedule.time.end.format(formatString).toString()}`);

//     console.log('====================================');
//   });
// }

export default function getRepeatedFormWorkSchedules(
  startPoint: dayjs.Dayjs,
  endPoint: dayjs.Dayjs,
  dailyLessonTime: LessonTime,
  formWorkSchedule: FormWorkScheduleType,
): FormWorkScheduleType[] {
  // startPoint 부터 endPoint까지 weeklySchedule에 있는 요일에 대해 스케쥴 생성

  console.log('====================================');
  console.log('getRepeatedFormWorkSchedules');
  console.log('====================================');

  
  var formWorkSchedules: FormWorkScheduleType[] = [];
  const { text, studentId, tagId, memo } = formWorkSchedule;
  var { start, end } = dailyLessonTime;
  var startTime = start.format('HH:mm');
  var endTime = end.format('HH:mm');

  var current: string = startPoint.format('YYYY-MM-DD');
  var currentDay: dayjs.Dayjs = dayjs(current);

  while (!currentDay.isAfter(endPoint)) {
    var currentTime = new LessonTime(
      dayjs(current + ' ' + startTime, formatString),
      dayjs(current + ' ' + endTime, formatString),
    );

    var currentFormWorkSchedule: FormWorkScheduleType = new FormWorkScheduleType(
      text,
      studentId,
      tagId,
      currentTime,
      memo,
    );

    formWorkSchedules.push(currentFormWorkSchedule);

    currentDay = currentDay.add(1, 'week');
    current = currentDay.format('YYYY-MM-DD');
  }

  return formWorkSchedules;
}
