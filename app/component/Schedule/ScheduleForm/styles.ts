import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modalView: {
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
    // height: 500,
    position: 'absolute',
    alignSelf: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  tag: {
    alignContent: 'center',
  },
  memoContainer: {
    minHeight: 50,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 3,
    flex: 1,
  },
  inputText: {
    fontSize: 16,
    backgroundColor: 'transparent',
    flex: 1,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: '#eeef',
    borderRadius: 30,
    padding: 10,
    marginHorizontal: 20,
    flex: 1,
  },
  tagContainer: {
    padding: 5,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  container: {
    flexGrow: 1,
    borderColor: 'pink',
    // borderWidth: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  formContainer: {
    width: 375,
    padding: 5,
  },
  inputContainer: {
    marginBottom: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },

  inputContainerWithBorder: {
    marginBottom: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: '#bbb',
    borderBottomWidth: 0.3,
    borderTopColor: '#bbb',
    borderTopWidth: 0.3,
  },

  reminderButtonContainer: {
    flexDirection: 'column',
    marginBottom: 30,
  },

  headline: {
    fontSize: 15,
    fontWeight: '700',
    color: '#bbb',
    // flex: 1,
  },

  buttonContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginBottom: 15,
  },

  button: {
    justifyContent: 'center',
    backgroundColor: '#aec6df',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  reminderButton: {
    backgroundColor: '#aec6df',
    borderColor: 'transparent',
    width: 60,
    elevation: 0,
  },
  action: {
    marginHorizontal: 15,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
  },
  dateTextStyle: {
    color: 'black',
    fontSize: 14,
  },
  datePickerContainer: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
