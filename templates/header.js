const header = document.querySelector("header");

header.innerHTML = `
        <!-- overlay -->
        <link rel="stylesheet" href="assets/css/header.css">
        <div id="overlay" class="fixed hidden z-40 w-screen h-screen inset-0 bg-gray-900 bg-opacity-60"></div>

        <div id="dialog" class="hidden fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full rounded-md px-8 py-6 space-y-5 drop-shadow-lg">
            <main class="flex justify-center">
                <!-- login register dialog -->
                <div class="box">
                    <div class="top w-full flex ms-[-1.5rem] mt-7 lg:mb-0 lg:ms-1 lg:mt-[-40px]">
                        <button id="close" class="lg:end-2.5 text-gray-300 lg:text-white bg-transparentrounded-lg text-sm w-5 h-5 lg:w-8 lg:h-8 ms-auto inline-flex justify-center items-center">
                            <svg class="w-8 h-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div class="inner-box">
                        <div class="forms-wrap">
                            <form onSubmit="handleLogin(event)" id="login_form" class="form_sign sign-in-form">
                                <div class="logo">
                                    <img src="assets/svg/logo_blue.png" alt="medicran" />
                                </div>
                    
                                <div class="heading_login">
                                    <h2>Welcome Back</h2>
                                    <h6>Not registred yet?</h6>
                                    <a href="#" class="toggle_login">Sign up</a>
                                </div>
                    
                                <div class="actual-form">
                                    <div class="input-wrap">
                                    <input
                                        type="username" 
                                        name="username" 
                                        id="username"
                                        class="input-field"
                                        autocomplete="off"
                                        required
                                    />
                                    <label>Username</label>
                                    </div>
                    
                                    <div class="input-wrap">
                                    <input
                                        type="password" 
                                        name="password" 
                                        id="password"
                                        class="input-field"
                                        autocomplete="off"
                                        required
                                    />
                                    <label>Password</label>
                                    </div>
                    
                                    <button id="submit" type="submit" class="w-full text-white bg-gray-900 hover:bg-[#37B7C3] font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-4">Sign In</button>
                    
                                    <p class="text">
                                    Forgotten your password or you login datails?
                                    <a href="#">Get help</a> signing in
                                    </p>
                                </div>
                            </form>
    
                            <!-- REGISTERR -->
                            <form onsubmit="handleRegister(event)" class="form_sign sign-up-form">
                                <div class="logo">
                                    <img src="assets/svg/logo_blue.png" alt="medicran" />
                                </div>
                
                                <div class="heading_login">
                                    <h2>Get Started</h2>
                                    <h6>Already have an account?</h6>
                                    <a href="#" class="toggle_login">Sign in</a>
                                </div>
                    
                                <div class="actual-form">
                                    <div class="input-wrap">
                                        <input
                                            type="username" 
                                            name="username" 
                                            id="username-register"
                                            minlength="4"
                                            class="input-field"
                                            autocomplete="off"
                                            required
                                        />
                                        <label>Username</label>
                                    </div>
                    
                                    <div class="input-wrap">
                                        <input
                                            type="email"
                                            id="email-register"
                                            class="input-field"
                                            autocomplete="off"
                                            required
                                        />
                                        <label>Email</label>
                                    </div>
                    
                                    <div class="input-wrap">
                                        <input
                                            type="password"
                                            id="password-register"
                                            minlength="4"
                                            class="input-field"
                                            autocomplete="off"
                                            required
                                        />
                                        <label>Password</label>
                                    </div>
                    
                                    <button id="submit" type="submit" class="w-full text-white bg-gray-900 hover:bg-[#37B7C3] font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-4">Register</button>
                    
                                    <p class="text">
                                    By signing up, I agree to the
                                    <a href="#">Terms of Services</a> and
                                    <a href="#">Privacy Policy</a>
                                    </p>
                                </div>
                            </form>
                        </div>
                
                        <div class="carousel_login">
                            <!--<div class="images-wrapper">
                            <img src="" class="image img-1 show" alt="" />
                            <img src="" class="image img-2" alt="" />
                            <img src="" class="image img-3" alt="" />
                            </div>
                
                            <div class="text-slider">
                                <div class="text-wrap">
                                    <div class="text-group">
                                    <h2>Create your own courses</h2>
                                    <h2>Customize as you like</h2>
                                    <h2>Invite students to your class</h2>
                                    </div>
                                </div>
                    
                                <div class="bullets">
                                    <span class="active" data-value="1"></span>
                                    <span data-value="2"></span>
                                    <span data-value="3"></span>
                                </div>
                            </div>-->
                        </div> 
                    </div>
                </div>
            </main>
        </div>

        <!-- navbar -->
        <nav class="bg w-full">
            <div class="px-14 flex flex-wrap items-center justify-between mx-auto py-4  ">
                <a href="./" class="flex items-center">
                    <img src="assets/svg/logo.svg" class="h-8" alt="MediCran Logo">
                </a>
                <div class="items-center justify-between">
                    <ul class="flex flex-row font-medium gap-6">
                        <li>
                            <a href="./" class="block py-2 mx-2 text-white">Home</a>
                        </li>
                        <li>
                            <a href="products.html" class="block py-2 mx-2 text-white">Products</a>
                        </li>
                        <li>
                            <a href="about.html" class="block py-2 mx-2 text-white">About Us</a>
                        </li>
                    </ul>
                </div>
                <div id="login_div">
                    <button id="login_open" type="button" class="font-medium text-white">Sign In</button>
                </div>
                
                <div id="islogin_div" class="hidden">
                    <ul class="flex flex-row font-medium">
                        <li>
                            <a href="cart.html" class="flex items-center">
                                <i class="ti ti-shopping-cart text-white text-[30px] mr-3"></i>
                                <span id="qtyCart" class="absolute mt-[-1.5rem] ms-[1.5rem] bg-red-600 flex justify-center items-center px-[5px] text-[12px] rounded-md text-white font-semibold" ></span>
                            </a>
                        </li>
                        <li>
                            <a id="dropdownUserBtn" href="profile.html" class="flex items-center">
                                <img src="assets/svg/avatar.svg" class="h-8 ml-2" alt="User Avatar">
                                <p id="login_username" class="text-white block mx-1"></p>
                            </a>
                            <!-- Dropdown menu -->
                            <div id="dropdownUser" class="hidden absolute mt-2 ms-[-10rem] z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-64">
                                <ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdownHoverButton">
                                    <li  class="px-4 py-2 flex gap-2 items-center">
                                        <div class="user_img">
                                            <img class="w=[50px] h-[50px] border border-gray-300 rounded-[50%]"src="assets/svg/avatar.svg" alt="" >
                                        </div>
                                        <div class="user_text">
                                            <p class="name text-[0.9rem]">name</p>
                                            <p class="email text-[0.7rem]">Email</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="border border-gray-200"></div>
                                    </li>
                                    <li id="adminEle">
                                        <a id="adminEle" href="admin/" class="block px-4 py-2 hover:bg-gray-100">Admin Dashboard</a>
                                    </li>
                                    <li id="userEle">
                                        <a id="userEle" href="profile.html" class="block px-4 py-2 hover:bg-gray-100">Dashboard</a>
                                    </li>
                                    <li id="userEle">
                                        <a id="userEle" href="cart.html" class="block px-4 py-2 hover:bg-gray-100">Carts</a>
                                    </li>
                                    
                                    <li>
                                        <button onclick="logout()" class="w-full px-4 py-2 hover:bg-gray-100 gap-2 flex items-center">
                                            <i class="ti ti-logout"></i>
                                            <p>Logout</p>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>  
                </div>
                <div class="items-center justify-between flex lg:hidden mx-auto mt-5">
                    <ul class="flex flex-row font-medium gap-6">
                        <li>
                            <a href="./" class="block py-2 mx-2 text-white">Home</a>
                        </li>
                        <li>
                            <a href="products.html" class="block py-2 mx-2 text-white">Products</a>
                        </li>
                        <li>
                            <a href="about.html" class="block py-2 mx-2 text-white">About Us</a>
                        </li>
                    </ul>
                </div>
                
            </div>
        </nav>
`;

