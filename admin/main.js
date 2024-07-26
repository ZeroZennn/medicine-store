(async () => {
async function fetchDB(table) {
    try {
        const response = await fetch(`../data/${table}.json`);
    
        if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const text = await response.text();
    
        if (!text.trim()) {
        return [];
        }
    
        const result = JSON.parse(text);
        return result;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}

async function isLogin() {
    let cookie = document.cookie;
    cookie = cookie.replace("username=", "")
    let loginInfo;
    if (cookie != '') {
        await fetchDB("users")
            .then(data => {
                loginInfo = data.find(x => x.username == cookie && cookie == "admin");
            }) .catch(error => {
                console.error("Error fetching user data:", error);
            }
        );
    } else {
        alert("you are not admin")
        location.href = "../"
    }
    if (!loginInfo) {
        alert("you are not admin")
        location.href = "../"
    }
    return loginInfo
}

const user = await isLogin();

const data = await fetch(`http://localhost:3000/transactions`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'auth': JSON.stringify(user),
        'status': JSON.stringify('Semua')
    }
  });

const transactions = await data.json();

const row = document.getElementById('table_body')
row.innerHTML = transactions.data.map((item, index) => {
    return (`
        <tr>
            <th>${index + 1}</th>
            <td>${item.transaction_id}</td>
            <td>${item.name}</td>
            <td>${item.detail}</td>
            <td class="p-1 flex gap-2">
            <button trans-id="${item.transaction_id}" id="verif_button" class="cursor-pointer text-green-500 flex justify-center border rounded border-green-500 px-4 p-1">Verif</button>
            </td>
        </tr>
    `);
}).join("");

const verif_button = document.querySelectorAll("#verif_button")

verif_button.forEach(btn => {
    btn.addEventListener("click", async () => {
        const response = await fetch(`http://localhost:3000/transactions`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth': JSON.stringify(user)
            },
            body: JSON.stringify({id: btn.getAttribute("trans-id")})
        });
        const jss = await response.json()
        console.log(jss.msg)
    })
})

{/* <button trans-id="${item.transaction_id}" class="cursor-pointer text-blue-500 flex justify-center border rounded border-blue-500 px-4 p-1" onclick="transaction_detail.showModal()">detail</button> */}

})();