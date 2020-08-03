// // subAssignment : Create, Update, Delete, Complete, Uncomplete

// // import { AssignListType } from '../component/Tutor/Homework/AssignList';
// // import { Assign } from '../component/Tutor/Homework/Assign';
// // import { SubAssign } from '../component/Tutor/Homework/SubAssign';
// // import createReducer from '../common/createReducer';

// import { createStore } from 'redux';
// import produce from 'immer';

// // action type constant

// const CREATE = 'subAssignment/CREATE';
// const UPDATE = 'subAssignment/UPDATE';
// const DELETE = 'subAssignment/DELETE';
// const COMPLETE = 'subAssignment/COMPLETE';
// const UNCOMPLETE = 'subAssignment/UNCOMPLETE';

// // action constructor
// export function createSubAssignment({ text, assignId }) {
//   return { type: CREATE, text };
// }

// export function updateSubAssignment({ text, subAssignId, assignId }) {
//   return { type: UPDATE, text, subAssignId, assignId };
// }

// export function deleteSubAssignment({ text, id }) {
//   return { type: DELETE, text, id };
// }

// export function completeSubAssignment({ subAssignId, assignId }) {
//   return { type: COMPLETE, subAssignId, assignId };
// }

// export function uncompleteSubAssignment({ subAssignId, assignId }) {
//   return { type: UNCOMPLETE, subAssignId, assignId };
// }

// // initial state
// const INITIAL_STATE: AssignListType = { assigns: [] };

// // dispatching

// // middleware for debugging

// // subAssignment reducer

// const reducer = createReducer(INITIAL_STATE, {
//   [COMPLETE]: (state, action) =>
//     (state.assigns[action.assignId][action.subAssignId].isCompleted = true),
// });

// export default reducer;
