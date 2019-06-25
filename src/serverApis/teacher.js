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
};
