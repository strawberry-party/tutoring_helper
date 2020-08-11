import produce, { Draft } from 'immer';

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

export const showEditModal = (id: string) => ({
  type: SET_EDIT_MODAL_VISIBILITY,
  editModalVisible: true,
  selectedAssignId: id,
});

export const hideEditModal = () => ({
  type: SET_EDIT_MODAL_VISIBILITY,
  editModalVisible: false,
  selectedAssignId: 'none',
});

export const actions = {
  showAddModal,
  hideAddModal,
  showEditModal,
  hideEditModal,
};

// reducer
const initialState: ModalState = {
  addModalVisible: false,
  editModalVisible: false,
  selectedAssignId: 'none',
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
        break;

      default:
        return state;
    }
  });

export default assignModalVisibilityReducer;
