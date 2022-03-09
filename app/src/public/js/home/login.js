'use strict';

const id = document.querySelector('#id');
const psword = document.querySelector('#psword');
const loginBtn = document.querySelector('button');

loginBtn.addEventListener('click', Login);

function Login() {
  const req = {
    id: id.value,
    psword: psword.value,
  };
  console.log(req);
  console.log(JSON.stringify(req, 2, null));
  console.log('login 중 ...');

  fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then(console.log);
}
