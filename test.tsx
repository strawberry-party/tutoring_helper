import _ from 'lodash';
import { View, Text } from 'react-native';
export class ToDoType {
  id: string;
  text: string;
  isCompleted: boolean;

  constructor(text: string, isCompleted: boolean = false) {
    this.text = text;
    this.isCompleted = isCompleted;
    this.id = _.uniqueId('todo_');
    this.print = ToDoType.prototype.print;
  }

  print(): void {
    // 적당히 property들을 console.log로 출력하는 디버깅용 함수
    console.log(`todo ${this.text} | ${this.isCompleted ? '✅' : '🟩'}`);
  }
}

const todo1: ToDoType = new ToDoType('공부하기');
const todo2: ToDoType = new ToDoType('놀기');
todo1.print();

function toBeImplemented(): void = console.log('어쩌구 저쩌구');

function ToDoList({todos}) {
  const todolist = todos.map((item: ToDoType) => 
    <ToDo key= {item.id} {...item} onComplete={toBeImplemented} onIncomplete={toBeImplemented} />)
  
  return (
    <View>
      {todolist}
    </View>
  )
}


interface ToDoProps extends ToDoType {
  onIncomplete: () => void;
  onComplete: () => void;
}

function ToDo({text, id, isCompleted, onComplete, onIncomplete, }: ToDoProps) {
  return (
    <View>
    <Text> {text} </Text>    
    </View>
  )

}