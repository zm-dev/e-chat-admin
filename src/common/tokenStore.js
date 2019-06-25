import { JWT_TOKEN_KEY } from './constants';

export default {
  _token: {
    accessToken: null,
    refreshToken: null,
  },
  getToken() {
    if (null == this._token.accessToken || null == this._token.refreshToken) {
      const accessToken = localStorage.getItem(JWT_TOKEN_KEY.ACCESS_TOKEN);
      const refreshToken = localStorage.getItem(JWT_TOKEN_KEY.REFRESH_TOKEN);
      if (null !== accessToken && null != refreshToken) {
        this._token = {
          accessToken,
          refreshToken,
        };
        return this._token;
      } else {
        return null;
      }
    }
    return this._token;
  },
  setToken(token) {
    this._token = {
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    };
    localStorage.setItem(JWT_TOKEN_KEY.ACCESS_TOKEN, token.accessToken);
    localStorage.setItem(JWT_TOKEN_KEY.REFRESH_TOKEN, token.refreshToken);
  },
};
