'use strict';

class UserStorage {
  static #users = {
    id: ['yunsuteng', 'eunjii', 'jang'],
    psword: ['0000', '1111', '2222'],
    name: ['이윤수', '황은지', '이름'],
  };

  static GetUsers(...fields) {
    const users = this.#users;
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
    const users = this.#users;
    const idx = users.id.indexOf(id);
    const userKeys = Object.keys(users);
    const userInfo = userKeys.reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      return newUser;
    }, {});
    return userInfo;
  }

  static SaveUserInfo(userInfo) {
    const users = this.#users;
    users.id.push(userInfo.id);
    users.psword.push(userInfo.psword);
    users.name.push(userInfo.emailAdress);
    console.log(users);
  }
}

module.exports = UserStorage;
