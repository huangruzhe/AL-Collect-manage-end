import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Select,
  Button,
  message,
  Modal,
  Drawer,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DropOption from '@/components/DropOption';
import CreateForm from './Create';
import UserTable from './UserTable';
import CardTable from './cardTable';

import styles from './index.less';

const FormItem = Form.Item;
const { Option } = Select;

const obj = {
  COUPON: '卡券活动',
  PROMOTION: '促销活动',
  ENROLL: '报名活动',
}

const stateObj = {
  NOTSTART: '未开始',
  START: '已开始',
  END: '已结束',
}

const statusObj = {
  UNUSED: '待使用',
  USED: '已使用',
  EXPIRED: '已过期',
}

@connect(({ activity, loading }) => ({
  activity,
  loading: loading.models.activity,
}))
@Form.create()
class Activity extends PureComponent {
  state = {
    modalVisible: false,
    formValues: {},
    fileList: [],
    modalType: 'create',
    previewImage: '',
    previewVisible: false,
    userTableVisible: false,
    currentId: '',
    activityType: '',
    marketingType: '',
    cardModalVisible: false,
  };

  columns = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '分类',
      dataIndex: 'activityType',
      render: val => obj[val],
    },
    {
      title: '活动状态',
      dataIndex: 'activityState',
      render: val => stateObj[val]
    },
    {
      title: '类型',
      dataIndex: 'marketingType',
      render: val => val === 'MARKET' ? '商场活动' : '商户活动',
    },
    {
      title: '活动地址',
      dataIndex: 'address',
      width: 120,
    },
    {
      title: '兑换次数',
      dataIndex: 'exchangeCount',
      render: val => val || '——',
    },
    {
      title: '单用户限领',
      dataIndex: 'limitUserCount',
      render: val => val || '——',
    },
    {
      title: '卡券总库存',
      dataIndex: 'totalStock',
      render: val => val || '——',
    },
    {
      title: '卡券当前库存',
      dataIndex: 'stock',
      render: val => val || '——',
    },
    {
      title: '卡券有效期',
      render: (val, record) => record.validEndDate ? `${record.validStartDate}至${record.validEndDate}` : '——',
    },
    {
      title: '开始时间',
      dataIndex: 'startDate',
    },
    {
      title: '结束时间',
      dataIndex: 'endDate',
    },
    {
      title: '操作',
      fixed: 'right',
      width: 100,
      render: (text, record) => (
        <DropOption
          onMenuClick={e => this.handleMenuClick(record, e)}
          menuOptions={[
            { key: '1', name: '编辑' },
            { key: '2', name: '删除' },
            { key: '3', name: '报名列表' },
            { key: '4', name: '卡券' }
          ]}
        />
      )
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'activity/fetch',
    });
  }

  componentWillReceiveProps(nextProps) {
    const { activity: { activityDetail } } = nextProps;
    if (activityDetail.img) {
      this.setState({
        fileList: [{
          uid: '-1',
          status: 'done',
          name: activityDetail.img,
          url: activityDetail.img,
          response: {
            result: [activityDetail.img],
          },
        }],
        marketingType: activityDetail.marketingType,
        activityType: activityDetail.activityType,
      });
    }
  }

  handleMenuClick = (record, e) => {
    if (e.key === '1') {
      this.handleGetDetail(record);
    }
    if (e.key === '2') {
      this.handleDelete(record);
    }
    if (e.key === '3') {
      this.handleCheckApply(record);
    }
    if (e.key === '4') {
      if (record.activityType !== 'COUPON') {
        message.error('所选活动不是卡券类活动!');
        return
      }
      this.setState({
        currentId: record.id,
      }, () => {
        this.getCardList();
      });
    }
  }

  handleStandardTableChange = (pagination) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const params = {
      page: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
    };

    dispatch({
      type: 'activity/fetch',
      payload: params,
    });
  };

  handleDelete = (record) => {
    const { confirm } = Modal;
    const { dispatch } = this.props;
    const { formValues } = this.state;
    confirm({
      title: `确定要删除活动 '${record.title}' 吗?`,
      onOk: async () => {
        await dispatch({
          type: 'activity/remove',
          payload: {
            id: record.id,
          },
        });
        dispatch({
          type: 'activity/fetch',
          payload: {
            ...formValues,
          },
        });
      }
    })
  }

  typeChange = (activityType) => {
    this.setState({ activityType });
  }

  marketingTypeChange = (marketingType) => {
    this.setState({ marketingType });
  }

  getCardList = () => {
    const { currentId } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'activity/fetchCardList',
      payload: {
        marketingId: currentId,
      },
    });
    this.setState({
      cardModalVisible: true,
    });
  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'activity/fetch',
      payload: {},
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'activity/fetch',
        payload: values,
      });
    });
  };

  resetState = () => {
    this.setState({
      fileList: [],
      activityType: '',
      marketingType: '',
    });
  }

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
    if (!flag) {
      this.resetState();
    }
  };

  handleCreate = () => {
    this.setState({
      modalType: 'create',
    }, () => {
      this.handleModalVisible(true);
    })
  }

  handleGetDetail = async (record) => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'activity/queryDetail',
      payload: {
        id: record.id,
      },
    });
    this.setState({
      modalType: 'update',
      currentId: record.id,
    }, () => {
      this.handleModalVisible(true);
    });
  }

  handleAdd = fields => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    dispatch({
      type: 'activity/add',
      payload: {
        ...fields
      },
      callback: () => {
        message.success('添加成功');
        this.resetState();
        dispatch({
          type: 'activity/fetch',
          payload: {
            ...formValues,
          },
        });
      }
    });
    this.handleModalVisible();
  };

  handleUpdate = fields => {
    const { dispatch } = this.props;
    const { currentId, formValues } = this.state;
    dispatch({
      type: 'activity/update',
      payload: {
        ...fields,
        id: currentId,
      },
      callback: () => {
        message.success('修改成功');
        this.resetState();
        dispatch({
          type: 'activity/fetch',
          payload: {
            ...formValues,
          },
        });
      }
    });
    this.handleModalVisible();
  };

  handleCheckApply = record => {
    const { dispatch } = this.props;
    this.setState({
      currentItem: record,
      userTableVisible: true,
    }, () => {
      dispatch({
        type: 'activity/fetchApplyList',
        payload: {
          marketingId: record.id,
        },
      })
    });
  }

  mapUserTableProps = () => {
    const { currentItem } = this.state;
    const { dispatch, activity: { userData, loading } } = this.props;
    const props = {
      data: userData,
      loading,
      currentItem,
      handleStandardTableChange: (pagination) => {
        const params = {
          page: pagination.current,
          pageSize: pagination.pageSize,
        };
        dispatch({
          type: 'activity/fetchApplyList',
          payload: {
            ...params,
            marketingId: currentItem.id,
          },
        });
      }
    };
    return props;
  }

  mapCardTableProps = () => {
    const { currentId } = this.state;
    const { dispatch, activity: { cardData }, loading } = this.props;
    const props = {
      data: cardData,
      loading,
      onChange: (pagination) => {
        const params = {
          page: pagination.current,
          pageSize: pagination.pageSize,
        };
        dispatch({
          type: 'activity/fetchApplyList',
          payload: {
            ...params,
            marketingId: currentId,
          },
        });
      },
      // 核销
      useCoupon: (record) => {
        if (record.codeStatus !== 'UNUSED') {
          message.error('只有未使用的卡券才能核销！');
          return;
        }
        const { confirm } = Modal;
        confirm({
          title: '请仔细核对卡券信息',
          content: (
            <Fragment>
              <div>券码：{record.code}</div>
              <div>领取人：{record.userNickname || '——'}</div>
              <div>卡券状态：{statusObj[record.codeStatus]}</div>
              <div>卡券有效期：{`${record.validStartDate}至${record.validEndDate}`}</div>
            </Fragment>
          ),
          onOk: async () => {
            await dispatch({
              type: 'activity/updateCoupon',
              payload: {
                code: record.code,
              },
            });
            this.getCardList();
          }
        });
      }
    };
    return props;
  }

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="活动类型">
              {getFieldDecorator('marketingType')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="MARKET">商场活动</Option>
                  <Option value="MERCHANT">商户活动</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }


  render() {
    const {
      activity: { data, activityDetail },
      loading,
    } = this.props;
    const { modalVisible, modalType, userTableVisible, cardModalVisible,
      fileList, previewImage, previewVisible, activityType, marketingType } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
      fileList,
      modalType,
      activityType,
      marketingType,
      marketingTypeChange: this.marketingTypeChange,
      typeChange: this.typeChange,
      activityDetail: modalType === 'update' ? activityDetail : {},
      previewImage,
      previewVisible,
      handleUpdate: this.handleUpdate,
      handlePreview: (file) => {
        this.setState({
          previewImage: file.url || file.thumbUrl,
          previewVisible: true,
        });
      },
      handleCancel: () => this.setState({ previewVisible: false }),
      uploadFile: (file) => this.setState({ fileList: file }),
    };
    return (
      <PageHeaderWrapper title="活动列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={this.handleCreate}>
                新建
              </Button>
            </div>
            <StandardTable
              loading={loading}
              rowKey={record => record.id}
              data={data}
              columns={this.columns}
              onChange={this.handleStandardTableChange}
              scroll={{ x: 1500 }}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
        <Drawer
          visible={userTableVisible}
          title="用户报名表"
          width="50%"
          onClose={() => this.setState({ userTableVisible: false })}
        >
          <UserTable {...this.mapUserTableProps()} />
        </Drawer>
        <Modal
          title="卡券"
          visible={cardModalVisible}
          onCancel={() => this.setState({ cardModalVisible: false })}
          footer={null}
          width="70%"
        >
          <CardTable {...this.mapCardTableProps()} />
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default Activity;
