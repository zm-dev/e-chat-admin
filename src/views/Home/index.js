import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import TabBar from '@/components/TabBar';
import HeaderNav from '@/components/HeaderNav';
import { Layout } from 'antd';

import styles from './index.module.scss';

const { Sider, Content } = Layout;

export default class Home extends React.PureComponent {
  render() {
    return (
      <Layout style={{ minHeight: '100%' }}>
        <Sider
          trigger={null}
          collapsible
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
          <div className={styles.logo}>
            <img src={require('@/assets/images/logo.png')} alt="" />
            <span>E-Chat</span>
          </div>
          <TabBar />
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Content>
            <HeaderNav />
            <Switch>
              {/* 聊天列表 */}
              <Route path="/chat/:id" component={require('../Chat').default} />
              {/* 教师列表 */}
              <Route path="/teacher/add" component={require('../Teacher/add').default} />
              <Route path="/teacher" component={require('../Teacher').default} />
              {/* <Route path="/" component={require('../Teacher').default} /> */}
              <Redirect to="/teacher" />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
