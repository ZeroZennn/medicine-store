const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

// update products data
app.post('/products', (req, res) => {
  const product = req.body;

  // Read existing data from JSON file
  fs.readFile('data/cart.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ message: 'Error reading file' });
    }

    let products = JSON.parse(data);
    products = product;

    // Write updated data back to JSON file
    fs.writeFile('data/cart.json', JSON.stringify(products, null, 2), (err) => {
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