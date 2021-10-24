import React from 'react';
import PropTypes from 'prop-types';

/**
 * Handler for todo item checkbox
 * @callback handleCheckbox
 * @param {boolean} checked
 * @param {number} index
 */

/**
 * Handler for todo item edit button
 * @callback handleEdit
 * @param {number} index
 */

/**
 * @typedef TodoComponentProps
 * @type {object}
 * @property {TodoItem} todo
 * @property {number} index
 * @property {handleCheckbox} handleCheckbox
 * @property {handleEdit} handleEdit
 */

/**
 * Builds a todo list item
 * @param {TodoComponentProps} props 
 * @returns {React.FC} React functional component
 */
const Todo = (props) => {
  const { todo, index, handleCheckbox, handleEdit } = props;
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

// Add prop types for Todo component
Todo.propTypes = {
  todo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    due: PropTypes.number,
    complete: PropTypes.bool.isRequired,
  }),
  index: PropTypes.number.isRequired,
  handleCheckbox: PropTypes.func,
  handleEdit: PropTypes.func
};

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

export default Todo;
