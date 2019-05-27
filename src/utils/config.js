export const BASE_URL = process.env.ENV_TYPE === 'test' ?
  'http://788test.zz9517.com' : 'https://788.zz9517.com/api';

export const api = {
  login: `${BASE_URL}/user/login`, // 登录
  userInfo: `${BASE_URL}/management/user/userinfo`, // 用户角色
  users: `${BASE_URL}/management/user`, // 用户列表
  activity: `${BASE_URL}/management/marketing`, // 活动
  shop: `${BASE_URL}/management/shop`, // 商户
}
