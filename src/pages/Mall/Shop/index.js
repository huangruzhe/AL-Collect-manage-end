import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Divider, Form, Modal, message, Row, Col, Select, Button, Card } from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import CreateForm from './Create';
import styles from './index.less';


const FormItem = Form.Item;
const { Option } = Select;

@connect(({ shop, floor, loading }) => ({
  shop,
  floor,
  loading: loading.models.shop,
}))
@Form.create()
class Shop extends PureComponent {

  state = {
    formValues: {},
    modalVisible: false,
    fileList: [],
    modalType: 'create',
    previewImage: '',
    previewVisible: false,
    currentId: '',
    shopDetail: {},
  }

  columns = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '店铺图片',
      dataIndex: 'logo',
      render: val => (
        val ? <img style={{ width: '75px' }} src={val} alt="" /> : '暂无'
      ),
    },
    {
      title: '分类',
      dataIndex: 'shopCategoryName',
    },
    {
      title: '楼层',
      dataIndex: 'floorName',
    },
    {
      title: '操作',
      render: (val, record) => (
        <Fragment>
          <a onClick={() => this.handleEdit(record)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleDelete(record)}>删除</a>
        </Fragment>
      )
    }
  ]

  componentDidMount() {
    this.getList({});
    this.getFormValue();
  }

  getFormValue = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'shop/fetchCategory',
    });
    dispatch({
      type: 'floor/fetchFloor',
    });
  }

  getList = (param) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'shop/fetch',
      payload: {
        ...param,
      },
    });
  }

  handleStandardTableChange = (pagination) => {
    const { formValues } = this.state;

    const params = {
      page: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
    };
    this.getList(params);
  };

  handleDelete = (record) => {
    const { confirm } = Modal;
    const { dispatch } = this.props;
    const { formValues } = this.state;
    confirm({
      title: `确定要删除店铺 '${record.name}' 吗?`,
      onOk: async () => {
        await dispatch({
          type: 'shop/remove',
          payload: {
            id: record.id,
          },
        });
        this.getList({
          ...formValues,
        });
      }
    })
  }

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    this.getList({});
  };

  handleSearch = e => {
    e.preventDefault();

    const { form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      this.getList(values);
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
    if (!flag) {
      this.setState({
        fileList: [],
      });
    }
  };

  handleCreate = () => {
    this.setState({
      modalType: 'create',
    }, () => {
      this.handleModalVisible(true);
    })
  }

  handleEdit = (record) => {
    this.setState({
      modalType: 'update',
      currentId: record.id,
      shopDetail: record,
      fileList: [{
        uid: '-1',
        status: 'done',
        name: record.logo,
        url: record.logo,
        response: {
          result: [record.logo],
        },
      }],
    }, () => {
      this.handleModalVisible(true);
    });
  }

  handleAdd = fields => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    dispatch({
      type: 'shop/add',
      payload: {
        ...fields
      },
      callback: () => {
        message.success('添加成功');
        this.getList({
          ...formValues,
        });
      }
    });
    this.handleModalVisible();
  };

  handleUpdate = fields => {
    const { dispatch } = this.props;
    const { currentId, formValues } = this.state;
    dispatch({
      type: 'shop/update',
      payload: {
        ...fields,
        id: currentId,
      },
      callback: () => {
        message.success('修改成功');
        this.getList({
          ...formValues,
        });
      }
    });
    this.handleModalVisible();
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator }, shop: { categoryList }, floor: { floorList }
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="店铺分类">
              {getFieldDecorator('shopCategoryId')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="">全部</Option>
                  {
                    categoryList.map(ele => (
                      <Option key={ele.id} value={ele.id}>{ele.name}</Option>
                    ))
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="店铺楼层">
              {getFieldDecorator('floorId')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="">全部</Option>
                  {
                    floorList.map(ele => (
                      <Option key={ele.id} value={ele.id}>{ele.name}</Option>
                    ))
                  }
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

  render () {
    const {
      shop: { data, categoryList }, floor: { floorList },
      loading,
    } = this.props;
    const { modalVisible, modalType,
      fileList, previewImage, previewVisible, shopDetail } = this.state;
      const parentMethods = {
        handleAdd: this.handleAdd,
        categoryList,
        floorList,
        handleModalVisible: this.handleModalVisible,
        fileList,
        modalType,
        shopDetail: modalType === 'update' ? shopDetail : {},
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
      <PageHeaderWrapper title="店铺列表">
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
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
      </PageHeaderWrapper>
    )
  }
}

export default Shop;