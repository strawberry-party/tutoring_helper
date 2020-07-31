import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { Button, Fab, Icon } from 'native-base';
import React, { Component } from 'react';

import FormExample from './FormExample';

export class FormWrapper extends Component {
  state = {
    modalVisible: true,
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  render() {
    const { modalVisible } = this.state;
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <FormExample />
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#2196F3', }}
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>새로운 숙제 추가하기</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <Fab
          active={this.state.modalVisible}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={() => {
            this.setModalVisible(!modalVisible);
          }}>
          <Text style={{ fontSize: 15 }}>Add</Text>
        </Fab>
      </View>
    );
  }
}

export default FormWrapper;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
    height: 350,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    backgroundColor:'white',
  },
});
