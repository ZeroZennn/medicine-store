(async () => {
const id = getArg('id');
const products = await fetchDB("products")

if (id == null) location.href = "product.html";

const imageEle = document.querySelector(".product_wrapper");
const detailEle = document.querySelector(".product_detail");
const productToShow = products.find(x => x.id == id);

imageEle.innerHTML = `
    <!-- product image -->
    <div class="product_image flex justify-center">
    <img class="bg-slate-300 w-96 border border-gray-300" src="${productToShow.image}" alt="">

    </div>
    <!-- product info -->
    <div class="product_info px-4">
    <dialog id="consultationModal" class="modal">
                    <div class="modal-box lg:w-5/12 lg:max-w-5xl">
                        <form method="dialog">
                            <button class="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-xl">✕</button>
                        </form>
                        <h3 class="text-xl text-gray-600 font-bold mb-4">Konsultasi</h3>
                        <div class="h-[50vh] flex flex-col">
                            <div class="bg-gray-100 flex-1 overflow-y-scroll">
                                <div class="px-4 py-2">
                                    <div class="flex items-center mb-2">
                                        <img class="w-8 h-8 rounded-full mr-2" src="https://picsum.photos/50/50" alt="User Avatar">
                                        <div class="font-medium">MediCran</div>
                                    </div>
                                    <div class="bg-white rounded-lg p-2 shadow mb-2 max-w-sm">
                                        Hi, how can I help you?
                                    </div>
                                    <div class="flex items-center justify-end">
                                        <div class="bg-[#37B7C3] text-white rounded-lg p-2 shadow mr-2 max-w-sm">
                                            Sure, I can help with that.
                                        </div>
                                        <img class="w-8 h-8 rounded-full" src="https://picsum.photos/50/50" alt="User Avatar">
                                    </div>
                                </div>
                            </div>
                            <div class="bg-gray-100 px-4 py-2">
                                <div class="flex items-center">
                                    <input class="w-full border rounded-full py-2 px-4 mr-2" type="text" placeholder="Type your message...">
                                    <button class="bg-[#37B7C3] hover:bg-[#1d929c] text-white font-medium py-2 px-4 rounded-full">
                                Send
                              </button>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </dialog>
        <div class="product_name text-[1.5rem] lg:text-[2rem] font-semibold text-gray-600">${productToShow.name}</div>
        <div class="product_label grid grid-cols-4 text-[16px] mt-4 gap-4">
            <p class="col-span-2 lg:col-span-1 font-semibold text-gray-500">Label Produk</p>
            <div class="label col-span-1 lg:col-span-1 ${productToShow.drugs_category == 'Bebas' ? 'bg-green-500' : 'bg-red-500'} flex justify-center items-center rounded-lg font-medium text-white text-[12px]">
            <p>${productToShow.drugs_category}</p>
            </div>
        </div>
        <div class="product_price grid grid-cols-4 text-[16px] mt-4 gap-4">
            <p class="col-span-2 lg:col-span-1 font-semibold text-gray-500">Harga</p>
            <p class="col-span-2 lg:col-span-1 font-semibold">${"Rp. " + productToShow.price}</p>
        </div>
        <div class="product_stock grid grid-cols-4 text-[16px] mt-4 gap-4">
            <p class="col-span-2 lg:col-span-1 font-semibold text-gray-500">Stok</p>
            <p class="col-span-2 lg:col-span-1">100</p>
        </div>
        <div class="buttons grid lg:grid-cols-2 gap-2 lg:gap-10 mt-10 lg:mt-4">
            <button class="border-2 border-[#37B7C3] text-[1rem] py-2 rounded-lg text-[#37B7C3] font-medium" onclick="consultationModal.showModal()">Chat</button>
            <button product-id="${productToShow.id}" id="add_cart" class="bg-[#37B7C3] text-[1rem] py-2 rounded-lg text-white">Add to Cart</button>
        </div>
    </div>
`

detailEle.innerHTML = `
    <div class="title mt-10 flex justify-center border-b-4 border-gray-200 w-full">
        <p class="text-[#37B7C3] font-semibold text-center border-b-4 border-[#37B7C3] py-2 w-40">Detail Produk</p>
    </div>
    <!-- content -->
    <div class="product_desc mt-6">
        <p class="subtitle font-semibold text-gray-600">Deskripsi</p>
        <p class="content text-gray-500 ">${productToShow.description}</p>
    </div>
    <div class="product_indication mt-6">
        <p class="subtitle font-semibold text-gray-600">Indikasi</p>
        <p class="content text-gray-500">${productToShow.indication}</p>
    </div>
    <div class="product_composition mt-6">
        <p class="subtitle font-semibold text-gray-600">Komposisi</p>
        <p class="content text-gray-500">${productToShow.composition}</p>
    </div>
    <div class="product_dose mt-6">
        <p class="subtitle font-semibold text-gray-600">Dosis</p>
        <p class="content text-gray-500">${productToShow.dosis}</p>
    </div>
    <div class="product_rules mt-6">
        <p class="subtitle font-semibold text-gray-600">Aturan Pakai</p>
        <p class="content text-gray-500">${productToShow.usage}</p>
    </div>
    <div class="product_side_effects mt-6">
        <p class="subtitle font-semibold text-gray-600">Efek Samping</p>
        <p class="content text-gray-500">${productToShow.side_effect}</p>
    </div>
    <div class="product_label mt-6">
        <p class="subtitle font-semibold text-gray-600">Golongan Produk</p>
        <p class="content text-gray-500">Obat ${productToShow.drugs_category} (${productToShow.drugs_category == 'Bebas' ? 'Hijau' : 'Merah'})</p>
    </div>
    <div class="product_packaging mt-6">
        <p class="subtitle font-semibold text-gray-600">Kemasan</p>
        <p class="content text-gray-500">${productToShow.packaging}</p>
    </div>
    <div class="product_manufacture mt-6">
        <p class="subtitle font-semibold text-gray-600">Manufaktur</p>
        <p class="content text-gray-500">${productToShow.manufactured}</p>
    </div>
    <div class="product_bpom mt-6">
        <p class="subtitle font-semibold text-gray-600">No. Registrasi</p>
        <p class="content text-gray-500">${productToShow.reg_num}</p>
    </div>
`

const add = document.getElementById('add_cart')
add.addEventListener("click", async () => {
    if (!user) {
        dialog.classList.remove('hidden');
        overlay.classList.remove('hidden');
    } else {
        const productId = add.getAttribute('product-id');
        let res = await addToCart(productId);
        await Toast.fire({
            icon: 'success',
            title: res.msg,
        })
        await updateCartQty(user.id)
    }
})

})();