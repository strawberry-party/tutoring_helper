import { AssignListType, AssignType } from './../types/homework';

import dayjs from 'dayjs';
import produce from 'immer';

// action type
export const SET_ADD_MODAL_VISIBILITY = 'SET_ADD_MODAL_VISIBILITY' as const;
export const SET_EDIT_MODAL_VISIBILITY = 'SET_EDIT_MODAL_VISIBILITY' as const;
export const SET_CONFIRM_MODAL_VISIBILITY = 'SET_CONFIRM_MODAL_VISIBILITY' as const;

type AssignModalAction =
  | ReturnType<typeof showAddModal>
  | ReturnType<typeof hideAddModal>
  | ReturnType<typeof showEditModal>
  | ReturnType<typeof hideEditModal>;
// | ReturnType<typeof showConfirmModal>
// | ReturnType<typeof hideConfirmModal>;

type ModalState = {
  addModalVisible: boolean;
  editModalVisible: boolean;
  selectedAssignId: string;
  selectedAssign: AssignType;
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

export const actions = {
  showAddModal,
  hideAddModal,
  showEditModal,
  hideEditModal,
};

// reducer
const now = dayjs();
const defaultAssign: AssignType = new AssignType('', '', now);

const initialState: ModalState = {
  addModalVisible: false,
  editModalVisible: false,
  selectedAssignId: 'none',
  selectedAssign: defaultAssign,
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

      default:
        return state;
    }
  });

export default assignModalVisibilityReducer;
