import React from 'react';
import styles from './index.module.scss';

export default props => {
  const { children } = props;
  return (
    <div className={styles.not_on_line}>
      <div className={styles.open_img}>
        <img src={require('../../assets/images/not_on_line.png')} alt="" />
      </div>

      <div className={styles.content}>{children}</div>
    </div>
  );
};
