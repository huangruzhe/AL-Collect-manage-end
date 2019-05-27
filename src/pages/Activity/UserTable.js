import React from 'react';
import {
  Card,
} from 'antd';
import moment from 'moment';
import StandardTable from '@/components/StandardTable';

import styles from './index.less';

const timeFormat = 'YYYY-MM-DD HH:mm:ss';

const TableList = ({ loading, data, currentItem, ...tableProps }) => {
  const columns = [
    {
      title: '昵称',
      dataIndex: 'userNickName',
    },
    {
      title: '联系方式',
      dataIndex: 'contractNo',
      render: val => val || '暂无',
    },
    {
      title: '申请时间',
      dataIndex: 'lastModifiedDate',
      render: val => val ? moment(val).format(timeFormat) : '暂无',
    },
  ];

  return (
    <Card bordered={false}>
      <div className={styles.tableList}>
        <StandardTable
          loading={loading}
          data={data}
          rowKey={record => record.id}
          columns={columns}
          {...tableProps}
        />
      </div>
    </Card>
  );
}

export default TableList;
