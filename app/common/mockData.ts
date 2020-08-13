import { AssignListType } from '../types/homework';
import { AssignType } from '../types/homework';
import { SubAssignType } from '../types/homework';
import dayjs from 'dayjs';

// 더미 데이터
// TODO: 나중에 DB에서 불러오는 걸로 바꾸기

const NUM_ASSIGN = 3;
const NUM_SUBASSIGN = 3;
const DEFAULT_DATE = dayjs('2020-08-13');

// const subAssign1: Array<SubAssignType> = [
//   new SubAssignType('10-1 단원 풀어오기'),
//   new SubAssignType('10-2 단원 풀어오기'),
//   new SubAssignType('10-3 단원 풀어오기'),
// ];

// const assign1: AssignType = new AssignType(
//   '수학의 정석 10단원',
//   '풀어와',
//   dayjs('2020-07-18'),
//   dayjs('2020-07-19'),
//   false,
//   subAssign1,
// );

// const subAssign2: Array<SubAssignType> = [
//   { text: '9-1 단원 풀어오기', isCompleted: false, id: '1' },
//   { text: '9-2 단원 풀어오기', isCompleted: false, id: '2' },
//   { text: '9-3 단원 풀어오기', isCompleted: false, id: '3' },
// ];

// const assign2: AssignType = {
//   id: '2',
//   title: '수학의 정석 9단원',
//   desc: '풀어와',
//   due: dayjs('2020-07-16'),
//   out: dayjs('2020-07-16'),
//   isCompleted: true,
//   status: 1,
//   subAssigns: subAssign2,
// };

// const assign3: AssignType = {
//   id: '3',
//   title: '수학의 정석 8단원',
//   desc: '풀어와',
//   due: dayjs('2020-07-16'),
//   out: dayjs('2020-07-14'),
//   isCompleted: false,
//   status: 0,
//   subAssigns: [],
// };

// test 코드 만들기
const assigns: Array<AssignType> = [...Array(NUM_ASSIGN).keys()].map(
  (i: number) => {
    const subAssigns: Array<SubAssignType> = [
      ...Array(NUM_SUBASSIGN).keys(),
    ].map(
      (j: number) =>
        new SubAssignType(`Assign ${i + 1}의 ${j + 1}번째 SubAssign`),
    );

    return new AssignType(
      `Assign ${i + 1}`,
      `Assign ${i + 1} desc`,
      dayjs('2020-01-01'), // TODO: 에러: 다 지금 날짜로 됨
      dayjs('2020-01-01'),
      true,
      subAssigns,
    );
  },
);

export const assignList: AssignListType = { assigns };
