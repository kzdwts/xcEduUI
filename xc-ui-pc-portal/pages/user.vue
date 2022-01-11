<template>
  <div>
    用户管理导航页面
    <nuxt-link :to="'/user/one'">one 页面</nuxt-link>
    <nuxt-link :to="'/user/102'">修改页面</nuxt-link>
    <nuxt-child/>
  </div>

</template>

<script>
export default {
  name: "user",
  layout: "test"
}
</script>

<style scoped>

</style>
