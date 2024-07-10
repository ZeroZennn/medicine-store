(async () => {
  let carts;
  const products = await fetchDB("products");
  
  const productCartEle = document.getElementById("product_cart");
  const productDetailELe = document.getElementById("detail_cart");

  const getProduct = (id) => {
      return products.filter(x => x.id == id)[0];
  }

  async function updateCartDetail() {
    let price = document.querySelectorAll('#select_item')
    let total = 0;
    price.forEach(cb => {
      if (cb.checked) {
        const productEle = document.getElementById(`product_qty_${cb.getAttribute('product-id')}`);
        console.log(productEle)
        total = total + (parseInt(productEle.getAttribute('price')) * parseInt(productEle.innerText));
        console.log(total)
      }
    })
    productDetailELe.innerHTML = `
      <div class="shopping_summary lg:shadow-[0_2px_4px_0_rgba(60,64,67,0.3)] p-[38px] rounded-lg">
        <h3 class="font-semibold text-[18px]">Ringkasan Pembayaran</h3>
        <!-- keranjang -->
        <div class="total_cart flex justify-between mt-4">
          <p class="text-[14px] text-gray-500">Keranjang ( 1 Produk )</p>
          <p class="text-[14px] text-gray-500">Rp. ${total ? total : '-'}</p>
        </div>
        <!-- total Ongkir -->
        <div class="total_cart flex justify-between mt-2">
          <p class="text-[14px] text-gray-500">Total Ongkir</p>
          <p class="text-[14px] text-gray-500">Rp. ${total > 0 ? '10000': '-'}</p>
        </div>
        <!-- Biaya Pelayanan -->
        <div class="total_cart flex justify-between mt-2">
          <p class="text-[14px] text-gray-500">Biaya Penanganan</p>
          <p class="text-[14px] text-gray-500">Rp. ${total > 0 ? '5000': '-'}</p>
        </div>
        <!-- line -->
        <div class="border w-full border-gray-200 mt-4"></div>
        <!-- total belanja -->
        <div class="shopping_total flex justify-between mt-4">
          <h3 class="font-semibold">Total Belanja</h3>
          <h3 class="font-semibold">Rp. ${total > 0 ? total + 15000 : '-'}</h3>
        </div>
        <!-- alamat -->
        <div class="address_wrap p-4 bg-gray-100 rounded-lg mt-4">
          <div class="title flex justify-between">
            <p class="font-semibold text-[14px] text-gray-600">Alamat Pengiriman</p>
            <p class="font-semibold text-[14px] text-[#37B7C3] mt-1 cursor-pointer">Ubah</p>
          </div>
          <div class="address">
            <p class="text-[14px]">jl.albaidho 1 RT100/RW100 no.187, Cipayung, Jakarta Timur, DKI j...</p>
          </div>
        </div>
        <!-- catatan -->
        <div class="notes mt-4">
          <label for="notes" class="title flex gap-2 items-center">
            <i class="ti ti-clipboard-text"></i>
            <p class="font-semibold text-[14px] text-gray-600">Tambah Catatan</p>
          </label>
          <input type="text" id="notes" class="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        </div>
        <!-- Pembayaran -->
        <button class="py-2 bg-[#37B7C3] w-full mt-4 rounded-md text-white active:bg-[#1394a0]">Pilih Pembayaran</button>
      </div>
    `
  }

  async function startCart() {
    carts = await fetchDB("carts");
    const cart = carts.find(x => x.user_id == user.id);
    productCartEle.innerHTML = cart.product.map(item => {
      let product = getProduct(item.id)
        return (`
            <div id="cart_product_${item.id}" class="product_item flex items-center justify-between p-4 border border-gray-200 rounded dark:border-gray-700 mt-4">
              <div class="wrapper flex items-center justify-between w-full">
                <!-- product detail -->
                <div class="product_left flex gap-4">
                  <input product-id="${item.id}" id="select_item" type="checkbox" value="" name="bordered-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
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
                      <div id="product_qty_${item.id}" price="${product.price}" class="total_items">${item.qty}</div>
                      <div product-id="${item.id}" class="plus cursor-pointer">+</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `);
    }).join("");

    document.querySelectorAll('.minus').forEach(button => {
      button.onclick = async function() {
        let productId = this.getAttribute('product-id');
        await addToCart(productId, false)
        const qty = document.getElementById(`product_qty_${productId}`).innerText--;
        if ((qty - 1) == 0) document.getElementById(`cart_product_${productId}`).remove();
        await updateCartDetail();
      }
    });

    document.querySelectorAll('.plus').forEach(button => {
      button.onclick = async function() {
        let productId = this.getAttribute('product-id');
        await addToCart(productId, true);
        document.getElementById(`product_qty_${productId}`).innerText++;
        await updateCartDetail();
      }
    });

    const select = document.getElementById('select_all');
    const select_child = document.querySelectorAll('#select_item');

    let checked = false;

    select.addEventListener("click", () => {
      checked = !checked;
      select_child.forEach((cb) => {
        cb.checked = checked;
      });
      updateCartDetail();
    });

    select_child.forEach(cb => {
      cb.addEventListener("change", () => {
        updateCartDetail();
      });
    })
  }

  startCart();

})();