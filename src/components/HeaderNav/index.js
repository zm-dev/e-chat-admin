import React from 'react';
import commonApi from '@/serverApis/common';
import styles from './index.module.scss';

export default class HeaderNav extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
    };
  }

  componentDidMount() {
    commonApi.getWebInfo().then(res => {
      this.setState({
        info: res.data,
      });
    });
  }

  render() {
    const { info } = this.state;
    return (
      <div className={styles.header_nav}>
        <div className={styles.header}>
          <div className={styles.container}>
            <div className={styles.left}>
              <img
                className={styles.header_img}
                src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
                alt=""
              />
              <div className={styles.info}>
                <p>您好，管理员，祝您开心每一天！</p>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.item}>
                <p>教师注册数</p>
                <p>{info.teacher_count || '----'}</p>
              </div>
              <div className={styles.item}>
                <p>学生注册数</p>
                <p>{info.student_count || '----'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
