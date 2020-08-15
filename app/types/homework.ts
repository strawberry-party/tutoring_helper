import _ from 'lodash';
import dayjs from 'dayjs';

// TODO: print 내장 메소드 만들기

export interface AssignListType {
  assigns: Array<AssignType>;
}
export class AssignType {
  id: string;
  title: string;
  desc: string;
  due: dayjs.Dayjs;
  out: dayjs.Dayjs;
  isCompleted: boolean;
  status: number;

  // print() {
  // console.log('hello world');
  // }

  constructor(
    title: string,
    desc: string,
    due: dayjs.Dayjs,
    out: dayjs.Dayjs = dayjs(),
    isCompleted: boolean = false,
  ) {
    this.title = title;
    this.desc = desc;
    this.due = due;
    this.out = out;
    this.isCompleted = isCompleted;
    this.status = 0;
    this.id = _.uniqueId('assign_');
    // this.print = AssignType.prototype.print;
  }
}
