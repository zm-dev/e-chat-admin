import React from 'react';
import Form from './form';
import { message } from 'antd';
import teacherApi from '@/serverApis/teacher';
import FormLayout from '@/components/FormLayout';

class addForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      submitLoading: false,
    };
  }

  // 提交
  submit = async teacher => {
    this.setState({
      submitLoading: true,
    });
    await teacherApi.create(teacher);
    this.setState({
      submitLoading: false,
    });
    message.success('创建成功。');
    this.props.history.goBack();
  };

  render() {
    const { history } = this.props;
    const { submitLoading } = this.state;
    return (
      <FormLayout title="添加轮播图">
        <Form
          current={{}}
          onSubmit={res => {
            this.submit(res);
          }}
          onCancel={() => history.goBack()}
          btnLoading={submitLoading}
        />
      </FormLayout>
    );
  }
}

export default addForm;
