(async () => {
const productEle = document.getElementById("products");
const searchEle = document.getElementById("simple-search");
let products = await fetchDB("products");

let currentPage = 1;
const itemsPerPage = 10;

const options = {
    threshold: 0.3,
    keys: ['name']
}

const rupiah = (number)=>{
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
  }

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  iconColor: 'white',
  customClass: {
    popup: 'colored-toast',
  },
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
})

function displayItem(items) {
    productEle.innerHTML = items.map(item => {
        return (`
            <div class="card cursor-pointer shadow-[0_2px_4px_0_rgba(60,64,67,0.3)] rounded-2xl">
                <img product-id="${item.id}" class="detail w-full h-[240px] object-cover rounded-tl-2xl rounded-tr-2xl" src="${item.image}" alt="">
                <div product-id="${item.id}" class="detail name px-3 mt-2 font-semibold">${item.name + " id:" + item.id + " category:" + item.drugs_category}</div>
                <div class="content px-3">
                    <div class="price font-bold text-[#F8AE1C] text-[18px]">${rupiah(item.price)}</div>
                    <button product-id="${item.id}" class="w-full cart_btn rounded-xl border-2 border-[#37B7C3] flex justify-center py-2 my-3 out text-[#37B7C3] font-semibold cursor-pointer">add to cart</button>
                </div>
            </div>
        `);
    }).join("");

    document.querySelectorAll('.detail').forEach(button => {
        button.onclick = async function() {
            const productId = this.getAttribute('product-id');
            location.href = `detail.html?id=${productId}`
        }
    });

    document.querySelectorAll('.cart_btn').forEach(button => {
        button.onclick = async function(event) {
            event.preventDefault();
            if (!user) {
                dialog.classList.remove('hidden');
                overlay.classList.remove('hidden');
            } else {
                const productId = this.getAttribute('product-id');
                let res = await addToCart(productId);
                await Toast.fire({
                    icon: 'success',
                    title: res.msg,
                })
                await updateCartQty(user.id)
          }
        };
    });
}

searchEle.addEventListener("input", (event) => {
    getProduct(1, 10, event.target.value)
});

// FILTER
const category = [...new Set(products.map((item) =>
    {return item}))];

// GET PRODUCT
function getProduct(pages, items, searchName = '') {
    const start = (pages - 1) * items;
    let productToShow = products
    if (getArg('category') != null) {
        productToShow = category.filter(x => (x.drugs_category == getArg("category")))
    }
    if (searchName != null) {
        const fuse = new Fuse(productToShow, options)
        productToShow = (fuse.search(searchName)).map((item) => item.item)
    }
    if (searchName == '') {
        productToShow = products
    }
    productToShow = productToShow.slice(start, start + items);
    displayItem(productToShow)
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

})();