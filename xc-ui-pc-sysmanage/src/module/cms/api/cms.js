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
 * 新增页面
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export const page_add = (params) => {
  // 调用接口新增
  return http.requestPost(apiUrl + '/cms/page/add', params)
}

/**
 * 获取页面详情
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export const page_findById = (pageId) => {
  // 调用接口新增
  return http.requestQuickGet(apiUrl + '/cms/page/findById/' + pageId)
}

/**
 * 编辑页面信息
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export const page_edit = (pageId, params) => {
  // 调用接口更新
  return http.requestPut(apiUrl + '/cms/page/edit/' + pageId, params)
}

/**
 * 获取站点列表
 * @returns {Promise | Promise<unknown>}
 */
export const site_list = () => {
  return http.requestQuickGet(apiUrl + '/cms/site/listAll')
}

/**
 * 获取模板列表
 * @returns {Promise | Promise<unknown>}
 */
export const template_list = () => {
  return http.requestQuickGet(apiUrl + '/cms/template/listAll')
}






