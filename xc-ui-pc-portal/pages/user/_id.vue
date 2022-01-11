<template>
  <div>
    修改用户信息{{ id }}
  </div>
</template>

<script>
export default {
  name: "_id",
  layout: "test",
  data() {
    return {
      id: ''
    }
  },
  mounted() {
    this.id = this.$route.params.id
    console.log(this.id)
  }
}
</script>

<style scoped>

</style>
