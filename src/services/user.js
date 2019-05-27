import request from '@/utils/request';
import { stringify } from 'qs';
import { api } from '../utils/config';

const { login, userInfo, users } = api;

/**
 * 登录
 */
export async function userLogin(param) {
  return request(`${login}?${stringify(param)}`, {
    method: 'POST'
  });
}

/**
 * 获取用户信息
 */
export async function queryInfo() {
  return request(userInfo);
}

/**
 * 获取用户列表
 * @param {*} param
 */
export async function getUserList(param) {
  return request(`${users}?${stringify(param)}`)
}
