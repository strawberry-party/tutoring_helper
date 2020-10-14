import * as dayjs from 'dayjs';

import { Button, Chip } from 'react-native-paper';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

import { FilterChip } from '../common/Tag';
import MyDatePicker from '../common/MyDatePicker';
import { ScrollView } from 'react-native-gesture-handler';

interface ActiveFilter {
  type: 'some' | 'all' | 'none';
  students: string[];
  tags: string[];
  durationStart: dayjs.Dayjs;
  durationEnd: dayjs.Dayjs;
}

interface FilterModalProps {
  modalVisible: boolean;
  hideModal: () => void;
  setActiveFilter;
  activeFilter: ActiveFilter;
  data;
}

export default function FilterModal({
  modalVisible,
  hideModal,
  setActiveFilter,
  activeFilter,
  data,
}: FilterModalProps) {
  const { tags, students, duration } = data;

  const handleSubmit = () => {
    setActiveFilter({
      type: selectedFilterType,
      students: selectedStudents,
      tags: selectedTags,
      durationStart,
      durationEnd,
    });
    hideModal();
  };

  const [selectedTags, setTags] = useState(activeFilter.tags);
  const [selectedStudents, setStudents] = useState(activeFilter.students);
  const [durationStart, setStart] = useState(activeFilter.durationStart);
  const [durationEnd, setEnd] = useState(activeFilter.durationEnd);

  const [selectedFilterType, toggleFilterType] = useState(activeFilter.type);

  const onSelectFilterOption = (value: string) => {
    toggleFilterType(value as 'all' | 'none' | 'some');
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
                  selectedFilterType === 'all'
                    ? styles.selectedChip
                    : styles.chip
                }
                onPress={() => onSelectFilterOption('all')}>
                <Text> 전체 선택 </Text>
              </Chip>
            </View>

            <FilterOption
              label={'태그'}
              data={tags}
              selectedChips={selectedTags}
              setSelectedChips={setTags}
            />

            <FilterOption
              label={'학생'}
              data={students}
              selectedChips={selectedStudents}
              setSelectedChips={setStudents}
            />

            <Text> 기간 </Text>
            <View style={styles.durationContainer}>
              <MyDatePicker
                onConfirm={(date: Date) => setStart(dayjs(date))}
                day={durationStart}
                style={{}}
              />
              <Text> 부터 </Text>
              <MyDatePicker
                onConfirm={(date: Date) => setEnd(dayjs(date))}
                day={durationEnd}
                style={{}}
              />
              <Text> 까지 </Text>
            </View>

            <View style={styles.buttonContainer}>
              <Button onPress={() => hideModal()}> 취소 </Button>
              <Button onPress={handleSubmit}> 저장 </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export function FilterOption({ label, data, selectedChips, setSelectedChips }) {
  const chips = Array.from(data.keys()).map((id: string) => {
    return (
      <FilterChip
        label={data.get(id)}
        unselectedStyle={styles.chip}
        selectedStyle={styles.selectedChip}
        id={id}
        key={id}
        isSelected={selectedChips.includes(id)}
        onSelect={(id: string) => {
          if (selectedChips.includes(id))
            setSelectedChips(selectedChips.filter((item) => item !== id));
          else setSelectedChips([...selectedChips, id]);
        }}
      />
    );
  });

  return (
    <View style={styles.filterOptionContainer}>
      <Text> {label} </Text>
      <ScrollView>
        <View>
          <View style={styles.tagPickerContainer}>
            <Chip
              style={styles.chip}
              onPress={() => setSelectedChips(Array.from(data.keys()))}>
              <Text> 모두 선택 </Text>
            </Chip>
            <Chip style={styles.chip} onPress={() => setSelectedChips([])}>
              <Text> 모두 해제 </Text>
            </Chip>
          </View>

          <View style={styles.tagContainer}>{chips}</View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  durationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterOptionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 150,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    marginBottom: 15,
  },
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
    // maxHeight: 300,
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
  },
});
