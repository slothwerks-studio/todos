import { useState } from 'react';
import { mockData } from './helpers';

function App() {
  const [todos, setTodos] = useState([]);
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
  }

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
  }

  const handleEdit = (index) => {
    const todoToEdit = {
      ...todos[index]
    };

    setForm(prevState => ({
      ...prevState,
      show: true,
      editIndex: index,
      name: todoToEdit.name
    }));
  };

  const handleName = (value) => {
    setForm(prevState => ({
      ...prevState,
      name: value
    }));
  }

  const handleCancel = () => {
    setForm(prevState => ({
      ...prevState,
      show: false,
      editIndex: null,
      name: ''
    }));
  }

  const handleFormSubmit = () => {
    const { editIndex, name } = form;

    if (editIndex !== null) {
      // We're in edit mode
      const todosUpdate = [
        ...todos
      ];
      
      const todoToUpdate = {
        ...todos[editIndex]
      };
  
      todoToUpdate.name = name;
  
      todosUpdate.splice(editIndex, 1, todoToUpdate);
  
      setTodos(todosUpdate);
    } else {
      // We're adding a new todo
      const newTodo = {
        name,
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
  }

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
  }

  // Build todo list
  const todoList = (
    todos.length > 0 ? todos.map((todo, index) => {
      return <Todo todo={todo} index={index} />
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

  todoItem: {

  },

  todoName: {

  },

  todoForm: {
    flex: 1
  },

  todoItem: {

  }

};

export default App;
