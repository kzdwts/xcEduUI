<template>
  <div>
    修改用户信息{{ id }}，页面名称：{{ name }}
  </div>
</template>

<script>
export default {
  name: "_id",
  layout: "test",
  async asyncData({store, route}) {
    console.log('async方法执行了')

    var a = await new Promise(function (resolve, reject) {
      setTimeout(function () {
        console.log("1")
        resolve(1)
      }, 2000)
    })

    var b = await new Promise(function (resolve, reject) {
      setTimeout(function () {
        console.log("2")
        resolve(2)
      }, 1000)
    })

    return {
      name: '黑马程序员'
    }
  },
  data() {
    return {
      id: '',
      name: ''
    }
  },
  mounted() {
    this.id = this.$route.params.id
    console.log(this.id)

    this.a().then(res => {
      // alert(res)
      console.log(res)
    })

    this.b().then(res => {
      // alert(res)
      console.log(res)
    })
  },
  methods: {
    getUser: function () {
      alert(0)
      this.name = '传智播客'
    },

    // a() {
    //   return new Promise(function (resolve, reject) {
    //     setTimeout(function () {
    //       resolve(1)
    //     }, 2000)
    //   })
    // },
    //
    // b() {
    //   return new Promise(function (resolve, reject) {
    //     setTimeout(function () {
    //       resolve(2)
    //     }, 1000)
    //   })
    // }
  }
}
</script>

<style scoped>

</style>
