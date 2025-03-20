<template>
  <div class="todo-app">
    <nothing-todo v-if="todoList.length === 0"></nothing-todo>
    <div class="todo-list">
      <todo-card v-for="item in todoList" :key="item.id" :item="item"></todo-card>
    </div>
    <add-task @add-todo="addTodo" ></add-task>
  </div>
</template>
<script>
import { Todo, TodoStorage } from "../../api/todo";
import AddTask from './addTask.vue';
import nothingTodo from './nothingTodo.vue';
import TodoCard from './todoCard.vue';
export default {
  components: { nothingTodo, AddTask, TodoCard },
  name: "TodoApp",
  data() {
    return {
      /*
       * todoList: Todo[] - List of todo items
       */
      todoList: [],
      width: 0,
    };
  },
  computed: {
    baseFontSize() {
      return Math.max(10, this.width * 0.05) + "px";
    },
  },
  watch: {},
  methods: {
    /*
     * addTodo: void - Add a new todo item
     */
    addTodo(todoInput) {
      const todo = new Todo(todoInput);
      TodoStorage.saveTodo(todo);
      this.todoList.push(todo);
    },
    /*
     * removeTodo: void - Remove a todo item
     * @param {number} id - Todo item id
     */
    removeTodo(id) {},
    /*
     * toggleTodo: void - Toggle todo item status
     * @param {number} id - Todo item id
     */
    toggleTodo(id) {},

    setWidth() {
      this.width = this.$el.offsetWidth;
    },
  },
  created() {
    TodoStorage.getTodos((res) => {
      this.todoList = res;
    });
  },
  mounted() {
    this.setWidth();
    window.addEventListener("resize", this.setWidth);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setWidth);
  },
};
</script>
<style lang='scss' scoped>
.todo-app {
  font-size: v-bind(baseFontSize);
  padding: 1em;
  background-color: var(--bg-color);
  color: var(--text-color);
}
</style>
