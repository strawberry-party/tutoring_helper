import { DailyAgendasType, FormWorkScheduleType } from './../types/schedule';
import { RepeatedScheduleInfo, ScheduleType } from '../types/schedule';
import {
  repeatedScheduleInfoList,
  schedules,
} from '../common/scheduleMockData';

import _ from 'lodash';
import formWorkScheduleGenerator from '../component/Schedule/scheduleUtils/formWorkScheduleGenerator';

// action type
const SCHEDULE_SELECT = 'SCHEDULE_SELECT' as const;
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
  | ReturnType<typeof editRepetition>
  | ReturnType<typeof selectSchedule>;

class ScheduleStateType {
  schedules: ScheduleType[];
  repeatInfos: RepeatedScheduleInfo[];
  selectedScheduleId: string;
  // dailyAgendas: DailyAgendasType[];
  constructor(
    schedules = [],
    repeatInfos = [],
    // dailyAgendas = [],
    selectedScheduleId = 'none',
  ) {
    this.schedules = schedules;
    this.repeatInfos = repeatInfos;
    this.selectedScheduleId = selectedScheduleId;
    // this.dailyAgendas = dailyAgendas;
  }
}

const initialState: ScheduleStateType = new ScheduleStateType(
  schedules,
  repeatedScheduleInfoList,
);

// action constructor
// schedule CRUD

export const selectSchedule = (id: string) => ({
  type: SCHEDULE_SELECT,
  id,
});

export const addSchedule = (
  formWork: FormWorkScheduleType,
  linkedRepeatInfoId: string = 'none',
) => ({
  type: SCHEDULE_ADD,
  schedule: new ScheduleType(
    _.uniqueId('schedule_'),
    linkedRepeatInfoId,
    formWork,
  ),
});

export const removeSchedule = (id: string) => ({
  type: SCHEDULE_REMOVE,
  id: id,
});

export const editSchedule = (
  formWork: FormWorkScheduleType,
  id: string,
  linkedRepeatedScheduleInfoId: string = 'none',
) => ({
  type: SCHEDULE_EDIT,
  schedule: new ScheduleType(id, linkedRepeatedScheduleInfoId, formWork),
});

export const addRepetition = (
  formWorkSchedule,
  endAfter,
  startPoint,
  weeklySchedule,
) => {
  var repeatInfo = new RepeatedScheduleInfo(
    _.uniqueId('repeat_'),
    formWorkSchedule,
    endAfter,
    startPoint,
    weeklySchedule,
  );

  var newSchedules = formWorkScheduleGenerator(repeatInfo).map((item) => {
    // item.print();
    return new ScheduleType(
      _.uniqueId('scheduleByAddRepetition_'),
      repeatInfo.id,
      item,
    );
  });

  newSchedules.forEach((item) => item.print());

  return {
    type: REPETITION_ADD,
    repeatInfo,
    id: repeatInfo.id,
    newSchedules,
  };
};

export const removeRepetition = (id: string) => ({
  type: REPETITION_REMOVE,
  id: id,
});

export const editRepetition = (repeatInfo: RepeatedScheduleInfo) => ({
  type: REPETITION_EDIT,
  id: repeatInfo.id,
  repeatInfo,
  newSchedules: formWorkScheduleGenerator(repeatInfo).map(
    (item) =>
      new ScheduleType(
        _.uniqueId('scheduleByEditRepetition_'),
        repeatInfo.id,
        item,
      ),
  ),
});

// actions
export const actions = {
  addSchedule,
  removeSchedule,
  editSchedule,
  selectSchedule,

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
) => {
  switch (action.type) {
    case SCHEDULE_SELECT:
      return new ScheduleStateType(
        state.schedules,
        state.repeatInfos,
        action.id,
      );
    case SCHEDULE_ADD:
      return new ScheduleStateType(
        [...state.schedules, action.schedule],
        state.repeatInfos,
        action.schedule.id,
      );

    case SCHEDULE_REMOVE:
      return new ScheduleStateType(
        state.schedules.filter((item) => item.id !== action.id),
        state.repeatInfos,
      );

    case SCHEDULE_EDIT:
      return new ScheduleStateType(
        state.schedules.map((item: ScheduleType) =>
          item.id === action.schedule.id ? action.schedule : item,
        ),
        state.repeatInfos,
        action.schedule.id,
      );

    case REPETITION_ADD:
      return new ScheduleStateType(
        // state.schedules,
        state.schedules.concat(action.newSchedules),
        [...state.repeatInfos, action.repeatInfo],
        state.selectedScheduleId,
      );

    case REPETITION_REMOVE:
      return new ScheduleStateType(
        state.schedules.filter(
          (schedule) =>
            schedule.linkedRepeatedScheduleInfoId !== action.id ||
            schedule.id === state.selectedScheduleId,
        ),
        state.repeatInfos.filter((item) => item.id !== action.id),
        state.selectedScheduleId,
      );

    case REPETITION_EDIT:
      return new ScheduleStateType(
        state.schedules
          .filter(
            (schedule) => schedule.linkedRepeatedScheduleInfoId !== action.id,
          )
          .concat(action.newSchedules),
        state.repeatInfos.map((item) =>
          item.id === action.id ? action.repeatInfo : item,
        ),
      );

    default:
      return state;
  }
};

export default scheduleReducer;

// return new ScheduleStateType(
//   state.schedules,
//   state.repeatInfos,
//   state.selectedScheduleId,
// );
