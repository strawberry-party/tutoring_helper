import { TagType } from '../types/root';
import _ from 'lodash';
import produce from 'immer';

interface TagState {
  selectedTagId: string;
  subjectTags: [];
  bookTags: [],
}

const initialState = {
  selectedTagId: '',
  subjectTags: [],
  bookTags: [],
};

// action type
type TagAction =
  | ReturnType<typeof selectTag>
  | ReturnType<typeof addTag>
  | ReturnType<typeof removeTag>
  | ReturnType<typeof editTag>
  | ReturnType<typeof setupTag>;

const TAG_SELECT = 'SELECT_TAG' as const;
const TAG_ADD = 'TAG_ADD' as const;
const TAG_EDIT = 'TAG_EDIT' as const;
const TAG_REMOVE = 'TAG_REMOVE' as const;
const TAG_SETUP = 'TAG_SETUP' as const;

// action constructor
// tag CRUD

// global tag selecting action for tag edit start
export const setupTag = (subjectTags: Array<TagType>, bookTags: Array<TagType>) => ({
  type: TAG_SETUP,
  subjectTags,
  bookTags,
})

export const selectTag = (id: string) => ({
  type: TAG_SELECT,
  id: id,
});

export const addTag = (tag: TagType) => ({
  type: TAG_ADD,
  tag,
  id: _.uniqueId('tag_'),
});

export const removeTag = (id: string) => ({
  type: TAG_REMOVE,
  id: id,
});

export const editTag = (id: string, tag: TagType) => ({
  type: TAG_EDIT,
  id,
  tag,
});

// actions
export const actions = {
  selectTag,
  addTag,
  removeTag,
  editTag,
  setupTag,
};

// reducer
const tagReducer = (state = initialState, action: TagAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case TAG_SETUP:
        draft.subjectTags = [];
        draft.bookTags = [];
        action.subjectTags === undefined ? '' : Object.entries(action.subjectTags).reverse().map(([key, info]) => {
          draft.subjectTags.push({key, info});
        })
        action.bookTags === undefined ? '' : Object.entries(action.bookTags).reverse().map(([key, info]) => {
          draft.bookTags.push({key, info});
        })
        
        break;
      // case TAG_SELECT:
      //   draft.selectedTagId = action.id;
      //   break;
      // case TAG_ADD:
      //   draft.tags.set(action.id, action.tag);
      //   break;
      // case TAG_EDIT:
      //   draft.tags.set(action.id, action.tag);
      //   break;
      // case TAG_REMOVE:
      //   draft.tags.delete(action.id);
      //   break;

      default:
        break;
    }
  });

export default tagReducer;
