'use strict';

class UserStorage {
  static #users = {
    id: ['yunsuteng', 'eunjii', 'jang'],
    psword: ['0000', '1111', '2222'],
    name: ['이윤수', '황은지', '이름'],
  };
  static GetUsers(...fields) {
    const users = this.#users;
    const newUsers = fields.reduce((newUsers, field) => {
      // console.log(field); // 받은 인자를 돌림 id psword
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
        //newUsers배열의 fields 키 value에는 users배열중 field와 동일명의 키 value 값이 들어간다.
      }
      return newUsers;
    }, {});
    return newUsers;
  }
}

module.exports = UserStorage;
