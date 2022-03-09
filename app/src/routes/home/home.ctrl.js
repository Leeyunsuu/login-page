'use strict';

const output = {
  home: (req, res) => {
    res.render('home/index');
  },
  login: (req, res) => {
    res.render('home/login');
  },
};

const users = {
  id: ['yunsuteng', 'eunjii', 'jang'],
  psword: ['0000', '1111', '2222'],
};

const process = {
  login: (req, res) => {
    const id = req.body.id;
    const psword = req.body.psword;
    if (users.id.includes(id)) {
      const idx = users.id.indexOf(id); //해당 id의 배열
      if (users.psword[idx] === psword) {
        //만약 해당 psword배열과 frontend에서 입력한 value가 일치할때
        return res.json({
          success: true,
          msg: '로그인 성공...',
        });
      }
    }
    return res.json({
      success: false,
      msg: '로그인 실패...',
    });
  },
};

module.exports = {
  output,
  process,
};
