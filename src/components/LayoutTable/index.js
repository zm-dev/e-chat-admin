import React from 'react';
import { Button, Table } from 'antd';
import styles from './index.module.scss';

export default props => {
  /**
   * title: 按钮标题
   * dataSource: 表格数据
   * columns: 字段
   * loading: 加载
   * add: 添加事件
   * hasDrag: 是否可拖拽
   * onDrag: 拖拽事件
   * onDragEnd: 拖拽成功
   * rightOption: 右边选项
   * leftOption: 添加按钮选项
   * pagination: 分页参数
   * showAdd: 是否显示添加按钮
   */
  const {
    title,
    add,
    onDrag,
    onDragEnd,
    rightOption,
    leftOption,
    footer,
    showAdd = true,
    rowKey = 'id',
    ...rest
  } = props;
  return (
    <div className={styles.layout_table}>
      <div className={styles.header}>
        <div className={styles.left}>
          {showAdd ? (
            <Button style={{ marginRight: '20px' }} type="primary" icon="plus" onClick={add}>
              添加{title}
            </Button>
          ) : (
            <div className={styles.title}>{title}</div>
          )}

          {leftOption}
        </div>
        <div className={styles.right}>{rightOption}</div>
      </div>
      {footer && <div className={styles.footer}>{footer}</div>}
      <div className={styles.content}>
        <Table rowKey={rowKey} {...rest} />
      </div>
    </div>
  );
};
