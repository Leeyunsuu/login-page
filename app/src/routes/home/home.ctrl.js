'use strict';

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
    console.log('home.crtl.js : ' + JSON.stringify(req.body, 2, null));
  },
};

module.exports = {
  output,
  process,
};
