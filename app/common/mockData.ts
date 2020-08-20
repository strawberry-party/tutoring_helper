import { AssignListType, AssignType } from '../types/homework';

import { LessonType } from '../types/lesson';
import { TagType } from './../types/root';
import { TutorType } from '../types/root';
import dayjs from 'dayjs';

// 더미 데이터
// TODO: 나중에 DB에서 불러오는 걸로 바꾸기

const NUM_ASSIGN = 3;
const DEFAULT_DATE = dayjs('2020-08-13');

// test 코드 만들기
const assignMap = new Map<string, AssignType>();

[0, 1, 2, 3].map((i: number) => assignMap.set(i.toString(), getAssign(i)));
const tag1: TagType = new TagType('수학', { backgroundColor: '#bbb' });

function getAssign(i: number) {
  var newAssign: AssignType = new AssignType(
    `Assign ${i + 1}`,
    dayjs('2020-01-01'), // TODO: 에러: 다 지금 날짜로 됨
    dayjs('2020-01-01'),
    false,
    // tag1 // README: 이렇게 하면 왠지 안됨
    new TagType('수학', { backgroundColor: '#bbb' }),
  );
  console.warn(`${newAssign.tag.name} in getAssign`);
  return newAssign;
}

export const assignList: AssignListType = new AssignListType(assignMap);

// const assign1: AssignType = new AssignType(
//   '수학의 정석 10단원',
//   '풀어와',
//   dayjs('2020-07-18'),
//   dayjs('2020-07-19'),
//   false,
// );

// const assign2: AssignType = new AssignType(
//   '수학의 정석 9단원',
//   '풀어와',
//   dayjs('2020-07-18'),
//   dayjs('2020-07-19'),
//   false,
// );

// const assign3: AssignType = new AssignType(
//   '수학의 정석 8단원',
//   '풀어와',
//   dayjs('2020-07-18'),
//   dayjs('2020-07-19'),
//   false,
// );

// export const assignList: AssignListType = {
//   assigns: [assign1, assign2, assign3],
// };

const lesson_1: LessonType = {
  lessonNum: 1,
  contents: new Map([
    ['lessonContent_1', { text: '2단원', isCompleted: true }],
    ['lessonContent_2', { text: '3단원', isCompleted: false }],
  ]),
  file: '',
  test: [{ desc: '1단원', score: 90 }],
};
const lesson_2: LessonType = {
  lessonNum: 2,
  contents: new Map([
    ['lessonContent_1', { text: '2단원', isCompleted: true }],
    ['lessonContent_2', { text: '3단원', isCompleted: false }],
  ]),
  file: '',
  test: [{ desc: '1단원', score: 90 }],
};
const lesson_3: LessonType = {
  lessonNum: 3,
  contents: new Map([
    ['lessonContent_1', { text: '2단원', isCompleted: true }],
    ['lessonContent_2', { text: '3단원', isCompleted: false }],
  ]),
  file: '',
  test: [{ desc: '1단원', score: 90 }],
};

const lessonMap: Map<string, LessonType> = new Map([
  ['lesson_1', lesson_1],
  ['lesson_2', lesson_2],
  ['lesson_3', lesson_3],
]);

export const tutor: TutorType = {
  tagMap: new Map([['tag_1', tag1]]),
  name: '김태형',
  studentMap: new Map([
    [
      'student_1',
      {
        name: '김태형',
        subject: ['수학'],
        address: '한국',
        nextTime: '11:00~13:00',
        lessonMap: lessonMap,
      },
    ],

    [
      'student_2',
      {
        name: '최상아',
        subject: ['과학'],
        address: '대한민국',
        nextTime: '10:00~13:00',
        lessonMap: new Map(),
      },
    ],

    [
      'student_3',
      {
        name: '이규빈',
        subject: ['화학'],
        address: '한반도',
        nextTime: '9:00~13:00',
        lessonMap: new Map(),
      },
    ],

    [
      'student_4',
      {
        name: '전승규',
        subject: ['지구과학'],
        address: '남한',
        nextTime: '8:00~13:00',
        lessonMap: new Map(),
      },
    ],
  ]),
};
