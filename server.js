const express = require('express');
const fs = require('fs');
var cors = require('cors')
const app = express();
const port = 3000;

app.use(cors())
app.use(express.json());

function carts(body, data) {
  let cart = JSON.parse(data);
  const checkUserId = cart.findIndex(x => x.user_id == body.user_id);
  const checkProductId = cart[checkUserId].product.findIndex(x => x.id == body.id);
  if (checkProductId >= 0) {
    if (body.increase == false) {
      cart[checkUserId].product[checkProductId].qty--;
      if(cart[checkUserId].product[checkProductId].qty == 0) {
        cart[checkUserId].product.splice(checkProductId, 1)
      }
    } else {
      cart[checkUserId].product[checkProductId].qty++;
    }
  } else {
    cart[checkUserId].product.push({id: parseInt(body.id), qty: 1});
  }
  return cart;
}

// add or update the qty cart of user_id
app.post('/carts', (req, res) => {
  const body = req.body;

  // Read existing data from JSON file
  fs.readFile('data/carts.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ message: 'Error reading file' });
    }

    let result = carts(body, data);

    // Write updated data back to JSON file
    fs.writeFile('data/carts.json', JSON.stringify(result, null, 2), (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).json({ message: 'Error writing file' });
      }

      res.status(200).json({ message: 'cart updated successfully' });
    });
  });
});

app.post('/carts/delete', (req, res) => {
  const body = req.body;

  // Read existing data from JSON file
  fs.readFile('data/carts.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ message: 'Error reading file' });
    }

    let cart = JSON.parse(data)

    const checkUserId = cart.findIndex(x => x.user_id == body.user_id);
    const checkProductId = cart[checkUserId].product.findIndex(x => x.id == body.id);

    if (body.all == true) {
      cart.splice(checkUserId, 1)
    } else {
      cart[checkUserId].product.splice(checkProductId, 1)
    }

    // Write updated data back to JSON file
    fs.writeFile('data/carts.json', JSON.stringify(cart, null, 2), (err) => {
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