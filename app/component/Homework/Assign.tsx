import * as Animatable from 'react-native-animatable';

import { AssignListType, AssignType } from '../../types/homework';
import { Button, Card, CardItem, Icon, Text, View } from 'native-base';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import React, { useState } from 'react';

import { CheckBox } from 'react-native-elements';
import { Chip } from 'react-native-paper';
import SwipeRow from './SwipeRow';

interface AssignProps extends AssignType {
  onComplete: () => void;
  onIncomplete: () => void;
  onRemove: () => void;
  onStartEdit: () => void;
  id: string;
}

function Assign({
  text,
  due,
  out,
  isCompleted,
  tag,
  onComplete,
  onIncomplete,
  onRemove,
  onStartEdit,
  id,
}: AssignProps) {
  const dueDate = due.format('MM월 DD일까지');

  const cardStyle = isCompleted ? styles.completedCard : styles.incompletedCard;

  const [buttonVisible, setVisibility] = useState(false);

  const showButton = () => {
    setVisibility(true);

    setTimeout(() => setVisibility(false), 1500);
  };

  console.log('====================================');
  console.log(`${id} ${isCompleted}`);
  console.log('====================================');

  return (
    <SwipeRow onSwipe={onRemove} swipeThreshold={-100}>
      {/* <TouchableHighlight> */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderColor: '#eee',
          borderBottomWidth: 0.5,
          padding: 5,
        }}>
        <Card style={cardStyle}>
          <Pressable onLongPress={showButton}>
            <View>
              <CardItem
                header
                bordered
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  padding: 5,
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  borderRadius: 20,
                }}>
                <Chip
                  style={[tag.style, {
                      marginRight: 10,
                    }]}
                  onPress={() => console.log('뭔가 바꾸시겠습니까')}>
                  {tag.name}
                </Chip>

                <Text style={{ fontWeight: '400', flex: 2 }}>{text}</Text>
              </CardItem>

              <CardItem
                footer
                bordered
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderRadius: 20,
                }}>
                <Text></Text>
                {/* <Chip
                  style={{
                    borderRightColor: '#bbb',
                    borderRightWidth: 1,
                    marginRight: 10,
                    backgroundColor: '#bbb',
                  }}
                  onPress={() => console.log('뭔가 바꾸시겠습니까')}>
                  수학의 정석
                </Chip> */}
                <Text> {dueDate} </Text>
              </CardItem>
              {buttonVisible && (
                <View style={styles.overlay}>
                  <Button icon style={styles.button} onPress={onStartEdit}>
                    <Icon name="pencil" />
                  </Button>

                  <Button icon style={styles.button} onPress={onRemove}>
                    <Icon name="trash" />
                  </Button>
                </View>
              )}
            </View>
          </Pressable>
        </Card>

        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: '#eee',
            padding: 5,
          }}>
          <CheckBox
            size={36}
            checked={isCompleted}
            onPress={isCompleted ? onIncomplete : onComplete}
          />

          <Button
            icon
            onPress={onStartEdit}
            style={{ borderRadius: 20, backgroundColor: '#bbb' }}>
            <Icon name="pencil" />
          </Button>
        </View>
      </View>
      {/* </TouchableHighlight> */}
    </SwipeRow>
  );
}

export default Assign;

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  incompletedCard: { backgroundColor: 'white', borderRadius: 20, flex: 5 },
  completedCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    flex: 5,
    opacity: 0.3,
  },
  cardView: {
    margin: 5,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  container: {
    width: width - 50,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  overlay: {
    flexGrow: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  button: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(0, 120, 255, 1)',
    borderRadius: 30,
    marginHorizontal: 15,
    justifyContent: 'center',
  },
});
