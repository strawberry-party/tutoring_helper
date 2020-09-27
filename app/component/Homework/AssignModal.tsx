import { Modal, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';

import AssignForm from './AssignForm';
import { AssignType } from '../../types/homework';
import MyModal from '../common/MyModal';
import { TagPrimitiveType } from '../../types/root';

interface AssignModalProps {
  modalVisible: boolean;
  hideModal: () => void;
  onSubmit: any;
  selectedAssignId: string;
  selectedAssign: AssignType;
  modalType: 'AddModal' | 'EditModal';
  bookTags: TagPrimitiveType[];
  subjectTags: TagPrimitiveType[];
}

function AssignModal({
  modalVisible,
  hideModal,
  onSubmit,
  modalType,
  selectedAssignId,
  selectedAssign,
  bookTags,
  subjectTags,
}: AssignModalProps) {
  return (
    <MyModal
      modalVisible={modalVisible}
      hideModal={hideModal}
      // data={{ modalType, selectedAssign, selectedAssignId }}
    >
      <AssignForm
        onSubmit={onSubmit}
        hideModal={hideModal}
        selectedAssignId={selectedAssignId}
        modalType={modalType}
        selectedAssign={selectedAssign}
        bookTags={bookTags}
        subjectTags={subjectTags}
      />
    </MyModal>
  );
}

interface AddAssignModalProps extends AssignModalProps {}

export function AddAssignModal(props: AddAssignModalProps) {
  return <AssignModal {...props} />;
}

interface EditAssignModalProps extends AssignModalProps {}

export function EditAssignModal(props: EditAssignModalProps) {
  return <AssignModal {...props} />;
}

export default AssignModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    paddingVertical: 15,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 300,
    height: 500,
  },
});
