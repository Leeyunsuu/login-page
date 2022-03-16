'use strict';
const Userstorage = require('./UserStorage');

class user {
  constructor(body) {
    this.body = body;
  }

  async login() {
    const body = this.body;
    const response = {};
    const { id, psword } = await Userstorage.GetUserInfo(body.id);
    if (id) {
      if (id === body.id && psword === body.psword) {
        response.success = true;
        return response;
      }
      response.success = false;
      response.msg = '비밀번호가 틀립니다.';
      return response;
    }
    response.success = false;
    response.msg = '존재하지 않는 아이디입니다.';
    return response;
  }

  register() {
    const body = this.body;
    const response = {};
    if (body.id) {
      if (body.psword === body.confirmPsowrd) {
        Userstorage.SaveUserInfo(body);
        response.success = true;
        response.msg = '회원가입 성공';
        return response;
      }
      response.success = false;
      response.msg = '비밀번호가 다릅니다.';
      return response;
    }
    response.success = false;
    response.msg = '아이디를 입력바랍니다.';
    return response;
  }

  async finder() {
    const body = this.body;
    const response = {};
    const { id, psword, email } = await Userstorage.GetUserInfo(body.id);
    console.log('test  ' + id, email);
    if (id) {
      if (id === body.id && email === body.email) {
        response.success = true;
        response.msg = `비밀번호는 ${psword}입니다.`;
        return response;
      }
      response.success = false;
      response.msg = '이메일을 확인해 주세요.';
      return response;
    }
    response.success = false;
    response.msg = '아이디를 확인해 주세요.';
    return response;
  }
}

module.exports = user;
