import request from '@/utils/request';
import { stringify } from 'qs';
import { api } from '../utils/config';

const { activity } = api;

/**
 * 获取活动列表
 * @param {*} param
 */
export async function getActiviList(param) {
  return request(`${activity}?${stringify(param)}`);
}

/**
 * 创建活动
 * @param {*} param
 */
export async function createAtiviList(param) {
  return request(activity, {
    method: 'POST',
    body: {
      ...param,
    },
  });
}

/**
 * 删除活动
 * @param {*} param
 */
export async function deleteActivity(param) {
  return request(`${activity}/${param.id}`, {
    method: 'DELETE'
  });
}

/**
 * 修改活动
 */
export async function updateActivity(param) {
  return request(`${activity}/${param.id}`, {
    method: 'PUT',
    body: {
      ...param,
    },
  });
}

/**
 * 获取活动详情
 * @param {*} param
 */
export async function getDetail(param) {
  return request(`${activity}/${param.id}`);
}

/**
 * 获取申请列表
 * @param {*} param
 */
export async function getApplyList(param) {
  return request(`${activity}/user?${stringify(param)}`);
}

/**
 * 卡券列表
 * @param {*} param
 */
export async function getCardList(param) {
  return request(`${activity}/coupon/code?${stringify(param)}`);
}

/**
 * 卡券号
 * @param {*} param
 */
export async function couponState(param) {
  return request(`${activity}/verification/${param.code}`, {
    method: 'PUT',
  });
}