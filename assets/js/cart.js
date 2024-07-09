(async () => {
    const carts = await fetchDB("carts");
    const products = await fetchDB("products");

    let price_temp, total
    
    const productCartEle = document.getElementById("product_cart");
    const productDetailELe = document.getElementById("detail_cart");
    const cart = carts.cart.filter(x => x.user_id == user.id)[0];
    console.log(cart)

    const getProduct = (id) => {
        return products.product.filter(x => x.id == id)[0];
    }

    productCartEle.innerHTML = cart.product.map(item => {
        return (`
            <div class="product_item flex items-center justify-between p-4 border border-gray-200 rounded dark:border-gray-700 mt-4">
              <div class="wrapper flex items-center justify-between w-full">
                <!-- product detail -->
                <div class="product_left flex gap-4">
                  <input id="select_item" type="checkbox" value="" name="bordered-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                  <div class="product_detail lg:flex gap-4">
                    <img class="w-[80px] h-[80px] lg:w-[128px] lg:h-[120px] bg-slate-500" src="${getProduct(item.id).image}" alt="">
                    <div class="product_name">${getProduct(item.id).name}</div>
                  </div>
                </div>
                <div class="product_right flex flex-col justify-between items-end gap-14">
                  <div class="product_price font-semibold">Rp. ${getProduct(item.id).price}</div>
                  <div class="right_bottom flex gap-4">
                    <div class="icon_trash">
                      <i product-id="${item.id}" class="ti ti-trash text-[28px] cursor-pointer"></i>
                    </div>
                    <div class="qty flex justify-between px-6 py-1 gap-8 rounded-md border border-[#8f8f8f]">
                      <div product-id="${item.id}" class="minus cursor-pointer">-</div>
                      <div id="product_qty" class="total_items">${item.qty}</div>
                      <div product-id="${item.id}" class="plus cursor-pointer">+</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `);
    }).join("");
})();