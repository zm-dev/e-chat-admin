import React from 'react';
import LayoutTable from '@/components/LayoutTable';
import Avatar from '@/components/Avatar';
import ChatItem from '@/components/ChatItem';
import chatApi from '@/serverApis/chat';
import { formatDateTime } from '@/common/utils';
import { Form, Tag, Badge, Modal, Pagination } from 'antd';
import styles from './index.module.scss';

class Chat extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visibleAdd: false, // 是否显示添加框
      ChatList: [], // 轮播图列表
      showLoading: true, // 表格loading
      visibleLogin: false, // 是否显示聊天记录
      recodeList: [], // 聊天记录列表
      currentUser: {},
      page: 1,
      size: 20,
      total: 0,
    };

    // 字段
    this.columns = [
      {
        title: '头像',
        dataIndex: 'avatar_url',
        key: 'avatar_url',
        width: 60,
        render: (data, recode) => {
          return (
            <div className={styles.chat_image}>
              <Avatar src={data} title={recode.nick_name} />
            </div>
          );
        },
      },
      {
        title: '姓名',
        dataIndex: 'nick_name',
        key: 'nick_name',
      },
      {
        title: '未读个数',
        dataIndex: 'not_read_msg_count',
        key: 'not_read_msg_count',
        render: data => {
          return <Tag color="blue">{data}</Tag>;
        },
      },
      {
        title: '最后一次聊天',
        dataIndex: 'last_message',
        key: 'last_message',
        width: 450,
        render: data => {
          return <div className={styles.columns_title}>{data}</div>;
        },
      },
      {
        title: '是否在线',
        dataIndex: 'is_online',
        key: 'is_online',
        render: data => {
          return <Badge status={data ? 'success' : 'default'} text={data ? '在线' : '离线'} />;
        },
      },
      {
        title: '最近一次聊天时间',
        dataIndex: 'last_message_send_time',
        key: 'last_message_send_time',
        render: data => {
          return formatDateTime(data);
        },
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (_, recode) => (
          <span className={styles.columns_operation}>
            <span onClick={() => this.record(recode)}>查看记录</span>
          </span>
        ),
      },
    ];
  }

  componentDidMount() {
    this.getChatList(this.props.match.params.id);
  }

  // 获取列表
  getChatList = id => {
    this.setState({
      showLoading: true,
    });
    chatApi.list(id).then(res => {
      this.setState({
        ChatList: res.data,
        showLoading: false,
      });
    });
  };

  // 获取了解详情
  record = recode => {
    this.setState(
      {
        currentUser: recode,
      },
      () => {
        this.getRecord(recode);
      }
    );
  };

  getRecord = recode => {
    console.log(this.state.page, this.state.size);
    chatApi
      .record(this.state.page, this.state.size, this.props.match.params.id, recode.user_id)
      .then(res => {
        this.setState({
          recodeList: res.data.records,
          visibleLogin: true,
          total: res.data.total,
        });
      });
  };

  render() {
    const {
      ChatList,
      showLoading,
      visibleLogin,
      recodeList,
      currentUser,
      page,
      size,
      total,
    } = this.state;
    // const { history } = this.props;
    return (
      <div className={styles.recommend}>
        <LayoutTable
          rowKey="user_id"
          loading={showLoading}
          title="查看聊天记录"
          dataSource={ChatList}
          columns={this.columns}
          onDrag={this.onDrag}
          onDragEnd={this.onDragEnd}
          showAdd={false}
        />
        <Modal
          visible={visibleLogin}
          onCancel={() => {
            this.setState({
              visibleLogin: false,
              page: 1,
            });
          }}
          footer={null}
        >
          <div className={styles.recode_box}>
            <h2>与 {currentUser.nick_name} 的聊天记录</h2>
            <div className={styles.content}>
              {recodeList.map(item => {
                return (
                  <ChatItem
                    key={item.id}
                    content={item}
                    isSend={currentUser.user_id !== item.to_id ? false : true}
                    user={currentUser}
                  />
                );
              })}
            </div>
            <div className={styles.footer}>
              <Pagination
                current={page}
                pageSize={size}
                total={total}
                onChange={(page, size) => {
                  this.setState(
                    {
                      page,
                      size,
                    },
                    () => {
                      this.getRecord(currentUser);
                    }
                  );
                }}
              />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(Chat);