function loginDialog() {
 const login = document.getElementById("login_open");
 const dialog = document.getElementById("dialog");
 const closeButton = document.getElementById("close");
 const overlay = document.getElementById("overlay");
 const form = document.getElementById("login_form");

 form.addEventListener("submit", (event) => {
  event.preventDefault();
 });

 login.addEventListener("click", function () {
  dialog.classList.remove("hidden");
  overlay.classList.remove("hidden");
 });

 closeButton.addEventListener("click", function () {
  dialog.classList.add("hidden");
  overlay.classList.add("hidden");
 });

 window.onclick = function (event) {
  if (event.target == overlay) {
   dialog.classList.add("hidden");
   overlay.classList.add("hidden");
  }
 };
}

// Login Form Slider
const inputs = document.querySelectorAll(".input-field");
const toggle_login_btn = document.querySelectorAll(".toggle_login");
const mainEle = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");

inputs.forEach((inp) => {
 inp.addEventListener("focus", () => {
  inp.classList.add("active");
 });
 inp.addEventListener("blur", () => {
  if (inp.value != "") return;
  inp.classList.remove("active");
 });
});

toggle_login_btn.forEach((btn) => {
 btn.addEventListener("click", () => {
  mainEle.classList.toggle("sign-up-mode");
  inputs.forEach((cb) => {
   cb.value = "";
  });
 });
});

