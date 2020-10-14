import { TagPrimitiveType } from './../types/root';
import { TagType } from '../types/root';
import _ from 'lodash';
import produce from 'immer';

interface TagState {
  selectedTagId: string;
  subjectTags: TagPrimitiveType[];
  bookTags: TagPrimitiveType[];
}

const initialState: TagState = {
  selectedTagId: '', // 안 쓰고 있음
  subjectTags: fetchSubjectTagsFromDB(),
  bookTags: fetchBookTagsFromDB(),
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
export const setupTag = (
  subjectTags: Array<TagType>,
  bookTags: Array<TagType>,
) => ({
  type: TAG_SETUP,
  subjectTags,
  bookTags,
});

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

function fetchSubjectTagsFromDB() {
  return [
    { key: 'tag_1', info: { name: '수학' } },
    { key: 'tag_2', info: { name: '과학' } },
    { key: 'tag_3', info: { name: '화학' } },
  ];
}

function fetchBookTagsFromDB() {
  return [
    { key: 'book_1', info: { name: '수학의 정석' } },
    { key: 'book_2', info: { name: '과학의 정석' } },
    { key: 'book_3', info: { name: '화학의 정석' } },
  ];
}
// reducer
const tagReducer = (state: TagState = initialState, action: TagAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case TAG_SETUP:
        return state;
      // return ({
      //   selectedTagId: '',
      //   subjectTags : state.subjectTags.concat(fetchSubjectTagsFromDB()),
      //   bookTags: state.bookTags.concat(fetchBookTagsFromDB()),
      // });

      // draft.subjectTags = [];
      // draft.bookTags = [];
      // action.subjectTags === undefined
      //   ? ''
      //   : Object.entries(action.subjectTags)
      //       .reverse()
      //       .map(([key, info]) => {
      //         draft.subjectTags.push({ key, info });
      //       });
      // action.bookTags === undefined
      //   ? ''
      //   : Object.entries(action.bookTags)
      //       .reverse()
      //       .map(([key, info]) => {
      //         draft.bookTags.push({ key, info });
      //       });
      // break;

      default:
        break;
    }
  });

export default tagReducer;
