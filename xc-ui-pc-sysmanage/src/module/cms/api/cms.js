import http from './../../../base/api/public'
import querystring from 'querystring'

let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;

export const page_list = (page, size, params) => {
  // 调用接口查询
  return http.requestQuickGet(apiUrl + '/cms/page/list/' + page + '/' + size)
}




