import React, { useState } from 'react';

import { Chip } from 'react-native-paper';
import { TagType } from '../types/root';

interface TagProps {
  tag: TagType;
  style: any;
  id: string;
}

export default function Tag({ tag, style, id }: TagProps) {
  
  return (
    <Chip
      style={[tag.style, style]}
      onPress={() => console.log(`${id} 가 눌림`)}>
      {tag.name}
    </Chip>
  );
}

export function TagForm({ tag, style }) {
  return (
    <Chip
      style={[tag.style, style]}
      onPress={() => console.log('뭔가 바꾸시겠습니까')}>
      {tag.name}
    </Chip>
  );
}
