let danhmuc;
let listSanPham;
let page_number;
import {
    initialSanPham, initialTaiKhoan, getListSanPham
} from "./database.js";

import { tatCuon } from "./header.js";




window.onload = () => {
    initialTaiKhoan(); // thêm vào local nếu chưa có
    initialSanPham(); /// thêm vào local nếu chưa 
    listSanPham = getListSanPham(); /// lấy list sản phẩm
    danhmuc = "Điện thoại";
    page_number = 1;
    hienThiSanPham();
    taoThanhPhanTrang();
};


document.querySelector(".header_top_left").addEventListener('click', function () {
    window.location.reload()
});

/// tạo 1 thẻ sản phẩm và vứt vào list sản phẩm ở home
const home_sp_list = document.querySelector(".home_sanpham_list");
function them1sanpham(sanpham) {
    let sanpham_item = document.createElement("li");
    sanpham_item.className = "home_sanpham_list_item";

    let sanpham_item_img = document.createElement("img");
    sanpham_item_img.src = sanpham.thumbnail;
    sanpham_item_img.className = "home_sanpham_list_item_img";
    let sanpham_item_name = document.createElement("span");
    sanpham_item_name.textContent = sanpham.name;
    sanpham_item_name.className = "sanpham_name";

    let sanpham_item_prime = document.createElement("span");
    sanpham_item_prime.textContent = sanpham.price;
    sanpham_item_prime.className = "sanpham_prime";

    let primeDv = document.createElement("span");
    primeDv.textContent = "đ";
    primeDv.className = "donvi";

    let price_sale = document.createElement('SPAN');
    price_sale.textContent = sanpham.salebefore;
    price_sale.innerHTML += `<span class="donvi-sale">đ</span>`;
    price_sale.className = "sanpham_giamgia";
    sanpham_item_prime.appendChild(primeDv);

    sanpham_item.appendChild(sanpham_item_img);
    sanpham_item.appendChild(sanpham_item_name);
    sanpham_item.appendChild(sanpham_item_prime);
    sanpham_item.appendChild(price_sale);

    const nutMuaNgayHTML = `
        <button class="sanpham_muangay">
            <svg width="25" height="25" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" fill="transparent" />
                <g fill="none" stroke="white" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M10 40 H 40" />
                    <path d="M15 50 H 35" />
                    <path d="M40 23 L 45 28 H 85 L 77 58 H 50 L 45 73" />
                    <path d="M77 58 L 82 73" />
                    <circle cx="50" cy="80" r="5" />
                    <circle cx="82" cy="80" r="5" />
                </g>
            </svg> Mua ngay
        </button>
            `;
    sanpham_item.setAttribute("data-id", sanpham.id);
    sanpham_item.innerHTML += nutMuaNgayHTML;
    home_sp_list.appendChild(sanpham_item);
}

/// tạo thanh phân trang dựa trên sản phẩm đổ vào list
const phantrang = document.querySelector(".home_sanpham_phantrang");
function taoThanhPhanTrang() {
    phantrang.innerHTML = ``;
    let mangThoaMan = listSanPham.filter((sanpham) => {
        return sanpham.category === danhmuc;
    });

    let lenghtSanPham = mangThoaMan.length;

    let soNut = lenghtSanPham / 10 + (lenghtSanPham % 10 > 0 ? 1 : 0);
    for (let i = 1; i <= soNut; i++) {
        let button = document.createElement("button");
        button.textContent = i;
        phantrang.appendChild(button);
    }
    // đánh dấu nút đầu (1) đã nhấn 
    let mangbutton = phantrang.children;
    if (mangbutton[0]) mangbutton[0].classList.add("nhan");
    page_number = 1;
}


/// khi ấn vào danh mục menu thì cuộn tới sản phẩm để xem sản phẩm
const topmenu = document.querySelector(".topMenu_list");
topmenu.addEventListener("click", function (e) {
    if (home.style.display === 'none' && e.target.textContent != "Trang chủ") {
        return;
    }
    if (e.target.className === "topMenu_list_item") {
        danhmuc = e.target.textContent;
        if (danhmuc === "Trang chủ") {
            window.location.reload();
        }
        page_number = 1;
        hienThiSanPham();
        taoThanhPhanTrang();
        cuonListSanPham();
    }
});

