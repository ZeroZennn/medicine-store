function fetchDB(table) {
  return fetch(`data/${table}.json`)
    .then(response => response.json());
}

let x = document.cookie;
if (x != '') {
  const login_div = document.getElementById('login_div');
  const islogin_div = document.getElementById('islogin_div');
  const username = document.getElementById('login_username');
  login_div.classList.add('hidden');
  islogin_div.classList.remove('hidden');
  username.innerHTML = x.replace("username=", "");
}