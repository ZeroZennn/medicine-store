(async () => {
const productEle = document.getElementById("products");
const searchEle = document.getElementById("simple-search");
let product = await fetchDB("products");

let currentPage = 1;
const itemsPerPage = 10;

const options = {
    threshold: 0.3,
    keys: ['name']
}

function displayItem(items) {
    productEle.innerHTML = items.map(item => {
        return (`
            <div class="card cursor-pointer shadow-[0_2px_4px_0_rgba(60,64,67,0.3)] rounded-2xl">
                <img class="w-full h-[240px] object-cover rounded-tl-2xl rounded-tr-2xl" src="${item.image}" alt="">
                <div class="content px-3">
                    <div class="name mt-2 font-semibold">${item.name + " id:" + item.id + " category:" + item.drugs_category}</div>
                    <div class="price font-bold text-[#F8AE1C] text-[18px]">${"Rp. " + item.price}</div>
                    <button product-id="${item.id}" class="cart_btn rounded-xl border-2 border-[#37B7C3] flex justify-center py-2 my-3 out text-[#37B7C3] font-semibold cursor-pointer">add to cart</button>
                </div>
            </div>
        `);
    }).join("");

    document.querySelectorAll('.cart_btn').forEach(button => {
        button.onclick = async function(event) {
          event.preventDefault();
          if (!user) {
            dialog.classList.remove('hidden');
            overlay.classList.remove('hidden');
          } else {
            const productId = this.getAttribute('product-id');
            addToCart(productId);
          }
        };
      });
}

searchEle.addEventListener("input", (event) => {
    getProduct(1, 10, event.target.value)
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

// handle pagination
function handlePagination(event) {
    event.preventDefault();
    const target = event.target.closest('a');
    if (!target) return;

    const page = target.getAttribute('data-page');
    // const totalPages = Math.ceil(products.length / productsPerPage);

    if (page === "prev" && currentPage > 1) {
        currentPage--;
    } else if (page === "next") {
        currentPage++;
    } else if (!isNaN(page)) {
        currentPage = parseInt(page);
    }
    getProduct(currentPage, itemsPerPage, searchEle.value);
    updatePagination(currentPage);
}

// pagiantion when active
function updatePagination(currentPage) {
    const paginationButtons = document.querySelectorAll('.pagination a[data-page]');
    paginationButtons.forEach(button => {
        button.classList.remove('z-10', 'text-[#37B7C3]', 'border-[#37B7C3]', 'bg-blue-50', 'hover:bg-blue-100', 'hover:text-blue-700');
        button.classList.add('text-gray-500', 'bg-white', 'border-gray-300', 'hover:bg-gray-100', 'hover:text-gray-700');

        const page = button.getAttribute('data-page');
        if (parseInt(page) === currentPage) {
            button.classList.add('z-10', 'text-[#37B7C3]', 'border-[#37B7C3]', 'bg-blue-50', 'hover:bg-blue-100', 'hover:text-blue-700');
            button.classList.remove('text-gray-500', 'bg-white', 'border-gray-300', 'hover:bg-gray-100', 'hover:text-gray-700');
        }
    });
}

document.querySelector('.pagination').addEventListener('click', handlePagination);

getProduct(currentPage, itemsPerPage);

// Add to cart
async function addToCart(productId) {
    await fetch('http://localhost:3000/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user_id: user.id, id: productId})
    })
      .then(response => response.json())
      .then(data => console.log('Success:', data))
      .catch(error => console.error('Error:', error));
      
    await updateCartQty(user.id)
}

})();