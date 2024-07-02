const header = document.querySelector("header");

// header.innerHTML = `
//         <link rel="stylesheet" href="assets/css/header.css">
//         <!-- overlay -->
//         <div id="overlay" class="fixed hidden z-40 w-screen h-screen inset-0 bg-gray-900 bg-opacity-60"></div>
    
//         <!-- login register dialog -->
//         <div id="dialog" class="hidden fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-md px-8 py-6 space-y-5 drop-shadow-lg">
//             <h1 class="text-2xl font-semibold">Login Test</h1>

//             <div class="flex justify-end">
//                 <button type="button" onclick="loginhandle()" class="mx-2 px-5 py-2 bg-blue-500 hover:bg-blue-700 text-white cursor-pointer rounded-md">
//                     Login
//                 </button>
//                 <button id="close" class="mx-2 px-5 py-2 bg-red-500 hover:bg-red-700 text-white cursor-pointer rounded-md">
//                     Close
//                 </button>
//             </div>
//         </div>

//         <!-- navbar -->
//         <nav class="bg w-full">
//             <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
//                 <a href="./" class="flex items-center">
//                     <img src="assets/svg/logo.svg" class="h-8" alt="MediCran Logo">
//                 </a>
//                 <div class="items-center justify-between">
//                     <ul class="flex flex-row font-medium">
//                         <li>
//                             <a href="./" class="block py-2 mx-2 text-white">Home</a>
//                         </li>
//                         <li>
//                             <a href="products.html" class="block py-2 mx-2 text-white">Products</a>
//                         </li>
//                         <li>
//                             <a href="about.html" class="block py-2 mx-2 text-white">About Us</a>
//                         </li>
//                     </ul>
//                 </div>
//                 <div class="flex">
//                     <button id="login_open" type="button" class="font-medium text-white">Login</button>
//                 </div>
//             </div>
//         </nav>
// `

const login = document.getElementById('login_open');
const dialog = document.getElementById('dialog');
const closeButton = document.getElementById('close');
const overlay = document.getElementById('overlay');
const form = document.getElementById('login_form');

form.addEventListener('submit', (event) => {
    event.preventDefault()
})

login.addEventListener("click", function() {
    dialog.classList.remove('hidden');
    overlay.classList.remove('hidden');
});

closeButton.addEventListener('click', function () {
    dialog.classList.add('hidden');
    overlay.classList.add('hidden');
});

window.onclick = function(event) {
  if (event.target == overlay) {
    dialog.classList.add('hidden');
    overlay.classList.add('hidden');
  }
}

function handleLogin() {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    fetchDB("user")
      .then(data => {
        const auth = data.user.filter(x => x.username == username && x.password == password)[0]
        if (auth != '') {
            setCookie(auth.username, null, 1, null, null);
            location.href = 'index.html';
        } else { 
            alert("Username atau Password salah")
        }
      }
    ) .catch(error => {
        console.error("Error fetching user data:", error);
      }
    );
}

function setCookie(value, expireDays, expireHours, expireMinutes, expireSeconds) {
    var expireDate = new Date();
    if (expireDays) {
        expireDate.setDate(expireDate.getDate() + expireDays);
    }
    if (expireHours) {
        expireDate.setHours(expireDate.getHours() + expireHours);
    }
    if (expireMinutes) {
        expireDate.setMinutes(expireDate.getMinutes() + expireMinutes);
    }
    if (expireSeconds) {
        expireDate.setSeconds(expireDate.getSeconds() + expireSeconds);
    }
    document.cookie = "username" +"="+ value +
        ";domain="+ window.location.hostname +
        ";path=/"+
        ";expires="+expireDate.toUTCString();
}

function deleteCookie() {
    setCookie("username", "", null , null , null, 1);
}