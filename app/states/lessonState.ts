import { LessonType } from '../types/lesson';
import { TutorType } from '../types/root';
import _ from 'lodash';
import produce from 'immer';
import {enableMapSet} from "immer";
import { tutor } from '../common/mockData'

enableMapSet()

// action type
const LESSON_ADD = 'LESSON_ADD' as const;
const LESSON_REMOVE = 'LESSON_REMOVE' as const;
const LESSON_EDIT = 'LESSON_EDIT' as const;

type LessonAction =
  | ReturnType<typeof addLesson>
  | ReturnType<typeof removeLesson>
  | ReturnType<typeof editLesson>;

// action constructor
export const addLesson = (lesson: LessonType, studentId: string) => ({
  type: LESSON_ADD,
  lesson: { ...lesson, id: _.uniqueId('lesson_') },
  studentId,
});

export const removeLesson = (lessonId: string, studentId: string) => ({
  type: LESSON_REMOVE,
  lessonId,
  studentId,
});

export const editLesson = (
  lessonId: string,
  studentId: string,
  newLesson: LessonType,
) => ({
  type: LESSON_EDIT,
  newLesson,
  lessonId,
  studentId,
});

type TutorState = TutorType;

// const initialState: TutorState = {
//   studentMap: new Map(),
//   name: '김태형',
// };

const initialState = tutor;

// reducer
const lessonReducer = (
  state: TutorState = initialState,
  action,
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LESSON_ADD:
        draft.studentMap.get(action.studentId).lessonMap.set(_.uniqueId('lesson_'), {
          lessonNum: 4,
          contents: new Map([
            [_.uniqueId('lessonContent_'), {text: action.title, isCompleted: false}]
          ]),
          file: '',
          test: [],
        });

        // draft = Object.assign({}, draft);
        break;
      case LESSON_EDIT:
        return state;

      case LESSON_REMOVE:
        return state;

      case 'CHECKED':
        draft.studentMap.get(action.studentId).lessonMap.get(action.lessonId).contents.get(action.contentId).isCompleted = !draft.studentMap.get(action.studentId).lessonMap.get(action.lessonId).contents.get(action.contentId).isCompleted 
        break;
      default:
        return state;
    }
  });

export default lessonReducer;
