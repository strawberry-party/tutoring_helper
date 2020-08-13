import produce from 'immer';

// action type
const SET_FILTER = 'SET_FILTER' as const;
const SET_SORTER = 'SET_SORTER' as const;

const ALL = 'ALL' as const;
const COMPLETED = 'COMPLETED' as const;
const INCOMPLETE = 'INCOMPLETE' as const;

const DUE_FIRST = 'DUE_FIRST' as const;

type FilterAction =
  | ReturnType<typeof showAll>
  | ReturnType<typeof showIncomplete>
  | ReturnType<typeof showCompleted>
  | ReturnType<typeof dueFirst>;

export type FilterState = typeof ALL | typeof COMPLETED | typeof INCOMPLETE;
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
  return {
    type: SET_FILTER,
    filter: COMPLETED,
  };
}

function showIncomplete() {
  return {
    type: SET_FILTER,
    filter: INCOMPLETE,
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
        draft.filter = action.filter;
        break;
      case SET_SORTER:
        draft.sorter = action.sorter;
        break;
      default:
        return state;
    }
  });

export default assignFilterSorterReducer;
