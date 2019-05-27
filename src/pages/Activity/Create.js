import React from 'react';
import {
  Form,
  Input,
  Modal,
  Select,
  DatePicker,
  Upload,
  Icon,
  message,
  InputNumber,
} from 'antd';
import moment from 'moment';
import ReactQuill from 'react-quill';
import ShopTable from './ShopTable';
import 'react-quill/dist/quill.snow.css';
import styles from './quill.less';

const { Option } = Select;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

const modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    [{ 'color': [] }, { 'background': [] }],  
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
};
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video',
  'color', 'background'
];

 const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible, fileList, modalType,
    uploadFile, previewImage, previewVisible, handleCancel, activityDetail,
    handlePreview, handleUpdate, typeChange, activityType, marketingTypeChange, marketingType } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      if (!fieldsValue.img[0] || !fieldsValue.img[0].response || !fieldsValue.img[0].response.result[0]) {
        return;
      }
      form.resetFields();
      const param = {
        ...fieldsValue,
        startDate: moment(fieldsValue.date[0]).format(dateFormat),
        endDate: moment(fieldsValue.date[1]).format(dateFormat),
        img: fieldsValue.img[0].response.result[0]
      }
      if (activityType === 'COUPON') {
        param.validStartDate = moment(fieldsValue.validDate[0]).format(dateFormat);
        param.validEndDate = moment(fieldsValue.validDate[1]).format(dateFormat);
      }
      if (marketingType === 'MERCHANT') {
        // to do 后端需要返回活动的商户
        if (modalType === 'create') {
          param.shopId = fieldsValue.shopId[0].id;
        } else {
          param.shopId = activityDetail.shopId;
        }
      }
      if (modalType === 'create') {
        handleAdd(param);
      }
      if (modalType === 'update') {
        handleUpdate(param);
      }
    });
  };
  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">上传</div>
    </div>
  );

  const normFile = (e) => {
    const { status } = e.file;
    if (status === 'done') {
      message.success(`${e.file.name} 上传成功.`);
    }
    uploadFile(e.fileList);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  return (
    <Modal
      width="70%"
      destroyOnClose
      title={modalType === 'create' ? '新建活动' :  '编辑活动'}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
      className={styles.modal}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="活动分类">
        {form.getFieldDecorator('activityType', {
          initialValue: activityDetail.activityType || null,
          rules: [{ required: true, message: '请选择活动分类！' }],
        })(
          <Select disabled={modalType === 'update'} onChange={typeChange} placeholder="请选择" style={{ width: '240px' }}>
            <Option value="PROMOTION">促销活动</Option>
            <Option value="ENROLL">报名活动</Option>
            <Option value="COUPON">卡券活动</Option>
          </Select>
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="活动状态">
        {form.getFieldDecorator('activityState', {
          initialValue: activityDetail.activityState || '',
          rules: [{ required: true, message: '请选择活动状态！' }],
        })(
          <Select placeholder="请选择" style={{ width: '240px' }}>
            <Option value="NOTSTART">未开始</Option>
            <Option value="START">已开始</Option>
            <Option value="END">已结束</Option>
          </Select>
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="活动标题">
        {form.getFieldDecorator('title', {
          initialValue: activityDetail.title || '',
          rules: [{ required: true, message: '请输入活动标题！' }],
        })(<Input placeholder="请输入" style={{ width: '240px' }} />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="活动地址">
        {form.getFieldDecorator('address', {
          initialValue: activityDetail.address || '',
          rules: [{ required: true, message: '请输入活动地址！' }],
        })(<Input placeholder="请输入" style={{ width: '240px' }} />)}
      </FormItem>
      <FormItem className={styles.richText} labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="活动内容">
        {form.getFieldDecorator('content', {
          initialValue: activityDetail.content || '',
          rules: [{ required: true, message: '请输入活动内容！' }],
        })(
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
          />
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="活动时间">
        {form.getFieldDecorator('date', {
          initialValue: activityDetail.startDate ?
            [moment(activityDetail.startDate), moment(activityDetail.endDate)] :
            [moment(new Date()), moment(new Date())],
          rules: [{ required: true, message: '请选择活动时间！' }],
        })(<RangePicker />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="活动图片">
        {form.getFieldDecorator('img', {
          initialValue: fileList,
          valuePropName: 'fileList',
          getValueFromEvent: normFile,
          rules: [{ required: true, message: '请上传活动图片' }],
        })(
          <Upload
            name="multipartFileList"
            multiple={false}
            headers={{ Authorization: `Bearer ${localStorage.jwt}` }}
            listType="picture-card"
            action="https://788.zz9517.com/api/fastdfs"
            accept="image/*"
            onPreview={handlePreview}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        )}
        <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="活动类型">
        {form.getFieldDecorator('marketingType', {
          initialValue: activityDetail.marketingType || '',
          rules: [{ required: true, message: '请选择活动类型！' }],
        })(
          <Select disabled={modalType === 'update'} onChange={marketingTypeChange} placeholder="请选择" style={{ width: '240px' }}>
            <Option disabled={activityType === 'COUPON'} value="MARKET">商场活动</Option>
            <Option value="MERCHANT">商户活动</Option>
          </Select>
        )}
      </FormItem>
      {
        marketingType === 'MERCHANT' && modalType === 'create' &&
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="活动商户">
          {form.getFieldDecorator('shopId', {
            initialValue: activityDetail.shopId || '',
            rules: [{ required: true, message: '请选择活动商户！' }],
          })(<ShopTable />)}
        </FormItem>
      }
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="顺序">
        {form.getFieldDecorator('position', {
          initialValue: activityDetail.position || '',
          rules: [{ required: true, message: '请输入活动顺序！' }],
        })(<InputNumber placeholder="请输入" style={{ width: '240px' }} />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
        {form.getFieldDecorator('memo', {
          initialValue: activityDetail.memo || '',
          rules: [{ required: true, message: "请输入活动描述！" }],
        })(<Input.TextArea placeholder="请输入" style={{ width: '240px' }} />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="外部链接">
        {form.getFieldDecorator('link', {
          initialValue: activityDetail.link || '',
          rules: [{ required: false }],
        })(<Input placeholder="请输入" style={{ width: '240px' }} />)}
      </FormItem>
      {
        activityType === 'COUPON' &&
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="单账号限领数量">
          {form.getFieldDecorator('limitUserCount', {
            initialValue: activityDetail.limitUserCount || '',
            rules: [{ required: true, message: '请输入单账号限领数量！' }],
          })(<InputNumber placeholder="请输入" style={{ width: '240px' }} />)}
        </FormItem>
      }
      {
        activityType === 'COUPON' &&
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="所需积分">
          {form.getFieldDecorator('point', {
            initialValue: activityDetail.point || '',
            rules: [{ required: true, message: '请输入所需积分！' }],
          })(<InputNumber placeholder="请输入" style={{ width: '240px' }} />)}
        </FormItem>
      }
      {
        activityType === 'COUPON' &&
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="总库存">
          {form.getFieldDecorator('totalStock', {
            initialValue: activityDetail.point || '',
            rules: [{ required: true, message: '请输入总库存！' }],
          })(<InputNumber placeholder="请输入" style={{ width: '240px' }} />)}
        </FormItem>
      }
      {
        activityType === 'COUPON' &&
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="卡券有效期">
          {form.getFieldDecorator('validDate', {
            initialValue: activityDetail.validEndDate ?
              [moment(activityDetail.validStartDate), moment(activityDetail.validEndDate)] :
              [moment(new Date()), moment(new Date())],
            rules: [{ required: true, message: '请选择卡券有效期！' }],
          })(<RangePicker />)}
        </FormItem>
      }
    </Modal>
  );
});


export default CreateForm;
