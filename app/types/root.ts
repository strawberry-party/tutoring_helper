import { LessonType } from './lesson'

export interface StudentType {
  name: string;
  subject: Array<string>;
  address: string;
  nextTime: string;
  lessonMap: Map<string, LessonType>;
}

export interface TutorType {
  studentMap: Map<string, StudentType>;
  name: string;
}