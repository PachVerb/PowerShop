/**
 * 获取分享码
 * 
*/
import {http,Method} from '@/utils/request.js';
// import api from '@/config/api.js';

/**
 * 获取用户角色
 * @param 
 */
export function getUserRole(params) {
  return http.request({
    url: `members/sharecode/roleInfo`,
    method: Method.GET,
	needToken: true,
    params
  });
}
// 获取分享码
export function getShareCode(params) {
  return http.request({
    url: `members/sharecode/getShareCode`,
    method: Method.GET,
	needToken: true,
    params
  });
}

/**
 * 设置分享吗
 * 
*/
export function setRole(params) {
  return http.request({
    url: `members/sharecode/setShareCode`,
    method: Method.POST,
	needToken: true,
    params,
  });
}