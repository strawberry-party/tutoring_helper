import { RepeatedScheduleInfo, ScheduleType } from '../types/schedule';

import _ from 'lodash';
import produce from 'immer';

// action type
const SCHEDULE_ADD = 'SCHEDULE_ADD' as const;
const SCHEDULE_REMOVE = 'SCHEDULE_REMOVE' as const;
const SCHEDULE_EDIT = 'SCHEDULE_EDIT' as const;

const REPETITION_ADD = 'REPETITION_ADD' as const;
const REPETITION_REMOVE = 'REPETITION_REMOVE' as const;
const REPETITION_EDIT = 'REPETITION_EDIT' as const;

type ScheduleAction =
  | ReturnType<typeof addSchedule>
  | ReturnType<typeof removeSchedule>
  | ReturnType<typeof editSchedule>
  | ReturnType<typeof addRepetition>
  | ReturnType<typeof removeRepetition>
  | ReturnType<typeof editRepetition>;

class ScheduleStateType {
  schedules: ScheduleType[];
  repeatedScheduleInfo: RepeatedScheduleInfo[];
  constructor() {}
}

const initialState: ScheduleStateType = new ScheduleStateType();

// action constructor
// schedule CRUD
export const addSchedule = (schedule: ScheduleType) => ({
  type: SCHEDULE_ADD,
  schedule,
  id: _.uniqueId('schedule_'),
});

export const removeSchedule = (id: string) => ({
  type: SCHEDULE_REMOVE,
  id: id,
});

export const editSchedule = (id: string, schedule: ScheduleType) => ({
  type: SCHEDULE_EDIT,
  id,
  schedule,
});

export const addRepetition = (repeatInfo: RepeatedScheduleInfo) => ({
  type: REPETITION_ADD,
  repeatInfo,
  id: _.uniqueId('repetition_'),
});

export const removeRepetition = (id: string) => ({
  type: REPETITION_REMOVE,
  id: id,
});

export const editRepetition = (
  id: string,
  repeatInfo: RepeatedScheduleInfo,
) => ({
  type: REPETITION_EDIT,
  id,
  repeatInfo,
});

// actions
export const actions = {
  addSchedule,
  removeSchedule,
  editSchedule,
  addRepetition,
  removeRepetition,
  editRepetition,
};

// reducer

// action에 따라 state를 어떻게 반환할지 설정
// TODO: 깊은 곳까지 접근하기 편하도록 immer.js 사용할것

const scheduleReducer = (
  state: ScheduleStateType = initialState,
  action: ScheduleAction,
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SCHEDULE_ADD:
        break;

      case SCHEDULE_REMOVE:
        break;

      case SCHEDULE_EDIT:
        break;

      case REPETITION_ADD:
        break;

      case REPETITION_REMOVE:
        break;

      case REPETITION_EDIT:
        break;

      default:
        return state;
    }
  });

export default scheduleReducer;
