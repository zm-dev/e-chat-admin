import React from 'react';
import styles from './index.module.css';
import commonApi from '@/serverApis/common';
import { Form, Input, Button, Icon, message } from 'antd';

class Login extends React.PureComponent {
  state = {
    loading: false,
  };
  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { loading } = this.state;
    return (
      <div className={styles.login_wrapper}>
        <header>
          {/* <img
            className={styles.logo}
            src={require('../../assets/logo_text.png')}
            alt="logo"
          /> */}
        </header>
        <main>
          <h1 className={styles.title}>E-Chat后台管理系统</h1>
          <Form onSubmit={e => this.onSubmit(e)}>
            <Form.Item>
              {getFieldDecorator('account', {
                rules: [{ required: true, message: '用户名' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="请输入用户名"
                  size="large"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码' }],
              })(
                <Input.Password
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="请输入密码"
                  size="large"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </main>
        {/* <Footer /> */}
      </div>
    );
  }
  onSubmit(e) {
    const { history } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      this.setState({
        loading: true,
      });
      if (!err) {
        console.log(values);
        commonApi.signIn(values).then(
          () => {
            this.setState({
              loading: false,
            });
            history.push('/home');
            message.success('登陆成功。');
          },
          () => {
            this.setState({
              loading: false,
            });
          }
        );
      }
    });
  }
}

export default Form.create()(Login);
