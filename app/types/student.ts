import { LessonType } from './lesson'

export interface StudentType {
  key: string;
  info: StudentInfoType;
}

export interface StudentInfoType {
  name: string;
  subject: Array<string>;
  address: string;
  nextTime: string;
  lessonArray: Array<LessonType>;
}