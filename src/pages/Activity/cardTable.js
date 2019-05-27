import React from 'react';
import StandardTable from '@/components/StandardTable';
import styles from './index.less'

const statusObj = {
  UNUSED: '待使用',
  USED: '已使用',
  EXPIRED: '已过期',
}

const Table = ({ data, loading, useCoupon }) => {
  const columns = [{
    title: '券码',
    dataIndex: 'code'
  }, {
    title: '卡券状态',
    dataIndex: 'codeStatus',
    render: val => statusObj[val]
  }, {
    title: '领取人昵称',
    dataIndex: 'userNickname',
    render: val => val || '暂无',
  }, {
    title: '有效期',
    render: (val, record) => record.validEndDate ? `${record.validStartDate}至${record.validEndDate}` : '——',
  }, {
    title: '操作',
    render: (val, record) => (
      <a onClick={() => useCoupon(record)}>核销</a>
    )
  }]
  return (
    <div className={styles.tableList}>
      <StandardTable
        loading={loading}
        rowKey={record => record.id}
        data={data}
        columns={columns}
      />
    </div>
  )
};

export default Table