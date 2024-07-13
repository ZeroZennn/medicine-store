let user;

async function fetchDB(table) {
  try {
    const response = await fetch(`data/${table}.json`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const text = await response.text();

    if (!text.trim()) {
      return [];
    }

    const result = JSON.parse(text);
    return result;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
}

async function isLogin() {
  let cookie = document.cookie;
  cookie = cookie.replace("username=", "")
  let loginInfo;
  if (cookie != '') {
    await fetchDB("users")
    .then(user => {
      loginInfo = user.find(x => x.username == cookie);
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
    .then(cart => {
      const account_cart = cart.find(x => x.user_id == user_id);
      if(!account_cart) {
        result = '';
      } else {
        result = account_cart.product.length;
      }
    }
  )
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

// Add to cart
async function addToCart(productId, increase = null) {
  try {
    const response = await fetch('http://localhost:3000/carts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth': JSON.stringify(user)
      },
      body: JSON.stringify({ id: productId, increase: increase })
    });
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  increase == null ? await updateCartQty(user.id) : false;
}