import React, { useState } from 'react';
import { testName, mockData } from './helpers';

function App() {
  const [todos, setTodos] = useState(mockData);
  const [form, setForm] = useState({
    show: false,
    editIndex: null,
    name: ''
  });

  // Build handlers
  const handleAddTodo = () => {
    setForm(prevState => ({
      ...prevState,
      show: true
    }));
  };

  const handleCheckbox = (checked, index) => {
    const todosUpdate = [
      ...todos
    ];
    
    const todoToUpdate = {
      ...todos[index]
    };

    todoToUpdate.complete = checked;

    todosUpdate.splice(index, 1, todoToUpdate);

    setTodos(todosUpdate);
  };

  const handleEdit = (index) => {
    const todoToEdit = {
      ...todos[index]
    };

    const { name } = todoToEdit;

    setForm(prevState => ({
      ...prevState,
      show: true,
      editIndex: index,
      name
    }));
  };

  const handleName = (value) => {
    setForm(prevState => ({
      ...prevState,
      name: value
    }));
  };

  const handleCancel = () => {
    setForm(prevState => ({
      ...prevState,
      show: false,
      editIndex: null,
      name: ''
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const { editIndex, name } = form;

    if (!testName(name)) {
      window.alert('Please enter a valid description for your todo.');
      return;
    }

    const nameTrimmed = name.trim();

    if (editIndex !== null) {
      // We're in edit mode
      const todosUpdate = [
        ...todos
      ];
      
      const todoToUpdate = {
        ...todos[editIndex]
      };
  
      todoToUpdate.name = nameTrimmed;
  
      todosUpdate.splice(editIndex, 1, todoToUpdate);
  
      setTodos(todosUpdate);
    } else {
      // We're adding a new todo
      const newTodo = {
        name: nameTrimmed,
        complete: false
      };

      const todosUpdate = [
        ...todos,
        newTodo
      ];

      setTodos(todosUpdate);
    }

    // Reset and close the form
    handleCancel();
  };

  // Build a component for a todo item
  const Todo = (props) => {
    const { todo, index } = props;
    const isComplete = todo.complete;
    return (
      <div style={styles.todoItem}>
        <input
          name="isComplete"
          type="checkbox"
          checked={isComplete}
          onChange={(event) => handleCheckbox(event.target.checked, index)}
        />
        <span style={styles.todoName}>
          { todo.name }
        </span>
        <button type="button" onClick={() => handleEdit(index)}>
          Edit
        </button>
      </div>
    );
  };

  // Build todo list
  const todoList = (
    todos.length > 0 ? todos.map((todo, index) => {
      return <Todo todo={todo} key={index} index={index} />
    }) : <p>Nothing to do!</p>
  );

  // Build form
  const formTitle = form.editIndex !== null ? 'Edit Todo' : 'New Todo'

  const todoForm = (
    <form onSubmit={handleFormSubmit} style={styles.todoForm}>
      <h2>
        { formTitle }
      </h2>
      <div style={styles.formInputs}>
        <label>
          Description:
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={(event) => handleName(event.target.value)}
          />
        </label>
      </div>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
      <button type="submit">
        Save
      </button>
    </form>
  );
  
  return (
    <div>
      <h1>My Todo List</h1>
      <button onClick={handleAddTodo}>
        Add Todo
      </button>
      <div style={styles.contentWrapper}>
        <div style={styles.todoList}>
          <h2>Stuff to do</h2>
          { todoList }
        </div>
        { form.show ? todoForm : null }
      </div>
    </div>
  );
}

const styles = {

  contentWrapper: {
    display: 'flex',
    justifyContent: 'space-between'
  },

  todoList: {
    flex: 1
  },

  todoForm: {
    flex: 1
  },

  todoItem: {
    display: 'flex',
    alignItems: 'center'
  },

  todoName: {
    marginRight: 10
  },

};

export default App;
