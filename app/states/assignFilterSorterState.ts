import produce from 'immer';

// action type
const SET_FILTER = 'SET_FILTER' as const;
const SET_SORTER = 'SET_SORTER' as const;
const SET_SORTER_DIR = 'SET_SORTER_DIR' as const; // 정렬 방향
const SET_TAG_FILTER = 'SET_TAG_FILTER' as const;

// action constructor

/* -------------------------*/
// filter
const ALL = 'ALL' as const;
const COMPLETED = 'COMPLETED' as const;
const INCOMPLETED = 'INCOMPLETED' as const;

type FilterSorterAction =
  | ReturnType<typeof showAll>
  | ReturnType<typeof showIncomplete>
  | ReturnType<typeof showCompleted>
  | ReturnType<typeof showSelectedTags>
  | ReturnType<typeof sortDsc>
  | ReturnType<typeof sortAsc>
  | ReturnType<typeof sortDue>
  | ReturnType<typeof sortOut>
  | ReturnType<typeof sortTitle>;

export type FilterState = typeof ALL | typeof COMPLETED | typeof INCOMPLETED;
type SorterState = typeof DUE | typeof OUT | typeof TITLE;
type SorterDirState = typeof ASC | typeof DSC;

type FilterSorterState = {
  filter: FilterState;
  sorter: SorterState;
  sorterDir: SorterDirState;
  tagFilter: Set<string>;
};

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
    filter: INCOMPLETED,
  };
}

function showSelectedTags(selectedTagIdSet: Set<string>) {  
  return {
    type: SET_TAG_FILTER,
    tagFilter: selectedTagIdSet,
  };
}

/* -------------------------*/
// sorterDir 정렬 방향

const ASC = 'ASC' as const; // 내림차순  (▲)
const DSC = 'DSC' as const; //  오름차순 (▽)

export const sorterDirOptions = { ASC, DSC };

function sortAsc() {
  return {
    type: SET_SORTER_DIR,
    sorterDir: ASC,
  };
}

function sortDsc() {
  return {
    type: SET_SORTER_DIR,
    sorterDir: DSC,
  };
}

/* -------------------------*/
// sorter 정렬자
const DUE = 'DUE' as const;
const OUT = 'OUT' as const;
const TITLE = 'TITLE' as const;

export const sorterOptions = { DUE, OUT, TITLE };

function sortDue() {
  return {
    type: SET_SORTER,
    sorter: DUE,
  };
}
function sortOut() {
  return {
    type: SET_SORTER,
    sorter: OUT,
  };
}
function sortTitle() {
  return {
    type: SET_SORTER,
    sorter: TITLE,
  };
}

export const actions = {
  showAll,
  showCompleted,
  showIncomplete,

  sortDsc,
  sortAsc,
  sortDue,
  sortOut,
  sortTitle,

  showSelectedTags,
};

// reducer
const initialState: FilterSorterState = {
  filter: ALL,
  sorter: OUT,
  sorterDir: ASC,
  tagFilter: new Set<string>(['java']),
};

const assignFilterSorterReducer = (
  state: FilterSorterState = initialState,
  action: FilterSorterAction,
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_FILTER:
        draft.filter = action.filter;
        break;
      case SET_SORTER:
        draft.sorter = action.sorter;
        break;
      case SET_SORTER_DIR:
        draft.sorterDir = action.sorterDir;
        break;
      case SET_TAG_FILTER:
        draft.tagFilter = action.tagFilter;
      default:
        break;
    }
  });

export default assignFilterSorterReducer;
