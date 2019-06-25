import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import history from '@/common/history';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'normalize.css';
import './index.css';

ReactDOM.render(
  <LocaleProvider locale={zhCN}>
    <Router history={history}>
      <Switch>
        <Route path="/login" component={require('./views/Login').default} />
        <Route path="/" component={require('./views/Home').default} />
        <Redirect to="/" />
      </Switch>
    </Router>
  </LocaleProvider>,
  document.getElementById('root')
);
