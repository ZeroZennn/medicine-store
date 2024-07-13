let carts;
(async () => {
  const products = await fetchDB("products");

  const productCartEle = document.getElementById("product_cart");
  const productDetailELe = document.getElementById("shopping_summary");
  const delSelected = document.getElementById('deleteSelected');
  const checkout_dialog_btn = document.getElementById("button-modal");
  const checkout_dialog = document.getElementById("checkout");
  const checkout_price = document.getElementById("checkout-price");
  const payment_btn = document.querySelector(".payment_btn");

  checkout_dialog_btn.addEventListener("click", () => {
    checkout_dialog.showModal();
  });

  payment_btn.addEventListener("click", () => {
    prepareToCheckout();
  });

  const getProduct = (id) => {
      return products.filter(x => x.id == id)[0];
  }

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
  }

  async function checkout(data, all) {
    await fetch(`http://localhost:3000/transactions`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'auth': JSON.stringify(user)
      },
      body: JSON.stringify(data)
    });
    
    if (all) {
      await deleteCart(0, true);
    } else {
      data.product.forEach(async cb => {
        await deleteCart(cb.id)
        document.getElementById(`cart_product_${cb.id}`).remove();
      })
    }
    location.reload();
  }

  async function prepareToCheckout() {
    let product = [];
    let drugsPrice = 0;
    let payment_type;
    let all = true;
    const payment_select = document.querySelectorAll('.payment_type');
    payment_select.forEach(async cb => {
      if (cb.checked) {
        payment_type = cb.getAttribute('payment')
      }
    })
    const notes = document.getElementById("notes");
    const select_child = document.querySelectorAll('#select_item');
    select_child.forEach(async cb => {
      if (cb.checked) {
        const productId = cb.getAttribute("product-id")
        const productEle = document.getElementById(`product_qty_${productId}`);
        drugsPrice = drugsPrice + (parseInt(productEle.getAttribute('price')) * parseInt(productEle.innerText));
        const data = {
          "id": parseInt(productId),
          "qty": parseInt(productEle.innerText),
          "price": parseFloat(productEle.getAttribute("price"))
        }
        product.push(data);
      } else {
        all = false;
      }
    })
    const data = {
      "notes": notes.value,
      "product": product,
      "subTotal": drugsPrice,
      "additionalPrice": 15000,
      "paymentType": payment_type
    }
    await checkout(data, all)
  }

  async function updateCartDetail() {
    let price = document.querySelectorAll('#select_item')
    let checkbox_checked = false;
    let total = 0;
    price.forEach(cb => {
      if (cb.checked) {
        checkbox_checked = true;
        const productEle = document.getElementById(`product_qty_${cb.getAttribute('product-id')}`);
        total = total + (parseInt(productEle.getAttribute('price')) * parseInt(productEle.innerText));
      }
    })
    productDetailELe.innerHTML = `
        <h3 class="font-semibold text-[18px]">Ringkasan Pembayaran</h3>
        <!-- keranjang -->
        <div class="total_cart flex justify-between mt-4">
          <p class="text-[14px] text-gray-500">Keranjang ( 1 Produk )</p>
          <p class="text-[14px] text-gray-500">${checkbox_checked ? rupiah(total) : 'Rp. -'}</p>
        </div>
        <!-- total Ongkir -->
        <div class="total_cart flex justify-between mt-2">
          <p class="text-[14px] text-gray-500">Total Ongkir</p>
          <p class="text-[14px] text-gray-500">${checkbox_checked ? rupiah('10000'): 'Rp. -'}</p>
        </div>
        <!-- Biaya Pelayanan -->
        <div class="total_cart flex justify-between mt-2">
          <p class="text-[14px] text-gray-500">Biaya Penanganan</p>
          <p class="text-[14px] text-gray-500">${checkbox_checked ? rupiah('5000'): 'Rp. -'}</p>
        </div>
        <!-- line -->
        <div class="border w-full border-gray-200 mt-4"></div>
        <!-- total belanja -->
        <div class="shopping_total flex justify-between mt-4">
          <h3 class="font-semibold">Total Belanja</h3>
          <h3 class="font-semibold">${checkbox_checked ? rupiah(total + 15000) : 'Rp. -'}</h3>
        </div>
        <!-- alamat -->
        <div class="address_wrap p-4 bg-gray-100 rounded-lg mt-4">
          <div class="title flex justify-between">
            <p class="font-semibold text-[14px] text-gray-600">Alamat Pengiriman</p>
            <p class="font-semibold text-[14px] text-[#37B7C3] mt-1 cursor-pointer">Ubah</p>
          </div>
          <div class="address">
            <p id="address" class="text-[14px]"></p>
          </div>
        </div>
    `
    total += 15000;
    checkout_price.innerText = total ? rupiah(total) : 'Rp. -'
  }

  async function updateSelectAll() {
    const select_child = document.querySelectorAll('#select_item');
    let falseCount = 0;
    let trueCount = 0;
    for (const x of select_child) {
      if (x.checked == false) {
        falseCount++;
      } else {
        trueCount++;
      }
    }
    if (falseCount == 0 && trueCount == 0) {delSelected.innerText = ""; return false;}
    if (falseCount > 0 && trueCount > 0) {
      delSelected.innerText = "Delete Selected"
      delSelected.setAttribute("del-all", false)
      return false;
    } else if (falseCount > 0) {
      delSelected.innerText = ""
      return false;
    }
    delSelected.innerText = "Delete All"
    delSelected.setAttribute("del-all", true)
    return true;
  }

  async function startCart() {
    carts = await fetchDB("carts");
    const cart = carts.find(x => x.user_id == user.id);
    productCartEle.innerHTML = !cart ? '' : cart.product.map(item => {
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

    select.addEventListener("change", () => {
      select_child.forEach((cb) => {
        cb.checked = select.checked;
      });
      updateSelectAll();
      updateCartDetail();
    });

    select_child.forEach(cb => {
      cb.addEventListener("change", async () => {
        select.checked = await updateSelectAll()
        updateCartDetail();
      });
    })

    document.querySelectorAll('.ti-trash').forEach(button => {
      button.onclick = async function() {
        const productId = this.getAttribute('product-id');
        await deleteCart(productId);
        document.getElementById(`cart_product_${productId}`).remove();
      }
    })

    document.getElementById('deleteSelected').addEventListener('click', async () => {
      const all = delSelected.getAttribute('del-all')
      if (all == "false") {
        select_child.forEach(async cb => {
          if (cb.checked) {
            const productId = cb.getAttribute("product-id")
            await deleteCart(productId);
            document.getElementById(`cart_product_${productId}`).remove();
            updateSelectAll();
          }
        })
      } else {
        await deleteCart(0, true);
        location.reload();
        updateSelectAll();
      }
    })
  }

  async function deleteCart(productId, deleteAll = false) {
      await fetch(`http://localhost:3000/carts/delete/${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'auth': JSON.stringify(user)
        },
        body: JSON.stringify({ all: deleteAll })
      });

      await updateCartQty(user.id);
  }

  startCart();
  updateSelectAll();

})();