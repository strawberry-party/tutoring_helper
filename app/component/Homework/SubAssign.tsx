import {
  AssignListType,
  AssignType,
  SubAssignType,
} from '../../types/homework';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { Component } from 'react';

interface State {
  isEditing: boolean;
  value: string;
}
const deleteSubAssign = (id) => alert(id + 'deleted');

interface SubAssignProps extends SubAssignType {
  onComplete: () => void;
  onIncomplete: () => void;
  onRemove: () => void;
  onUpdate: (text: string) => void;
}

class SubAssign extends Component<SubAssignProps, State> {
  state: State = {
    isEditing: false,
    value: this.props.text,
  };

  render() {
    const { isEditing, value } = this.state;
    const {
      text,
      isCompleted,
      id,
      onComplete,
      onIncomplete,
      onRemove,
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          {isCompleted ? (
            <TouchableOpacity onPress={onIncomplete}>
              <View style={[styles.circle, styles.uncompletedCircle]} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onComplete}>
              <View style={[styles.circle, styles.completedCircle]} />
            </TouchableOpacity>
          )}

          {isEditing ? (
            <TextInput
              style={[
                styles.text,
                styles.input,
                isCompleted ? styles.completedText : styles.uncompletedText,
              ]}
              value={value}
              multiline={true}
              onChangeText={this._controlInput}
              returnKeyType={'done'}
              onBlur={this._finishEditing}
              underlineColorAndroid={'transparent'}
            />
          ) : (
            <TouchableOpacity onPress={isCompleted ? onIncomplete : onComplete}>
              <Text
                style={[
                  styles.text,
                  isCompleted ? styles.completedText : styles.uncompletedText,
                ]}>
                {text}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {isEditing ? (
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this._finishEditing}>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>✅</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this._startEditing}>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>✏️</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPressOut={(event) => {
                event.stopPropagation;
                deleteSubAssign(id);
              }}>
              <TouchableOpacity onPressOut={onRemove}>
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText}>❌</Text>
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }

  _startEditing = (event) => {
    event.stopPropagation();
    this.setState({ isEditing: true });
  };
  _finishEditing = (event) => {
    event.stopPropagation();
    const { value } = this.state;
    const { id, onUpdate } = this.props;
    onUpdate(value);
    this.setState({ isEditing: false });
  };
  _controlInput = (text) => {
    this.setState({ value: text });
  };
}

export default SubAssign;

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 15,
    borderWidth: 3,
    marginRight: 20,
  },
  completedCircle: {
    borderColor: '#bbb',
  },
  uncompletedCircle: {
    borderColor: '#F23657',
  },
  text: {
    fontWeight: '600',
    fontSize: 15,
    marginVertical: 10,
  },
  completedText: {
    color: '#bbb',
    textDecorationLine: 'line-through',
  },
  uncompletedText: {
    color: '#353839',
  },
  column: {
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    // width: width / 2,
  },
  actions: {
    flexDirection: 'row',
  },
  actionText: { fontSize: 24 },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  input: {
    // width: width / 2,
    marginVertical: 15,
    paddingBottom: 5,
  },
});
