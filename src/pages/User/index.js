import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Button,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './index.less';

const FormItem = Form.Item;

@Form.create()

@connect(({ users, loading }) => ({
  users,
  loading: loading.models.users,
}))
@Form.create()
class User extends PureComponent {
  state = {
    formValues: {},
  };

  columns = [
    {
      title: '真实姓名',
      dataIndex: 'realname',
      render: val => val || '暂无',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      render: val => val || '暂无',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      render: val => val === 'MALE' ? '男' : '女',
    },
    {
      title: '头像',
      dataIndex: 'headerImage',
      render: val => val ?
        <img style={{ width: '40px', height: '40px', borderRadius: '50%' }} src={val} alt="" />
        : '暂无',
    },
    {
      title: '会员卡号',
      dataIndex: 'cardNo',
      render: val => val || '暂无',
    },
    {
      title: '所在地区',
      dataIndex: 'city',
      render: val => val || '暂无',
    },
    {
      title: '手机号',
      dataIndex: 'mobileNo',
      render: val => val || '暂无',
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      render: val => val || '暂无',
    },
    {
      title: '是否订阅',
      dataIndex: 'subscribe',
      render: val => val ? '是' : '否',
    },
    {
      title: '订阅时间',
      dataIndex: 'subscribeTime',
      render: val => val ? <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span> : '暂无',
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'users/fetch',
    });
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
      type: 'users/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'users/fetch',
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
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'users/fetch',
        payload: values,
      });
    });
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="昵称">
              {getFieldDecorator('nickname')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="角色">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  {/* <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option> */}
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

  renderForm() {
    return this.renderSimpleForm();
  }

  render() {
    const {
      users: { data },
      loading,
    } = this.props;
    return (
      <PageHeaderWrapper title="用户列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <StandardTable
              loading={loading}
              data={data}
              rowKey={record => record.id}
              columns={this.columns}
              onChange={this.handleStandardTableChange}
              scroll={{ x: 1200 }}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default User;