function moveSlider() {
 let index = this.dataset.value;

 let currentImage = document.querySelector(`.img-${index}`);
 images.forEach((img) => img.classList.remove("show"));
 currentImage.classList.add("show");

 const textSlider = document.querySelector(".text-group");
 textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

 bullets.forEach((bull) => bull.classList.remove("active"));
 this.classList.add("active");
 inputs.forEach((cb) => {
  cb.value = "";
 });
}

bullets.forEach((bullet) => {
 bullet.addEventListener("click", moveSlider);
});

// Handle Login
function handleLogin(event) {
 event.preventDefault();
 const username = document.getElementById("username").value;
 const password = document.getElementById("password").value;
 fetchDB("users")
  .then((user) => {
   const auth = user.filter(
    (x) => x.username == username && x.password == password
   )[0];
   if (auth) {
    setCookie(auth.username, null, 1, null, null);
    Swal.fire({
     position: "center",
     icon: "success",
     title: "Berhasil Login",
     showConfirmButton: false,
     timer: 1800,
    }).then(() => {
     location.reload();
    });
   } else {
    Swal.fire({
     title: "Oops...",
     text: "Username atau password salah",
     icon: "error",
    });
   }
  })
  .catch((error) => {
   console.error("Error fetching user data:", error);
  });
}

async function handleRegister(event) {
 event.preventDefault();
 const username = document.getElementById("username-register").value;
 const password = document.getElementById("password-register").value;
 const email = document.getElementById("email-register").value;

 const res = await fetch(`http://localhost:3000/register`, {
  method: "POST",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify({
   email: email,
   username: username,
   password: password,
  }),
 });
 const response = await res.json();
 if (res.status == 409) {
  await Toast.fire({
   icon: "error",
   title: response.msg,
  });
 } else if (res.status == 200) {
  await Toast.fire({
   icon: "success",
   title: response.msg,
  });
 }
 location.reload();
}

// Set Cookie for Login
function setCookie(
 value,
 expireDays,
 expireHours,
 expireMinutes,
 expireSeconds
) {
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
 document.cookie =
  "username" +
  "=" +
  value +
  ";domain=" +
  window.location.hostname +
  ";path=/" +
  ";expires=" +
  expireDate.toUTCString();
}

// Handle Logout then refresh
function logout() {
 Swal.fire({
  title: "Apakah kamu yakin?",
  text: "Kamu akan logout !",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#d33",
  cancelButtonColor: "#ACACAC",
  confirmButtonText: "Logout",
 }).then((result) => {
  if (result.isConfirmed) {
   Swal.fire({
    title: "Berhasil Logout",
    text: "Kamu Akan diarahkan ke halaman utama.",
    icon: "success",
    showConfirmButton: false,
    timer: 1300,
   }).then(() => {
    setCookie("username", "", null, null, null, 1);
    location.href = "index.html";
   });
  }
 });
}

// dropdown user
document.addEventListener("DOMContentLoaded", function () {
 const dropdownUserBtn = document.getElementById("dropdownUserBtn");
 const dropdownUser = document.getElementById("dropdownUser");

 dropdownUserBtn.addEventListener("mouseenter", () => {
  dropdownUser.classList.remove("hidden");
 });

 dropdownUserBtn.addEventListener("mouseleave", () => {
  setTimeout(() => {
   if (!dropdownUser.matches(":hover")) {
    dropdownUser.classList.add("hidden");
   }
  }, 100);
 });

 dropdownUser.addEventListener("mouseleave", () => {
  dropdownUser.classList.add("hidden");
 });

 dropdownUser.addEventListener("mouseenter", () => {
  dropdownUser.classList.remove("hidden");
 });
});

async function main() {
 await getUser();
 if (user) {
  const login_div = document.getElementById("login_div");
  const islogin_div = document.getElementById("islogin_div");
  const username = document.getElementById("login_username");
  const name = document.querySelector(".name");
  const email = document.querySelector(".email");
  login_div.classList.add("hidden");
  islogin_div.classList.remove("hidden");
  username.innerHTML = user.username;
  name.innerHTML = user.name;
  email.innerHTML = user.email;
  await updateCartQty(user.id);
  if (user.username != "admin") {
   document.querySelectorAll("#adminEle").forEach((cb) => {
    cb.setAttribute("class", "hidden");
   });
  } else {
   document.querySelectorAll("#userEle").forEach((cb) => {
    cb.setAttribute("class", "hidden");
   });
  }
 } else {
  loginDialog();
 }
}

main();
