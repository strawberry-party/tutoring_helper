import { Chip, TextInput } from 'react-native-paper';
import { Icon, Input } from 'native-base';
import React, { useState } from 'react';

import { TagType } from '../../types/root';
import { Text } from 'react-native';
import { selectTag } from '../../states/tagState';

interface TagProps {
  tag: TagType;
  style: any;
  id: string;
  onSelect: any;
  isSelected;
}

export function TagMock({ tag, style, id }) {
  return (
    <Chip
      style={[tag.style, style]}
      onPress={() => console.log('그래도 뭔가 일어나야 하지 않을까')}>
      {tag.name}
    </Chip>
  );
}

export function FilterChip({
  label,
  selectedStyle,
  unselectedStyle,
  id,
  onSelect,
  isSelected,
}) {
  return (
    <Chip
      style={isSelected ? [selectedStyle] : [unselectedStyle]}
      onPress={() => onSelect(id)}>
      {label}
    </Chip>
  );
}

export default function Tag({
  tag,
  style,
  id,
  onSelect,
  isSelected,
}: TagProps) {
  return (
    <Chip
      style={
        isSelected
          ? [tag.style, style, { borderColor: 'black', elevation: 3 }]
          : [tag.style, style]
      }
      onPress={() => onSelect(id)}>
      {tag.name}
    </Chip>
  );
}

export function TagForm({ style, onAddTag }) {
  const [text, setText] = useState('');

  const onSubmit = () => {
    const newTag: TagType = new TagType(text);
    onAddTag(newTag);
  };

  return (
    <Chip style={[style, { flexDirection: 'row' }]}>
      <TextInput
        value={text}
        onChange={({ nativeEvent: { text } }) => {
          setText(text);
        }}
        style={{
          fontSize: 14,
          height: 17,
        }}
        underlineColor="transparent"
        placeholder="만들기"
        onSubmitEditing={onSubmit}
      />
    </Chip>
  );
}
