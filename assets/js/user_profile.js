const user_profile = document.getElementById("user_profile");

user_profile.innerHTML = `
  <div class="left py-10 lg:col-span-4 bg-white flex justify-center items-center flex-col rounded-lg shadow-[0_2px_4px_0_rgba(60,64,67,0.3)] border border-gray-300">
    <div class="user_image">
        <img class="w=[100px] h-[100px] border border-gray-300 rounded-[50%]"src="assets/svg/avatar.svg" alt="" >
    </div>
    <div class="user_info">
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
        <p class="cursor-pointer">Biodata Diri</p>
        <p class="cursor-pointer">Transaksi</p>
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
      </div>
      <div class="user_btn px-4 lg:px-12 mt-10 mb-10">
          <button class="bg-[#37B7C3] w-full py-2 rounded-md text-white font-medium">Update Profile</button>
      </div>
  </div>
`
