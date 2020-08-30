import { Modal, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';

import AssignForm from './AssignForm';
import { AssignType } from '../../types/homework';
import MyModal from '../common/MyModal';
import { TagType } from '../../types/root';

interface AssignModalProps {
  modalVisible: boolean;
  hideModal: () => void;
  onSubmit: any;
  selectedAssignId: string;
  selectedAssign: AssignType;
  modalType: 'AddModal' | 'EditModal';
  tags: Map<string, TagType>;
  onAddTag: (tag: TagType) => void;
}

function AssignModal({
  modalVisible,
  hideModal,
  onSubmit,
  modalType,
  selectedAssignId,
  selectedAssign,
  tags,
  onAddTag,
}: AssignModalProps) {
  return (
    <MyModal
      modalVisible={modalVisible}
      hideModal={hideModal}
      onSubmit={onSubmit}
      data={{ modalType, selectedAssign, selectedAssignId }}
      tags={tags}
      onAddTag={onAddTag}>
      <AssignForm
        onSubmit={onSubmit}
        hideModal={hideModal}
        selectedAssignId={selectedAssignId}
        modalType={modalType}
        selectedAssign={selectedAssign}
        tags={tags}
        onAddTag={onAddTag}
      />
    </MyModal>
  );
}

interface AddAssignModalProps extends AssignModalProps {}

export function AddAssignModal({
  modalVisible,
  hideModal,
  onSubmit,
  tags,
  modalType,
  onAddTag,
  selectedAssignId,
  selectedAssign,
}: AddAssignModalProps) {
  return (
    <AssignModal
      modalVisible={modalVisible}
      hideModal={hideModal}
      onSubmit={onSubmit}
      modalType={modalType}
      selectedAssignId={selectedAssignId}
      selectedAssign={selectedAssign}
      tags={tags}
      onAddTag={onAddTag}
    />
  );
}

interface EditAssignModalProps extends AssignModalProps {}

export function EditAssignModal({
  modalVisible,
  hideModal,
  selectedAssignId,
  selectedAssign,
  tags,
  onAddTag,
  onSubmit,
  modalType,
}: EditAssignModalProps) {
  return (
    <AssignModal
      modalVisible={modalVisible}
      hideModal={hideModal}
      onSubmit={onSubmit}
      modalType={modalType}
      selectedAssignId={selectedAssignId}
      selectedAssign={selectedAssign}
      tags={tags}
      onAddTag={onAddTag}
    />
  );
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
