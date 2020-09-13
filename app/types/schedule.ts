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

  toString() {
    return `${this.start.format('MM/DD HH:mm')} ~ ${this.end.format(
      'MM/DD HH:mm',
    )}`;
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

export type LessonOrNone = dayjs.Dayjs | 'none';
export type Week = FixedArray<dayjs.Dayjs, 7>;

export function generateWeek(item: dayjs.Dayjs): Week {
  return [item, item, item, item, item, item, item];
}

export const nones: Week = [
  dayjs(),
  dayjs(),
  dayjs(),
  dayjs(),
  dayjs(),
  dayjs(),
  dayjs(),
];

const dayList = ['일', '월', '화', '수', '목', '금', '토'];

export class WeeklyScheduleFormVersion {
  startTimes: Week;
  endTimes: Week;
  selectedDays: number[];

  constructor(startTimes: Week, endTimes: Week, selectedDays: number[]) {
    this.startTimes = startTimes;
    this.endTimes = endTimes;
    this.selectedDays = selectedDays;
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

  public toString() {
    var str = '\n=== WeeklySchedule ===\n';
    for (let index = 0; index < 7; index++) {
      str += dayList[index] + ': '; // ex) 일:
      let lessonTime = this[index.toString()];
      if (lessonTime) {
        str += lessonTime.toString();
      } else str += '일정 없음';
      str += '\n';
    }
    return str;
  }
}

export class RepeatedScheduleInfo {
  id: string;
  formWorkSchedule: FormWorkScheduleType;
  endAfter: EndAfterType;
  weeklySchedule: WeeklyScheduleType;
  startPoint: dayjs.Dayjs;

  constructor(
    id: string,
    formWorkSchedule = new FormWorkScheduleType(),
    endAfter = ({ numOfTimes: 1 } as EndAfterNTimes) as EndAfterType,
    startPoint = dayjs(),
    weeklySchedule: WeeklyScheduleType = new WeeklyScheduleType(),
  ) {
    this.id = id;

    this.formWorkSchedule = formWorkSchedule;
    this.endAfter = endAfter;
    this.startPoint = startPoint;
    this.weeklySchedule = weeklySchedule;
  }

  /**
   * name
   */
  public print() {
    this.formWorkSchedule.print();
    console.log(`id: ${this.id}`);
    console.log(this.weeklySchedule.toString());
  }
}

export class FormWorkScheduleType {
  text: string;
  studentId: string;
  tagId: string;

  time: LessonTime;
  memo?: string;

  constructor(
    text: string = '제목을 입력해주세요',
    studentId: string = 'student_1',
    tagId: string = 'none',
    time: LessonTime = new LessonTime(),
    memo: string = '',
  ) {
    this.text = text;
    this.studentId = studentId;
    this.tagId = tagId;
    this.time = time;
    this.memo = memo;
  }

  public print() {
    console.log(`formWorkSchedule: | ${this.text} | ${this.time.toString()}`);
  }
}

export class ScheduleType {
  text: string;
  studentId: string;
  tagId: string;
  time: LessonTime;
  memo?: string;

  id: string;
  linkedRepeatedScheduleInfoId: string;

  constructor(
    id: string,

    linkedRepeatedScheduleInfoId: string = 'none',
    formWork: FormWorkScheduleType = new FormWorkScheduleType(),
  ) {
    const { text, studentId, tagId, time, memo } = formWork;

    this.text = text;
    this.studentId = studentId;
    this.tagId = tagId;
    this.time = time;
    this.memo = memo;

    this.linkedRepeatedScheduleInfoId = linkedRepeatedScheduleInfoId;
    this.id = id;
  }

  public print() {
    console.log(
      `schedule: ${this.id} | ${this.text} | ${this.time.toString()}`,
    );
  }
}

// export function getScheduleFromRawData(
//   text,
//   studentId,
//   tagId,
//   time,
//   memo,
//   linkedRepeatedScheduleInfoId,
//   id,
// ): ScheduleType {
//   return new ScheduleType(formWork);
// }

export interface DailyAgendasType {
  title: string;
  data: ScheduleType[];
}
