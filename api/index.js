const express = require('express');
const fs = require('fs').promises;
const cors = require('cors')
const app = express();
const port = 3000;

app.use(cors())
app.use(express.json());

// check credential if exist the API will continue
async function checkUser(creds) {
  try {
    const data = await fs.readFile('data/users.json', 'utf8');
    const users = JSON.parse(data);
    const user = users.find(e => 
      e.id === creds.id && 
      e.username === creds.username && 
      e.password === creds.password
    );

    return user ? true : false;
  } catch (err) {
    console.error('Error reading file:', err);
    throw new Error('Error reading file');
  }
}

// Function to create or update qty carts
async function carts(creds, body, data) {
  let cart = JSON.parse(data);
  const checkUserId = cart.findIndex(x => x.user_id == creds.id);
  if (checkUserId == -1) {
    const newCart = {
      "user_id": creds.id,
      "product": [
        {
          "id": parseInt(body.id),
          "qty": 1
        }
      ]
    };
    cart.push(newCart);
    return cart;
  } else {
    const checkProductId = cart[checkUserId].product.findIndex(x => x.id == parseInt(body.id));
    if (checkProductId == -1) {
      cart[checkUserId].product.push({ id: parseInt(body.id), qty: 1 });
    } else {
      if (body.increase == false) {
        cart[checkUserId].product[checkProductId].qty--;
        if (cart[checkUserId].product[checkProductId].qty == 0) {
          if (cart[checkUserId].product.length == 1) {
            cart.splice(checkUserId, 1);
          } else {
            cart[checkUserId].product.splice(checkProductId, 1);
          }
        }
      } else {
        cart[checkUserId].product[checkProductId].qty++;
      }
    }
  }
  return cart;
}

// Create or update qty of carts
app.post('/carts', async (req, res) => {
  try {
    const creds = JSON.parse(req.headers.auth);
    const check = await checkUser(creds);
    if (!check) {
      return res.status(404).json({ msg: 'user not found' });
    }

    const body = req.body;

    const data = await fs.readFile('data/carts.json', 'utf8');
    const result = await carts(creds, body, data == '' ? "[]" : data);

    await fs.writeFile('data/carts.json', JSON.stringify(result, null, 2));

    if (body.increase == null) {
      res.status(200).json({ msg: 'Item berhasil ditambahkan' });
    } else {
      res.status(200).json({ msg: 'Item berhasil diupdate' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

// Delete from cart logic
app.delete('/carts/delete/:id', async (req, res) => {
  try {
    const creds = JSON.parse(req.headers.auth);
    const check = await checkUser(creds);
    if (!check) {
      return res.status(404).json({ msg: 'user not found' });
    }

    const id = parseInt(req.params.id);
    const data = await fs.readFile('data/carts.json', 'utf8');
    let cart = JSON.parse(data);

    const checkUserId = cart.findIndex(x => x.user_id == creds.id);
    if (checkUserId == -1) {
      return res.status(404).json({ msg: 'cart tidak ditemukan' });
    }

    if (req.body.all) {
      cart.splice(checkUserId, 1);
    } else {
      const checkProductId = cart[checkUserId].product.findIndex(x => x.id == parseInt(id));
      if (checkProductId == -1) {
        return res.status(404).json({ msg: 'product tidak ditemukan di dalam cart' });
      }

      if (cart[checkUserId].product.length == 1) {
        cart.splice(checkUserId, 1);
      } else {
        cart[checkUserId].product.splice(checkProductId, 1);
      }
    }

    await fs.writeFile('data/carts.json', JSON.stringify(cart, null, 2));
    res.status(200).json({ msg: 'berhasil dihapus' });
    } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

function sort(arr, attribute) {
  return arr.sort(function(a,b) { 
    return parseInt(((a[attribute]).split('-'))[1]) < parseInt(((b[attribute]).split('-'))[1]);
  });
}

async function transactions(creds, body, data) {
  let transaction = JSON.parse(data);
  const userTransaction = transaction.filter(x => x.user_id == creds.id);
  let transaction_id = 1;
  if (userTransaction.length > 0) {
    transaction_id = parseInt(userTransaction.sort( 
      function(a, b) {
         return (b['transaction_id']).split("_")[1] - (a['transaction_id']).split("_")[1]
      }
      )[0].transaction_id.split("_")[1]) + 1
  }

  const grandTotal = body.subTotal + body.additionalPrice

  const newTransaction = {
    "transaction_id": `tr${creds.id}_${transaction_id}`,
      "user_id": creds.id,
      "product": body.product,
    "subTotal": body.subTotal,
    "additionalPrice": body.additionalPrice,
    "notes": body.notes,
    "paymentType": body.paymentType,
    "status": "Waiting for seller",
    "amount": grandTotal
  }

  transaction.push(newTransaction);
  return transaction;
}

app.post('/transactions', async (req, res) => {
  try {
    const creds = JSON.parse(req.headers.auth);
    const check = await checkUser(creds);
    if (!check) {
      return res.status(404).json({ msg: 'user not found' });
    }

    const body = req.body;

    const data = await fs.readFile('data/transactions.json', 'utf8');
    const result = await transactions(creds, body, data == '' ? "[]" : data);

    await fs.writeFile('data/transactions.json', JSON.stringify(result, null, 2));

    res.status(200).json({ msg: 'Transaksi berhasil' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });