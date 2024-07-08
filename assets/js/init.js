(async () => {

async function initData() {
    let users = await fetchDB("user");
    let carts = await fetchDB("cart");
    let products = await fetchDB("products");
    setLS('users', users)
    setLS('carts', carts)
    setLS('products', products)
}

if(!getLS("users") && !getLS("products") && !getLS("carts")) {
    await initData();
}

})();