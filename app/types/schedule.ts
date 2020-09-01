import { InteractionManager } from 'react-native';
import { TagType } from './root';
import dayjs from 'dayjs';

type Days = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export class LessonTime {
  start: dayjs.Dayjs;
  end: dayjs.Dayjs;

  constructor(start = dayjs(), end = dayjs()) {
    this.start = start;
    this.end = end;
  }
}

interface EndAfterNWeeks {
  numOfWeek: number;
}

interface EndAfterNTimes {
  numOfTimes: number;
}

interface EndAfterThisDay {
  endDay: dayjs.Dayjs;
}

type NoLesson = 'noLessonToday';
type NoneOrSomeLessonTime = NoLesson | LessonTime;

export type EndAfterType = EndAfterNTimes | EndAfterNWeeks | EndAfterThisDay;

const dayToCode: Object = {
  sun: '0',
  mon: '1',
  tue: '2',
  wed: '3',
  thu: '4',
  fri: '5',
  sat: '6',
};

export class WeeklyScheduleType {
  '0': NoneOrSomeLessonTime;
  '1': NoneOrSomeLessonTime;
  '2': NoneOrSomeLessonTime;
  '3': NoneOrSomeLessonTime;
  '4': NoneOrSomeLessonTime;
  '5': NoneOrSomeLessonTime;
  '6': NoneOrSomeLessonTime;

  constructor(
    dailyScheduleMap: Map<Days, LessonTime> = new Map<Days, LessonTime>(),
  ) {
    let codeSet = new Set();
    for (let [day, lessonTime] of dailyScheduleMap) {
      const todayCode: string = dayToCode[day];
      this[todayCode] = lessonTime as NoneOrSomeLessonTime;
      codeSet.add(todayCode);
    }

    for (let i = 0; i < 7; i++) {
      let code = i.toString();
      if (!codeSet.has(code)) {
        this[code] = 'noLessonToday' as NoneOrSomeLessonTime;
      }
    }
  }
}

export class RepeatedScheduleInfo {
  // text: string;
  // studentId: string;
  // tagId: string;
  // memo?: string;
  // 필요 없는 듯

  endAfter: EndAfterType;
  weeklySchedule: WeeklyScheduleType;

  // 0: 일
  // 1: 월
  // 2: 화
  // 3: 수
  // 4: 목
  // 5: 금
  // 6: 토

  startPoint: dayjs.Dayjs;

  constructor(
    endAfter = ({ numOfWeek: 1 } as EndAfterNWeeks) as EndAfterType,
    startPoint = dayjs(),
    weeklySchedule: WeeklyScheduleType = new WeeklyScheduleType(),
  ) {
    this.endAfter = endAfter;
    this.startPoint = startPoint;
    this.weeklySchedule = weeklySchedule;
  }
}

export class ScheduleType {
  text: string;
  studentId: string;
  tagId: string;

  time: LessonTime;
  linkedRepeatedScheduleInfoId: string;

  memo?: string;

  constructor(
    text: string = '',
    studentId: string = 'student_1',
    tagId: string = 'none',
    linkedRepeatedScheduleInfoId: string = 'none',
    time: LessonTime = new LessonTime(),
    memo: string = '',
  ) {
    this.text = text;
    this.studentId = studentId;
    this.tagId = tagId;
    this.linkedRepeatedScheduleInfoId = linkedRepeatedScheduleInfoId;
    this.time = time;
    this.memo = memo;
  }
}
