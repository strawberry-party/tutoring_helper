import { AssignType } from '../types/homework';
import _ from 'lodash';
import dayjs from 'dayjs';
import produce from 'immer';

// action type
const ASSIGN_ADD = 'ASSIGN_ADD' as const;
const ASSIGN_REMOVE = 'ASSIGN_REMOVE' as const;
const ASSIGN_COMPLETE = 'ASSIGN_COMPLETE' as const;
const ASSIGN_INCOMPLETE = 'ASSIGN_INCOMPLETE' as const;
const ASSIGN_EDIT = 'ASSIGN_EDIT' as const;

type AssignAction =
  | ReturnType<typeof addAssign>
  | ReturnType<typeof completeAssign>
  | ReturnType<typeof incompleteAssign>
  | ReturnType<typeof removeAssign>
  | ReturnType<typeof editAssign>;

type AssignListState = {
  assigns: Array<AssignType>;
};

const initialState: AssignListState = { assigns: [] };

// action constructor
// assign CRUD
export const addAssign = (assign: AssignType) => ({
  type: ASSIGN_ADD,
  assign,
});

export const completeAssign = (id: string) => ({
  type: ASSIGN_COMPLETE,
  id: id,
});

export const incompleteAssign = (id: string) => ({
  type: ASSIGN_INCOMPLETE,
  id: id,
});

export const removeAssign = (id: string) => ({
  type: ASSIGN_REMOVE,
  id: id,
});

export const editAssign = (id: string, assign: AssignType) => ({
  type: ASSIGN_EDIT,
  id,
  assign,
});

// actions
export const actions = {
  addAssign,
  completeAssign,
  incompleteAssign,
  removeAssign,
  editAssign,
};

// reducer

// action에 따라 state를 어떻게 반환할지 설정
// TODO: 깊은 곳까지 접근하기 편하도록 immer.js 사용할것

const assignsReducer = (
  state: AssignListState = initialState,
  action: AssignAction,
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ASSIGN_ADD:
        draft.assigns.push(action.assign);
        break;

      case ASSIGN_COMPLETE:
        for (var index = 0; index < draft.assigns.length; index++) {
          if (draft.assigns[index].id === action.id) {
            draft.assigns[index].isCompleted = true;
            break;
          }
        }
        if (index === draft.assigns.length)
          console.log('invalid action with no matching assign id');
        break;

      case ASSIGN_INCOMPLETE:
        for (var index = 0; index < draft.assigns.length; index++) {
          if (draft.assigns[index].id === action.id) {
            draft.assigns[index].isCompleted = false;
            break;
          }
        }
        if (index === draft.assigns.length)
          console.log('invalid action with no matching assign id');
        break;

      case ASSIGN_REMOVE:
        return {
          assigns: draft.assigns.filter(
            (assign: AssignType) => assign.id !== action.id,
          ),
        };

      case ASSIGN_EDIT:
        for (var index = 0; index < draft.assigns.length; index++) {
          if (draft.assigns[index].id === action.id) {
            draft.assigns[index] = action.assign;
            break;
          }
        }
        if (index === draft.assigns.length)
          console.log('invalid action with no matching assign id');
        break;

      default:
        break;
    }
  });

export default assignsReducer;
