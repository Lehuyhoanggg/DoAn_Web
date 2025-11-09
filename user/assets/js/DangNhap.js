const div = document.createElement("div");
div.className = 'login_container';
div.innerHTML = `
<div class="login_modal">
    <div class="close_button">&times;</div>
    <h2>Đăng nhập</h2>
    <p>Đăng nhập thành viên để mua hàng và nhận những ưu đãi đặc biệt từ chúng tôi</p>
    <form>
        <div class="form_dangnhap">
            <label class="sodienthoai">Số điện thoại<input type="text" placeholder="Nhập số điện thoại"></label>
            <span class="thongBaoLoi" id="loi_sodienthoai"></span>
        </div>
        <div class="form_dangnhap">
            <label class="matkhau">Mật khẩu<input type="password" placeholder="Nhập mật khẩu"></label>
            <span class="thongBaoLoi" id="loi_matkhau"></span>
        </div>
        <button type="submit" class="login_button">Đăng nhập</button>
    </form>
    <p id="dangki">Bạn chưa có tài khoản? <a href="#" class="dangkingay">Đăng kí ngay</a></p>
</div>
`
document.querySelector(".main").appendChild(div);
const box = document.createElement('DIV');
box.className="boxThongBao";
box.innerHTML= `<div class="boxThongBao_icon"><i class="fa-solid fa-check"></i></div>
            <div class="boxThongBao_noidung">
                <h4>Success</h4>
                <p>Đăng nhập thành công</p>
            </div>
            <span class="boxThongBao_dong">&times;</span>`;
document.querySelector(".main").appendChild(box);


const btnLogin = document.querySelector('.open_login'); // nút đăng nhập
const overlay = document.querySelector('.overlay');

// chan nguoi dung cuon 
export function disableScroll() {
    window.addEventListener('scroll', preventScroll);
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
}

export function enableScroll() {
    window.removeEventListener('scroll', preventScroll);
    window.removeEventListener('wheel', preventScroll);
    window.removeEventListener('touchmove', preventScroll);
}

export function preventScroll(e) {
    e.preventDefault();
}
//

btnLogin.addEventListener('click', function () {
    let loginModal = document.querySelector(".login_modal");

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
        loginModal.style.display = 'block';

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
                const storedAccounts = localStorage.getItem('listTaiKhoan');

                if (!storedAccounts) {
                    hienThongBao('error', 'tài khoản hoặc mật khẩu không chính xác!', 'error');
                    return;
                }
                const mangtaikhoan = JSON.parse(storedAccounts);
                console.log(mangtaikhoan);
                //tim tai khoang
                const acc = mangtaikhoan.find(account => {
                    return account.sdt === sdt && account.mk === mk;
                });
                console.log(acc);
                if (acc) {
                    hienThongBao('success', 'đăng nhập thành công!', 'sucess');
                    localStorage.setItem('taikhoandangnhap', JSON.stringify(acc));
                    setTimeout(() => window.location.reload(), 1000);

                }
                else {
                    hienThongBao('error', 'tài khoản hoặc mật khẩu không chính xác!', 'error');
                    return;
                }
            });
        }
    });
});

//hiển thị box thông báo
const dongBox = document.querySelector('.boxThongBao_dong');
const boxThongBao = document.querySelector('.boxThongBao');
dongBox.addEventListener('click', () => {
    boxThongBao.style.display = 'none';
});

export function hienThongBao(type, title, message) {
    const icon = boxThongBao.querySelector('.boxThongBao_icon i');
    const h4 = boxThongBao.querySelector('.boxThongBao_noidung h4');
    const p = boxThongBao.querySelector('.boxThongBao_noidung p');

    h4.textContent = title;
    p.textContent = message;

    // đổi icon + màu
    if (type === 'success') {
        icon.className = 'fa-solid fa-check';
        icon.style.color = '#00B050';
    } else if (type === 'error') {
        icon.className = 'fa-solid fa-xmark';
        icon.style.color = '#ff3b3b';
    } else if (type === 'warning') {
        icon.className = 'fa-solid fa-exclamation';
        icon.style.color = '#ffb700';
    }
    // Hiển thị box
    boxThongBao.classList.remove('hide');
    boxThongBao.style.display = 'flex';
    requestAnimationFrame(() => boxThongBao.classList.add('show'));

    // Tự động ẩn sau 3 giây
    clearTimeout(boxThongBao.timer);
    boxThongBao.timer = setTimeout(() => anThongBao(), 3000);
}
export function anThongBao() {
    boxThongBao.classList.remove('show');
    setTimeout(() => {
        boxThongBao.classList.add('hide');
        boxThongBao.style.display = 'none';
    }, 300);
}


// hiển thị trạng thái người dùng 
document.addEventListener('DOMContentLoaded', function () {
    const userData = localStorage.getItem('taikhoandangnhap');
    const taikhoanSpan = document.querySelector('.header_top_right_taikhoan_span');
    const menusaudangnhap = document.querySelector('.header_top_right_taikhoan_name ul.menu_dangnhap');
    const name = document.querySelector('.header_top_right_taikhoan_name_span');

    if (userData && taikhoanSpan && menusaudangnhap) {
        const user = JSON.parse(userData);
        //hien thi ten nguoi dung 
        taikhoanSpan.textContent = "Tài khoản";
        name.textContent = `${user.hoten}`;
        //thay doi menu dang nhap
        let menuHTML = `
            <li><a href="#" class="open_account"><i class="fa-solid fa-user"></i> Tài khoản của tôi</a></li>
            <li><a href="#" class="open_donhang"><i class="fa-solid fa-box"></i> Đơn hàng đã mua</a></li>
        `;
        menuHTML += `<li><a href="#" id="logout"><i class="fa-solid fa-right-from-bracket"></i> Đăng xuất</a></li>`;

        menusaudangnhap.innerHTML = menuHTML;
        //xu ly dang xuat
        const logoutBtn = document.getElementById('logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function (e) {
                e.preventDefault();
                localStorage.removeItem('taikhoandangnhap');
                hienThongBao('success', 'đang đăng xuất!', 'sucess');
                setTimeout(() => window.location.reload(), 1000);
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
        if (signupModal) signupModal.style.display = "none";
        //mo dang nhap
        const btnLogin = document.querySelector(".open_signup");
        if (btnLogin) {
            btnLogin.click();
        }
    }
});
