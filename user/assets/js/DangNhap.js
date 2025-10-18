const btnLogin = document.querySelector('.open_login'); // nút đăng nhập
const overlay = document.querySelector('.overlay');
btnLogin.addEventListener('click', function () {
    let loginModal = document.querySelector(".login_modal");

    if (loginModal === null) {
        fetch('user/pages/DangNhap.html')
            .then(res => res.text())
            .then(html => {
                document.body.insertAdjacentHTML('beforeend', html); // thêm vào cuối body


                requestAnimationFrame(() => {
                    let loginModal = document.querySelector(".login_modal");
                    const closeButton = loginModal.querySelector(".close_button");

                    closeButton.addEventListener('click', () => {
                        loginModal.style.display = 'none';
                        overlay.style.display = 'none';
                    });

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
                                alert('Đăng nhập thành công! Xin chào ' + acc.ten);
                                window.location.href = "/index.html";
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
    }
});

