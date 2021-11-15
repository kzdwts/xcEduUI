import http from './../../../base/api/public'
import querystring from 'querystring'

let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;

/**
 * 获取页面列表（分页）
 * @param page
 * @param size
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export const page_list = (page, size, params) => {
  let query = querystring.stringify(params)
  // 调用接口查询
  return http.requestQuickGet(apiUrl + '/cms/page/list/' + page + '/' + size + '?' + query)
}

/**
 * 获取站点列表
 * @returns {Promise | Promise<unknown>}
 */
export const site_list = () => {
  return http.requestQuickGet(apiUrl + '/cms/site/listAll')
}




