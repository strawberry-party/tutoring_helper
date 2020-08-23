import { enableMapSet, immerable } from 'immer';

import { TagType } from './root';
import _ from 'lodash';
import dayjs from 'dayjs';

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
  ) {
    this.assignMap = assignMap;
    this.completed = completed;
  }
}

export class AssignStateType implements Assigns {
  assignMap: Map<string, AssignType>;
  completed: number;

  [immerable] = true;
  constructor(
    assignMap: Map<string, AssignType> = new Map<string, AssignType>(),
    completed: number = 0,
  ) {
    this.assignMap = assignMap;
    this.completed = completed;
  }
}

// #TODO: Map으로 수정
export class AssignType {
  text: string;
  due: dayjs.Dayjs;
  out: dayjs.Dayjs;
  isCompleted: boolean;
  tag: TagType;
  tagId: string;

  constructor(
    text: string = '기본 텍스트',
    due: dayjs.Dayjs = dayjs(),
    out: dayjs.Dayjs = dayjs(),
    isCompleted: boolean = false,
    tagId: string = 'none',
  ) {
    this.text = text;
    this.due = due;
    this.out = out;
    this.isCompleted = isCompleted;
    this.tagId = tagId;
    // this.print = AssignType.prototype.print;
  }
}
