const express = require('express');
const fs = require('fs').promises;
const cors = require('cors')
const app = express();
const port = 3000;

app.use(cors())
app.use(express.json());

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

async function checkAdmin(creds) {
  try {
    const data = await fs.readFile('data/users.json', 'utf8');
    const users = JSON.parse(data);
    const user = users.find(e => 
      e.id === creds.id && 
      creds.id === 0 &&
      e.username === creds.username &&
      creds.username === "admin" &&
      e.password === creds.password &&
      creds.password === "admin"
    );

    return user ? true : false;
  } catch (err) {
    console.error('Error reading file:', err);
    throw new Error('Error reading file');
  }
}

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

async function addTransactions(creds, body, data) {
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
    "status": "Berlangsung",
    "detail": "Menunggu Penjual",
    "amount": grandTotal
  }

  transaction.push(newTransaction);
  return transaction;
}

async function getTransactions(creds, status, data) {
  const transaction = JSON.parse(data);
  let userTransaction;
  if (creds.id == 0) {
    userTransaction = transaction;
  } else {
    userTransaction = transaction.filter(x => x.user_id == creds.id);
  }
  if (status != "Semua") {
    userTransaction  = userTransaction.filter(x => x.status == status)
  }
  let result = userTransaction.sort((a, b) =>  b['transaction_id'].split("_")[1] - a['transaction_id'].split("_")[1])

  const file = await fs.readFile('data/products.json', 'utf8');
  const products = JSON.parse(file)

  const productMap = {};
  products.forEach(product => {
    productMap[product.id] = product.image;
  });
  
  result.forEach(transaction => {
    transaction.product.forEach(product => {
      product.image = productMap[product.id] || null;
    });
  });

  const userFile = await fs.readFile('data/users.json', 'utf8');
  const users = JSON.parse(userFile)

  const userMap = {};
  users.forEach(user => {
    userMap[user.id] = user.name;
  });
  
  result.forEach(transaction => {
    transaction.name = userMap[transaction.user_id] || null;
  });

  return result;
}

app.get('/transactions', async (req, res) => {
  try {
    const creds = JSON.parse(req.headers.auth);
    const status = JSON.parse(req.headers.status)
    const check = await checkUser(creds);
    if (!check) {
      return res.status(404).json({ msg: 'user not found' });
    }

    const data = await fs.readFile('data/transactions.json', 'utf8');
    const result = await getTransactions(creds, status, data == '' ? "[]" : data);

    res.status(200).json({ data: result });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

app.post('/transactions', async (req, res) => {
  try {
    const creds = JSON.parse(req.headers.auth);
    const check = await checkUser(creds);
    if (!check) {
      return res.status(404).json({ msg: 'user not found' });
    }

    const body = req.body;

    const data = await fs.readFile('data/transactions.json', 'utf8');
    const result = await addTransactions(creds, body, data == '' ? "[]" : data);

    await fs.writeFile('data/transactions.json', JSON.stringify(result, null, 2));

    res.status(200).json({ msg: 'Transaksi berhasil' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

app.put('/transactions', async (req, res) => {
  try {
    const creds = JSON.parse(req.headers.auth);
    const check = await checkAdmin(creds);
    if (!check) {
      return res.status(404).json({ msg: 'Not Admin' });
    }

    const body = req.body;

    const data = await fs.readFile('data/transactions.json', 'utf8');
    let transactions = JSON.parse(data);
    let filter = transactions.findIndex(x => x.transaction_id == body.id)

    if (filter >= 0) {
      transactions[filter].detail = "Dikonfirmasi dan Dikirim oleh Penjual"
    } else {
      res.status(404).json({msg: 'Transaksi tidak ditemukan'})
    }

    await fs.writeFile('data/transactions.json', JSON.stringify(transactions, null, 2));

    res.status(200).json({ msg: 'Transaksi Diverifikasi' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

app.post('/register', async (req, res) => {
  try {
    const body = req.body;
    const file = await fs.readFile('data/users.json', 'utf8');
    const data = JSON.parse(file);

    const checkUser = data.findIndex(x => x.username == body.username)
    const checkEmail = data.findIndex(x => x.email == body.email)

    if (checkUser != -1 && checkEmail != -1) {
      return res.status(409).json({ msg: 'Username dan Email telah terpakai' });
    } else if (checkEmail != -1) {
      return res.status(409).json({ msg: 'Email telah terpakai' });
    } else if (checkUser != -1) {
      return res.status(409).json({ msg: 'Username telah terpakai' });
    }

    let user_id = 1;
    if (data.length > 0) {
      user_id = data.sort( 
        function(a, b) {
          return (b['id']) - (a['id'])
        })[0].id + 1
    }

    const newUser = {
      "id": user_id,
      "username": body.username,
      "name": body.username,
      "password": body.password,
      "no_telp": "",
      "email": body.email,
      "address": ""
    }

    data.push(newUser);

    await fs.writeFile('data/users.json', JSON.stringify(data, null, 2));
    res.status(200).json({ msg: 'Berhasil Register' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

async function updateUser(creds, body, data) {
  let users = JSON.parse(data);
  const userIndex = users.findIndex(x => x.id == creds.id)
  console.log(userIndex)
  if (userIndex !== -1) {
    users[userIndex].email = body.email || users[userIndex].email;
    users[userIndex].no_telp = body.no_telp || users[userIndex].no_telp;
    users[userIndex].name = body.name || users[userIndex].name;
    users[userIndex].address = body.address || users[userIndex].address;
  }

  return users;
}

app.put('/user', async (req, res) => {
  try {
    const creds = JSON.parse(req.headers.auth);
    const check = await checkUser(creds);
    if (!check) {
      return res.status(404).json({ msg: 'user not found' });
    }

    const body = req.body;
    const data = await fs.readFile('data/users.json', 'utf8');
    const result = await updateUser(creds, body, data);

    await fs.writeFile('data/users.json', JSON.stringify(result, null, 2));

    res.status(200).json({ msg: "Update data berhasil" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});