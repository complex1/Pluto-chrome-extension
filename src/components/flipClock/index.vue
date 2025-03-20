<template>
  <div class="flip-clock-container">
    <div class="flip-clock-card-container">
      <card :value="hour.current" :nextValue="hour.next" :width="widthCard" :label="ampm.current" />
    </div>
    <div class="flip-clock-seprator">:</div>
    <div class="flip-clock-card-container">
      <card :value="min.current" :nextValue="min.next" :width="widthCard" />
      <div class="flip-clock-card-sec-container">
        <card :value="sec.current" :nextValue="sec.next" :width="widthCard * 0.2" />
      </div>
    </div>
  </div>
</template>
<script>
import card from './card.vue'
export default {
  components: { card },
  name: 'indexComponent',
  data () {
    return {
      min: {
        current: 0,
        next: 0
      },
      sec: {
        current: 0,
        next: 0
      },
      hour: {
        current: 0,
        next: 0
      },
      ampm: {
        current: 'AM',
        next: 'AM'
      },
      widthCard: 300,
      is24Hour: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    setValue () {
      this.min.current = this.min.next
      this.sec.current = this.sec.next
      this.hour.current = this.hour.next

      const date = new Date()
      
      const hour = date.getHours()
      const min = date.getMinutes()
      const sec = date.getSeconds()

      this.min.next = min
      this.sec.next = sec
      if (this.is24Hour) {
        this.hour.next = hour
      } else {
        this.hour.next = hour % 12
        this.ampm.next = hour >= 12 ? 'PM' : 'AM'
      }

      if (this.hour.next < 10) {
        this.hour.next = '0' + this.hour.next
      }
      if (this.min.next < 10) {
        this.min.next = '0' + this.min.next
      }
      if (this.sec.next < 10) {
        this.sec.next = '0' + this.sec.next
      }
    },
    setWidth () {
      const width = this.$el.offsetWidth
      const height = this.$el.offsetHeight
      if (width / 4 < height) {
        this.widthCard = width / 4
      } else {
        this.widthCard = height
      }
    }
  },
  created () {
    this.setValue()
    setInterval(() => {
      this.setValue()
    }, 1000)
  },
  mounted () {
    this.setWidth()
    window.addEventListener('resize', this.setWidth)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.setWidth)
  }
}
</script>
<style lang='scss' scoped>
.flip-clock-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.flip-clock-card-container {
  margin: 0 10px;
  position: relative;
}

.flip-clock-card-sec-container {
  position: absolute;
  right: 0;
  bottom: 0;
  transform: translate(50%, 50%);
}

.flip-clock-seprator {
  font-size: 100px;
}
</style>
