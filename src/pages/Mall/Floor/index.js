import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Divider, Card, Button, Drawer, Input, message, Modal } from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './index.less';

const { confirm } = Modal;

@connect(({ floor, loading }) => ({
  floor,
  loading: loading.models.floor,
}))
class Floor extends PureComponent {
  state = {
    inputValue: '',
    drawerVisible: false,
    modalType: '',
    currentId: '',
  }

  columns = [
    {
      title: '楼层名称',
      dataIndex: 'name',
    },
    {
      title: '操作',
      render: (val, record) => (
        <div>
          <a onClick={() => this.handleEdit(record)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleDelete(record)}>删除</a>
        </div>
      )
    }
  ]

  componentDidMount() {
    this.getList();
  }

  getList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'floor/fetchFloor',
    });
  }

  handleEdit = ({ id, name }) => {
    this.setState({
      currentId: id,
      inputValue: name,
      modalType: 'edit',
    }, () => {
      this.setState({
        drawerVisible: true,
      });
    });
  }

  handleDelete = ({ id, name }) => {
    const { dispatch } = this.props;
    confirm({
      title: `确定要删除楼层 '${name}'吗?`,
      onOk: async () => {
        await dispatch({
          type: 'floor/floorDelete',
          payload: { id },
        });
      },
    });
  }

  handleCreate = () => {
    this.setState({
      modalType: 'create',
    }, () => {
      this.setState({
        drawerVisible: true,
      });
    });
  }

  handleClose = () => {
    this.setState({
      drawerVisible: false,
      inputValue: '',
    });
  }

  handleChange = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  }

  handleOk = async () => {
    const { dispatch } = this.props;
    const { modalType, inputValue, currentId } = this.state;
    if (!inputValue) {
      message.error('请输入楼层名称');
      return false;
    }
    if (modalType === 'create') {
      await dispatch({
        type: 'floor/floorCreate',
        payload: {
          name: inputValue,
        },
      });
      message.success('创建成功');
    }
    if (modalType === 'edit') {
      await dispatch({
        type: 'floor/floorUpdate',
        payload: {
          name: inputValue,
          id: currentId,
        },
      });
      message.success('修改成功');
    }
    this.handleClose();
    return undefined;
  }

  render () {
    const { floor: { floorList }, loading } = this.props;
    const { drawerVisible, modalType, inputValue } = this.state;
    return (
      <PageHeaderWrapper title="楼层">
        <Card bordered={false}>
          <div className={styles.tableListOperator}>
            <Button icon="plus" type="primary" onClick={this.handleCreate}>
              新建
            </Button>
          </div>
          <div className={styles.tableList}>
            <StandardTable
              loading={loading}
              data={{ list: floorList }}
              rowKey={record => record.id}
              columns={this.columns}
            />
          </div>
        </Card>
        <Drawer
          visible={drawerVisible}
          title={modalType === 'create' ? '添加楼层' : '修改楼层'}
          onClose={this.handleClose}
        >
          <div>
            <span style={{ display: 'block', lineHeight: '35px' }}>楼层名称：</span>
            <Input onChange={this.handleChange} value={inputValue} type="text" placeholder="请输入楼层名称" />
          </div>
          <div
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
            <Button onClick={this.handleOk} type="primary">确定</Button>
            <Button style={{ marginLeft: '8px' }} onClick={this.handleClose}>取消</Button>
          </div>
        </Drawer>
      </PageHeaderWrapper>
    )
  }
}

export default Floor;