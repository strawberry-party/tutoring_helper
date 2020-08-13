import _ from 'lodash';

// TODO: print 내장 메소드 만들기

export interface AssignListType {
  assigns: Array<AssignType>;
}
export class AssignType {
  id: string;
  title: string;
  desc: string;
  due: Date;
  out: Date;
  isCompleted: boolean;
  status: number;
  subAssigns: Array<SubAssignType>;
  // print: () => string;

  // private print() {
  //   {
  //     let info = `제목: ${this.title}\n설명: ${this.desc}\nDUE: ${
  //       this.due
  //     }\nOUT: ${this.out}\nisCompleted?: ${this.isCompleted}\nstatus: ${
  //       this.status * 100
  //     }% 완료\n`;
  //     let callBack: (
  //       pv: string,
  //       cur: SubAssignType,
  //       index: number,
  //       arr: Array<SubAssignType>,
  //     ) => string = function (pv, cur, index, arr) {
  //       if (index == 0) return pv + cur.print();
  //       else return callBack(pv + cur.print(), arr[index + 1], index + 1, arr);
  //     };
  //     let subAssigns: string =
  //       'subAssigns: \n' + this.subAssigns.reduce(callBack, '') + '\n';
  //     return info + subAssigns;
  //   };  
  // }

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
