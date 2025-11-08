const div = document.createElement('DIV');
div.className = "checkout_ctn";
div.innerHTML = `
        <div class="checkout_model">
        <div class="header_checkout">
            <h2>Thanh toán</h2>
            <div class="checkout_close">x</div>
        </div>

        <!-- CỘT TRÁI: THÔNG TIN KHÁCH HÀNG -->
        <div class="checkout_left">

            <span>THÔNG TIN NGƯỜI NHẬN</span>
            <input type="text" placeholder="Tên người nhận">
            <input type="text" placeholder="Số điện thoại nhận hàng">

            <input type="text" placeholder="Số nhà, tên đường (vd: 123 Lê Lợi)">

            <!-- Ghi chú -->
            <div class="checkout_note">
                <span>Ghi chú đơn hàng</span>
                <textarea placeholder="Nhập ghi chú"></textarea>
            </div>

            <!-- Thời gian giao hàng -->
            <div class="checkout_date">
                <span>Thời gian giao hàng:</span>
                <input type="date" class="date_input">
            </div>
        </div>

        <!-- CỘT PHẢI: ĐƠN HÀNG + THANH TOÁN -->
        <div class="checkout_right">
            <span>ĐƠN HÀNG</span>
            <div class="checkout_order_list">
                <!-- danh sách món ăn -->
            </div>

            <div class="checkout_row">
                <span>Tiền hàng (1 món)</span><span>180.000 đ</span>
            </div>

            <div class="checkout_row">
                <span>Phí vận chuyển</span><span>30.000 đ</span>
            </div>

            <div class="checkout_row total">
                <span>Tổng tiền</span><span>210.000 đ</span>
            </div>

            <hr>

            <!-- Hình thức thanh toán -->
            <div class="checkout_payment">
                <span>HÌNH THỨC THANH TOÁN</span>
                <div class="payment_options">
                    <div class="payment_option active" data-type="Trực tiếp">Thanh toán khi nhận hàng</div>
                    <div class="payment_option" data-type="Online">Thanh toán online</div>
                </div>

                <div class="payment_qr hidden">
                    <p>Quét mã QR để thanh toán:</p>
                    <img src="https://api.qrserver.com/v1/create-qr-code/?data=ThanhToanOnlineDemo&size=180x180"
                        alt="QR Thanh toán">
                </div>
            </div>

            <button class="checkout_submit">Đặt hàng</button>
        </div>
    </div>`;
document.body.appendChild(div);

// chọn hình thức thanh toán
const paymentOptions = document.querySelectorAll('.payment_option');
const qrBox = document.querySelector('.payment_qr');

paymentOptions.forEach(opt => {
    opt.addEventListener('click', () => {
        paymentOptions.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        if (opt.dataset.type === 'online') {
            qrBox.classList.remove('hidden');
        } else {
            qrBox.classList.add('hidden');
        }
    });
});




const thanhtoan = document.querySelector(".checkout_ctn");
const home = document.querySelector(".home");
const chitietsanpham = document.querySelector(".chitietsanpham");
export function moThanhToan() {
    thanhtoan.style.display = 'block';
    home.style.display = 'none';
}
export function dongThanhToan() {
    thanhtoan.style.display = 'none';
    home.style.display = 'block';
    chitietsanpham.style.display = 'none';
}

export function xulidathang(e) {
    moThanhToan();
    const sumit = document.querySelector('.checkout_submit');
    sumit.addEventListener('click', function () {
        luuDonhangLenLocal(e);
    });
}
import { kiemtraLuaChon } from "./chitietsanpham.js";
import { hienThongBao } from "./DangNhap.js";
document.addEventListener("DOMContentLoaded", function () {

    const thanhtoanGh = document.querySelector(".giohang_bottom_bottom_thanhtoan");
    thanhtoanGh.addEventListener('click', function () {
        const giohang = JSON.parse(localStorage.getItem("giohang"));
        xulidathang(giohang.sanpham); ////
    });


    const dongModel = document.querySelector(".checkout_close");
    dongModel.addEventListener('click', function () {
        dongThanhToan();
    });


    const chitietsp_muangay = document.querySelector(".chitietsanpham_muangay");
    chitietsp_muangay.addEventListener('click', function () {
        if (!kiemtraLuaChon() || localStorage.getItem("taikhoandangnhap") === null) {
            return;
        }
        setTimeout(function () {
            const muangay = JSON.parse(localStorage.getItem("muangay"));
            xulidathang(muangay);////
        }, 200);

    });
});



/// nhấn thanh toán
function luuDonhangLenLocal(giohang) {
    const ten = document.querySelector('input[placeholder="Tên người nhận"]').value.trim();
    const sdt = document.querySelector('input[placeholder="Số điện thoại nhận hàng"]').value.trim();
    const diachi = document.querySelector('input[placeholder^="Số nhà"]').value.trim();
    const ghichu = document.querySelector('.checkout_note textarea').value.trim();
    const ngay = document.querySelector('.date_input').value;
    const hinhthuc = document.querySelector('.payment_option.active').dataset.type;

    // Kiểm tra trống
    if (!ten || !sdt || !diachi || !ngay) {
        hienThongBao("error", "Vui lòng nhập đầy đủ thông tin", "error");
        return;
    }

    // Gộp dữ liệu
    const taikhoan = JSON.parse(localStorage.getItem("taikhoandangnhap"));
    const thongTinDonHang = {
        sdt: taikhoan.sdt,
        tenNguoiNhan: ten,
        sdtNguoiNhan: sdt,
        diaChi: diachi,
        ghiChu: ghichu,
        thoiGianGiao: ngay,
        hinhThucThanhToan: hinhthuc === 'Online' ? 'Thanh toán online : 1900100910 (Nguyễn Hoài Bảo)' : 'Thanh toán khi nhận hàng',
        sanpham: giohang,
    };
    let don = JSON.parse(localStorage.getItem("donhang")) || [];
    don.push(thongTinDonHang);
    localStorage.setItem("donhang", JSON.stringify(don));
    hienThongBao("access", "Đã đặt hàng thành công", "access");
    setTimeout(function () {
        window.location.reload();
    }, 500);
}

