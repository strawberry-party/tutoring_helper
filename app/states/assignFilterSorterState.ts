// action constructor
function showAll() {
  return {
    type: 'SET_FILTER',
    filter: 'ALL',
  };
}

function showCompleted() {
  return {
    type: 'SET_FILTER',
    filter: 'COMPLETED',
  };
}

function showIncomplete() {
  return {
    type: 'SET_FILTER',
    filter: 'INCOMPLETED',
  };
}

function setVisibleSubjectIds(visibleSubjectTagIds: string[]) {
  return {
    type: 'SET_VISIBLE_SUBJECT_TAGS',
    visibleSubjectTagIds: visibleSubjectTagIds,
  };
}

function setVisibleBookIds(setVisibleBookTagIds: string[]) {
  return {
    type: 'SET_VISIBLE_BOOK_TAGS',
    setVisibleBookTagIds: setVisibleBookTagIds,
  };
}

/* -------------------------*/
// sorterDir 정렬 방향

function sortAsc() {
  return {
    type: 'SET_SORTER_DIR',
    sorterDir: 'ASC',
  };
}

function sortDsc() {
  return {
    type: 'SET_SORTER_DIR',
    sorterDir: 'DSC',
  };
}

/* -------------------------*/
// sorter 정렬자
function sortDue() {
  return {
    type: 'SET_SORTER',
    sorter: 'DUE',
  };
}
function sortOut() {
  return {
    type: 'SET_SORTER',
    sorter: 'OUT',
  };
}
function sortTitle() {
  return {
    type: 'SET_SORTER',
    sorter: 'TITLE',
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

  setVisibleSubjectIds,
  setVisibleBookIds,
};

// reducer
const initialState = {
  filter: 'ALL',
  sorter: 'OUT',
  sorterDir: 'ASC',
  visibleSubjectTagIds: ['java'],
  visibleBookTagIds: [],
};

const assignFilterSorterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return { ...state, filter: action.filter };
    case 'SET_SORTER':
      return { ...state, sorter: action.sorter };
    case 'SET_SORTER_DIR':
      return { ...state, sorterDir: action.sorterDir };

    case 'SET_VISIBLE_SUBJECT_TAGS':
      return { ...state, visibleSubjectTagIds: action.visibleSubjectTagIds };

    case 'SET_VISIBLE_BOOK_TAGS':
      return {
        ...state,
        visibleBookTagIds: action.visibleBookTagIds,
      };

    default:
      break;
  }
};

export default assignFilterSorterReducer;
