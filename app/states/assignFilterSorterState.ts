import { Component } from 'react';
import { log } from 'react-native-reanimated';
import produce from 'immer';

// action type
const SET_FILTER = 'SET_FILTER' as const;
const SET_SORTER = 'SET_SORTER' as const;

const ALL = 'ALL' as const;
const COMPLETED = 'COMPLETED' as const;
const INCOMPLETED = 'INCOMPLETED' as const;


const ASC = 'ASC' as const;


export const filterOptions = { ALL, COMPLETED, INCOMPLETED };

const DUE_FIRST = 'DUE_FIRST' as const;

type FilterAction =
  | ReturnType<typeof showAll>
  | ReturnType<typeof showIncomplete>
  | ReturnType<typeof showCompleted>
  | ReturnType<typeof dueFirst>;

export type FilterState = typeof ALL | typeof COMPLETED | typeof INCOMPLETED;
type SorterState = typeof DUE_FIRST;

type FilterSorterState = { filter: FilterState; sorter: SorterState };

// action constructor
function showAll() {
  return {
    type: SET_FILTER,
    filter: ALL,
  };
}

function showCompleted() {
  console.log('====================================');
  console.log('showCompleted action constructor invoked');
  console.log('====================================');
  return {
    type: SET_FILTER,
    filter: COMPLETED,
  };
}

function showIncomplete() {
  return {
    type: SET_FILTER,
    filter: INCOMPLETED,
  };
}

function dueFirst() {
  return {
    type: SET_SORTER,
    sorter: DUE_FIRST,
  };
}

export const actions = {
  showAll,
  showCompleted,
  showIncomplete,
};

// reducer
const initialState: FilterSorterState = {
  filter: ALL,
  sorter: DUE_FIRST,
};

const assignFilterSorterReducer = (
  state: FilterSorterState = initialState,
  action: FilterAction,
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_FILTER:
        console.log('filter: '+ action.filter)
        draft.filter = action.filter;
        break;
      case SET_SORTER:
        draft.sorter = action.sorter;
        break;
      default:
        console.log("Something went wrong in assignFilterSorterReducer")
        return state;
    }
  });

export default assignFilterSorterReducer;
