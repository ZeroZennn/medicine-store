let user;

function fetchDB(table) {
  return fetch(`data/${table}.json`)
    .then(response => response.json());
}

function setLS(key, data) {
  if (typeof data != "string") {data = JSON.stringify(data);}
  localStorage.setItem(key, data);
}

function getLS(key) {
  return JSON.parse(localStorage.getItem(key));
}

function isLogin() {
  let cookie = document.cookie;
  cookie = cookie.replace("username=", "")
  let loginInfo;
  if (cookie != '') {
    let data = getLS("users")
    loginInfo = data.user.filter(x => x.username == cookie)[0];
    return loginInfo;
  }
  return loginInfo
}

function getUser() {
  user = isLogin();
}

function getCartQty(user_id) {
  const data = getLS("carts");
  const filter = data.cart.filter(x => x.user_id == user_id)[0];
  const result = filter.product.length > 0 ? filter.product.length : '';
  return result;
}

function updateCartQty(user_id) {
  const qty = getCartQty(user_id)
  const qtyCart = document.getElementById('qtyCart');
  qtyCart.innerHTML = qty;
}

function getArg(argName) {
  const param = new URLSearchParams(window.location.search);
  return param.get(argName);
}