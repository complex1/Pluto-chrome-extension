/**
 * @typedef {Object} Todo
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {
 *  "completed" | "active"
 * } status
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {string} preority
 * @property {boolean} completed
 */

import IndexedDB from "./indexDB";

const uuid = () => {
  return Math.random().toString(36).substr(2, 9);
}

export class Todo {
  id;
  title;
  description;
  status;
  createdAt;
  updatedAt;
  preority;
  constructor(
    title,
    description,
    status,
    preority
  ) {
    this.id = uuid();
    this.title = title;
    this.description = description || '';
    this.status = status || 'active';
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
    this.preority = preority || 1;
  }
}

(
  async () => {
    window.todoDB = new  IndexedDB('TodoDB', 'todos');
    await todoDB.init();
  }
)();

export class TodoStorage {
  db = window.todoDB;
  static async saveTodo(todo) {
    await this.db.put(todo);
  }

  static async getTodos(callback) {
    const todos = await this.db.getAll();
    callback(todos);
  }

  static async updateTodo(updatedTodo) {
    await this.db.put(updatedTodo);
  }

  static async deleteTodo(todoId) {
    await this.db.delete(todoId);
  }
}