const user_profile = document.getElementById("user_profile");

user_profile.innerHTML = `
    <div class="left py-10 lg:col-span-4 bg-white flex justify-center items-center flex-col rounded-lg shadow-[0_2px_4px_0_rgba(60,64,67,0.3)] border border-gray-300 lg:h-[80vh]">
        <div class="user_image">
            <img class="w=[100px] h-[100px] border border-gray-300 rounded-[50%]"src="assets/svg/avatar.svg" alt="" >
        </div>
        
            <div class="user_name text-center mt-4 text-[1.5rem] font-semibold text-gray-600">
                <p id="profile_username" >Achmad Zikran Maulida</p>
            </div>
            <div class="user_email grid grid-cols-2 mt-5">
                <p>
                    email
                </p>
                <p>
                    zikran1234@gmail.com
                </p>
            </div>
            <div class="user_number grid grid-cols-2 mt-2">
                <p>
                    No Hp
                </p>
                <p>
                    0812345678
                </p>
            </div>
        </div>
    </div>
    <div class="right lg:col-span-8  bg-white rounded-lg border border-gray-200">
        <div class="nav_profile flex gap-10 py-3 px-6 bg-slate-100 rounded-t-lg">
            <button class="userbio_btn cursor-pointer" onclick="toggleProfile('edit')">Biodata Diri</button>
            <button class="transaction_btn cursor-pointer" onclick="toggleProfile('transaction')">Transaksi</button>
        </div>
        <!-- profile edit -->
        <div class="edit_profile px-4 lg:px-12 mt-5">
            <div class="mb-6">
                <label for="default-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama</label>
                <input type="text" id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
            <div class="mb-6">
                <label for="default-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input type="text" id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
            <div class="mb-6">
                <label for="default-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No HP</label>
                <input type="text" id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
            <div class="user_bt mt-10 mb-10">
                <button class="bg-[#37B7C3] w-full py-2 rounded-md text-white font-medium">Update Profile</button>
            </div>
        </div>
        <!-- user transaction  -->
        <div class="user_transaction px-4 lg:px-12 mt-5">
            <p class="font-semibold block lg:hidden">status</p>
            <div class="transaction_status flex gap-2 lg:gap-4 items-center w-full">
                <p class="font-semibold hidden lg:block">status</p>
                <button class="border border-[#37B7C3] lg:py-1 px-2 lg:px-4 text-[12px] lg:text-sm rounded-md text-[#37B7C3] font-medium bg-[#37B7C3]/[.05]">semua</button>
                <button class="border border-gray-400 lg:py-1 px-2 lg:px-4 text-[12px] lg:text-sm rounded-md text-gray-500">berlangsung</button>
                <button class="border border-gray-400 lg:py-1 px-2 lg:px-4 text-[12px] lg:text-sm rounded-md text-gray-500">berhasil</button>
                <button class="border border-gray-400 lg:py-1 px-2 lg:px-4 text-[12px] lg:text-sm rounded-md text-gray-500">tidak berhasil</button>
            </div>

            <div class="card_container">
                <div class="product_items p-4 border border-gray-200 rounded dark:border-gray-700 mt-4">
                    <div class="transaction_header flex lg:gap-2 items-center">
                        <i class="ti ti-shopping-bag text-md font-bold"></i>
                        <p class="text-sm font-semibold">Belanja</p>
                        
                    </div>
                    <div class="wrapper flex items-center justify-between w-full py-4">
                        <!-- product detail -->
                        <div class="product_left flex gap-4 flex-col">
                            <div class="product_detail lg:flex gap-4">
                                <img class="w-[50px] h-[50px] lg:w-[80px] lg:h-[80px] bg-slate-500" src="" alt="">
                                <div class="product_name">Product #1</div>
                            </div>
                        </div>
                        <div class="product_right flex flex-col justify-between items-end gap-14">
                            <div class="transaction_total flex flex-col">
                                <p class="text-sm ">Total Belanja</p>
                                <p class="text-sm font-semibold">Rp. 50.000</p>
                            </div>
                            <div class="right_bottom flex gap-4 items-center">
                                <div class="transaction_status">
                                    <button class="border border-[#ffb20b] lg:py-1 px-2 lg:px-4 text-[12px] lg:text-sm rounded-md text-[#ffb20b] font-medium bg-[#ffb20b]/[.05]">berlangsung</button>
                                </div>
                                <div class="detail_transaction flex justify-between px-6 py-1 gap-8 rounded-md border text-[#11b919] border-[#11b919] text-sm cursor-pointer">
                                    <p>Detail Transaksi</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`

// swap function
document.addEventListener('DOMContentLoaded', function() {

    toggleProfile('edit');

    const userbioBtn = document.querySelector('.userbio_btn');
    const transactionBtn = document.querySelector('.transaction_btn');
    const editProfile = document.querySelector('.edit_profile');
    const userTransaction = document.querySelector('.user_transaction');

    userbioBtn.addEventListener('click', function() {
        editProfile.style.display = 'block';
        userTransaction.style.display = 'none';
    });

    transactionBtn.addEventListener('click', function() {
        editProfile.style.display = 'none';
        userTransaction.style.display = 'block';
    });

    // Initially display edit profile and hide user transaction
    editProfile.style.display = 'block';
    userTransaction.style.display = 'none';
});

function toggleProfile(section) {
    const editProfile = document.querySelector('.edit_profile');
    const userTransaction = document.querySelector('.user_transaction');
    const userbioBtn = document.querySelector('.userbio_btn');
    const transactionBtn = document.querySelector('.transaction_btn');

    if (section === 'edit') {
        editProfile.classList.remove('hidden');
        userTransaction.classList.add('hidden');
        userbioBtn.classList.add('text-[#37B7C3]', 'border-b-2', 'border-[#37B7C3]');
        userbioBtn.classList.remove('text-gray-700');
        transactionBtn.classList.remove('text-[#37B7C3]', 'border-b-2', 'border-[#37B7C3]');
        transactionBtn.classList.add('text-gray-700');
    } else {
        editProfile.classList.add('hidden');
        userTransaction.classList.remove('hidden');
        transactionBtn.classList.add('text-[#37B7C3]', 'border-b-2', 'border-[#37B7C3]');
        transactionBtn.classList.remove('text-gray-700');
        userbioBtn.classList.remove('text-[#37B7C3]', 'border-b-2', 'border-[#37B7C3]');
        userbioBtn.classList.add('text-gray-700');
    }
}