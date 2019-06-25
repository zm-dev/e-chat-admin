import http from '@/common/http';

export default {
  // 聊天列表
  list(id) {
    return http.get(`/admin/message_list?user_id=${id}`);
  },

  // 聊天详情
  record(page, size, from_user_id, to_user_id) {
    return http.get(
      `/admin/record?page=${page}&size=${size}&from_user_id=${from_user_id}&to_user_id=${to_user_id}`
    );
  },
};
