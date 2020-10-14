import { TagType } from './root';
import _ from 'lodash';
import { default as dayjs } from 'dayjs';
import { immerable } from 'immer';

// TODO: print 내장 메소드 만들기
// TODO: assigns 자료구조 Map으로 바꾸기

interface Assigns {
  assignMap: Map<string, AssignType>;
  completed: number;
}

export class AssignListType implements Assigns {
  assignMap: Map<string, AssignType>;
  completed: number;

  constructor(
    assignMap: Map<string, AssignType> = new Map<string, AssignType>(),
    completed: number = 0,
    // incompleted: number = 0,
    // delayed
  ) {
    this.assignMap = assignMap;
    this.completed = completed;
  }
}

export class AssignStateType {
  assignList: AssignType[];
  assign: AssignType;
  completed: number;
}

// #TODO: Map으로 수정
export interface AssignWOId {
  text: string;
  due: dayjs.Dayjs;
  out: dayjs.Dayjs;
  isCompleted: boolean;
  bookTagId: string;
  subjectTagId: string;
}
export class AssignType {
  id: string;
  text: string;
  due: dayjs.Dayjs;
  out: dayjs.Dayjs;
  isCompleted: boolean;
  bookTagId: string;
  subjectTagId: string;

  constructor(
    text: string = '기본 텍스트',
    due: dayjs.Dayjs = dayjs(),
    out: dayjs.Dayjs = dayjs(),
    isCompleted: boolean = false,
    subjectTagId: string = 'none',
    bookTagId: string = 'none',
    id: string = 'id',
  ) {
    this.text = text;
    this.due = due;
    this.out = out;
    this.isCompleted = isCompleted;
    this.subjectTagId = subjectTagId;
    this.bookTagId = bookTagId;
    this.id = id;
  }
}
