import {
  DailyAgendasType,
  FormWorkScheduleType,
  ReminderType,
} from './../types/schedule';
import { RepeatedScheduleInfo, ScheduleType } from '../types/schedule';
import {
  repeatedScheduleInfoList,
  schedules,
} from '../common/scheduleMockData';

import LocalNotification from '../utils/LocalNotification';
import _ from 'lodash';
import dayjs from 'dayjs';
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
  reminders: ReminderType[];
  selectedScheduleId: string;
  // dailyAgendas: DailyAgendasType[];
  constructor(
    schedules = [],
    repeatInfos = [],
    reminders = [],
    selectedScheduleId = 'none',
  ) {
    this.schedules = schedules;
    this.repeatInfos = repeatInfos;
    this.selectedScheduleId = selectedScheduleId;
    this.reminders = reminders;
    // this.dailyAgendas = dailyAgendas;
  }
}

const initialState: ScheduleStateType = new ScheduleStateType();
// schedules,
// repeatedScheduleInfoList,

// action constructor
// schedule CRUD

export const selectSchedule = (id: string) => ({
  type: SCHEDULE_SELECT,
  id,
});

function deleteReminder(
  reminders: ReminderType[],
  linkedScheduleIds: string[],
): ReminderType[] {
  reminders.forEach((reminder) => {
    if (linkedScheduleIds.includes(reminder.linkedScheduleId)) {
      LocalNotification.cancel(reminder.id);
    }
  });
  return reminders.filter(
    (reminder) => !linkedScheduleIds.includes(reminder.linkedScheduleId),
  );
}

function getReminder(formWorkSchedule, scheduleId, id = 'none'): ReminderType {
  var reminder: ReminderType = {
    id: id === 'none' ? _.uniqueId() : id,
    title:
      formWorkSchedule.text + ` 시작 ${formWorkSchedule.reminder}분 전입니다`,
    message:
      formWorkSchedule.time.start.format('H시 m분') +
      ' 부터 ' +
      formWorkSchedule.time.end.format('H시 m분') +
      ' 까지',
    date: dayjs().add(20, 's').toDate(),
    // date: formWorkSchedule.time.start
    //   .subtract(formWorkSchedule.reminder, 'm')
    //   .toDate(),
    linkedScheduleId: scheduleId,
  };

  if (formWorkSchedule.reminder > 0)
    LocalNotification.registerReminder(
      reminder.id,
      reminder.message,
      reminder.title,
      reminder.date,
    );

  return reminder;
}

function getFilteredSchedules(schedules, excludeId, includeId) {
  return schedules.filter(
    (schedule) =>
      schedule.linkedRepeatedScheduleInfoId !== excludeId ||
      schedule.id === includeId,
  );
}

export function addSchedule(
  formWork: FormWorkScheduleType,
  linkedRepeatInfoId: string = 'none',
) {
  var newScheduleId = _.uniqueId('schedule_');
  return {
    type: SCHEDULE_ADD,
    schedule: new ScheduleType(newScheduleId, linkedRepeatInfoId, formWork),
    reminder: getReminder(formWork, newScheduleId),
  };
}

export const removeSchedule = (id: string) => ({
  type: SCHEDULE_REMOVE,
  id: id,
});

export const editSchedule = (
  formWork: FormWorkScheduleType,
  id: string,
  linkedRepeatedScheduleInfoId: string = 'none',
) => {
  console.log("editSchedule reminder: " + formWork.reminder);
  return {
    type: SCHEDULE_EDIT,
    schedule: new ScheduleType(id, linkedRepeatedScheduleInfoId, formWork),
  };
};

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

  var newReminders = newSchedules.map((schedule) =>
    getReminder(formWorkSchedule, schedule.id),
  );

  return {
    type: REPETITION_ADD,
    repeatInfo,
    id: repeatInfo.id,
    newSchedules,
    newReminders,
  };
};

export const removeRepetition = (id: string) => {
  return {
    type: REPETITION_REMOVE,
    id: id,
  };
};

export const editRepetition = (repeatInfo: RepeatedScheduleInfo) => {
  var newSchedules = formWorkScheduleGenerator(repeatInfo).map(
    (item) =>
      new ScheduleType(
        _.uniqueId('scheduleByEditRepetition_'),
        repeatInfo.id,
        item,
      ),
  );

  var newReminders = newSchedules.map((schedule) =>
    getReminder(schedule, schedule.id),
  );

  return {
    type: REPETITION_EDIT,
    id: repeatInfo.id,
    repeatInfo,
    newSchedules,
    newReminders,
  };
};

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
        state.reminders,
        action.id,
      );
    case SCHEDULE_ADD:
      return new ScheduleStateType(
        [...state.schedules, action.schedule],
        state.repeatInfos,
        [...state.reminders, action.reminder],
        action.schedule.id,
      );

    case SCHEDULE_REMOVE:
      return new ScheduleStateType(
        state.schedules.filter((item) => item.id !== action.id),
        state.repeatInfos,
        deleteReminder(state.reminders, [action.id]),
      );

    case SCHEDULE_EDIT:
      var newReminders = state.reminders.map((reminder) => {
        if (reminder.linkedScheduleId === action.schedule.id) {
          LocalNotification.cancel(reminder.id);
          return getReminder(action.schedule, action.schedule.id, reminder.id);
        }
        return reminder;
      });

      return new ScheduleStateType(
        state.schedules.map((item: ScheduleType) =>
          item.id === action.schedule.id ? action.schedule : item,
        ),
        state.repeatInfos,
        newReminders,
        action.schedule.id,
      );

    case REPETITION_ADD:
      return new ScheduleStateType(
        state.schedules.concat(action.newSchedules),
        [...state.repeatInfos, action.repeatInfo],
        state.reminders.concat(action.newReminders),
        state.selectedScheduleId,
      );

    case REPETITION_REMOVE:
      var filteredSchedules = getFilteredSchedules(
        state.schedules,
        action.id,
        state.selectedScheduleId,
      );

      var filteredReminders = deleteReminder(
        state.reminders,
        filteredSchedules.map((schedule) => schedule.id),
      );

      return new ScheduleStateType(
        filteredSchedules,
        state.repeatInfos.filter((item) => item.id !== action.id),
        filteredReminders,
        state.selectedScheduleId,
      );

    case REPETITION_EDIT:
      var filteredSchedules = getFilteredSchedules(
        state.schedules,
        action.id,
        state.selectedScheduleId,
      );

      var filteredReminders = deleteReminder(
        state.reminders,
        filteredSchedules.map((schedule) => schedule.id),
      );
      return new ScheduleStateType(
        filteredSchedules.concat(action.newSchedules),
        state.repeatInfos.map((item) =>
          item.id === action.id ? action.repeatInfo : item,
        ),
        filteredReminders.concat(action.newReminders),
      );

    default:
      return state;
  }
};

export default scheduleReducer;
