import assignList from './common/mockData'
import dayjs from 'dayjs';

const assigns = [
  {
    id: 'assign_1',
    text: '과제1',
    due: dayjs.Dayjs(),
    out: dayjs.Dayjs(),
    isCompleted: false,
    bookTagId: 'bookTag1',
    subjectTagId: 'subjectTag1'
  },
  {
    id: 'assign_2',
    text: '과제2',
    due: dayjs.Dayjs(),
    out: dayjs.Dayjs(),
    isCompleted: false,
    bookTagId: 'bookTag2',
    subjectTagId: 'subjectTag2'
  },
  {
    id: 'assign_3',
    text: '과제3',
    due: dayjs.Dayjs(),
    out: dayjs.Dayjs(),
    isCompleted: false,
    bookTagId: 'bookTag3',
    subjectTagId: 'subjectTag3'
  },

]

// n 밀리세컨드동안 기다리는 프로미스를 만들어주는 함수
const sleep = n => new Promise(resolve => setTimeout(resolve, n));

export const getAssigns = async () => {
  await sleep(500); // 0.5초 쉬고
  return assigns; // posts 배열
};

// ID로 포스트를 조회하는 비동기 함수
export const getAssignById = async id => {
  await sleep(500); // 0.5초 쉬고
  return assigns.find(assign => assign.id === id); // id 로 찾아서 반환
};


// TODO: 파이어베이스 API 적용하기
// useEffect(() => {
//   db.ref(`tutors/${tutorId}/studentArray/${currentStudentId}/assigns`).on(
//     'value',
//     (snapshot) => {
//       // console.log(snapshot.val());
//       setupAssign(
//         snapshot.val().assignList,
//         snapshot.val().assignStatus.completedAssignNum,
//       );
//     },
//   );
// }, []);

//       case ASSIGNSTATE_SETUP:
// draft.completed = action.completed;
// action.assigns === null || undefined
//   ? ''
//   : Object.entries(action.assigns)
//     .reverse()
//     .map(([key, assign]) => {
//       draft.assignMap.set(key, assign);
//     });
// break;
