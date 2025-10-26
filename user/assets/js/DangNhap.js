const btnLogin = document.querySelector('.open_login'); // nút đăng nhập
const overlay = document.querySelector('.overlay');

// chan nguoi dung cuon 
function disableScroll() {
    window.addEventListener('scroll', preventScroll);
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
}

function enableScroll() {
    window.removeEventListener('scroll', preventScroll);
    window.removeEventListener('wheel', preventScroll);
    window.removeEventListener('touchmove', preventScroll);
}

function preventScroll(e) {
    e.preventDefault();
}

btnLogin.addEventListener('click', function () {
    let loginModal = document.querySelector(".login_modal");

    if (loginModal === null) {
        fetch('user/pages/DangNhap.html')
            .then(res => res.text())
            .then(html => {
                document.body.insertAdjacentHTML('beforeend', html); // thêm vào cuối body


                requestAnimationFrame(() => {
                    loginModal = document.querySelector(".login_modal");
                    const closeButton = loginModal.querySelector(".close_button");

                    closeButton.addEventListener('click', () => {
                        loginModal.style.display = 'none';
                        overlay.style.display = 'none';
                        //xoa thong tin khi an tat
                        const loiSDT = document.querySelector('#loi_sodienthoai');
                        const loiMatKhau = document.querySelector('#loi_matkhau');
                        const loginForm = document.querySelector('.login_modal form');
                        loiSDT.textContent = '';
                        loiMatKhau.textContent = '';
            
                        const sdtInput = loginModal.querySelector('.sodienthoai input');
                        const mkInput = loginModal.querySelector('.matkhau input');
                        if (sdtInput) sdtInput.value = '';
                        if (mkInput) mkInput.value = '';
                        enableScroll();
                    });

                    disableScroll();
                    overlay.style.display = 'block';

                    const loiSDT = document.querySelector('#loi_sodienthoai');
                    const loiMatKhau = document.querySelector('#loi_matkhau');
                    const loginForm = document.querySelector('.login_modal form');
                    if (loginForm) {
                        loginForm.addEventListener('submit', function (event) {
                            event.preventDefault();
                            //lay du lieu input
                            const sdtInput = loginForm.querySelector('.sodienthoai input');
                            const mkInput = loginForm.querySelector('.matkhau input');
                            //xoa khoang trang 
                            const sdt = sdtInput.value.trim();
                            const mk = mkInput.value.trim();
                            //xoa thong bao cu 
                            loiSDT.textContent = '';
                            loiMatKhau.textContent = '';
                            //kiem tra da nhap sdt mk chua
                            const phoneRegex = /^0\d{9}$/;
                            let kiemtra = false;
                            if (sdt === "") {
                                loiSDT.textContent = 'vui lòng nhập số điện thoại!'
                                kiemtra = true;
                            }
                            else if (!phoneRegex.test(sdt)) {
                                loiSDT.textContent = 'Số điện thoại không hợp lệ. Vui lòng nhập 10 chữ số, bắt đầu bằng số 0.';
                                kiemtra = true;
                            }
                            if (mk === "") {
                                loiMatKhau.textContent = 'vui lòng nhập số mật khẩu!'
                                kiemtra = true;
                            }
                            else if (mk.length < 6) {
                                loiMatKhau.textContent = 'vui lòng nhập đủ 6 ký tự'
                                kiemtra = true;
                            }
                            if (kiemtra) {
                                return;
                            }

                            //lay danh sach tk trong local storage
                            const storedAccounts = localStorage.getItem('mangtaikhoan');
                            if (!storedAccounts) {
                                alert('tài khoản hoặc mật khẩu không chính xác!');
                                return;
                            }
                            const mangtaikhoan = JSON.parse(storedAccounts);
                            //tim tai khoang
                            const acc = mangtaikhoan.find(account => {
                                return account.sdt === sdt && account.mk === mk;
                            });
                            if (acc) {
                                alert('Đăng nhập thành công! Xin chào ' + acc.hoten);
                                localStorage.setItem('taikhoandangnhap', JSON.stringify(acc));
                                window.location.reload();
                                
                            }
                            else {
                                alert('tài khoản hoặc mật khẩu không chính xác!');
                                return;
                            }

                        });
                    }
                });

            })
            .catch(err => { });
    }
    else {
        loginModal.style.display = 'block';
        overlay.style.display = 'block';
        disableScroll();
    }
});

// hiển thị trạng thái người dùng 
document.addEventListener('DOMContentLoaded',function(){
    const userData = localStorage.getItem('taikhoandangnhap');
    const taikhoanSpan = document.querySelector('.header_top_right_taikhoan_span');
    const menusaudangnhap = document.querySelector('.header_top_right_taikhoan_name ul.menu_dangnhap');
    const name = document.querySelector('.header_top_right_taikhoan_name_span');

    if(userData && taikhoanSpan && menusaudangnhap){
        const user = JSON.parse(userData);
        //hien thi ten nguoi dung 
        taikhoanSpan.textContent = `Tài khoản`;
        name.textContent = `${user.hoten}`;
        //thay doi menu dang nhap
        let menuHTML = `
            <li><a href="#" class="open_account"><i class="fa-solid fa-user"></i> Tài khoản của tôi</a></li>
            <li><a href="#"><i class="fa-solid fa-box"></i> Đơn hàng đã mua</a></li>
        `;
            //neu la quan ly thi them chuc nang quan ly
        if(user.quyenhang === "quanly"){
            menuHTML += `<li><a href="#"><i class="fa-solid fa-user"></i> Quản lí cửa hàng</a></li>`;
        }
        menuHTML += `<li><a href="#" id="logout"><i class="fa-solid fa-right-from-bracket"></i> Đăng xuất</a></li>`;
         
        menusaudangnhap.innerHTML = menuHTML;
        //xu ly dang xuat
        const logoutBtn = document.getElementById('logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function (e) {
                e.preventDefault();
                localStorage.removeItem('taikhoandangnhap');
                window.location.reload();
            });
        }
    } 

});

//dang ki ngay
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("dangkingay")) {
        e.preventDefault();
        //dong dang nhap
        const signupModal = document.querySelector(".login_modal");
        const overlay = document.querySelector(".overlay");
        if (signupModal) signupModal.style.display = "none";
        //mo dang nhap
        const btnLogin = document.querySelector(".open_signup");
        if (btnLogin) {
            btnLogin.click();
        }
    }
});
