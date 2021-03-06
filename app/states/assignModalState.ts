import { AssignListType, AssignType } from './../types/homework';

import produce from 'immer';

// action type
export const SET_ADD_MODAL_VISIBILITY = 'SET_ADD_MODAL_VISIBILITY' as const;
export const SET_EDIT_MODAL_VISIBILITY = 'SET_EDIT_MODAL_VISIBILITY' as const;
export const SET_CONFIRM_MODAL_VISIBILITY = 'SET_CONFIRM_MODAL_VISIBILITY' as const;
export const SET_FILTER_MODAL_VISIBILITY = 'SET_FILTER_MODAL_VISIBILITY' as const;

type AssignModalAction =
  | ReturnType<typeof showAddModal>
  | ReturnType<typeof hideAddModal>
  | ReturnType<typeof showEditModal>
  | ReturnType<typeof hideEditModal>
  | ReturnType<typeof showFilterModal>
  | ReturnType<typeof hideFilterModal>;
// | ReturnType<typeof showConfirmModal>
// | ReturnType<typeof hideConfirmModal>;

type ModalState = {
  addModalVisible: boolean;
  editModalVisible: boolean;
  selectedAssignId: string;
  selectedAssign: AssignType;

  filterModalVisible: boolean;
};

// action constructor
export const showAddModal = () => ({
  type: SET_ADD_MODAL_VISIBILITY,
  addModalVisible: true,
});

export const hideAddModal = () => ({
  type: SET_ADD_MODAL_VISIBILITY,
  addModalVisible: false,
});

export const showEditModal = (id: string, assign: AssignType) => ({
  type: SET_EDIT_MODAL_VISIBILITY,
  editModalVisible: true,
  selectedAssignId: id,
  selectedAssign: assign,
});

export const hideEditModal = () => ({
  type: SET_EDIT_MODAL_VISIBILITY,
  editModalVisible: false,
  selectedAssignId: 'none',
  selectedAssign: defaultAssign,
});

export const showFilterModal = () => ({
  type: SET_FILTER_MODAL_VISIBILITY,
  filterModalVisible: true,
});

export const hideFilterModal = () => ({
  type: SET_FILTER_MODAL_VISIBILITY,
  filterModalVisible: false,
});

export const actions = {
  showAddModal,
  hideAddModal,
  showEditModal,
  hideEditModal,
  showFilterModal,
  hideFilterModal,
};

// reducer
const defaultAssign: AssignType = new AssignType();

const initialState: ModalState = {
  addModalVisible: false,
  editModalVisible: false,
  selectedAssignId: 'none',
  selectedAssign: defaultAssign,

  filterModalVisible: false,
};

const assignModalVisibilityReducer = (
  state: ModalState = initialState,
  action: AssignModalAction,
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ADD_MODAL_VISIBILITY:
        draft.addModalVisible = action.addModalVisible;
        break;

      case SET_EDIT_MODAL_VISIBILITY:
        draft.editModalVisible = action.editModalVisible;
        draft.selectedAssignId = action.selectedAssignId;
        draft.selectedAssign = action.selectedAssign;
        break;

      case SET_FILTER_MODAL_VISIBILITY:
        draft.filterModalVisible = action.filterModalVisible;
        break;

      default:
        return state;
    }
  });

export default assignModalVisibilityReducer;
