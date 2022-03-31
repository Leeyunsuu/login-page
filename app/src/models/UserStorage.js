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

  static GetUserInfo(data) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM user WHERE id = ?;';
      con.query(sql, [data.id], (err, rows) => {
        console.log(rows);
        if (err) {
          reject(`${err}`);
        }
        if (rows[0].psword !== undefined) {
          if (data.psword !== rows[0].psword) {
            reject('비밀번호가 틀립니다.');
          }
          resolve({ success: true });
        }
        reject('아이디가 존재하지 않습니다.');
      });
    });
  }

  static async SaveUserInfo(userInfo) {
    // const user = await this.GetUserInfo(userInfo.id);
    // if (user) {
    //   throw '이미 아이디가 존재합니다.';
    // }
    const userinfo = [userInfo.id, userInfo.psword, userInfo.emailAdress];
    console.log(userinfo);
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO user VALUES (?,?,?);';
      con.query(sql, userinfo, (err, rows) => {
        if (err) {
          reject(`${err}`);
        }
        resolve(rows);
      });
    });
  }
}

module.exports = UserStorage;
