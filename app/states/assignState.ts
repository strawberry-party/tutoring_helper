import * as assignsAPI from '../api/assigns';

import {
  createPromiseThunk,
  handleAsyncActions,
  reducerUtils,
} from '../lib/asyncUtils';

import { AssignStateType } from './../types/homework';
import { AssignType } from '../types/homework';
import _ from 'lodash';
import produce from 'immer';

// action type

// 과제 여러개 조회하기
const GET_ASSIGNS = 'GET_ASSIGNS' as const; // 요청 시작
const GET_ASSIGNS_SUCCESS = 'GET_ASSIGNS_SUCCESS' as const; // 요청 성공
const GET_ASSIGNS_ERROR = 'GET_ASSIGNS_ERROR' as const; // 요청 실패

// 과제 하나 조회하기
const GET_ASSIGN = 'GET_ASSIGN' as const;
const GET_ASSIGN_SUCCESS = 'GET_ASSIGN_SUCCESS' as const;
const GET_ASSIGN_ERROR = 'GET_ASSIGN_ERROR' as const;

export const getAssigns = createPromiseThunk(
  GET_ASSIGNS,
  assignsAPI.getAssigns,
);
export const getAssign = createPromiseThunk(
  GET_ASSIGN,
  assignsAPI.getAssignById,
);

// TODO: 아래 액션들 다 바꾸기

const ASSIGN_ADD = 'ASSIGN_ADD' as const;
const ASSIGN_REMOVE = 'ASSIGN_REMOVE' as const;
const ASSIGN_COMPLETE = 'ASSIGN_COMPLETE' as const;
const ASSIGN_INCOMPLETE = 'ASSIGN_INCOMPLETE' as const;
const ASSIGN_EDIT = 'ASSIGN_EDIT' as const;
const ASSIGNSTATE_SETUP = 'ASSIGNSTATE_SETUP' as const;

type AssignAction =
  | ReturnType<typeof addAssign>
  | ReturnType<typeof completeAssign>
  | ReturnType<typeof incompleteAssign>
  | ReturnType<typeof removeAssign>
  | ReturnType<typeof editAssign>
  | ReturnType<typeof setupAssign>
  | any; // thunk 처리를 위해 일시적으로

const initialState: AssignStateType = new AssignStateType();

// action constructor
// assign CRUD
export const setupAssign = (assigns: Array<AssignType>, completed: number) => ({
  type: ASSIGNSTATE_SETUP,
  assigns,
  completed,
});

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
  getAssigns,
  getAssign,
  addAssign,
  completeAssign,
  incompleteAssign,
  removeAssign,
  editAssign,
};

// reducer

// action에 따라 state를 어떻게 반환할지 설정
// TODO: 깊은 곳까지 접근하기 편하도록 immer.js 사용할것

const findAssignById = (id) => (assign) => {
  return assign.id == id;
};

const assignsReducer = (
  state: AssignStateType = initialState,
  action: AssignAction,
) => {
  switch (action.type) {
    case GET_ASSIGNS:
    case GET_ASSIGNS_SUCCESS:
    case GET_ASSIGNS_ERROR:
      return handleAsyncActions(GET_ASSIGNS, 'assigns')(state, action);
    case GET_ASSIGN:
    case GET_ASSIGN_SUCCESS:
    case GET_ASSIGN_ERROR:
      return handleAsyncActions(GET_ASSIGN, 'assign')(state, action);

    case ASSIGN_ADD:
      return { ...state, assigns: [...state.assigns, action.assign] };
    // handleAsyncActions

    case ASSIGN_COMPLETE:
      return {
        ...state,
        assigns: state.assigns.map((assign) => {
          if (assign.id === action.id) assign.isCompleted = true;
        }),
      };

    case ASSIGN_INCOMPLETE:
      return {
        ...state,
        assigns: state.assigns.map((assign) => {
          if (assign.id === action.id) assign.isCompleted = false;
        }),
      };

    case ASSIGN_REMOVE:
      var assign = state.assigns.find(findAssignById(action.id));
      return {
        ...state,
        assigns: state.assigns.filter((assign) => assign.id !== action.id),
        completed: assign.isCompleted ? state.completed - 1 : state.completed,
      };

    case ASSIGN_EDIT:
      return {
        ...state,
        assigns: state.assigns.map((assign) => {
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
