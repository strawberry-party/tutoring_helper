import * as assignsAPI from '../api/assigns';

import { AssignStateType, AssignType } from '../types/homework';
import {
  createPromiseThunk,
  handleAsyncActionMultiKey,
  handleAsyncActions,
} from '../lib/asyncUtils';

import _ from 'lodash';

// action type

// 과제 여러개 조회하기
export const getAssignList = createPromiseThunk(
  'ASSIGNS_GET',
  assignsAPI.getAssignList,
);

// 과제 하나 조회하기
export const getAssign = createPromiseThunk(
  'ASSIGN_GET',
  assignsAPI.getAssignByIdx,
);

export const getCompleted = createPromiseThunk(
  'GET_COMPLETED',
  assignsAPI.getCompleted,
);

export const addAssign = createPromiseThunk('ASSIGN_ADD', assignsAPI.addAssign);

// TODO: 아래 액션들 다 바꾸기
const ASSIGN_REMOVE = 'ASSIGN_REMOVE' as const;
const ASSIGN_COMPLETE = 'ASSIGN_COMPLETE' as const;
const ASSIGN_INCOMPLETE = 'ASSIGN_INCOMPLETE' as const;
const ASSIGN_EDIT = 'ASSIGN_EDIT' as const;

const initialState: AssignStateType = new AssignStateType();

// action constructor
// assign CRUD

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
  getAssignList,
  getAssign,
  addAssign,
  completeAssign,
  incompleteAssign,
  removeAssign,
  editAssign,
  getCompleted,
};

// reducer

// action에 따라 state를 어떻게 반환할지 설정
// TODO: 깊은 곳까지 접근하기 편하도록 immer.js 사용할것

const findAssignById = (id) => (assign) => {
  return assign.id == id;
};

const assignsReducer = (state: AssignStateType = initialState, action) => {
  switch (action.type) {
    case 'ASSIGNS_GET':
    case 'ASSIGNS_GET_SUCCESS':
    case 'ASSIGNS_GET_ERROR':
      return handleAsyncActions('ASSIGNS_GET', 'assignList')(state, action);

    case 'ASSIGN_GET':
    case 'ASSIGN_GET_SUCCESS':
    case 'ASSIGN_GET_ERROR':
      return handleAsyncActions('ASSIGN_GET', 'assign')(state, action);

    case 'ASSIGN_ADD':
    case 'ASSIGN_ADD_SUCCESS':
    case 'ASSIGN_ADD_ERROR':
      return handleAsyncActions('ASSIGN_ADD', 'assignList')(state, action);

    case 'GET_COMPLETED':
    case 'GET_COMPLETED_SUCCESS':
    case 'GET_COMPLETED_ERROR':
      return handleAsyncActions('GET_COMPLETED', 'completed')(state, action);

    case ASSIGN_COMPLETE:
      return {
        ...state,
        assignList: state.assignList.map((assign) => {
          if (assign.id === action.id) assign.isCompleted = true;
        }),
      };

    case ASSIGN_INCOMPLETE:
      return {
        ...state,
        assignList: state.assignList.map((assign) => {
          if (assign.id === action.id) assign.isCompleted = false;
        }),
      };

    case ASSIGN_REMOVE:
      var assign = state.assignList.find(findAssignById(action.id));
      return {
        ...state,
        assignList: state.assignList.filter(
          (assign) => assign.id !== action.id,
        ),
        completed: assign.isCompleted ? state.completed - 1 : state.completed,
      };

    case ASSIGN_EDIT:
      return {
        ...state,
        assignList: state.assignList.map((assign) => {
          if (assign.id === action.id) return action.assign;
        }),
        completed: action.assign.isCompleted
          ? state.completed + 1
          : state.completed,
      };

    default:
      return state;
  }
};

export default assignsReducer;
