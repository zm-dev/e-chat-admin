import React from 'react';

// import numeral from 'numeral';
import styles from './index.module.scss';

export default () => {
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
          {/* <div className={styles.right}>
            <div className={styles.item}>
              <p>主播入驻数</p>
              <p>{numeral(4141).format('0,0')}</p>
            </div>
            <div className={styles.item}>
              <p>今日入住</p>
              <p>{numeral(13194).format('0,0')}</p>
            </div>
            <div className={styles.item}>
              <p>网站运营天数</p>
              <p>{numeral(413).format('0,0')}</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
