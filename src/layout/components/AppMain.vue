<template>
  <el-main>
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </el-main>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 60= navbar  60  */
  min-height: calc(100vh - 60px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: 60px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 60 + 34 */
    min-height: calc(100vh - 94px);
  }

  .fixed-header+.app-main {
    padding-top: 94px;
  }
}
</style>