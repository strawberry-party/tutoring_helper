import { InteractionManager } from 'react-native';
import { TagType } from './root';
import dayjs from 'dayjs';

export type Days = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

/// 수업 하나의 시작 시간과 종료 시간을 묶어놓은 타입
export class LessonTime {
  start: dayjs.Dayjs;
  end: dayjs.Dayjs;

  constructor(start = dayjs(), end = dayjs()) {
    this.start = start;
    this.end = end;
  }
}

/// 종료 시점 종류를 나타내는 타입.e
export interface EndAfterNTimes {
  numOfTimes: number;
}

export interface EndAfterThisDay {
  endDay: dayjs.Dayjs;
}

export type EndAfterType = EndAfterNTimes | EndAfterThisDay;

/// 요일별 Schedule의 LessonTime을 나타내는 타입

type Grow<T, A extends Array<T>> = ((x: T, ...xs: A) => void) extends (
  ...a: infer X
) => void
  ? X
  : never;
type GrowToSize<T, A extends Array<T>, N extends number> = {
  0: A;
  1: GrowToSize<T, Grow<T, A>, N>;
}[A['length'] extends N ? 0 : 1];

type FixedArray<T, N extends number> = GrowToSize<T, [], N>;

export type LessonOrNone = LessonTime | 'none';
export type Week = FixedArray<LessonOrNone, 7>;

export function generateWeek(item: LessonOrNone): Week {
  var aux = nones;
  for (let i = 0; i < 7; i++) {
    aux[i] = item;
  }
  return aux;
}

export const nones: Week = [
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
];

const dayToCode: Object = {
  sun: '0',
  mon: '1',
  tue: '2',
  wed: '3',
  thu: '4',
  fri: '5',
  sat: '6',
};

export class WeeklyScheduleFormVersion {
  startTimes: Week;
  endTimes: Week;

  constructor(startTimes: Week, endTimes: Week) {
    this.startTimes = startTimes;
    this.endTimes = endTimes;
  }
}

export class WeeklyScheduleType {
  '0'?: LessonTime;
  '1'?: LessonTime;
  '2'?: LessonTime;
  '3'?: LessonTime;
  '4'?: LessonTime;
  '5'?: LessonTime;
  '6'?: LessonTime;

  numOfLessonPerWeek: number;

  constructor(
    dailyScheduleMap: Map<number, LessonTime> = new Map<number, LessonTime>(),
  ) {
    var numOfLessonPerWeek = 0;
    for (let [day, lessonTime] of dailyScheduleMap) {
      const todayCode: string = day.toString();
      this[todayCode] = lessonTime as LessonTime;
      numOfLessonPerWeek += 1;
    }
    this.numOfLessonPerWeek = numOfLessonPerWeek;
  }
}

export class RepeatedScheduleInfo {
  formWorkSchedule: ScheduleType;
  endAfter: EndAfterType;
  weeklySchedule: WeeklyScheduleType;
  startPoint: dayjs.Dayjs;

  constructor(
    formWorkSchedule = new ScheduleType('default'),
    endAfter = ({ numOfTimes: 1 } as EndAfterNTimes) as EndAfterType,
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

    text: string = '제목을 입력해주세요',
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

export interface DailyAgendasType {
  title: string;
  data: ScheduleType[];
}
