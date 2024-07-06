const express = require('express');
const fs = require('fs');
var cors = require('cors')
const app = express();
const port = 3000;


app.use(cors())
app.use(express.json());


// add or update the qty cart of user_id
app.post('/cart/add', (req, res) => {
  const body = req.body;

  // Read existing data from JSON file
  fs.readFile('data/cart.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ message: 'Error reading file' });
    }

    let cart = JSON.parse(data);
    const checkUserId = cart.cart.findIndex(x => x.user_id == body.user_id);
    const checkProductId = cart.cart[checkUserId].product.findIndex(x => x.id == body.id);
    if (checkProductId >= 0) {
      cart.cart[checkUserId].product[checkProductId].qty++;
    } else {
      cart.cart[checkUserId].product.push({id: parseInt(body.id), qty: 1});
    }

    // Write updated data back to JSON file
    fs.writeFile('data/cart.json', JSON.stringify(cart, null, 2), (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).json({ message: 'Error writing file' });
      }

      res.status(200).json({ message: 'cart updated successfully' });
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});