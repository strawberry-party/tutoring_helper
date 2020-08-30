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

type ScheduleUnitType = 'week' | 'times' | 'period';

export class RepeatedScheduleInfo {
  scheduleUnit: ScheduleUnitType;
  // classTime: Map<Days, LessonTime>;
  start: dayjs.Dayjs;
  end: dayjs.Dayjs;
  days: Set<Days>;

  constructor(
    scheduleUnit = 'times' as ScheduleUnitType,
    start = dayjs(),
    end = dayjs(),
    days = new Set(['mon' as Days]),
  ) {
    this.scheduleUnit = scheduleUnit;
    this.start = start;
    this.end = end;
    this.days = days;
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
