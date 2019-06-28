import React from 'react';
import Form from './form';
import { message } from 'antd';
import teacherApi from '@/serverApis/teacher';
import FormLayout from '@/components/FormLayout';

class updateForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      submitLoading: false,
      current: {},
    };
  }

  componentDidMount() {
    this.getTeacher(this.props.match.params.id);
  }

  // 提交
  submit = async res => {
    this.setState({
      submitLoading: true,
    });
    await teacherApi.update(this.props.match.params.id, res);
    this.setState({
      submitLoading: false,
    });
    message.success('修改成功。');
    this.props.history.goBack();
  };

  // 获取单个分类
  getTeacher = id => {
    teacherApi.get(id).then(res => {
      this.setState({
        current: res.data,
      });
    });
  };

  render() {
    const { history } = this.props;
    const { submitLoading, current } = this.state;
    return (
      <FormLayout title="修改分类">
        <Form
          current={current}
          onSubmit={res => {
            this.submit(res);
          }}
          isUpdate
          onCancel={() => history.goBack()}
          btnLoading={submitLoading}
        />
      </FormLayout>
    );
  }
}

export default updateForm;
