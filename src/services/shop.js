import request from '@/utils/request';
import { stringify } from 'qs';
import { api } from '../utils/config';

const { shop } = api;

/**
 * 获取店铺列表
 * @param {*} param
 */
export async function getShopList(param) {
  return request(`${shop}?${stringify(param)}`);
}

/**
 * 获取店铺分类
 */
export async function getCategoryList() {
  return request(`${shop}/category`);
}

/**
 * 创建店铺分类
 * @param {*} param
 */
export async function createCateGory(param) {
  return request(`${shop}/category`, {
    method: 'POST',
    body: {
      ...param,
    },
  });
}

/**
 * 编辑店铺分类
 * @param {*} param
 */
export async function updateCateGory(param) {
  return request(`${shop}/category/${param.id}`, {
    method: 'PUT',
    body: {
      name: param.name,
    },
  });
}

/**
 * 删除分类
 * @param {*} param
 */
export async function deleteCategory(param) {
  return request(`${shop}/category/${param.id}`, {
    method: 'DELETE',
  });
}

/**
 * 创建店铺
 * @param {*} param
 */
export async function createShop(param) {
  return request(shop, {
    method: 'POST',
    body: {
      ...param,
    },
  });
}

/**
 * 删除店铺
 * @param {*} param
 */
export async function deleteShop(param) {
  return request(`${shop}/${param.id}`, {
    method: 'DELETE'
  });
}

/**
 * 修改店铺
 */
export async function updateShop(param) {
  return request(`${shop}/${param.id}`, {
    method: 'PUT',
    body: {
      ...param,
    },
  });
}