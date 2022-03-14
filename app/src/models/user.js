'use strict';
const Userstorage = require('./UserStorage');

class user {
  constructor(body) {
    this.body = body;
  }

  login() {
    const body = this.body;
    const { id, psword } = Userstorage.GetUserInfo(body.id);
    if (id) {
      if (id === body.id && psword === body.psword) {
        return { success: true };
      }
      return { success: false, msg: '비밀번호가 틀립니다.' };
    }
    return { success: false, msg: '존재하지 않는 아이디입니다.' };
  }
}

module.exports = user;
