//mo dang ki
import { disableScroll, enableScroll, hienThongBao, anThongBao } from "./DangNhap.js";

const div = document.createElement('DIV');
div.className="signup_modal";
div.innerHTML=` <div class="close_button">&times;</div>
            <h2>Đăng kí</h2>
            <p>Đăng ký thành viên để mua hàng và nhận những ưu đãi đặc biệt từ chúng tôi</p>
            <form>
                <div class="form_dangki">
                    <label class="ten">Tên đầy đủ<input type="text" placeholder="Nhập tên đầy đủ"></label>
                    <span class="thongBaoLoi" id="loi_tendaydu"></span>
                </div>
                <div class="form_dangki">
                    <label class="sodienthoai">Số điện thoại<input type="text" placeholder="Nhập số điện thoại"></label>
                    <span class="thongBaoLoi" id="loi_sodienthoaidk"></span>
                </div>
                <div class="form_dangki">
                    <label class="matkhau">Mật khẩu<input type="password" placeholder="Nhập mật khẩu"></label>
                    <span class="thongBaoLoi" id="loi_matkhaudk"></span>
                </div>
                <div class="form_dangki">
                    <label class="nhaplaimatkhau">Nhập lại mật khẩu<input type="password"
                            placeholder="Nhập lại mật khẩu"></label>
                    <span class="thongBaoLoi" id="loi_nhaplaimatkhau"></span>
                </div>
                <div class="checkbox">
                    <input type="checkbox" id="terms" name="terms" required>
                    <label id="tick" for="terms">Tôi đồng ý với <a href="#">chính sách trang web</a></label>
                </div>
                <button type="submit" class="signup_button">Đăng ký</button>
            </form>
            <p id="DangNhap">Bạn đã có tài khoản? <a href="#" class="dangnhapngay">Đăng nhập ngay</a></p>`;
document.querySelector(".main").appendChild(div);



let overlay = document.querySelector(".overlay");
const bntsignup = document.querySelector(".open_signup"); // nut dang ki

bntsignup.addEventListener("click", function () {
  let signupModal = document.querySelector(".signup_modal");

  requestAnimationFrame(() => {
    signupModal = document.querySelector(".signup_modal");
    const closeButton = signupModal.querySelector(".close_button");

    closeButton.addEventListener("click", () => {
      signupModal.style.display = "none";
      overlay.style.display = "none";
      const loiTen = signupModal.querySelector("#loi_tendaydu");
      const loiSDT = signupModal.querySelector("#loi_sodienthoaidk");
      const loiMatKhau = signupModal.querySelector("#loi_matkhaudk");
      const loiNhapLai = signupModal.querySelector("#loi_nhaplaimatkhau");
      if (loiTen) loiTen.textContent = "";
      if (loiSDT) loiSDT.textContent = "";
      if (loiMatKhau) loiMatKhau.textContent = "";
      if (loiNhapLai) loiNhapLai.textContent = "";
      const form = signupModal.querySelector("form");
      if (form) form.reset();
      enableScroll();
    });

    disableScroll();
    overlay.style.display = "block";
    signupModal.style.display = 'block';

    const signupform = document.querySelector(".signup_modal form");
    //kiem tra da nhap sdt mk chua
    const loiTen = document.querySelector("#loi_tendaydu");
    const loiSDT = document.querySelector("#loi_sodienthoaidk");
    const loiMatKhau = document.querySelector("#loi_matkhaudk");
    const loiNhapLai = document.querySelector("#loi_nhaplaimatkhau");
    if (signupform) {
      signupform.addEventListener("submit", function (event) {
        event.preventDefault();
        //lay du lieu input
        const fullnameInput = signupform.querySelector(".ten input");
        const sodienthoaiInput = signupform.querySelector(".sodienthoai input");
        const matkhauInput = signupform.querySelector(".matkhau input");
        const nhaplaimatkhauInput = signupform.querySelector(".nhaplaimatkhau input");
        const termsCheckbox = signupform.querySelector("#terms");
        //xoa khoang trang
        const fullName = fullnameInput.value.trim();
        const sodienthoai = sodienthoaiInput.value.trim();
        const matkhau = matkhauInput.value.trim();
        const nhaplaimatkhau = nhaplaimatkhauInput.value.trim();
        const isTermsChecked = termsCheckbox.checked;

        //xoa thong bao cu
        loiTen.textContent = "";
        loiSDT.textContent = "";
        loiMatKhau.textContent = "";
        loiNhapLai.textContent = "";
        //lay du lieu tu local storage neu chua co tao mang rong
        let mangtaikhoan =
          JSON.parse(localStorage.getItem("listTaiKhoan")) || [];
        let kiemtra = false;
        if (fullName === "") {
          loiTen.textContent = "Vui lòng nhập tên đầy đủ của bạn.";
          kiemtra = true;
        }
        const phoneRegex = /^0\d{9}$/;
        if (!phoneRegex.test(sodienthoai)) {
          loiSDT.textContent =
            "Số điện thoại không hợp lệ. Vui lòng nhập 10 chữ số, bắt đầu bằng số 0.";
          kiemtra = true;
        }
        if (matkhau.length < 6) {
          loiMatKhau.textContent = "Mật khẩu phải có ít nhất 6 ký tự.";
          kiemtra = true;
        }
        if (matkhau !== nhaplaimatkhau) {
          loiNhapLai.textContent = "Mật khẩu nhập lại không khớp.";
          kiemtra = true;
        }
        const tonTai = mangtaikhoan.some(
          (acc) => acc.sdt === sodienthoai
        );
        if (tonTai) {
          loiSDT.textContent = "Số điện thoại này đã được đăng ký.";
          kiemtra = true;
        }
        if (kiemtra) {
          return;
        }
        const now = new Date();

        const newAccount = {
          sdt: sodienthoai,
          mk: matkhau,
          hoten: fullName,
          gmail: "",
          diachi: "",
          status: true,
          createdAt: now.toLocaleString(),
          updatedAt: now.toLocaleString(),
        };

        mangtaikhoan.push(newAccount);
        localStorage.setItem(
          "listTaiKhoan",
          JSON.stringify(mangtaikhoan)
        );
        hienThongBao('success', 'đăng ký thành công!', 'sucess');
        signupform.reset();
        signupModal.style.display = "none";
        overlay.style.display = "none";
        enableScroll();
        return;
      });
    }
  });



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