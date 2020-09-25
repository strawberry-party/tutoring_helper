// import produce from 'immer';

// // action type
// const SET_FILTER = 'SET_FILTER' as const;
// const SET_TAG_FILTER = 'SET_TAG_FILTER' as const;

// // action constructor

// /* -------------------------*/
// // filter
// const ALL = 'ALL' as const;

// type FilterSorterAction =
//   | ReturnType<typeof showAll>
//   | ReturnType<typeof showSelectedTags>


// type FilterSorterState = {
//   filter: FilterState;
//   tagFilter: Set<string>;
// };

// // action constructor
// function showAll() {
//   return {
//     type: SET_FILTER,
//     filter: ALL,
//   };
// }

// function showCompleted() {
//   return {
//     type: SET_FILTER,
//     filter: COMPLETED,
//   };
// }

// function showIncomplete() {
//   return {
//     type: SET_FILTER,
//     filter: INCOMPLETED,
//   };
// }

// function showSelectedTags(selectedTagIdSet: Set<string>) {
//   return {
//     type: SET_TAG_FILTER,
//     tagFilter: selectedTagIdSet,
//   };
// }

// /* -------------------------*/
// // sorterDir 정렬 방향

// const ASC = 'ASC' as const; // 내림차순  (▲)
// const DSC = 'DSC' as const; //  오름차순 (▽)

// export const sorterDirOptions = { ASC, DSC };

// function sortAsc() {
//   return {
//     type: SET_SORTER_DIR,
//     sorterDir: ASC,
//   };
// }

// function sortDsc() {
//   return {
//     type: SET_SORTER_DIR,
//     sorterDir: DSC,
//   };
// }

// /* -------------------------*/
// // sorter 정렬자
// const DUE = 'DUE' as const;
// const OUT = 'OUT' as const;
// const TITLE = 'TITLE' as const;

// export const sorterOptions = { DUE, OUT, TITLE };

// function sortDue() {
//   return {
//     type: SET_SORTER,
//     sorter: DUE,
//   };
// }
// function sortOut() {
//   return {
//     type: SET_SORTER,
//     sorter: OUT,
//   };
// }
// function sortTitle() {
//   return {
//     type: SET_SORTER,
//     sorter: TITLE,
//   };
// }

// export const actions = {
//   showAll,
//   showCompleted,
//   showIncomplete,

//   sortDsc,
//   sortAsc,
//   sortDue,
//   sortOut,
//   sortTitle,

//   showSelectedTags,
// };

// // reducer
// const initialState: FilterSorterState = {
//   filter: ALL,
//   sorter: OUT,
//   sorterDir: ASC,
//   tagFilter: new Set<string>(['java']),
// };

// const assignFilterSorterReducer = (
//   state: FilterSorterState = initialState,
//   action: FilterSorterAction,
// ) =>
//   produce(state, (draft) => {
//     switch (action.type) {
//       case SET_FILTER:
//         draft.filter = action.filter;
//         break;
//       case SET_SORTER:
//         draft.sorter = action.sorter;
//         break;
//       case SET_SORTER_DIR:
//         draft.sorterDir = action.sorterDir;
//         break;
//       case SET_TAG_FILTER:
//         draft.tagFilter = action.tagFilter;
//       default:
//         break;
//     }
//   });

// export default assignFilterSorterReducer;
