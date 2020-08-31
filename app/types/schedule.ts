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

type EndPointType = 'week' | 'times' | 'period';

export class RepeatedScheduleInfo {
  endPoint: EndPointType;
  dailyScheduleMap: Map<Days, LessonTime>;
  start: dayjs.Dayjs;
  end: dayjs.Dayjs;

  constructor(
    endPoint = 'week' as EndPointType,
    start = dayjs(),
    end = dayjs(),
    dailyScheduleMap = new Map<Days, LessonTime>(),
  ) {
    this.endPoint = endPoint;
    this.start = start;
    this.end = end;
    this.dailyScheduleMap = dailyScheduleMap;
  }
}

export class ScheduleType {
  text: string;
  studentId: string;
  tagId: string;

  time: LessonTime | RepeatedScheduleInfo;

  memo?: string;

  constructor(
    text: string = '',
    studentId: string = 'student_1',
    tagId: string = 'none',

    time: LessonTime | RepeatedScheduleInfo = new LessonTime(),
    memo: string = '',
  ) {
    this.text = text;
    this.studentId = studentId;
    this.tagId = tagId;

    this.time = time;
    this.memo = memo;
  }
}
