import { Icon, Text, View } from 'native-base';
import { Modal, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

import { Chip } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Tag from '../Tag';
import produce from 'immer';

interface FilterProps {
  filterActions: {
    showAll: () => void;
    showCompleted: () => void;
    showIncomplete: () => void;
  };
  activeFilter;
}

export default function FilterModal({
  filterActions,
  activeFilter,
  modalVisible,
  hideModal,
  tags,
  onAddTag,
  tagFilter,
}) {
  const handleSubmit = () => {
    selectFilter(selectedFilterButton);
    filterActions.showSelectedTags(selectedTagIdSet);
    hideModal();
  };

  const selectFilter = (value: string) => {
    switch (value) {
      case 'ALL':
        filterActions.showAll();
        break;
      case 'COMPLETED':
        filterActions.showCompleted();
        break;
      case 'INCOMPLETED':
        filterActions.showIncomplete();
        break;
      default:
        console.error('SOMETHING WENT WRONG in FilterModal/selectFilter');
    }
  };

  const tagKeyList: string[] = Array.from(tags.keys());

  const [selectedTagIdSet, setTagIdSet] = useState(new Set(tagFilter));
  const [selectedFilterButton, toggleFilterButton] = useState(activeFilter);

  function getTagComponents(style = {}) {
    var tagComponents: JSX.Element[] = [];

    for (var index = 1; index < tags.size; index++) {
      var id = tagKeyList[index];
      var tag = tags.get(id);

      tagComponents.push(
        <Tag
          tag={tag}
          style={style}
          id={id}
          key={id}
          isSelected={selectedTagIdSet.has(id)}
          onSelect={(id: string) => {
            console.log(selectedTagIdSet);
            setTagIdSet(
              produce((draft) => {
                if (draft.has(id)) draft.delete(id);
                else draft.add(id);
              }),
            );
          }}
        />,
      );
    }

    return tagComponents;
  }

  const selectAllTag = () => {
    setTagIdSet(
      produce((draft) => {
        tagKeyList.map((id: string) => draft.add(id));
      }),
    );
  };

  const unselectAllTag = () => {
    setTagIdSet(new Set());
  };

  const onSelectFilterOption = (value: string) => {
    toggleFilterButton(value);
    console.warn('filterOption selected!' + value);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={hideModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.pickerContainer}>
              <Chip
                style={
                  selectedFilterButton === 'ALL'
                    ? styles.selectedChip
                    : styles.chip
                }
                onPress={() => onSelectFilterOption('ALL')}>
                <Text> 모두 </Text>
              </Chip>
              <Chip
                style={
                  selectedFilterButton === 'COMPLETED'
                    ? styles.selectedChip
                    : styles.chip
                }
                onPress={() => onSelectFilterOption('COMPLETED')}>
                <Text> 끝냄 </Text>
              </Chip>
              <Chip
                style={
                  selectedFilterButton === 'INCOMPLETED'
                    ? styles.selectedChip
                    : styles.chip
                }
                onPress={() => onSelectFilterOption('INCOMPLETED')}>
                <Text> 못 끝냄 </Text>
              </Chip>
            </View>

            <Text> 태그 필터 </Text>

            <ScrollView>
              <View>
                <View style={styles.tagPickerContainer}>
                  <Chip style={styles.chip} onPress={selectAllTag}>
                    <Text> 모두 선택 </Text>
                  </Chip>
                  <Chip style={styles.chip} onPress={unselectAllTag}>
                    <Text> 모두 해제 </Text>
                  </Chip>
                </View>

                <View style={styles.tagContainer}>
                  {getTagComponents({ margin: 5 })}
                </View>
              </View>
            </ScrollView>

            {/* <View style={styles.buttonContainer}> */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Icon name="save-outline" />
            </TouchableOpacity>
            {/* </View> */}
          </View>
        </View>
      </Modal>
    </View>
  );
}

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
    maxHeight: 300,
  },

  pickerContainer: {
    flexDirection: 'row',
    borderBottomColor: '#bbb',
    marginBottom: 10,
    borderBottomWidth: 1,
  },

  chip: {
    margin: 5,
    marginBottom: 10,
  },

  selectedChip: {
    margin: 5,
    marginBottom: 10,
    elevation: 3,
    borderColor: 'black',
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    elevation: 4,
    backgroundColor: '#aec6df',
    zIndex: 1,
    position: 'absolute',
    bottom: 10,
    right: 20,
  },

  tagContainer: {
    // minHeight: 200,
    marginHorizontal: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagPickerContainer: {
    marginTop: 10,
    marginHorizontal: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginLeft: 200,
  },
});
