import { AssignListType, AssignType, SubAssignType } from '../types/homework';

import _ from 'lodash';
import { handleActions } from 'redux-actions';
import { log } from 'react-native-reanimated';
import produce from 'immer'

// action type
const ASSIGN_ADD = 'ASSIGN_ADD' as const;
const ASSIGN_REMOVE = 'ASSIGN_REMOVE' as const;
const ASSIGN_COMPLETE = 'ASSIGN_COMPLETE' as const;
const ASSIGN_INCOMPLETE = 'ASSIGN_INCOMPLETE' as const;

const SUBASSIGN_ADD = 'SUBASSIGN_ADD' as const;
const SUBASSIGN_REMOVE = 'SUBASSIGN_REMOVE' as const;
const SUBASSIGN_COMPLETE = 'SUBASSIGN_COMPLETE' as const;
const SUBASSIGN_INCOMPLETE = 'SUBASSIGN_INCOMPLETE' as const;

type AssignAction =
  | ReturnType<typeof addAssign>
  | ReturnType<typeof completeAssign>
  | ReturnType<typeof incompleteAssign>
  | ReturnType<typeof removeAssign>
  | ReturnType<typeof addSubAssign>
  | ReturnType<typeof completeSubAssign>
  | ReturnType<typeof incompleteSubAssign>
  | ReturnType<typeof removeSubAssign>;

type AssignListState = {
  assigns: Array<AssignType>;
};

const initialState: AssignListState = { assigns: [] };

// action constructor
// assign CRUD
export const addAssign = (newAssign: AssignType) => ({
  type: ASSIGN_ADD,
  assign: {
    ...newAssign,
    id: _.uniqueId('assign_'),
  },
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

// subAssign CRUD
export const addSubAssign = (
  assignId: string,
  newSubAssign: SubAssignType,
) => ({
  type: SUBASSIGN_ADD,
  subAssign: {
    ...newSubAssign,
    id: _.uniqueId('assign_'),
  },
  assignId,
});

export const completeSubAssign = (assignId: string, id: string) => ({
  type: SUBASSIGN_COMPLETE,
  id,
  assignId,
});

export const incompleteSubAssign = (assignId: string, id: string) => ({
  type: SUBASSIGN_INCOMPLETE,
  id,
  assignId,
});

export const removeSubAssign = (assignId: string, id: string) => ({
  type: SUBASSIGN_REMOVE,
  id,
  assignId,
});

// actions
export const actions = {
  addAssign,
  completeAssign,
  incompleteAssign,
  removeAssign,
  addSubAssign,
  completeSubAssign,
  incompleteSubAssign,
  removeSubAssign,
};

// reducer

// action에 따라 state를 어떻게 반환할지 설정
// TODO: 깊은 곳까지 접근하기 편하도록 immer.js 사용할것

const assignsReducer = (
  state: AssignListState = initialState,
  action: AssignAction,
) => {
  switch (action.type) {
    case ASSIGN_ADD:
      return { assigns: [...state.assigns, action.assign] };
    case ASSIGN_COMPLETE:
      var assigns = state.assigns;
      var index = _.findIndex(
        assigns,
        (assign: AssignType) => assign.id === action.id,
      );
      if (index === -1) {
        return state;
      } else {
        return {
          assigns: [
            ...assigns.slice(0, index),
            Object.assign({}, assigns[index], {
              isCompleted: true,
            }),
            ...assigns.slice(index + 1),
          ],
        };
      }

    case ASSIGN_INCOMPLETE:
      var assigns = state.assigns;
      var index: number = _.findIndex(
        assigns,
        (assign: AssignType) => assign.id === action.id,
      );
      if (index === -1) {
        return state;
      } else {
        console.log(assigns[index].title);
        return {
          assigns: [
            ...assigns.slice(0, index),
            Object.assign({}, assigns[index], {
              isCompleted: false,
            }),
            ...assigns.slice(index + 1),
          ],
        };
      }

    case ASSIGN_REMOVE:
      var newAssigns = state.assigns.filter(
        (assign: AssignType) => assign.id !== action.id,
      );
      return {
        assigns: newAssigns,
      };

    case SUBASSIGN_ADD:
      const selected = action.assignId;
      const subAssign = action.subAssign;
      // const newAssign = {assign[selected]}
      

    default:
      return state;
  }
};

export default assignsReducer;
