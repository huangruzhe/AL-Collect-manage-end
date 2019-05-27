import { message } from 'antd';
import { getFloorList, createFloor, updateFloor, deleteFloor } from '@/services/floor';

export default {
  namespace: 'floor',

  state: {
    floorList: [], // 楼层
  },

  effects: {
    // 获取楼层
    *fetchFloor({ payload }, { call, put }) {
      const response = yield call(getFloorList, payload);
      if (!response.error) {
        yield put({
          type: 'updateState',
          payload: {
            floorList: response.result,
          },
        });
      } else {
        message.error(response.message);
      }
    },
    // 创建楼层
    *floorCreate({ payload }, { call, put }) {
      const response = yield call(createFloor, payload);
      if (!response.error) {
        yield put({
          type: 'fetchFloor',
        });
      } else {
        message.error(response.message);
      }
    },
    // 编辑楼层
    *floorUpdate({ payload }, { call, put }) {
      const response = yield call(updateFloor, payload);
      if (!response.error) {
        yield put({
          type: 'fetchFloor',
        });
      } else {
        message.error(response.message);
      }
    },
    // 删除楼层
    *floorDelete({ payload }, { call, put }) {
      const response = yield call(deleteFloor, payload);
      if (!response.error) {
        yield put({
          type: 'fetchFloor',
        });
      } else {
        message.error(response.message);
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    updateState(state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
};
