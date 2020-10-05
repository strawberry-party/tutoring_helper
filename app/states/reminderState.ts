import LocalNotification from '../utils/LocalNotification';
import { ReminderType } from './../types/schedule';
import _ from 'lodash';
import dayjs from 'dayjs';

// 리마인더 리스트를 받으면 등록함

// action type
const REMINDER_ADD = 'REMINDER_ADD' as const;
const REMINDER_REMOVE = 'REMINDER_REMOVE' as const;
const REMINDER_EDIT = 'REMINDER_EDIT' as const;

type ReminderAction =
  | ReturnType<typeof addReminder>
  | ReturnType<typeof removeReminder>
  | ReturnType<typeof editReminder>;

interface ReminderStateType {
  reminders: ReminderType[];
}

const initialState: ReminderStateType = { reminders: [] };

// action constructor
// reminder CRUD

export const addReminder = (formWork, linkedScheduleId) => {
  return {
    type: REMINDER_ADD,
    reminder: {
      id: _.uniqueId(), // new id
      message: formWork.message, // formwork.message
      title: formWork.title, // formwork.title
      date: dayjs().add(30, 's').toDate(),
      // date: formWork.date, // formwork.date
      linkedScheduleId: linkedScheduleId,
    },
  };
};

export const removeReminder = (linkedScheduleId: string) => ({
  type: REMINDER_REMOVE,
  linkedScheduleId,
});

export const editReminder = (
  id: string,
  formWork,
  linkedScheduleId: string = 'none',
) => ({
  type: REMINDER_EDIT,
  message: 'new message',
  title: 'new title',
  date: new Date(),
  linkedScheduleId: linkedScheduleId,
  id: id,
});

// actions
export const actions = {
  addReminder,
  removeReminder,
  editReminder,
};

// reducer
// action에 따라 state를 어떻게 반환할지 설정

const reminderReducer = (
  state: ReminderStateType = initialState,
  action: ReminderAction,
) => {
  switch (action.type) {
    case REMINDER_ADD:
      console.log(action.reminder);
      LocalNotification.registerReminder(
        action.reminder.id,
        action.reminder.message,
        action.reminder.title,
        action.reminder.date,
      );
      return { reminders: [...state.reminders, action.reminder] };

    case REMINDER_REMOVE:
      console.log(
        'REMINDER_REMOVE: linkedScheduleId - ' + action.linkedScheduleId,
      );
      console.log(state.reminders);

      state.reminders.forEach((reminder) => {
        if (reminder.linkedScheduleId === action.linkedScheduleId)
          LocalNotification.cancel(reminder.id);
      });
      return {
        reminders: state.reminders.filter(
          (reminder: ReminderType) =>
            reminder.linkedScheduleId !== action.linkedScheduleId,
        ),
      };

    case REMINDER_EDIT:
      LocalNotification.cancel(action.id);
      LocalNotification.registerReminder(
        action.id,
        action.message,
        action.title,
        action.date,
      );

      return {
        reminders: state.reminders.map((item: ReminderType) =>
          item.id === action.id
            ? {
                id: action.id,
                title: action.title,
                message: action.message,
                date: action.date,
                linkedScheduleId: action.linkedScheduleId,
              }
            : item,
        ),
      };

    default:
      return state;
  }
};

export default reminderReducer;
