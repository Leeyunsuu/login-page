'use strict';

const id = document.querySelector('#id');
const psword = document.querySelector('#psword');
const finderBtn = document.querySelector('#finder');
console.log('finder');

finderBtn.addEventListener('click', finder);

function finder() {
  const req = {
    id: id.value,
    psword: psword.value,
  };

  fetch('/finder', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        //로그인 성공 시
        location.href = '/';
        {
        }
      } else {
        alert(res.msg);
        // console.log(res.msg);
      }
    })
    .catch((err) => {
      console.error(new Error('로그인 에러'));
    });
}
