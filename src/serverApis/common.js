import http from '@/common/http';

export default {
  // 登陆
  signIn(userinfo) {
    return http.post('/auth/login', userinfo);
  },

  // 获取网站信息
  getWebInfo() {
    return http.get('/user_count_by_type');
  },
};
