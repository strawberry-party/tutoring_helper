import LocalNotification from '../utils/LocalNotification';
import { ReminderType } from './../types/schedule';
import _ from 'lodash';

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

export const addReminder = (formWork, linkedScheduleId: string = 'none') => {
  return {
    type: REMINDER_ADD,
    reminder: {
      id: _.uniqueId('reminder_'),
      message: 'message',
      title: 'title',
      date: Date(),
      linkedScheduleId: linkedScheduleId,
    },
  };
};

export const removeReminder = (id: string) => ({
  type: REMINDER_REMOVE,
  id: id,
});

export const editReminder = (
  id: string,
  formWork,
  linkedScheduleId: string = 'none',
) => ({
  type: REMINDER_EDIT,
  message: 'new message',
  title: 'new title',
  date: Date(),
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
      LocalNotification.triggerOneTimeLocalNotificationDate(
        action.reminder.id,
        action.reminder.message,
        action.reminder.title,
        action.reminder.date,
      );
      return { reminders: [...state.reminders, action.reminder] };

    case REMINDER_REMOVE:
      return {
        reminders: state.reminders.filter(
          (reminder: ReminderType) => reminder.id !== action.id,
        ),
      };

    case REMINDER_EDIT:
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
