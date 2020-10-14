import database from '@react-native-firebase/database';
import { default as dayjs } from 'dayjs';

const assigns = [
  {
    id: 'assign_1',
    text: '과제1',
    due: dayjs(),
    out: dayjs(),
    isCompleted: false,
    bookTagId: 'bookTag1',
    subjectTagId: 'subjectTag1'
  },
  {
    id: 'assign_2',
    text: '과제2',
    due: dayjs(),
    out: dayjs(),
    isCompleted: false,
    bookTagId: 'bookTag2',
    subjectTagId: 'subjectTag2'
  },
  {
    id: 'assign_3',
    text: '과제3',
    due: dayjs(),
    out: dayjs(),
    isCompleted: false,
    bookTagId: 'bookTag3',
    subjectTagId: 'subjectTag3'
  },

]

const db = database();

const getAssignPath = (tutorId, currentStudentId, str = "") => { return `tutors/${tutorId}/studentArray/${currentStudentId}/assigns/` + str }
const getCompletedPath = (tutorId, currentStudentId) => getAssignPath(tutorId, currentStudentId, "completed")
const getAssignByIdPath = (tutorId, currentStudentId, idx) => getAssignPath(tutorId, currentStudentId, `assignList/${idx}/`)
const getAssignListPath = (tutorId, currentStudentId) => getAssignPath(tutorId, currentStudentId, 'assignList/')
const getKeyCntPath = (tutorId, currentStudentId) => getAssignPath(tutorId, currentStudentId, "keyCounter")

export const getAssignList = async ({ tutorId, currentStudentId }) => {
  var assignListRef = db.ref(getAssignListPath(tutorId, currentStudentId))
  return (assignListRef ? assignListRef.once('value') : []);
}

export const getCompleted = async ({ tutorId, currentStudentId }) => {
  var assignsCompletedRef = db.ref(getCompletedPath(tutorId, currentStudentId));
  return (assignsCompletedRef ? assignsCompletedRef.once('value') : 0);
}

// ID로 포스트를 조회하는 비동기 함수
export const getAssignByIdx = async ({ tutorId, currentStudentId, idx }) => {
  return db.ref(getAssignByIdPath(tutorId, currentStudentId, idx)).once('value'); // 프로미스 객체
};


export const addAssign = async ({ tutorId, currentStudentId, data }) => {
  db.ref(getAssignByIdPath(tutorId, currentStudentId, keyCnt.toString())).set(data);

  var keyCnt = db.ref(getKeyCntPath(tutorId, currentStudentId))
  db.ref(getKeyCntPath(tutorId, currentStudentId)).update(keyCnt + 1)
  db.ref(getAssignByIdPath(tutorId, currentStudentId, idx)).update({ id: `assign_${keyCnt}` })
  return db.ref(getAssignListPath(tutorId, currentStudentId)).once('value');
}

export const editAssign = async ({ tutorId, currentStudentId, idx, data, isCompleted }) => {
  db.ref(getAssignByIdPath(tutorId, currentStudentId, idx))
    .update(data);

  if (isCompleted) {
    var completed = db.ref(getCompletedPath(tutorId, currentStudentId)).once('value')
    db.ref(getCompletedPath(tutorId, currentStudentId)).update(completed + 1)
  }

  return db.ref(getAssignListPath(tutorId, currentStudentId)).once('value');
}

export const removeAssign = async ({ tutorId, currentStudentId, idx, isCompleted }) => {
  db.ref(getAssignByIdPath(tutorId, currentStudentId, idx)).remove();
  if (isCompleted) {
    var completed = db.ref(getCompletedPath(tutorId, currentStudentId)).once('value')
    db.ref(getCompletedPath(tutorId, currentStudentId)).update(completed - 1)
  }

  return db.ref(getAssignPath(tutorId, currentStudentId)).once('value');
}

export const completeAssign = async ({ tutorId, currentStudentId, assignId }) => {
  db.ref(getAssignByIdPath(tutorId, currentStudentId, idx))
    .update({ isCompleted: true });
  db.ref(getCompletedPath(tutorId, currentStudentId)).update(completed + 1)
  return db.ref(getAssignPath(tutorId, currentStudentId)).once('value');
}

export const incompleteAssign = async ({ tutorId, currentStudentId, idx }) => {
  db.ref(getAssignByIdPath(tutorId, currentStudentId, idx))
    .update({ isCompleted: false });
  db.ref(getCompletedPath(tutorId, currentStudentId)).update(completed - 1)
  return db.ref(getAssignPath(tutorId, currentStudentId)).once('value');
}

