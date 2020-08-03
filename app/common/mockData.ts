import { AssignListType } from '../types/homework';
import { AssignType } from '../types/homework';
import { SubAssignType } from '../types/homework';

// 더미 데이터
// TODO: 나중에 DB에서 불러오는 걸로 바꾸기

const subAssign1: Array<SubAssignType> = [
  { text: '10-1 단원 풀어오기', isCompleted: false, id: '1' },
  { text: '10-2 단원 풀어오기', isCompleted: false, id: '2' },
  { text: '10-3 단원 풀어오기', isCompleted: false, id: '3' },
];

const assign1: AssignType = {
  id: '1',
  title: '수학의 정석 10단원',
  desc: '풀어와',
  due: new Date('2020-07-18'),
  out: new Date('2020-07-18'),
  isCompleted: false,
  status: 0,
  subAssigns: subAssign1,
};

const subAssign2: Array<SubAssignType> = [
  { text: '9-1 단원 풀어오기', isCompleted: false, id: '1' },
  { text: '9-2 단원 풀어오기', isCompleted: false, id: '2' },
  { text: '9-3 단원 풀어오기', isCompleted: false, id: '3' },
];

export const assign2: AssignType = {
         id: '2',
         title: '수학의 정석 9단원',
         desc: '풀어와',
         due: new Date('2020-07-16'),
         out: new Date('2020-07-16'),
         isCompleted: true,
         status: 1,
         subAssigns: subAssign2,
       };

// subAssignment reducer
export const assignList: AssignListType = { assigns: [assign1, assign2] };
