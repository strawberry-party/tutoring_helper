import { AssignListType, AssignType, SubAssignType } from '../types/homework';
import produce, { Draft } from 'immer';

import _ from 'lodash';
import { handleActions } from 'redux-actions';

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
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ASSIGN_ADD:
        draft.assigns.push(action.assign);
        break;

      case ASSIGN_COMPLETE:
        for (let index = 0; index < draft.assigns.length; index++) {
          let assign = draft.assigns[index];
          if (assign.id === action.id) {
            assign.isCompleted = true;
            break;
          }
        }
        console.log('invalid action with no matching assign id');
        break;

      case ASSIGN_INCOMPLETE:
        for (let index = 0; index < draft.assigns.length; index++) {
          let assign = draft.assigns[index];
          if (assign.id === action.id) {
            assign.isCompleted = false;
            break;
          }
        }
        console.log('invalid action with no matching assign id');
        break;

      case ASSIGN_REMOVE:
        return {
          assigns: draft.assigns.filter(
            (assign: AssignType) => assign.id !== action.id,
          ),
        };

      case SUBASSIGN_ADD:
        // check validity of assignId
        for (let index = 0; index < draft.assigns.length; index++) {
          let assign = draft.assigns[index];
          if (assign.id === action.assignId) {
            assign.subAssigns.push(action.subAssign);
            break;
          }
        }
        console.log('invalid action with no matching assign id');
        break;

      case SUBASSIGN_COMPLETE:
        var assignIndex = draft.assigns.findIndex(
          (assign: AssignType) => assign.id === action.assignId,
        );
        if (assignIndex === -1) {
          console.log('invalid action with no matching assign id');
          break;
        }

        var subAssignIndex = draft.assigns[assignIndex].subAssigns.findIndex(
          (subAssign: SubAssignType) => subAssign.id === action.id,
        );

        if (subAssignIndex === -1) {
          console.log('invalid action with no matching subAssign id');
          break;
        }
        draft.assigns[assignIndex].subAssigns[
          subAssignIndex
        ].isCompleted = true;
        break;

      case SUBASSIGN_INCOMPLETE:
        var assignIndex = draft.assigns.findIndex(
          (assign: AssignType) => assign.id === action.assignId,
        );
        if (assignIndex === -1) {
          console.log('invalid action with no matching assign id');
          break;
        }

        var subAssignIndex = draft.assigns[assignIndex].subAssigns.findIndex(
          (subAssign: SubAssignType) => subAssign.id === action.id,
        );

        if (subAssignIndex === -1) {
          console.log('invalid action with no matching subAssign id');
          break;
        }
        draft.assigns[assignIndex].subAssigns[
          subAssignIndex
        ].isCompleted = false;
        break;

      case SUBASSIGN_REMOVE:
        var assignIndex = draft.assigns.findIndex(
          (assign: AssignType) => assign.id === action.assignId,
        );
        if (assignIndex === -1) {
          console.log('invalid action with no matching assign id');
          break;
        }

        draft.assigns[assignIndex].subAssigns = draft.assigns[
          assignIndex
        ].subAssigns.filter(
          (subAssign: SubAssignType) => subAssign.id !== action.id,
        );
        break;

      default:
        break;
    }
  });

export default assignsReducer;
