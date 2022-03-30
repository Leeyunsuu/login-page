'use strict';

//Connect Databases
const fs = require('fs').promises;
const mysqlConnection = require('../config/mysql');
const con = mysqlConnection.init();
mysqlConnection.open(con);

class UserStorage {
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

  static GetUsers() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM user;';
      con.query(sql, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  }

  static GetUserInfo(id) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM user WHERE id = ?;';
      con.query(sql, [id], (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows[0]);
      });
    });
  }

  static async SaveUserInfo(userInfo) {
    const user = await this.GetUserInfo(userInfo.id);
    if (user) {
      throw '이미 아이디가 존재합니다.';
    }
    const newUser = [];
    // newUser.push(userInfo.id, userInfo.psword, userInfo.emailAdress);
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO user VALUES ?;';
      con.query(sql, [newUser], (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  }
}

module.exports = UserStorage;
