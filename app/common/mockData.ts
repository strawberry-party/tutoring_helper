import { AssignListType } from '../types/homework';
import { AssignType } from '../types/homework';
import dayjs from 'dayjs';

// 더미 데이터
// TODO: 나중에 DB에서 불러오는 걸로 바꾸기

const NUM_ASSIGN = 3;
const DEFAULT_DATE = dayjs('2020-08-13');

// test 코드 만들기
// const assigns: Array<AssignType> = [...Array(NUM_ASSIGN).keys()].map(
//   (i: number) =>  new AssignType(
//       `Assign ${i + 1}`,
//       `Assign ${i + 1} desc`,
//       dayjs('2020-01-01'), // TODO: 에러: 다 지금 날짜로 됨
//       dayjs('2020-01-01'),
//       true,
//     );
//   },
// );

// export const assignList: AssignListType = { assigns };

const assign1: AssignType = new AssignType(
  '수학의 정석 10단원',
  '풀어와',
  dayjs('2020-07-18'),
  dayjs('2020-07-19'),
  false,
);

const assign2: AssignType = new AssignType(
  '수학의 정석 9단원',
  '풀어와',
  dayjs('2020-07-18'),
  dayjs('2020-07-19'),
  false,
);

const assign3: AssignType = new AssignType(
  '수학의 정석 8단원',
  '풀어와',
  dayjs('2020-07-18'),
  dayjs('2020-07-19'),
  false,
);

export const assignList: AssignListType = {
  assigns: [assign1, assign2, assign3],
};
