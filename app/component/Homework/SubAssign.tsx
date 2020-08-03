import {
  AssignListType,
  AssignType,
  SubAssignType,
} from '../../types/homework';
import { CheckBox, ListItem } from 'native-base';
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
  incompleteSubAssign: (id: string) => void;
  completeSubAssign: (id: string) => void;
  updateSubAssign: (id: string, newValue: string) => void;

}

class SubAssign extends Component<SubAssignProps, State> {
  state: State = {
    isEditing: false,
    value: this.props.text,
  };

  render() {
    const { isEditing, value } = this.state;
    const { text, isCompleted, id } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this._toggleComplete}>
            <View
              style={[
                styles.circle,
                isCompleted ? styles.completedCircle : styles.uncompletedCircle,
              ]}
            />
          </TouchableOpacity>
          {isEditing ? (
            <TextInput
              style={[
                styles.text,
                styles.input,
                isCompleted ? styles.completedText : styles.uncompletedText,
              ]}
              value={value}
              multiline={true}
              onChangeText={this._controllInput}
              returnKeyType={'done'}
              onBlur={this._finishEditing}
              underlineColorAndroid={'transparent'}
            />
          ) : (
            <Text
              style={[
                styles.text,
                isCompleted ? styles.completedText : styles.uncompletedText,
              ]}>
              {text}
            </Text>
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
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>❌</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
  _toggleComplete = (event) => {
    event.stopPropagation();
    const { isCompleted, incompleteSubAssign, completeSubAssign, id } = this.props;
    if (isCompleted) {
      incompleteSubAssign(id);
    } else {
      completeSubAssign(id);
    }
  };
  _startEditing = (event) => {
    event.stopPropagation();
    this.setState({ isEditing: true });
  };
  _finishEditing = (event) => {
    event.stopPropagation();
    const { value } = this.state;
    const { id, updateSubAssign } = this.props;
    updateSubAssign(id, value);
    this.setState({ isEditing: false });
  };
  _controllInput = (text) => {
    this.setState({ value: text });
  };
}

export default SubAssign;

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  circle: {
    width: 20,
    height: 20,
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
    width: width / 2,
  },
  actions: {
    flexDirection: 'row',
  },
  actionText: {},
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  input: {
    width: width / 2,
    marginVertical: 15,
    paddingBottom: 5,
  },
});
