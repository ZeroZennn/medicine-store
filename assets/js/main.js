let user;

function fetchDB(table) {
  return fetch(`data/${table}.json`)
    .then(response => response.json());
}

async function isLogin() {
  let cookie = document.cookie;
  cookie = cookie.replace("username=", "")
  let loginInfo;
  if (cookie != '') {
    await fetchDB("users")
    .then(data => {
      loginInfo = data.user.filter(x => x.username == cookie)[0];
      return loginInfo;
    }) .catch(error => {
        console.error("Error fetching user data:", error);
      }
    );
  }
  return loginInfo
}

async function getUser() {
  user = await isLogin();
}

async function getCartQty(user_id) {
  let result;
  await fetchDB('carts')
    .then(data => {
      const filter = data.cart.filter(x => x.user_id == user_id)[0];
      result = filter.product.length > 0 ? filter.product.length : '';
  })
  return result;
}

async function updateCartQty(user_id) {
  const qty = await getCartQty(user_id)
  const qtyCart = document.getElementById('qtyCart');
  qtyCart.innerHTML = qty;
}

function getArg(argName) {
  const param = new URLSearchParams(window.location.search);
  return param.get(argName);
}