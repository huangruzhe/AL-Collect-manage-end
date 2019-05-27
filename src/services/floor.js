import request from '@/utils/request';
import { api } from '../utils/config';

const { shop } = api;

/**
 * 获取楼层
 */
export async function getFloorList() {
  return request(`${shop}/floor`);
}

/**
 * 创建楼层
 * @param {*} param
 */
export async function createFloor(param) {
  return request(`${shop}/floor`, {
    method: 'POST',
    body: {
      ...param,
    },
  });
}

/**
 * 编辑楼层
 * @param {*} param
 */
export async function updateFloor(param) {
  return request(`${shop}/floor/${param.id}`, {
    method: 'PUT',
    body: {
      name: param.name,
    },
  });
}

/**
 * 删除楼层
 * @param {*} param
 */
export async function deleteFloor(param) {
  return request(`${shop}/floor/${param.id}`, {
    method: 'DELETE',
  });
}