// di chuyên ngay list sản phẩm
function cuonListSanPham() {
    tatCuon();
    window.scrollTo({
        top: 410,
        behavior: "smooth",
    });
}

//// hiễn thị sản phẩm theo danh mục && nút phân trang (1,2,3,..)
function hienThiSanPham() {
    // làm mới
    home_sp_list.innerHTML = ``;
    // lọc sản phẩm theo danh mục
    const mangThoaMan = listSanPham.filter(sanpham => {
        return sanpham.category === danhmuc;
    });
    if (mangThoaMan.length === 0) { // hiệu ứng không tìm thấy sản phẩm
        khongtimthaysp(home_sp_list);
    }

    for (let i = 0; i < 10; i++) {
        let index = (page_number - 1) * 10 + i;
        if (index < mangThoaMan.length) {
            them1sanpham(mangThoaMan[index]);
        }
    }

}

/// ////////////


export function khongtimthaysp(ctn) {
    const tb1 = document.createElement("p");
    tb1.textContent = "Không tìm thấy sản phẩm";
    tb1.className = "kotimthaysp1";
    const tb2 = document.createElement("p");
    tb2.textContent =
        "Xin lỗi, chúng tôi không thể tìm được kết quả hợp với tìm kiếm của bạn";
    tb2.className = "kotimthaysp2";
    const ctn_tb = document.createElement("div");
    ctn_tb.className = "kotimthaysp";
    ctn_tb.appendChild(tb1);
    ctn_tb.appendChild(tb2);

    ctn_tb.innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 64 64" role="img" aria-label="Mặt buồn">
  <g fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Viền mặt -->
    <circle cx="32" cy="32" r="26" />
    <!-- Mắt trái và phải -->
    <circle cx="22" cy="26" r="2.5" fill="currentColor" stroke="none" />
    <circle cx="42" cy="26" r="2.5" fill="currentColor" stroke="none" />
    <!-- Miệng buồn (cong xuống) -->
    <path d="M22 44q10 -8 20 0" />
  </g>
</svg>
`;
    ctn.appendChild(ctn_tb);
}



export function tachetgiaodien() {
    const elements = document.querySelectorAll('.home, .donhang, .tinkiem_model, .chitietsanpham, .tintuc');
    elements.forEach(el => {
        el.style.display = 'none';
    });
}


const home = document.querySelector(".home");
const chitietsanpham = document.querySelector(".chitietsanpham");
import { timSanPham } from "./database.js";
import { themThongTinSpVaoGiaoDien } from "./chitietsanpham.js";
function hienThiChiTietSanPham(sp) { /// sp la 1 the li
    const sanpham = timSanPham(sp.dataset.id);
    if (sanpham === null) {
        return;
    }
    tachetgiaodien();

    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });

    chitietsanpham.style.display = 'flex';
    themThongTinSpVaoGiaoDien(sanpham);
}


function gansukien() {
    const listsanpham = document.querySelectorAll(".home_sanpham_list");
    listsanpham.forEach(list => {
        list.addEventListener('click', function (e) {
            if (e.target.closest(".home_sanpham_list_item")) {
                hienThiChiTietSanPham(e.target.closest(".home_sanpham_list_item"));
            }
        });
    });



    /// sự kiện khi nhấn vào các nút phân trang
    phantrang.addEventListener("click", function (e) {
        if (e.target.tagName == "BUTTON") {
            let mangbutton = phantrang.children;
            mangbutton[page_number - 1].classList.remove("nhan"); // bỏ
            page_number = e.target.textContent; // cập lại page number
            hienThiSanPham();
            cuonListSanPham();
            mangbutton[page_number - 1].classList.add("nhan"); // thêm hiện ứng
        }
    });
}

window.addEventListener('DOMContentLoaded', function () {
    gansukien();
})
