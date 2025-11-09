import { disableScroll, enableScroll } from "./DangNhap.js";
import { timSanPham } from "./database.js";
import { hienThongBao } from "./DangNhap.js"
const giohang = document.createElement('DIV');
giohang.className = "giohang";
giohang.innerHTML += `
            <div class="giohang_top">
                <img class="giohang_top_icon" src="/user/assets/svg/giohang.svg" alt="">
                <span>Giỏ hàng</span>
                <button class="giohang_top_huy">&times;</button>
            </div>
            <div class="giohang_mid">
                <!-- ===== đơn hàng nằm ở đây -->
        
            </div>
            <div class="giohang_bottom">
                <div class="giohang_bottom_top">
                    <span>Thành tiền : </span>
                    <div class="giohang_bottom_top_thanhtien">
                        0<span class="donvi">đ</span>
                    </div>
                </div>
                <div class="giohang_bottom_bottom">
                    <button class="giohang_bottom_bottom_thanhtoan">Thanh toán</button>
                </div>
            </div>
            `
function capNhapSoSanPham() {
    const giohang = document.querySelector(".giohang_mid");
    const soLuong = document.querySelector(".header_top_right_giohang_sosanpham");
    if (giohang.children.length === 0) {
        soLuong.style.display = 'none';
        giohang.innerHTML = `<div class="giohang_trong">Giỏ hàng trống</div>`;
        return;
    }
    giohang.querySelector(".giohang_trong") ? giohang.querySelector(".giohang_trong").remove() : "";
    soLuong.style.display = 'block';
    soLuong.textContent = giohang.children.length;
}


function khoiphucdulieugiohang() {

    const taikhoan = JSON.parse(localStorage.getItem("taikhoandangnhap"));
    if (taikhoan === null) {
        return;
    }
    const listgiohang = JSON.parse(localStorage.getItem("giohang"));
    if (listgiohang === null) {
        return;
    }
    listgiohang.forEach(giohang => {
        if (taikhoan.sdt === giohang.sdt) {

            giohang.sanpham.forEach(sp => {
                const sanpham = timSanPham(sp.id);
                themsanphamVaoGio(sanpham, sp.soLuong, sp.mau, sp.listphienban);
            });
        }
    });
}



function luuGiohangLenLocal() {
    const listgiohang = JSON.parse(localStorage.getItem("giohang")) || [];
    const giohang_mid = document.querySelectorAll(".giohang_mid_donhang");
    const taikhoan = JSON.parse(localStorage.getItem("taikhoandangnhap"));
    if (taikhoan === null) {
        return;
    }
    const giohang = {
        sdt: taikhoan.sdt,
        sanpham: [],
        thanhtien: 0,
    }
    giohang_mid.forEach(item => {
        const donhang = {
            id: item.dataset.id,
            mau: item.dataset.mau,
            listphienban: stringThanhMang(item.dataset.listphienban),
            soLuong: item.querySelector(".giohang_mid_donhang_chucnang_soluong_value").textContent,
            thanhtien: item.querySelector(".giohang_mid_donhang_top_gia").textContent.replace(/\D/g, ""),
        }
        giohang.thanhtien = Number(giohang.thanhtien) + Number(donhang.thanhtien);
        giohang.sanpham.push(donhang);
    });


    for (let i = 0; i < listgiohang.length; i++) {
        const giohangitem = listgiohang[i];
        if (giohangitem.sdt === taikhoan.sdt) {
            listgiohang[i] = giohang;
            localStorage.setItem("giohang", JSON.stringify(listgiohang));
            return;
        }
    }
    listgiohang.push(giohang);
    localStorage.setItem("giohang", JSON.stringify(listgiohang));
}


window.addEventListener('load', function () {
    capNhapSoSanPham(); // cập nhập số sp trên header (giỏ hàng)
    khoiphucdulieugiohang();

});
let trangthai = false;
document.addEventListener('click', function (e) {
    if (!giohang.contains(e.target) && trangthai === true) {
        giohangModel.style.right = '-600px';
        giohangOverlay.style.display = 'none';
        enableScroll();
        trangthai = false;
    }
});

document.querySelector(".main").appendChild(giohang);
const openGioHang = document.querySelector('.header_top_right_giohang');
const giohangOverlay = document.querySelector('.overlay');
const giohangModel = document.querySelector('.giohang');

// Nút đóng
const closeBtn = giohangModel.querySelector('.giohang_top_huy');
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        giohangModel.style.right = '-600px';
        giohangOverlay.style.display = 'none';
        enableScroll();
        trangthai = false;
    });
}

// Nút mở

