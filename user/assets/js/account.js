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
        try {
            const response = await fetch('user/pages/account.html');
            const html = await response.text();
            document.body.insertAdjacentHTML('beforeend', html);

            requestAnimationFrame(() => {
                this.accountModal = document.querySelector(".account_container");
                this.openModal();
                this.setupEventListeners();
            });
        } catch (err) {
            console.error('Lỗi tải account.html:', err);
        }
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
            alert("Bạn chưa đăng nhập! Vui lòng đăng nhập.");
            return false;
        }
        return true;
    }

    loadUserInfo() {
        const currentUser = JSON.parse(localStorage.getItem("taikhoandangnhap"));
        const mangtaikhoan = JSON.parse(localStorage.getItem("mangtaikhoan")) || [];
        const userInfo = mangtaikhoan.find(user => user.sdt === currentUser.sdt);

        if (!userInfo) {
            alert("Lỗi: Không tìm thấy thông tin tài khoản. Vui lòng đăng nhập lại.");
            localStorage.removeItem("taikhoandangnhap");
            this.closeModal();
            return;
        }

        // Dien thong tin vso form
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
        let mangtaikhoan = JSON.parse(localStorage.getItem("mangtaikhoan")) || [];

        const newInfo = {
            hoten: form.querySelector("#hoTen").value.trim(),
            gmail: form.querySelector("#email").value.trim(),
            diachi: form.querySelector("#diaChi").value.trim()
        };

        const userIndex = mangtaikhoan.findIndex(user => user.sdt === currentUser.sdt);
        if (userIndex > -1) {
            mangtaikhoan[userIndex] = { ...mangtaikhoan[userIndex], ...newInfo };
            localStorage.setItem("mangtaikhoan", JSON.stringify(mangtaikhoan));
            localStorage.setItem("taikhoandangnhap", JSON.stringify(mangtaikhoan[userIndex]));
            
            //Cap nhat hien thi ten khach hang
            const nameSpan = document.querySelector('.header_top_right_taikhoan_name_span');
            if (nameSpan) nameSpan.textContent = newInfo.hoten;
            
            alert("Cập nhật thông tin thành công!");
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
        const currentUser = JSON.parse(localStorage.getItem("taikhoandangnhap"));
        let mangtaikhoan = JSON.parse(localStorage.getItem("mangtaikhoan")) || [];

        const currentPass = form.querySelector("#currentPass").value;
        const newPass = form.querySelector("#newPass").value;
        const confirmPass = form.querySelector("#confirmPass").value;

        const userIndex = mangtaikhoan.findIndex(user => user.sdt === currentUser.sdt);


        if (currentPass !== mangtaikhoan[userIndex].mk) {
            alert("Mật khẩu hiện tại không đúng!");
            return;
        }
        if (newPass.length < 6) {
            alert("Mật khẩu mới phải có ít nhất 6 ký tự!");
            return;
        }
        if (newPass !== confirmPass) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        }

        //Dat lai mat khau
        mangtaikhoan[userIndex].mk = newPass;
        localStorage.setItem("mangtaikhoan", JSON.stringify(mangtaikhoan));
        localStorage.setItem("taikhoandangnhap", JSON.stringify(mangtaikhoan[userIndex]));
        
        alert("Đổi mật khẩu thành công!");
        form.reset();
    }
}

// Khoi tao quan li tai khoan
const accountManager = new AccountManager();