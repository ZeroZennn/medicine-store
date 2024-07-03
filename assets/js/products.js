(async () => {
const productEle = document.getElementById("products");
const searchEle = document.getElementById("simple-search");
const product = await fetchDB("products");

const options = {
    threshold: 0.3,
    keys: ['name']
}

function displayItem(item) {
    productEle.innerHTML = item.map((item => {
        return (`
            <div class="card cursor-pointer shadow-[0_2px_4px_0_rgba(60,64,67,0.3)] rounded-2xl">
                <img class="w-full h-[240px] object-cover rounded-tl-2xl rounded-tr-2xl" src="${item.image}" alt="">
                <div class="content px-3">
                    <div class="name mt-2 font-semibold">${item.name + " id:" + item.id + " category:" + item.drugs_category}</div>
                    <div class="price font-bold text-[#F8AE1C] text-[18px]">${"Rp. " + item.price}</div>
                    <div class="cart_btn rounded-xl border-2 border-[#37B7C3] flex justify-center py-2 my-3 out text-[#37B7C3] font-semibold cursor-pointer">add to cart</div>
                </div>
            </div>
        `)
    })).join("")
}

searchEle.addEventListener("input", (event) => {
    getProduct(1, 12, event.target.value)
});

// GET URL PARAM
function getArg(argName) {
    const param = new URLSearchParams(window.location.search);
    return param.get(argName);
}

// FILTER
const category = [...new Set(product.products.map((item) =>
    {return item}))];

// GET PRODUCT
function getProduct(pages, items, searchName = '') {
    const start = (pages - 1) * items;
    let productToShow = product.products
    if (getArg('category') != null) {
        productToShow = category.filter(x => (x.drugs_category == getArg("category")))
    }
    if (searchName != null) {
        const fuse = new Fuse(productToShow, options)
        productToShow = (fuse.search(searchName)).map((item) => item.item)
    }
    if (searchName == '') {
        productToShow = product.products
    }
    const products = productToShow.slice(start, start + items);
    displayItem(products)
}

function getProductbyJenis(jenis) {
    fetchDB("products")
      .then(data => {
        const auth = data.user.filter(x => x.username == username && x.password == password)[0]
        if (auth != '') {
            setCookie(auth.username, null, 1, null, null);
            location.href = 'index.html';
        } else { 
            alert("Username atau Password salah")
        }
      }
    ) .catch(error => {
        console.error("Error fetching user data:", error);
      }
    );
}

getProduct(1, 12)
})();