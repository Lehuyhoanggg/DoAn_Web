import { disableScroll, enableScroll, hienThongBao, anThongBao } from "./DangNhap.js";
// Lấy overlay từ DOM
const overlay = document.querySelector('.overlay');



class AccountManager {
    constructor() {
        this.accountModal = null;
        this.init();
    }

    init() {
        //kiem tra su kien click
        document.addEventListener('click', (e) => this.handleAccountClick(e));
    }

    handleAccountClick(e) {
        if (!e.target.closest('.open_account')) return;
        e.preventDefault();

        this.closeAllModals();

        //kiem tra & mo account
        this.accountModal = document.querySelector(".account_container");

        if (!this.accountModal) {
            this.loadAccountModal();
        } else {
            this.openModal();
        }
    }

    closeAllModals() {
        const allModals = document.querySelectorAll('.login_modal, .signup_modal');
        allModals.forEach(modal => modal.style.display = 'none');
    }

    async loadAccountModal() {
        const div = document.createElement('DIV');
        div.className = "account_container";
        div.innerHTML = `<div class="close_button">&times;</div>

    <h1>Thông tin tài khoản của bạn</h1>
    <p>Quản lý thông tin để bảo mật tài khoản</p>

    <div class="form_wrapper">
        
        <div class="info_column">
            <form id="infoForm">
                <div class="form_group">
                    <label for="hoTen">Họ và tên</label>
                    <input type="text" id="hoTen" placeholder="Thêm họ và tên của bạn">
                </div>
                
                <div class="form_group">
                    <label for="soDienThoai">Số điện thoại</label>
                    <input type="text" id="soDienThoai" placeholder="Số điện thoại (không thể đổi)" readonly>
                </div>
                
                <div class="form_group">
                    <label for="email">Email</label>
                    <input type="email" id="email" placeholder="Thêm địa chỉ email của bạn">
                </div>
                
                <div class="form_group">
                    <label for="diaChi">Địa chỉ</label>
                    <input type="text" id="diaChi" placeholder="Thêm địa chỉ giao hàng của bạn">
                </div>
                
                <button type="submit" class="btn btn_save">
                    <i class="fa-solid fa-floppy-disk"></i> Lưu thay đổi
                </button>
            </form>
        </div>

        <div class="password_column">
            <form id="passwordForm">
                <div class="form_group">
                    <label for="currentPass">Mật khẩu hiện tại</label>
                    <input type="password" id="currentPass" placeholder="Nhập mật khẩu hiện tại">
                    <span class="thongBaoLoi" id="loi_matkhauhientai"></span>
                </div>
                
                <div class="form_group">
                    <label for="newPass">Mật khẩu mới</label>
                    <input type="password" id="newPass" placeholder="Nhập mật khẩu mới">
                    <span class="thongBaoLoi" id="loi_matkhaumoi"></span>
                </div>
                
                <div class="form_group">
                    <label for="confirmPass">Xác nhận mật khẩu mới</label>
                    <input type="password" id="confirmPass" placeholder="Nhập lại mật khẩu mới">
                    <span class="thongBaoLoi" id="loi_xacnhanmatkhau"></span>
                </div>

                <button type="submit" class="btn btn_password">
                    <i class="fa-solid fa-lock"></i> Đổi mật khẩu
                </button>
            </form>
        </div>
    </div>`;
        document.querySelector(".main").appendChild(div);
        this.accountModal = document.querySelector(".account_container");
        this.openModal();
        this.setupEventListeners();
    }

    openModal() {
        if (!this.accountModal) return;
        this.accountModal.style.display = 'block';
        overlay.style.display = 'block';
        disableScroll();
    }

    closeModal() {
        if (!this.accountModal) return;
        this.accountModal.style.display = 'none';
        overlay.style.display = 'none';
        enableScroll();
    }

    setupEventListeners() {
        const closeButton = this.accountModal.querySelector('.close_button');
        if (closeButton) {
            closeButton.addEventListener('click', () => this.closeModal());
        }


        if (!this.checkLoginStatus()) {
            this.closeModal();
            return;
        }

        // Load va hien thong tin
        this.loadUserInfo();

        // Xu li form thong tin
        this.setupInfoForm();

        //Xu li form mat khau
        this.setupPasswordForm();
    }

    checkLoginStatus() {
        const loggedInUserString = localStorage.getItem("taikhoandangnhap");
        if (!loggedInUserString) {
            hienThongBao('error', 'Bạn chưa đăng nhập! Vui lòng đăng nhập!', 'error');
            return false;
        }
        return true;
    }

