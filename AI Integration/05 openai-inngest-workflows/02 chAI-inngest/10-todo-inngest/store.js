/**
 * In-memory data store acting as a temporary database for this application.
 * Note: Since this is stored in server memory, restarting the server will reset these arrays.
 */
export const todos = [];
export const auditlog = [];

// Auto-incrementing identifier counter for new todo items
let nextId = 1;

/**
 * Creates a new todo item, saves it to memory, and increments the ID counter.
 * @param {string} title - The title/description of the task.
 * @returns {Object} The newly created todo object.
 */
export function createTodo(title) {
  const todo = { id: nextId++, title, completed: false };
  todos.push(todo);
  return todo;
}

/**
 * Retrieves a single todo item by its unique ID.
 * @param {number} id - The ID of the todo to look up.
 * @returns {Object|undefined} The found todo object, or undefined if it doesn't exist.
 */
export function getTodo(id) {
  return todos.find((todo) => todo.id === id);
}

/**
 * Updates properties of an existing todo item using a patch object.
 * @param {number} id - The ID of the todo to modify.
 * @param {Object} patch - Fields containing updated values (title and/or completed status).
 * @returns {Object|null} The updated todo object, or null if the todo was not found.
 */
export function updateTodo(id, patch) {
  const todo = getTodo(id);
  if (!todo) return null;
  
  // Conditionally update properties if they are explicitly provided in the patch
  if (patch.title !== undefined) todo.title = patch.title;
  if (patch.completed !== undefined) todo.completed = patch.completed;
  
  return todo;
}

/**
 * Deletes a todo item from the store by its unique ID.
 * @param {number} id - The ID of the todo to remove.
 * @returns {Object|boolean} The removed todo item object if successful, or false if not found.
 */
export function deleteTodo(id) {
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) return false;
  
  // Splice removes the item at the found index and returns an array of deleted items.
  // We grab the first element ([0]) to return the actual todo item that was deleted.
  return todos.splice(index, 1)[0];
}