openGioHang.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
    if (localStorage.getItem("taikhoandangnhap") === null) {
        hienThongBao('error', 'Vui lòng đăng nhập để sử dụng chức năng này!', 'error');
        return;
    }
    giohangModel.style.right = '5px';
    giohangOverlay.style.display = 'block';
    disableScroll();
    trangthai = true;
});
function tangsl(donhang) {
    const valueEl = donhang.querySelector('.giohang_mid_donhang_chucnang_soluong_value');
    valueEl.textContent = Number(valueEl.textContent) + 1;
    tinhThanhTien();
    tinhTongThanhTien();
    luuGiohangLenLocal();
}
function giamsl(donhang) {
    const valueEl = donhang.querySelector('.giohang_mid_donhang_chucnang_soluong_value');
    if (Number(valueEl.textContent) > 0) {
        valueEl.textContent = Number(valueEl.textContent) - 1;
        tinhThanhTien();
        tinhTongThanhTien();
    }
    if (Number(valueEl.textContent) === 0) {
        xoaSanPham(donhang);
        tinhTongThanhTien();
    }
    luuGiohangLenLocal();
}
// Nút tăng giảm số lượng
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('tangsoluong')) {
        tangsl(e.target.closest(".giohang_mid_donhang"));
    }
    if (e.target.classList.contains('giamsoluong')) {
        giamsl(e.target.closest(".giohang_mid_donhang"));
    }
});

function xoaSanPham(donhangitem) {
    donhangitem.remove();
    capNhapSoSanPham();
}

document.addEventListener('click', (e) => {
    if (e.target.className === "giohang_mid_donhang_chucnang_xoa") {
        xoaSanPham(e.target.closest(".giohang_mid_donhang"));
        luuGiohangLenLocal();
    }
});

function tinhThanhTien() {
    const donhang = document.querySelectorAll(".giohang_mid_donhang");
    donhang.forEach(item => {
        const soLuong = item.querySelector(".giohang_mid_donhang_chucnang_soluong_value").textContent;
        const sanpham = timSanPham(item.dataset.id);
        item.querySelector(".giohang_mid_donhang_top_gia").innerHTML = `${Number(sanpham.price) * Number(soLuong)}<span class="donvi">đ</span>`;
    });
}
function tinhTongThanhTien() {
    const listdonhang = document.querySelectorAll(".giohang_mid_donhang");
    const tongthanhtien = document.querySelector(".giohang_bottom_top_thanhtien");
    let tong = 0;
    listdonhang.forEach(donhang => {
        tong += Number(donhang.querySelector(".giohang_mid_donhang_top_gia").textContent.replace(/\D/g, ""));
    });
    tongthanhtien.innerHTML = `${tong}<span class="donvi">đ</span>`;
}

function soSanhMang(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}
function stringThanhMang(str) {
    if (!str) return []; // nếu chuỗi rỗng hoặc undefined
    return str.split(",").map(item => item.trim());
}

export function themsanphamVaoGio(sanpham, soLuong, color, version) {
    const listdonhang = document.querySelectorAll('.giohang_mid_donhang');
    let tontai = false;
    listdonhang.forEach(donhangitem => {
        if (donhangitem.dataset.id === sanpham.id && donhangitem.dataset.mau === color && soSanhMang(stringThanhMang(donhangitem.dataset.listphienban), version)) {
            tangsl(donhangitem);
            tontai = true;
            return;
        }
    });
    if (tontai) {
        return;
    }
    const donhang = document.createElement('DIV');
    donhang.className = "giohang_mid_donhang";
    donhang.innerHTML = `
                    <div class="giohang_mid_donhang_top">
                        <span class="giohang_mid_donhang_top_ten"></span>
                        <span class="giohang_mid_donhang_top_gia"></span>
                    </div>
                    <div class="giohang_mid_donhang_phienban"></div>
                    <div class="giohang_mid_donhang_chucnang">
                        <button class="giohang_mid_donhang_chucnang_xoa">Xóa</button>
                        <div class="giohang_mid_donhang_chucnang_soluong">
                            <button class="giamsoluong">-</button>
                            <div class="giohang_mid_donhang_chucnang_soluong_value">
                                1
                            </div>
                            <button class="tangsoluong">+</button>
                        </div>
                    </div>`
    donhang.querySelector(".giohang_mid_donhang_top_ten").textContent = sanpham.name;
    donhang.querySelector(".giohang_mid_donhang_top_gia").innerHTML = `${sanpham.price}<span class="donvi">đ</span>`;

    donhang.dataset.price = sanpham.price;
    donhang.dataset.id = sanpham.id;
    donhang.dataset.mau = color;
    donhang.dataset.listphienban = version;
    const phienBan = donhang.querySelector(".giohang_mid_donhang_phienban");
    for (let item of donhang.dataset.listphienban.split(",")) {
        phienBan.textContent += item + " , ";
    }
    phienBan.textContent += " " + color;
    donhang.querySelector(".giohang_mid_donhang_chucnang_soluong_value").textContent = soLuong;
    document.querySelector(".giohang_mid").appendChild(donhang);
    capNhapSoSanPham();
    tinhThanhTien();
    tinhTongThanhTien();
    luuGiohangLenLocal();
}




