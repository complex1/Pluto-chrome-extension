<template>
  <div class="add-task">
    <div class="add-task-btn" :class="{
      'rotate': show
    }"  @click="show = !show; todoInput = ''" >+</div>
    <div v-if="show" class="add-task-input-container">
      <input
        type="text"
        class="add-task-input"
        placeholder="Add a new task"
        v-model="todoInput"
        @keyup.enter="addTodo"
        @keyup.esc="show = false"
        autofocus
      /> 
    </div>
  </div>
</template>
<script>
export default {
  name: "addTaskComponent",
  data() {
    return {
      todoInput: "",
      show: false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    addTodo() {
      this.$emit("add-todo", this.todoInput);
      this.todoInput = "";
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang='scss' scoped>
.add-task {
  position: relative;

  .add-task-btn {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: -2.6em;
    right: -1em;
    width: 1.5em;
    height: 1.5em;
    background-color: var(--bg-color);
    color: var(--accent-color);
    font-size: 0.5em;
    line-height: 1.5em;
    text-align: center;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 0.5rem rgba(var(--accent-color-rgb), 0.7);
    transition: all 1s;
    &:hover {
      background-color: var(--accent-color);
      box-shadow: 0 0 1rem rgba(var(--accent-color-rgb), 0.5);
      color: var(--text-color);
    }
    &:active {
      box-shadow: 0 0 0.5rem rgba(var(--accent-color-rgb), 0.5) inset;
    }
    &.rotate {
      transform: rotate(45deg);
    }
  }

  .add-task-input-container {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  input {
    color: white;
    border: 2px solid var(--accent-color);
    border-radius: 10px;
    padding: 10px 25px;
    background: transparent;
    width: 100%;
  }

  input:focus {
    box-shadow: 2px 2px 15px var(--accent-color), -2px -2px 15px var(--accent-color);
    border: 2px solid var(--accent-color);
    outline: none;
    animation: run 1s infinite;
  }

  @keyframes run {
    0% {
      box-shadow: 2px 0 10px var(--accent-color);
    }
    25% {
      box-shadow: 0px 2px 10px var(--accent-color);
    }
    50% {
      box-shadow: -2px 0 10px var(--accent-color);
    }
    75% {
      box-shadow: 0px -2px 10px var(--accent-color);
    }
    100% {
      box-shadow: 2px 0 10px var(--accent-color);
    }
  }
}
</style>
