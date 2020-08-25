import { LessonType } from './lesson';
import { StyleSheetProperties } from 'react-native';

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
  tagMap: Map<string, TagType>;
}

export class TagType {
  style: Object;
  name: string;

  constructor(
    name: string = 'none',
    style: Object = {
      backgroundColor: 'white',
      borderStyle: 'dashed',
      borderColor: 'black',
      borderWidth: 1,
      textColor: 'white',
    },
  ) {
    this.name = name;
    this.style = style;
  }
}