    loadUserInfo() {
        const currentUser = JSON.parse(localStorage.getItem("taikhoandangnhap"));
        if (!currentUser) {
            hienThongBao('error', 'Lỗi: Không tìm thấy thông tin người dùng đang đăng nhập.', 'error');
            this.closeModal();
            return;
        }

        const listTaiKhoan = JSON.parse(localStorage.getItem("listTaiKhoan")) || [];
        const userInfo = listTaiKhoan.find(user => user.sdt === currentUser.sdt);

        if (!userInfo) {
            hienThongBao('error', 'Lỗi: Không tìm thấy thông tin tài khoản. Vui lòng đăng nhập lại.', 'error');
            localStorage.removeItem("taikhoandangnhap");
            this.closeModal();
            return;
        }

        // Điền thông tin vào form
        const inputs = {
            hoTen: userInfo.hoten || '',
            soDienThoai: userInfo.sdt || '',
            email: userInfo.gmail || '',
            diaChi: userInfo.diachi || ''
        };

        Object.entries(inputs).forEach(([id, value]) => {
            const input = this.accountModal.querySelector(`#${id}`);
            if (input) input.value = value;
        });
    }

    setupInfoForm() {
        const infoForm = this.accountModal.querySelector("#infoForm");
        if (!infoForm) return;

        infoForm.addEventListener("submit", (e) => {
            e.preventDefault();
            this.updateUserInfo(infoForm);
        });
    }

    updateUserInfo(form) {
        const currentUser = JSON.parse(localStorage.getItem("taikhoandangnhap"));
        let listTaiKhoan = JSON.parse(localStorage.getItem("listTaiKhoan")) || [];

        const newInfo = {
            hoten: form.querySelector("#hoTen").value.trim(),
            gmail: form.querySelector("#email").value.trim(),
            diachi: form.querySelector("#diaChi").value.trim()
        };

        const userIndex = listTaiKhoan.findIndex(user => user.sdt === currentUser.sdt);
        if (userIndex > -1) {
            // Giữ lại các thông tin cũ không thay đổi
            listTaiKhoan[userIndex] = {
                ...listTaiKhoan[userIndex],
                hoten: newInfo.hoten,
                gmail: newInfo.gmail,
                diachi: newInfo.diachi,
                updatedAt: new Date().toLocaleString()
            };

            localStorage.setItem("listTaiKhoan", JSON.stringify(listTaiKhoan));
            localStorage.setItem("taikhoandangnhap", JSON.stringify(listTaiKhoan[userIndex]));

            //Cap nhat hien thi ten khach hang
            const nameSpan = document.querySelector('.header_top_right_taikhoan_name_span');
            if (nameSpan) nameSpan.textContent = newInfo.hoten;

            hienThongBao('success', 'Cập nhật thông tin thành công!', 'success');
        }
    }

    setupPasswordForm() {
        const passwordForm = this.accountModal.querySelector("#passwordForm");
        if (!passwordForm) return;

        passwordForm.addEventListener("submit", (e) => {
            e.preventDefault();
            this.updatePassword(passwordForm);
        });
    }

    updatePassword(form) {
        //lay cac phan tu thong bao loi
        const loiMatKhauHienTai = document.querySelector('#loi_matkhauhientai');
        const loiMatKhauMoi = document.querySelector('#loi_matkhaumoi');
        const loiXacNhanMatKhau = document.querySelector('#loi_xacnhanmatkhau');
        //xoa thong bao cu
        loiMatKhauHienTai.textContent = '';
        loiMatKhauMoi.textContent = '';
        loiXacNhanMatKhau.textContent = '';

        const currentUser = JSON.parse(localStorage.getItem("taikhoandangnhap"));
        let listTaiKhoan = JSON.parse(localStorage.getItem("listTaiKhoan")) || [];

        const currentPass = form.querySelector("#currentPass").value;
        const newPass = form.querySelector("#newPass").value;
        const confirmPass = form.querySelector("#confirmPass").value;

        const userIndex = listTaiKhoan.findIndex(user => user.sdt === currentUser.sdt);

        let loi = false;
        if (currentPass !== listTaiKhoan[userIndex].mk) {
            loiMatKhauHienTai.textContent = 'Mật khẩu hiện tại không đúng!';
            loi = true;
        }
        if (newPass.length < 6) {
            loiMatKhauMoi.textContent = 'Mật khẩu mới phải có ít nhất 6 ký tự!';
            loi = true;
        }
        if (newPass !== confirmPass) {
            loiXacNhanMatKhau.textContent = 'Mật khẩu xác nhận không khớp!';
            loi = true;
        }
        if (loi === true) {
            return;
        }

        //Dat lai mat khau
        listTaiKhoan[userIndex].mk = newPass;
        localStorage.setItem("listTaiKhoan", JSON.stringify(listTaiKhoan));
        localStorage.setItem("taikhoandangnhap", JSON.stringify(listTaiKhoan[userIndex]));


        hienThongBao('success', 'Đổi mật khẩu thành công!', 'success');
        form.reset();
    }
}

// Khoi tao quan li tai khoan
const accountManager = new AccountManager();