<template>
  <todo-app></todo-app>
</template>
<script>
import TodoApp from './components/todoApp/index.vue'
export default {
  name: 'App',
  components: {
    TodoApp
  },
  data () {
    return {
      todoList: [],
      todoInput: ''
    }
  },
  methods: {},
  created () {},
  mounted () {}
}
</script>
<style scoped>
</style>
