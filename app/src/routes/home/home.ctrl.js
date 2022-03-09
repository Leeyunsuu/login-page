'use strict';

const UserStorage = require('../../models/UserStorage');

const output = {
  home: (req, res) => {
    res.render('home/index');
  },
  login: (req, res) => {
    res.render('home/login');
  },
};

const process = {
  login: (req, res) => {
    //frontend에서 받은 데이터
    const id = req.body.id;
    const psword = req.body.psword;

    //backend에서 받은 데이터
    const users = UserStorage.GetUsers('id', 'psword');

    const response = {};
    if (users.id.includes(id)) {
      const idx = users.id.indexOf(id); //해당 id의 배열
      if (users.psword[idx] === psword) {
        //만약 해당 psword배열과 frontend에서 입력한 value가 일치할때
        response.success = true;
        response.msg = '로그인 성공';
        return res.json(response);
      }
    }

    response.success = false;
    response.msg = '로그인 실패';
    return res.json(response);
  },
};

module.exports = {
  output,
  process,
};
