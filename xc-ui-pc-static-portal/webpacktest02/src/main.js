
var {add} = require("./model01");
var Vue = require("./vue.min");

var VM = new Vue({
    el: '#app',
    data: {
        name: '黑马程序员',
        num1: 1,
        num2: 1,
        result: 0,
        url: 'http://www.itcast.cn'
    },
    methods: {
        change: function () {
            this.result = add(Number.parseInt(this.num1) , Number.parseInt(this.num2));
            // alert('计算成功')
        }
    }
});