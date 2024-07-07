function fetchDB(table) {
  return fetch(`data/${table}.json`)
    .then(response => response.json());
}

let user;

async function isLogin() {
  let cookie = document.cookie;
  cookie = cookie.replace("username=", "")
  let loginInfo;
  if (cookie != '') {
    await fetchDB("user")
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
  return user;
}

async function getCartQty(user_id) {
  let result;
  await fetchDB('cart')
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