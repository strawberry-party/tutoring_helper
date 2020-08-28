import { TagType } from './root';
import dayjs from 'dayjs';

type Days = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

class LessonTime {
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
  classTime: Map<Days, LessonTime>;

  constructor(
    scheduleUnit = 'times' as ScheduleUnitType,
    classTime = new Map([['mon' as Days, new LessonTime()]]),
  ) {
    this.scheduleUnit = scheduleUnit;
    this.classTime = classTime;
  }
}

export class ScheduleType {
  text: string;
  studentId: string;
  tagId: string;

  time: LessonTime | RepeatedScheduleInfo;

  memo?: string;

  constructor(
    text: string = '기본 텍스트',
    studentId: string = 'student_1',
    tagId: string = 'none',

    time: LessonTime | RepeatedScheduleInfo,
    memo: string = '메모 없음',
  ) {
    this.text = text;
    this.studentId = studentId;
    this.tagId = tagId;

    this.time = time;
    this.memo = memo;
  }
}
