import { AssignStateType } from './../types/homework';
import { AssignType } from '../types/homework';
import _ from 'lodash';
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

const initialState: AssignStateType = new AssignStateType();

// action constructor
// assign CRUD
export const addAssign = (assign: AssignType) => ({
  type: ASSIGN_ADD,
  assign,
  id: _.uniqueId('assign_'),
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
  state: AssignStateType = initialState,
  action: AssignAction,
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ASSIGN_ADD:
        draft.assignMap.set(action.id, action.assign);
        break;

      case ASSIGN_COMPLETE:
        var newAssignMap = new Map<string, AssignType>(draft.assignMap);
        newAssignMap.get(action.id).isCompleted = true;
        return { ...draft, assignMap: newAssignMap };

      case ASSIGN_INCOMPLETE:
        var newAssignMap = new Map<string, AssignType>(draft.assignMap);
        newAssignMap.get(action.id).isCompleted = false;
        return { ...draft, assignMap: newAssignMap };

      case ASSIGN_REMOVE:
        if (draft.assignMap.get(action.id).isCompleted) draft.completed -= 1;

        if (!draft.assignMap.delete(action.id))
          console.error('invalid action with no matching assign id');
        break;

      case ASSIGN_EDIT:
        draft.assignMap.set(action.id, action.assign);
        break;

      default:
        return state;
    }
  });

export default assignsReducer;
