'use strict';

//login
const id = document.querySelector('#id');
const psword = document.querySelector('#psword');
const loginBtn = document.querySelector('#login');

//sign up
const signupId = document.querySelector('#signupId');
const signupPsword = document.querySelector('#signupPsword');
const confirmPsword = document.querySelector('#confirm-psword');
const emailAdress = document.querySelector('#email');
const signupBtn = document.querySelector('#signup');

loginBtn.addEventListener('click', Login);
signupBtn.addEventListener('click', Register);

function Login() {
  const req = {
    id: id.value,
    psword: psword.value,
  };

  fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        //로그인 성공 시
        location.href = '/';
      } else {
        alert(res.msg);
        // console.log(res.msg);
      }
    })
    .catch((err) => {
      console.error(new Error('로그인 에러'));
    });
}

function Register() {
  const req = {
    id: signupId.value,
    psword: signupPsword.value,
    confirmPsowrd: confirmPsword.value,
    emailAdress: emailAdress.value,
  };

  fetch('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        //로그인 성공 시
        alert(res.msg);
        location.href = '/login';
      } else {
        alert(res.msg);
        // console.log(res.msg);
      }
    })
    .catch((err) => {
      console.error(new Error('로그인 에러'));
    });
}
