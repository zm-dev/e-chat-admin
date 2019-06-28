import React from 'react';
import LayoutTable from '@/components/LayoutTable';
import Avatar from '@/components/Avatar';
import teacherApi from '@/serverApis/teacher';
import { formatDateTime } from '@/common/utils';
import { Modal, Form, message, Tag, Badge } from 'antd';
import styles from './index.module.scss';

class Teacher extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visibleAdd: false, // 是否显示添加框
      TeacherList: [], // 轮播图列表
      showLoading: true, // 表格loading
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
            <div className={styles.teacher_image}>
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
        title: '分类',
        dataIndex: 'gender',
        key: 'gender',
        render: data => {
          return <Tag color="blue">{data}</Tag>;
        },
      },
      {
        title: '所在组别',
        dataIndex: 'group',
        key: 'group',
      },
      {
        title: '所在院系',
        dataIndex: 'company',
        key: 'company',
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
        title: '创建时间',
        dataIndex: 'created_at',
        key: 'created_at',
        render: data => {
          return formatDateTime(data);
        },
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (_, recode) => (
          <span className={styles.columns_operation}>
            <span
              onClick={e => {
                this.props.history.push(`/teacher/update/${recode.id}`);
                e.stopPropagation();
              }}
            >
              修改
            </span>
            <span
              onClick={e => {
                this.deleteTeacher(recode.id);
                e.stopPropagation();
              }}
            >
              删除
            </span>
          </span>
        ),
      },
    ];
  }

  componentDidMount() {
    this.getTeacherList();
  }

  // 获取列表
  getTeacherList = () => {
    this.setState({
      showLoading: true,
    });
    teacherApi.list().then(res => {
      this.setState({
        TeacherList: res.data,
        showLoading: false,
      });
    });
  };

  // 删除
  deleteTeacher = id => {
    const self = this;
    Modal.confirm({
      title: '确定删除?',
      content: '确定删除该轮播图!',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        teacherApi.delete(id).then(() => {
          self.getTeacherList();
          message.success('删除成功。');
        });
      },
      onCancel() {
        message.warning('你取消了删除。');
      },
    });
  };

  render() {
    const { TeacherList, showLoading } = this.state;
    const { history } = this.props;
    return (
      <div className={styles.recommend}>
        <LayoutTable
          loading={showLoading}
          title="教师列表"
          dataSource={TeacherList}
          columns={this.columns}
          onDrag={this.onDrag}
          onDragEnd={this.onDragEnd}
          add={() => {
            history.push('/teacher/add');
          }}
          onRow={record => {
            return {
              onClick: () => {
                console.log(record.id);
                this.props.history.push(`/chat/${record.id}`);
              },
            };
          }}
          pagination={false}
        />
      </div>
    );
  }
}

export default Form.create()(Teacher);
