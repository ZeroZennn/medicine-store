function fetchDB(table) {
  return fetch(`data/${table}.json`);
}

function userLogin(username, password) {
    console.log(fetchDB("user"));

}

function userRegister(username, password) {
    
}

function handleLogin() {
  
}

function handleRegister() {
  alert("test");
}

function getProductsData() {
  return fetch('data/products.json')
    .then(response => response.json())
    .then(data => data);
}

const fetchProductsButton = document.getElementById('fetch-products-btn');
const productsContainer = document.getElementById('products-container');

fetchProductsButton.addEventListener('click', () => {
  getProductsData().then(data => {
    console.log(data);
  });
});