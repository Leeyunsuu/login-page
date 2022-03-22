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
  static #GetUsers(isAll, data, fields) {
    const users = JSON.parse(data);
    if (isAll) return users;
    const newUsers = fields.reduce((newusers, field) => {
      if (users.hasOwnProperty(field)) {
        newusers[field] = users[field];
        //newUsers배열의 fields 키 value에는 users배열중 field와 동일명의 키 value 값이 들어간다.
      }
      return newusers;
    }, {});
    return newUsers;
  }

  static GetUsers(isAll, ...fields) {
    return fs
      .readFile('./src/database/users.json')
      .then((data) => {
        return this.#GetUsers(isAll, data, fields);
      })
      .catch((err) => console.log(err));
  }

  static GetUserInfo(id) {
    return fs
      .readFile('./src/database/users.json')
      .then((data) => {
        return this.#GetUserInfo(id, data);
      })
      .catch((err) => console.log(err));
  }

  static async SaveUserInfo(userInfo) {
    const users = await this.GetUsers(true);
    if (users.id.includes(userInfo.id)) {
      throw '아이디가 이미 존재합니다.';
    }
    users.id.push(userInfo.id);
    users.psword.push(userInfo.psword);
    users.email.push(userInfo.emailAdress);
    fs.writeFile('./src/database/users.json', JSON.stringify(users));
    return { success: true };
  }
}

module.exports = UserStorage;
