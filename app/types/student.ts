import _ from 'lodash';

// TODO: print 내장 메소드 만들기

export class Info { // drawer에 나타나는 StudentInfo
  name: string;
  id: string;
  address: string;

}

export class Schedule {
  
}

export class Progress{
  
}

export class StudentType {
  id: string;
  name: string;
  desc: string;
  due: Date;
  out: Date;
  isCompleted: boolean;
  status: number;
  subAssigns: Array<SubAssignType>;
  // print: () => string;

  private print() {
    console.log('hello world');
  }

  constructor(
    title: string,
    desc: string,
    due: Date,
    out: Date = new Date(Date.now()),
    isCompleted: boolean = false,
    subAssigns: Array<SubAssignType> = [],
  ) {
    this.title = title;
    this.desc = desc;
    this.due = due;
    this.out = out;
    this.isCompleted = isCompleted;
    this.status = 0;
    this.subAssigns = subAssigns;
    this.id = _.uniqueId('assign_');
  }
}

export class SubAssignType {
  text: string;
  isCompleted: boolean;
  id: string;
  // print: () => string;

  constructor(text: string, isCompleted: boolean = false) {
    this.text = text;
    this.isCompleted = isCompleted;
    this.id = _.uniqueId('subAssign_');
    // this.print = () => {
    //   let isCompleted = this.isCompleted ? 'completed' : 'not completed';
    //   return `${this.text}: ${isCompleted}\n`;
    // };
  }
}


// types 구조
// homework.ts
// progress.ts
// schedule.ts

// index.ts
// 