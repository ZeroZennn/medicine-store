function getProductsData() {
    return fetch('data.json')
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