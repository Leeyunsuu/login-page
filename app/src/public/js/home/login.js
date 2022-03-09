'use strict';

const id = document.querySelector('#id');
const psword = document.querySelector('#psword');
const loginBtn = document.querySelector('button');

loginBtn.addEventListener('click', login);

function Login() {
  const req = {
    id: id.value,
    psword: psword.value,
  };
  console.log(req);
  console.log('login 중 ...');
}
