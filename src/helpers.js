/**
 * Validates a todo description; returns true if validation passes or false if not.
 * @param {string} name - the todo description
 * @returns {boolean} validation result
 */
export function testName (name) {
  if (!name.trim()) {
    return false;
  }
  return true;
}

/**
 * @typedef {Object} TodoItem
 * @property {string} name - the todo description
 * @property {number} [due] - milliseconds since Unix Epoch
 * @property {boolean} complete
 * @example
 * {
 *   name: 'Something I need to do',
 *   due: 1635112930151,
 *   complete: false
 * }
 */ 
 
// Some sample todo items
export const mockData = [
  {
    name: 'Create sample React project',
    due: 1635112930151,
    complete: false,
  },
  {
    name: 'Upload to GitHub',
    due: 1635112930151,
    complete: false
  },
  {
    name: 'Get some sleep',
    due: 1635112930151,
    complete: false
  }
];

/**
 * Build a todo object from a string name/description
 * @param {string} name - the todo description
 * @returns {TodoItem} a todo object
 */
export function buildTodo (name) {
  const now = new Date().getTime();
  const due = now + 3600000;
  return {
    name,
    due,
    complete: false
  };
}