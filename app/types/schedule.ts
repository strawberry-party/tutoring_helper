import { InteractionManager } from 'react-native';
import { TagType } from './root';
import dayjs from 'dayjs';

type Days = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

const dayToCode: Object = {
  sun: '0',
  mon: '1',
  tue: '2',
  wed: '3',
  thu: '4',
  fri: '5',
  sat: '6',
};

/// 수업 하나의 시작 시간과 종료 시간을 묶어놓은 타입
export class LessonTime {
  start: dayjs.Dayjs;
  end: dayjs.Dayjs;

  constructor(start = dayjs(), end = dayjs()) {
    this.start = start;
    this.end = end;
  }
}

/// 종료 시점 종류를 나타내는 타입.
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

/// 요일별 Schedule의 LessonTime을 나타내는 타입
export class WeeklyScheduleType {
  '0'?: NoneOrSomeLessonTime;
  '1'?: NoneOrSomeLessonTime;
  '2'?: NoneOrSomeLessonTime;
  '3'?: NoneOrSomeLessonTime;
  '4'?: NoneOrSomeLessonTime;
  '5'?: NoneOrSomeLessonTime;
  '6'?: NoneOrSomeLessonTime;

  constructor(
    dailyScheduleMap: Map<Days, LessonTime> = new Map<Days, LessonTime>(),
  ) {
    let codeSet = new Set();
    for (let [day, lessonTime] of dailyScheduleMap) {
      const todayCode: string = dayToCode[day];
      this[todayCode] = lessonTime as NoneOrSomeLessonTime;
      codeSet.add(todayCode);
    }
  }
}

export class RepeatedScheduleInfo {
  formWorkSchedule: ScheduleType;
  endAfter: EndAfterType;
  weeklySchedule: WeeklyScheduleType;
  startPoint: dayjs.Dayjs;

  constructor(
    formWorkSchedule = new ScheduleType('default'),
    endAfter = ({ numOfWeek: 1 } as EndAfterNWeeks) as EndAfterType,
    startPoint = dayjs(),
    weeklySchedule: WeeklyScheduleType = new WeeklyScheduleType(),
  ) {
    this.formWorkSchedule = formWorkSchedule;
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
    linkedRepeatedScheduleInfoId: string = 'none',

    text: string = '',
    studentId: string = 'student_1',
    tagId: string = 'none',
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


