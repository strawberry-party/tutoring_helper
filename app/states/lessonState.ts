import { LessonType } from '../types/lesson';
import _ from 'lodash';
import produce from 'immer';

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

type LessonArrayState = Array<LessonType>;

const initialState = {
  lessonArray: Array(),
};

// reducer
const lessonReducer = (
  state = initialState, //type 설정 시 오류 발생
  action,
) =>
  produce(state, (draft) => {
    switch (action.type) {

      case 'LESSONSTATE_SETUP':
        
        draft.lessonArray = [];
        action.data === undefined || null ? '' : Object.entries(action.data).reverse().map(([key, lessonInfo]) => {
          draft.lessonArray.push({key, lessonInfo})
        })
        break;
      
      // case LESSON_ADD:
      //   break;

      // case LESSON_EDIT:
      //   return state;

      // case LESSON_REMOVE:
      //   return state;

      case 'CHECKED':
        break;

      default:
        return state;
    }
  });

export default lessonReducer;
