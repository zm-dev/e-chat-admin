import http from '@/common/http';

export default {
  // 教师列表
  list() {
    return http.get('/teacher_list');
  },

  // 创建教师
  create(teacher) {
    return http.post('admin/teacher', teacher);
  },

  // 删除教师
  delete(id) {
    return http.delete(`admin/user/${id}`);
  },

  // 获取指定教师
  get(id) {
    return http.get(`user/${id}`);
  },

  // 修改老师
  update(id, teacher) {
    return http.put(`/admin/user/${id}`, teacher);
  },
};
