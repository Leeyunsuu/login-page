'use strict';

const fs = require('fs').promises;

class UserStorage {
  static #GetUserInfo(id, data) {
    const users = JSON.parse(data);
    const idx = users.id.indexOf(id);
    const usersKeys = Object.keys(users);
    const userInfo = usersKeys.reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      return newUser;
    }, {});

    return userInfo;
  }

  static GetUsers(...fields) {
    // const users = this.#users;
    const newUsers = fields.reduce((newusers, field) => {
      if (users.hasOwnProperty(field)) {
        newusers[field] = users[field];
        //newUsers배열의 fields 키 value에는 users배열중 field와 동일명의 키 value 값이 들어간다.
      }
      return newusers;
    }, {});
    return newUsers;
  }

  static GetUserInfo(id) {
    return fs
      .readFile('./src/database/users.json')
      .then((data) => {
        return this.#GetUserInfo(id, data);
      })
      .catch((err) => console.log(err));
  }

  static SaveUserInfo(userInfo) {
    // const users = this.#users;
    users.id.push(userInfo.id);
    users.psword.push(userInfo.psword);
    users.email.push(userInfo.emailAdress);
    return { success: true, msg: '회원가입 성공' };
  }
}

module.exports = UserStorage;
