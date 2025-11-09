const div = document.createElement('DIV');
div.className = "checkout_ctn";
div.innerHTML = `
        <div class="checkout_model">
        <div class="header_checkout">
            <h2>Thanh toán</h2>
            <div class="checkout_close">x</div>
        </div>


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
                <span>Tổng tiền hàng</span> <span class="checkout_tiensp"></span>
            </div>

            <div class="checkout_row">
                <span>Phí vận chuyển</span><span>30.000đ</span>
            </div>

            <div class="checkout_row total">
                <span>Tổng tiền</span><span class="checkout_thanhtien"></span>
            </div>

            <hr>

            <!-- Hình thức thanh toán -->
            <div class="checkout_payment">
                <span>HÌNH THỨC THANH TOÁN</span>
                <div class="payment_options">
                    <div class="payment_option active" data-type="Trực tiếp">Thanh toán khi nhận hàng</div>
                    <div class="payment_option" data-type="online">Thanh toán online</div>
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


window.addEventListener('DOMContentLoaded', function () {
    const paymentOptions = document.querySelectorAll('.payment_option');
    const qrBox = document.querySelector('.payment_qr');

    paymentOptions.forEach(opt => {
        opt.addEventListener('click', () => {

            paymentOptions.forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
            if (opt.dataset.type === 'online') {
                console.log("dqdq");
                qrBox.classList.remove('hidden');
            } else {
                qrBox.classList.add('hidden');
            }
        });
    });
});



const thanhtoan = document.querySelector(".checkout_ctn");
const home = document.querySelector(".home");
const chitietsanpham = document.querySelector(".chitietsanpham");
export function moThanhToan() {
    thanhtoan.style.display = 'block';
    tachetgiaodien();

}
export function dongThanhToan() {
    thanhtoan.style.display = 'none';
    home.style.display = 'block';
    chitietsanpham.style.display = 'none';
}

export function xulidathang(e) {
    moThanhToan();
    document.querySelector(".checkout_tiensp").textContent = e.thanhtien + "đ";
    document.querySelector(".checkout_thanhtien").textContent = (Number(e.thanhtien) + 30000) + "đ";
    const sumit = document.querySelector('.checkout_submit');
    sumit.addEventListener('click', function () {
        luuDonhangLenLocal(e);
    });
}
import { kiemtraLuaChon, sanphamhethang } from "./chitietsanpham.js";
import { hienThongBao } from "./DangNhap.js";
import { tacThanhDanhMuc, tatCuon, vohieuCuon, vohieuGiuCuon } from "./header.js";
import { tachetgiaodien } from "./home.js";
document.addEventListener("DOMContentLoaded", function () {
    let taikhoan = JSON.parse(localStorage.getItem("taikhoandangnhap"));
    const thanhtoanGh = document.querySelector(".giohang_bottom_bottom_thanhtoan");
    thanhtoanGh.addEventListener('click', function () {
        const giohang = JSON.parse(localStorage.getItem("giohang"));
        console.log(giohang);
        const giohangcuakh = giohang.find(item => item.sdt === taikhoan.sdt);
        console.log(giohangcuakh);
        xulidathang({ sanpham: giohangcuakh.sanpham, thanhtien: giohangcuakh.thanhtien }); ////
    });


    const dongModel = document.querySelector(".checkout_close");
    dongModel.addEventListener('click', function () {
        dongThanhToan();
    });


    const chitietsp_muangay = document.querySelector(".chitietsanpham_muangay");
    chitietsp_muangay.addEventListener('click', function () {
        setTimeout(function () {
            if (!kiemtraLuaChon() || localStorage.getItem("taikhoandangnhap") === null || sanphamhethang()) {
                return;
            }
            console.log("dqdq");
            setTimeout(function () {
                const muangay = JSON.parse(localStorage.getItem("muangay"));
                xulidathang(muangay);////
            }, 200);
        }, 200);

    });
});



/// nhấn thanh toán
let dangxuli = false;
function luuDonhangLenLocal(giohang) {
    if (dangxuli) {
        return;
    }
    dangxuli = true;
    setTimeout(function () {
        dangxuli = false;
    }, 1000);
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
        hinhThucThanhToan: hinhthuc === 'online' ? 'Thanh toán online : 1900100910 (Nguyễn Hoài Bảo)' : 'Thanh toán khi nhận hàng',
        sanpham: giohang,
        thanhtien: giohang.thanhtien,
    };


    let don = JSON.parse(localStorage.getItem("donhang")) || [];
    don.push(thongTinDonHang);
    localStorage.setItem("donhang", JSON.stringify(don));
    hienThongBao("success", "Đã đặt hàng thành công", "success");
    setTimeout(function () {
        let listgiohang = JSON.parse(localStorage.getItem("giohang"));
        if (listgiohang === null) {
            window.location.reload();
            return;
        }
        for (let i = 0; i < listgiohang.length; i++) {
            if (listgiohang[i].sdt === taikhoan.sdt) {
                listgiohang.splice(i, 1);
                break;
            }
        }
        localStorage.setItem("giohang", JSON.stringify(listgiohang));
        window.location.reload();
    }, 500);
}

