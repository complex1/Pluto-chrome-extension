<template>
  <div class="todo-card">
    {{item.title}}
  </div>
</template>
<script>
import { Todo } from '../../api/todo'
export default {
  name: 'todoCardComponent',
  props: {
    item: {
      type: Todo,
      required: true
    }
  },
  data () {
    return {

    }
  },
  computed: {},
  watch: {},
  methods: {},
  created () {},
  mounted () {}
}
</script>
<style lang='scss' scoped>
.todo-card {
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em 1em;
  margin: 0.5em 0;
  background-color: var(--bg-color);
  color: var(--text-color);
  border-radius: 0.5em;
  box-shadow: 0 0 0.5rem rgba(var(--text-color-rgb), 0.5);
}
</style>
