import React from 'react';
import { Form, Input, Button, Radio } from 'antd';
import ImageUploader from '@/components/ImageUploader';
import styles from './index.module.scss';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 },
  },
};

// 性别转化
function getGender(val) {
  if (val === '男') {
    return 0;
  } else if (val === '女') {
    return 1;
  } else if (val === '保密') {
    return 2;
  } else {
    return false;
  }
}

// 组别转化
function getGroup(val) {
  if (val === '朋辈辅导员') {
    return 3;
  } else if (val === '老师') {
    return 1;
  } else if (val === '校友') {
    return 2;
  } else {
    return false;
  }
}

class FormComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { getFieldDecorator, validateFields, setFieldsValue } = this.props.form;
    const { current, onSubmit, onCancel, isUpdate = false } = this.props;
    return (
      <div className={styles.form_content}>
        <Form
          onSubmit={e => {
            e.preventDefault();
            validateFields((err, values) => {
              if (!err) {
                onSubmit(values);
              }
            });
          }}
          {...formItemLayout}
        >
          <Form.Item label="头像">
            <div className="dragger">
              {getFieldDecorator('avatar_hash', {
                initialValue: current && current.avatar_hash,
                rules: [{ required: true, message: '请上传图片！' }],
                validateTrigger: 'onBlur',
              })(<ImageUploader imageUrl={current && current.avatar_url} />)}
            </div>
          </Form.Item>
          {!isUpdate && (
            <Form.Item label="账号">
              {getFieldDecorator('account', {
                rules: [{ required: true, message: '请输入账号' }],
              })(<Input placeholder="输入账号" />)}
            </Form.Item>
          )}

          <Form.Item label="名称">
            {getFieldDecorator('nick_name', {
              initialValue: current.nick_name,
              rules: [{ required: true, message: '请输入姓名' }],
            })(<Input placeholder="输入姓名" />)}
          </Form.Item>
          {!isUpdate && (
            <Form.Item label="密码">
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码' }],
              })(<Input placeholder="输入密码" />)}
            </Form.Item>
          )}

          <Form.Item label="简介">
            {getFieldDecorator('profile', {
              initialValue: current.profile,
              rules: [{ required: true, message: '请输入简介' }],
            })(<Input.TextArea autosize={{ minRows: 2, maxRows: 6 }} placeholder="输入简介" />)}
          </Form.Item>

          <Form.Item label="工作单位">
            {getFieldDecorator('company', {
              initialValue: current.company,
              rules: [{ required: true, message: '请输入工作单位' }],
            })(<Input placeholder="输入工作单位" />)}
          </Form.Item>

          <Form.Item label="性别">
            {getFieldDecorator('gender', {
              initialValue: getGender(current.gender) || 2,
              rules: [{ required: true, message: '请选择性别' }],
            })(
              <Radio.Group
                onChange={e => {
                  setFieldsValue({
                    gender: e.target.value,
                  });
                }}
              >
                <Radio.Button value={2}>保密</Radio.Button>
                <Radio.Button value={0}>男</Radio.Button>
                <Radio.Button value={1}>女</Radio.Button>
              </Radio.Group>
            )}
          </Form.Item>

          <Form.Item label="组别">
            {getFieldDecorator('group_id', {
              initialValue: getGroup(current.group) || 1,
              rules: [{ required: true, message: '请选择组别' }],
            })(
              <Radio.Group
                onChange={e => {
                  setFieldsValue({
                    groupId: e.target.value,
                  });
                }}
              >
                <Radio.Button value={1}>老师</Radio.Button>
                <Radio.Button value={2}>校友</Radio.Button>
                <Radio.Button value={3}>朋辈辅导员</Radio.Button>
              </Radio.Group>
            )}
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
              提交
            </Button>
            <Button onClick={onCancel}>取消</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(FormComponent);
