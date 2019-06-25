import http from '@/common/http';

export default {
  // 登陆
  signIn(userinfo) {
    return http.post('/auth/login', userinfo);
  },
};
