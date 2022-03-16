'use strict';

const User = require('../../models/user');

const output = {
  home: (req, res) => {
    res.render('home/index');
  },

  login: (req, res) => {
    res.render('home/login');
  },

  finder: (req, res) => {
    res.render('home/finder');
  },
};

const proccess = {
  login: async (req, res) => {
    const user = new User(req.body); //constructer(body)로 전달
    const response = await user.login(); //함수 실행
    return res.json(response);
  },

  register: (req, res) => {
    const user = new User(req.body); //constructer(body)로 전달
    const response = user.register(); //함수 실행
    return res.json(response);
  },

  finder: async (req, res) => {
    console.log(req.body);
    const userInfo = new User(req.body);
    const response = await userInfo.finder();
    return res.json(response);
  },
};

module.exports = {
  output,
  proccess,
};
