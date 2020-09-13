import {
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  dayChipContainer: {
    borderRadius: 20,
  },
  selectedDay: {
    backgroundColor: '#3e6ead',
    color: 'white'
  },
  unselectedDay: {
    backgroundColor: '#bbb',
    color: 'black'
  },
  dayChip: {
    // padding: 10,
    width: 40,
    height: 40,
    marginHorizontal: 4,
    borderRadius: 20,
    overflow: 'hidden',
  },

  dayChipText: {
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
    textAlignVertical: 'center'
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
  dayScheduleSelectorListContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  dayScheduleSelectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 8,
    paddingBottom: 4,

  },

  dayScheduleSelectorText:{
    marginRight: 15,
    fontSize: 16,
    fontWeight: '400'
  },
  inputContainer: {
    marginBottom: 15,
    justifyContent: 'flex-start',
    borderBottomColor: '#bbb',
    borderBottomWidth: 0.5,
  },

  headline: {
    fontSize: 15,
    fontWeight: '700',
    color: '#bbb',
    flex: 1,
  },

  buttonContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginBottom: 15,
  },

  button: {
    justifyContent: 'center',
    backgroundColor: '#aec6df',
    height: 80,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;