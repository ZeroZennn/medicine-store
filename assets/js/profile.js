(async () => {
  await getUser();
  if (!user) {
    alert("Please login first");
    location.href = "index.html";
  }
  const container = document.getElementById("content");
  const transactionBtn = document.querySelector(".transaction_btn");

  const user_detail = document.getElementById("left");
  const userbioBtn = document.querySelector(".userbio_btn");
  let name, email, no_telp;

  name = document.getElementById("name");
  email = document.getElementById("email");
  no_telp = document.getElementById("no_telp");
  name.value = user.name;
  email.value = user.email;
  no_telp.value = user.no_telp;

  user_detail.innerHTML = `
    <div class="user_image">
        <img class="w=[100px] h-[100px] border border-gray-300 rounded-[50%]"src="assets/svg/avatar.svg" alt="" >
    </div>
        <div class="user_name text-center mt-4 text-[1.5rem] font-semibold text-gray-600">
            <p id="profile_username" >${user.name}</p>
        </div>
        <div class="user_email flex gap-4 mt-5">
            <p>
                ${user.email}
            </p>
        </div>
        <div class="user_number flex gap-4 mt-2">
            <p>
                ${user.no_telp}
            </p>
        </div>
    </div>
  `;

  const update_profile_content = `
    <div class="mb-6">
        <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Nama</label>
        <input type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
    </div>
    <div class="mb-6">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
        <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
    </div>
    <div class="mb-6">
        <label for="no_telp" class="block mb-2 text-sm font-medium text-gray-900">No HP</label>
        <input type="text" id="no_telp" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
    </div>
    <div class="user_bt mt-10 mb-10">
        <button id="update_user_btn" class="bg-[#37B7C3] w-full py-2 rounded-md text-white font-medium">Update Profile</button>
    </div>
  `;

  userbioBtn.addEventListener("click", function () {
    changeContent("user");
  });

  const transaction_content = `
    <p class="font-semibold block lg:hidden">status</p>
    <div class="transaction_status flex gap-2 lg:gap-4 items-center w-full">
        <p class="font-semibold hidden lg:block">status</p>
        <button filter="Semua" id="filter-btn" class="border border-[#37B7C3] lg:py-1 px-2 lg:px-4 text-[12px] lg:text-sm rounded-md text-[#37B7C3] font-medium bg-[#37B7C3]/[.05]">Semua</button>
        <button filter="Berlangsung" id="filter-btn" class="border border-gray-400 lg:py-1 px-2 lg:px-4 text-[12px] lg:text-sm rounded-md text-gray-500">Berlangsung</button>
        <button filter="Berhasil" id="filter-btn" class="border border-gray-400 lg:py-1 px-2 lg:px-4 text-[12px] lg:text-sm rounded-md text-gray-500">Berhasil</button>
        <button filter="Tidak Berhasil" id="filter-btn" class="border border-gray-400 lg:py-1 px-2 lg:px-4 text-[12px] lg:text-sm rounded-md text-gray-500">Tidak Berhasil</button>
    </div>
    <div class="product_card_container">
        
    </div>
  `;

  transactionBtn.addEventListener("click", function () {
    changeContent("transactions");
  });

  async function changeContent(contentName) {
    if (contentName === "user") {
      userbioBtn.classList.add("active");
      transactionBtn.classList.remove("active");
      container.innerHTML = update_profile_content;
      name = document.getElementById("name");
      email = document.getElementById("email");
      no_telp = document.getElementById("no_telp");
      name.value = user.name;
      email.value = user.email;
      no_telp.value = user.no_telp;
    } else {
      transactionBtn.classList.add("active");
      userbioBtn.classList.remove("active");
      container.innerHTML = transaction_content;

      transactionLoader("Semua");
      const transactions_filter = document.querySelectorAll("#filter-btn");
      transactions_filter.forEach((bt) => {
        bt.addEventListener("click", function () {
          const filter = bt.getAttribute("filter");
          transactionLoader(filter);
          transactions_filter.forEach((btt) => {
            if (btt.getAttribute("filter") == filter) {
              btt.setAttribute(
                "class",
                "border border-[#37B7C3] lg:py-1 px-2 lg:px-4 text-[12px] lg:text-sm rounded-md text-[#37B7C3] font-medium bg-[#37B7C3]/[.05]"
              );
            } else {
              btt.setAttribute(
                "class",
                "border border-gray-400 lg:py-1 px-2 lg:px-4 text-[12px] lg:text-sm rounded-md text-gray-500"
              );
            }
          });
        });
      });
    }
  }

  async function transactionLoader(status) {
    const card = document.querySelector(".product_card_container");
    const res = await fetchTransactions(status);
    card.innerHTML = res.data.map(createTransactionCard).join("");

    const transaction_detail_btns = document.querySelectorAll(
      ".transaction_detail_btn"
    );
    transaction_detail_btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const detail = res.data.find(
          (x) => x.transaction_id == btn.getAttribute("trans-id")
        );
        populateTransactionDetails(detail);
      });
    });
  }

  async function fetchTransactions(status) {
    const response = await fetch(`http://localhost:3000/transactions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        auth: JSON.stringify(user),
        status: JSON.stringify(status),
      },
    });
    return response.json();
  }

  function createTransactionCard(item) {
    return `
        <div class="product_items p-4 border border-gray-200 rounded dark:border-gray-700 mt-4">
            <div class="transaction_header flex lg:gap-2 items-center">
                <i class="ti ti-shopping-bag text-md font-bold"></i>
                <p class="text-sm font-semibold">Belanja</p>
            </div>
            <div class="wrapper flex items-center justify-between w-full py-4">
                <div class="product_left flex gap-4 flex-col">
                    <div class="product_detail lg:flex gap-4">
                        <img class="w-[50px] h-[50px] lg:w-[80px] lg:h-[80px] bg-slate-500" src="${
                          item.product[0].image
                        }" alt="">
                        <div class="product_name">${item.product[0].name}</div>
                    </div>
                </div>
                <div class="product_right flex flex-col justify-between items-end gap-14">
                    <div class="transaction_total flex flex-col">
                        <p class="text-sm ">Total Belanja</p>
                        <p class="text-sm font-semibold">${rupiah(
                          item.amount
                        )}</p>
                    </div>
                    <div class="right_bottom flex gap-4 items-center">
                        <div class="transaction_status">
                            <button class="border border-[#ffb20b] lg:py-1 px-2 lg:px-4 text-[12px] lg:text-sm rounded-md text-[#ffb20b] font-medium bg-[#ffb20b]/[.05]">${
                              item.detail
                            }</button>
                        </div>
                        <div class="detail_transaction flex justify-between px-6 py-1 gap-8 rounded-md border text-[#11b919] border-[#11b919] text-sm cursor-pointer">
                            <button trans-id="${
                              item.transaction_id
                            }" class="transaction_detail_btn" onclick="transaction_detail.showModal()">Detail Transaksi</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
  }

  function populateTransactionDetails(detail) {
    const count = detail.product.length;
    const detail_modal = document.getElementById("shopping_summary");
    detail_modal.innerHTML = `
        <h3 class="font-semibold mt-6">Rincian Pembayaran</h3>
        <div class="total_cart flex justify-between mt-4">
            <p class="text-[14px] text-gray-500">Metode Pembayaran</p>
            <p class="text-[14px] text-gray-500">${detail.paymentType}</p>
        </div>
        <div class="border w-full border-gray-200 mt-4"></div>
        <div class="total_cart flex justify-between mt-4">
            <p class="text-[14px] text-gray-500">Keranjang ${
              count ? "( " + count + " Produk )" : ""
            }</p>
            <p class="text-[14px] text-gray-500">${rupiah(detail.subTotal)}</p>
        </div>
        <div class="total_cart flex justify-between mt-2">
            <p class="text-[14px] text-gray-500">Total Ongkir</p>
            <p class="text-[14px] text-gray-500">${rupiah(5000)}</p>
        </div>
        <div class="total_cart flex justify-between mt-2">
            <p class="text-[14px] text-gray-500">Biaya Penanganan</p>
            <p class="text-[14px] text-gray-500">${rupiah(5000)}</p>
        </div>
        <div class="border w-full border-gray-200 mt-4"></div>
        <div class="shopping_total flex justify-between mt-4">
            <h3 class="font-semibold">Total Belanja</h3>
            <h3 class="font-semibold">${rupiah(detail.amount)}</h3>
        </div>
    `;
  }

  const updateUserBtn = document.getElementById("update_user_btn");
  updateUserBtn.addEventListener("click", () => {
    updateUser(name.value, email.value, no_telp.value);
  });

  async function updateUser(name, email, no_telp) {
    let data = {
      name: name,
      email: email,
      no_telp: no_telp,
    };

    const res = await fetch(`http://localhost:3000/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        auth: JSON.stringify(user),
      },
      body: JSON.stringify(data),
    });

    const swal = await res.json();
    await Toast.fire({
      icon: "success",
      title: swal.msg,
    });
    location.reload();
  }
})();
