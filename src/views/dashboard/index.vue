<template>
  <div class="dashboard-container text-center">
    <img style="border-radius: 50%;" src="https://i2.hoopchina.com.cn/hupuapp/bbs/106159971571333/thread_106159971571333_20190321190052_s_287064_w_320_h_320_90605.gif" alt="cxk">
    <h2>欢迎回来 ~</h2>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.text-center{
  text-align: center
}
.flex-center{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
