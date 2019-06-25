import React from 'react';
import { withRouter } from 'react-router-dom';
import { Icon, Spin } from 'antd';
import styles from './index.module.scss';

class FormLayout extends React.PureComponent {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const { title, children, history, loading = false } = this.props;
    return (
      <div className={styles.layout_form}>
        <div className={styles.title}>
          <Icon onClick={() => history.goBack()} className={styles.return_icon} type="left" />
          <h2>{title}</h2>
        </div>
        <Spin spinning={loading}>
          <div className={styles.content}>{children}</div>
        </Spin>
      </div>
    );
  }
}
export default withRouter(FormLayout);
