import React from 'react';
import {
  Form,
  Input,
  Modal,
  Select,
  Upload,
  Icon,
  message,
  InputNumber,
} from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './quill.less';
 

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

const { Option } = Select;
const FormItem = Form.Item;

 const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible, fileList, modalType,
    uploadFile, previewImage, previewVisible, handleCancel, shopDetail, floorList, categoryList,
    handlePreview, handleUpdate } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      if (!fieldsValue.logo[0] || !fieldsValue.logo[0].response || !fieldsValue.logo[0].response.result[0]) {
        return;
      }
      form.resetFields();
      const param = {
        ...fieldsValue,
        logo: fieldsValue.logo[0].response.result[0]
      }
      if (modalType === 'create') {
        handleAdd(param);
      }
      if (modalType === 'update') {
        handleUpdate(param);
      }
    });
  };

  const cancelHandle = () => {
    form.resetFields();
    handleModalVisible();
  }

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
      className={styles.modal}
      destroyOnClose
      title={modalType === 'create' ? '新建店铺' :  '编辑店铺'}
      visible={modalVisible}
      onOk={okHandle}
      maskClosable={false}
      onCancel={cancelHandle}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="店铺名称">
        {form.getFieldDecorator('name', {
          initialValue: shopDetail.name || '',
          rules: [{ required: true, message: '请输入店铺名称！' }],
        })(<Input placeholder="请输入" style={{ width: '240px' }} />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="店铺号">
        {form.getFieldDecorator('number', {
          initialValue: shopDetail.number || '',
          rules: [{ required: true, message: '请输入店铺门牌号！' }],
        })(<Input placeholder="请输入" style={{ width: '240px' }} />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="店铺分类">
        {form.getFieldDecorator('shopCategoryId', {
          initialValue: shopDetail.shopCategoryId || null,
          rules: [{ required: true, message: '请选择店铺分类！' }],
        })(
          <Select placeholder="请选择" style={{ width: '240px' }}>
            {
              categoryList.map(ele => (
                <Option value={ele.id} key={ele.id}>{ele.name}</Option>
              ))
            }
          </Select>
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="店铺楼层">
        {form.getFieldDecorator('floorId', {
          initialValue: shopDetail.floorId || '',
          rules: [{ required: true, message: '请选择店铺楼层！' }],
        })(
          <Select placeholder="请选择" style={{ width: '240px' }}>
            {
              floorList.map(ele => (
                <Option value={ele.id} key={ele.id}>{ele.name}</Option>
              ))
            }
          </Select>
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="店铺图片">
        {form.getFieldDecorator('logo', {
          initialValue: fileList,
          valuePropName: 'fileList',
          getValueFromEvent: normFile,
          rules: [{ required: true, message: '请上传店铺图片' }],
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
          <img alt="店铺照片" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        <span style={{ color: 'red' }}>图片尺寸:750X375px</span>
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="联系方式">
        {form.getFieldDecorator('phone', {
          initialValue: shopDetail.phone || '',
          rules: [{ required: false, message: '请输入联系方式！' }],
        })(<InputNumber placeholder="请输入" style={{ width: '240px' }} />)}
      </FormItem>
      <FormItem className={styles.richText} labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="店铺描述">
        {form.getFieldDecorator('content', {
          initialValue: shopDetail.content || '',
          rules: [{ required: true, message: '请输入店铺描述！' }],
        })(
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
          />
        )}
      </FormItem>
    </Modal>
  );
});


export default CreateForm;
