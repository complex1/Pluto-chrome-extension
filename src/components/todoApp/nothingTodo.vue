<template>
  <div class="nothing-todo">
    <img src="../../assets/nothingtodo.png" alt="">
  </div>
</template>
<script>
export default {
  name: 'nothingTodoComponent',
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  created () {},
  mounted () {}
}
</script>
<style lang='scss' scoped>
.nothing-todo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.nothing-todo img {
  width: 100%;
  max-width: 300px;
  filter: drop-shadow(0 0 0.5rem rgba(255, 255, 0, 0.5));
}
.nothing-to-do {
  font-size: 1em;
  font-weight: bold;
  margin-top: 0.25em;
}
</style>
