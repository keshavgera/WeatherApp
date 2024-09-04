import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react'
import apiclient from '../Api/apiclient';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoListCRUD = () => {
 
  const [todos, setTodos] = useState<Todo[]>([{id:1, text:"Ram Ram ji",completed:false},{id:2, text:"SitaRam ji",completed:false}]);
  const [inputText, setInputText] = useState<string>('');

  const addTodo = () => {
    if (inputText.trim() === '') {
      Alert.alert('Validation', 'Please enter a todo item.');
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      text: inputText.trim(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputText('');
  };

  const toggleTodoCompletion = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const onRenderItem = ({ item }: { item: Todo }) => (
    <View style={styles.todoItem}>
      <TouchableOpacity onPress={() => toggleTodoCompletion(item.id)}>
        <Text style={[styles.todoText, item.completed && styles.completedTodo]}>
          {item.text}
        </Text>
      </TouchableOpacity>
      <Button title="Delete" color="#ff5c5c" onPress={() => deleteTodo(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new todo"
          value={inputText}
          onChangeText={setInputText}
        />
        <View style={styles.addView}>

        <Button title="Add" onPress={addTodo} />
        </View>
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={onRenderItem}
        contentContainerStyle={styles.todoList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  todoList: {
    flexGrow: 1,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  addView: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  todoText: {
    fontSize: 18,
  },
  completedTodo: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
});


export default TodoListCRUD
