//mo dang ki
const bntsignup = document.querySelector('.open_signup'); // nut dang ki
bntsignup.addEventListener('click',function(){
    let signupModal = document.querySelector(".signup_modal");
    if(signupModal === null){
        fetch('user/pages/DangKi.html')
            .then(res => res.text())
            .then(html => {
                document.body.insertAdjacentHTML('beforeend', html); // thêm vào cuối body
                requestAnimationFrame(() => {
                    signupModal = document.querySelector(".signup_modal");
                    const closeButton = signupModal.querySelector('.close_button');
                    
                    closeButton.addEventListener('click', () => {
                        signupModal.style.display = 'none';
                        overlay.style.display = 'none';

                        const loiTen = signupModal.querySelector('#loi_tendaydu');
                        const loiSDT = signupModal.querySelector('#loi_sodienthoai');
                        const loiMatKhau = signupModal.querySelector('#loi_matkhau');
                        const loiNhapLai = signupModal.querySelector('#loi_nhaplaimatkhau');
                        if (loiTen) loiTen.textContent = '';
                        if (loiSDT) loiSDT.textContent = '';
                        if (loiMatKhau) loiMatKhau.textContent = '';
                        if (loiNhapLai) loiNhapLai.textContent = '';

                        const form = signupModal.querySelector('form');
                        if (form) form.reset();
                        enableScroll();
                    });

                    disableScroll();
                    overlay.style.display = 'block';
                    
                    const signupform = document.querySelector('.signup_modal form');
                    if (signupform){
                        signupform.addEventListener('submit', function (event) {
                            event.preventDefault();
                            //lay du lieu input
                            const form = document.querySelector('.signup_modal form');
                            const fullnameInput = form.querySelector('.ten input');
                            const sodienthoaiInput = form.querySelector('.sodienthoai input');
                            const matkhauInput = form.querySelector('.matkhau input');
                            const nhaplaimatkhauInput = form.querySelector('.nhaplaimatkhau input');
                            const termsCheckbox = form.querySelector('#terms');
                            //xoa khoang trang 
                            const fullName = fullnameInput.value.trim();
                            const sodienthoai = sodienthoaiInput.value.trim();
                            const matkhau = matkhauInput.value.trim();
                            const nhaplaimatkhau = nhaplaimatkhauInput.value.trim();
                            const isTermsChecked = termsCheckbox.checked;
                            //kiem tra da nhap sdt mk chua
                            const loiTen = document.querySelector('#loi_tendaydu');
                            const loiSDT = document.querySelector('#loi_sodienthoai');
                            const loiMatKhau = document.querySelector('#loi_matkhau');
                            const loiNhapLai = document.querySelector('#loi_nhaplaimatkhau');
                            //xoa thong bao cu
                            loiTen.textContent = '';
                            loiSDT.textContent = '';
                            loiMatKhau.textContent = '';
                            loiNhapLai.textContent = '';
                            //lay du lieu tu local storage neu chua co tao mang rong
                            let mangtaikhoan = JSON.parse(localStorage.getItem('mangtaikhoan')) || [];
                            let kiemtra = false;
                            if (fullName === '') {
                                loiTen.textContent = 'Vui lòng nhập tên đầy đủ của bạn.';
                                kiemtra = true;
                            }
                            const phoneRegex = /^0\d{9}$/;
                            if (!phoneRegex.test(sodienthoai)) {
                                loiSDT.textContent = 'Số điện thoại không hợp lệ. Vui lòng nhập 10 chữ số, bắt đầu bằng số 0.';
                                kiemtra = true;
                            }
                            if (matkhau.length < 6) {
                                loiMatKhau.textContent = 'Mật khẩu phải có ít nhất 6 ký tự.';
                                kiemtra = true;
                            }
                            if (matkhau !== nhaplaimatkhau) {
                                loiNhapLai.textContent = 'Mật khẩu nhập lại không khớp.';
                                kiemtra = true;
                            }
                            const tonTai = mangtaikhoan.some(acc => acc.sdt === sodienthoai);
                            if (tonTai) {
                                loiSDT.textContent = 'Số điện thoại này đã được đăng ký.';
                                kiemtra = true;
                            }
                            if(kiemtra){
                                return;
                            }

                            const newAccount = {
                            sdt: sodienthoai,
                            mk: matkhau,
                            hoten: fullName,
                            gmail: "",
                            diachi: ""
                            };
                            
                            mangtaikhoan.push(newAccount);
                            localStorage.setItem("mangtaikhoan", JSON.stringify(mangtaikhoan));
                            
                            form.reset();//xoa du lieu trong form 

                        });
                    }
                });

            })
            .catch(err => { });
        
    }
    else {
        signupModal.style.display = 'block';
        overlay.style.display = 'block';
        disableScroll();
    }
});


//dang nhap ngay
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("dangnhapngay")) {
        e.preventDefault();
        //dong dang ki
        const signupModal = document.querySelector(".signup_modal");
        const overlay = document.querySelector(".overlay");
        if (signupModal) signupModal.style.display = "none";
        //mo dang nhap
        const btnLogin = document.querySelector(".open_login");
        if (btnLogin) {
            btnLogin.click();
        }
    }
});
