import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Row, Col, Select, Button, Card, Modal } from 'antd';
import StandardTable from '@/components/StandardTable';
import styles from './ShopTable.less';


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
    selectedRows: [],
  }

  columns = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '分类',
      dataIndex: 'shopCategoryName',
    },
    {
      title: '楼层',
      dataIndex: 'floorName',
    },
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

  onSelectRow = (selectedRows) => {
    this.setState({
      selectedRows,
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

  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  }

  handleOk = () => {
    const { selectedRows } = this.state;
    const { onChange } = this.props;
    onChange(selectedRows);
    this.handleModalVisible();
  }

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
                <Select placeholder="请选择" style={{ width: '150px' }}>
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
                <Select placeholder="请选择" style={{ width: '150px' }}>
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
    const { modalVisible } = this.state;
    const { shop: { data }, loading, value } = this.props;
    return (
      <div>
        <div
          onClick={() => this.handleModalVisible(true)}
          style={{ width: '150px', height: '32px', borderRadius: '4px', lineHeight: '32px', border: '1px solid #d9d9d9', textAlign: 'center' }}
        >
          {value && value.length !== 0 && value[0].name}
        </div>
        <Modal
          visible={modalVisible}
          width="60%"
          onCancel={() => this.handleModalVisible()}
          onOk={this.handleOk}
        >
          <Card bordered={false}>
            <div className={styles.tableList}>
              {/* <div className={styles.tableListForm}>{this.renderSimpleForm()}</div> */}
              <StandardTable
                canSelect
                selectType="radio"
                selectedRowKeys={[value.id]}
                loading={loading}
                rowKey={record => record.id}
                data={data}
                columns={this.columns}
                onSelectRow={this.onSelectRow}
                onChange={this.handleStandardTableChange}
              />
            </div>
          </Card>
        </Modal>
      </div>
    )
  }
}

export default Shop;