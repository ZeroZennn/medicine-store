const footer = document.querySelector("footer")

footer.innerHTML = `
    <div class="top w-full bg-slate-600 py-10 bottom-0 left-0 mt-10">
        <div class="container mx-auto px-5">
            <div class="head pb-6">
                <img src="assets/svg/logo.svg" alt="" class="w-60">
            </div>
            <div class="list grid lg:grid-cols-12 mt-4">
                <div class="contact_us text-gray-300 col-span-3 mb-4">
                    <h2 class="font-semibold text-xl">Contact Us</h2>
                    <div class="text-[12px] wa flex items-center gap-4 mt-4"><i class="ti ti-phone"></i> +62 857 7204 7394</div>
                    <div class="text-[12px] email flex items-center  gap-4 mt-2"><i class="ti ti-mail"></i> medicran@gmail.com</div>
                </div>
                <div class="about_us text-gray-300 col-span-3 mb-4">
                    <h2 class="font-semibold text-xl">About Us</h2>
                    <div class="text-[12px] flex gap-4 mt-4">about us</div>
                    <div class="text-[12px] flex gap-4 mt-2">Privacy Policy</div>
                    <div class="text-[12px] flex gap-4 mt-2">Term & Condition</div>
                    <div class="text-[12px] flex gap-4 mt-2">Career</div>
                </div>
                <div class="medicran_services text-gray-300 col-span-3 mb-4">
                    <h2 class="font-semibold text-xl">MediCran</h2>
                    <div class="text-[12px] flex gap-4 mt-4">Find Products</div>
                    <div class="text-[12px] flex gap-4 mt-2">Products Consultation</div>
                    <div class="text-[12px] flex gap-4 mt-2">Health Check</div>
                    <div class="text-[12px] flex gap-4 mt-2">Register</div>
                </div>
                <div class="follow_us text-gray-300 col-span-3 mb-4">
                    <h2 class="font-semibold text-xl">Get the Latest Deals & More</h2>
                    <div class="text-[12px] flex gap-4 mt-4">Keep updated about promo & discount information</div>
                    <div class="text-[12px] flex gap-4">interesting at MediCran Health</div>
                    <div class="sosmed flex gap-4 mt-4 text-2xl">
                        <div class="twitter"><i class="ti ti-brand-twitter"></i></div>
                        <div class="facebook"><i class="ti ti-brand-facebook"></i></div>
                        <div class="instagram"><i class="ti ti-brand-instagram"></i></div>
                        <div class="youtube"><i class="ti ti-brand-youtube"></i></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="bottom w-full bg-slate-700 py-4">
        <div class="container mx-auto px-5 flex items-center justify-between">
            <h4 class="text-gray-200 font-semibold">&copy; MediCran 2024. All Rights Reserved.</h4>
        </div>
    </div>
`