(async () => {
  let carts;
  const products = await fetchDB("products");
  
  const productCartEle = document.getElementById("product_cart");
  const productDetailELe = document.getElementById("detail_cart");

  const getProduct = (id) => {
      return products.filter(x => x.id == id)[0];
  }

  async function updateCartDetail() {
    
  }

  async function startCart() {
    carts = await fetchDB("carts");
    const cart = carts.filter(x => x.user_id == user.id)[0];
    productCartEle.innerHTML = cart.product.map(item => {
      let product = getProduct(item.id)
        return (`
            <div class="product_item flex items-center justify-between p-4 border border-gray-200 rounded dark:border-gray-700 mt-4">
              <div class="wrapper flex items-center justify-between w-full">
                <!-- product detail -->
                <div class="product_left flex gap-4">
                  <input id="select_item" type="checkbox" value="" name="bordered-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                  <div class="product_detail lg:flex gap-4">
                    <img class="w-[80px] h-[80px] lg:w-[128px] lg:h-[120px] bg-slate-500" src="${product.image}" alt="">
                    <div class="product_name">${product.name}</div>
                  </div>
                </div>
                <div class="product_right flex flex-col justify-between items-end gap-14">
                  <div class="product_price font-semibold">Rp. ${product.price}</div>
                  <div class="right_bottom flex gap-4">
                    <div class="icon_trash">
                      <i product-id="${item.id}" class="ti ti-trash text-[28px] cursor-pointer"></i>
                    </div>
                    <div class="qty flex justify-between px-6 py-1 gap-8 rounded-md border border-[#8f8f8f]">
                      <div product-id="${item.id}" class="minus cursor-pointer">-</div>
                      <div id="product_qty_${item.id}" class="total_items">${item.qty}</div>
                      <div product-id="${item.id}" class="plus cursor-pointer">+</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `);
    }).join("");

    document.querySelectorAll('.minus').forEach(button => {
      button.onclick = function() {
        let productId = this.getAttribute('product-id');
        addToCart(productId, false)
        let qty = document.getElementById(`product_qty_${productId}`).innerText--;
        qty - 1 == 0 ? startCart() : false;
      }
    });

    document.querySelectorAll('.plus').forEach(button => {
      button.onclick = function() {
        let productId = this.getAttribute('product-id');
        addToCart(productId, true);
        document.getElementById(`product_qty_${productId}`).innerText++;
      }
    });

    const select = document.getElementById('select_all');
    const select_child = document.querySelectorAll('#select_item');

    select.addEventListener("click", () => {
      select_child.forEach((cb) => { 
        cb.checked = !cb.checked;

      });
    });
  }

  startCart();

})();