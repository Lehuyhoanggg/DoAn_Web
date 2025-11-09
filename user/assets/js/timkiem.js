import { timSanPhamTheoTen } from "./database.js";
import { tacThanhDanhMuc, vohieuCuon } from "./header.js";
import { khongtimthaysp, tachetgiaodien } from "./home.js";

const div = document.createElement("div");
div.className = 'search';
div.innerHTML = `
       <div class="tinkiem_model">
            <div class="timkiem_model_top">
                <div>Trang chủ > <span class="timkiem_input"></span></div>
            </div>

            <div class="timkiem_model_bottom">
                <!--  -->
                <div class="timkiem_filter">
                    <div class="filter_item">
                        <label for="phanloai">Danh mục</label>
                        <select id="phanloai">
                            <option value="tatca">Tất cả</option>
                            <option value="dienthoai">Điện thoại</option>
                            <option value="laptop">Laptop</option>
                            <option value="tainghe">Tai nghe</option>
                            <option value="dongho">Đồng hồ</option>
                            <option value="tablet">Tablet</option>
                            <option value="smartwatch">SmartWatch</option>
                            <option value="manhinh">Màn hình</option>
                            <option value="banphim">Bàn phím</option>
                            <option value="chuot">Chuột</option>
                        </select>
                    </div>

                    <div class="filter_item">
                        <label for="giatu">Giá từ</label>
                        <input type="number" id="giatu" placeholder="0">
                        <label for="giaden">đến</label>
                        <input type="number" id="giaden" placeholder="999999999999">
                    </div>
                </div>
                <!--  -->
                <ul class="home_sanpham_list">

                </ul>
                 <div class="home_sanpham_phantrang">
                </div>
            </div>
        </div>
        `
document.querySelector(".main").appendChild(div);
let homelistsanpham;
const formSearch = document.querySelector('.search');
const search = document.querySelector(".tinkiem_model");
let listSanPham;
formSearch.addEventListener('submit', function (e) {
    e.preventDefault();
    page = 1;
    const tukhoa = formSearch.querySelector('input').value.trim();
    tachetgiaodien();
    search.style.display = 'block';
    document.querySelector(".timkiem_input").textContent = tukhoa;

    homelistsanpham = search.querySelector(".home_sanpham_list");

    listSanPham = timSanPhamTheoTen(tukhoa);
    tacThanhDanhMuc();
    vohieuCuon();
    if (listSanPham.length === 0) {
        khongtimthaysp(homelistsanpham);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        return;
    }
    console.log(listSanPham.length);

    duaSPvaolist(listSanPham, homelistsanpham);
    taoThanhPhanTrang(search.querySelector(".home_sanpham_phantrang"));
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});


function duaSPvaolist(listsanpham, homelist) {
    homelistsanpham.innerHTML = ``;
    for (let i = 0; i < 15; i++) {
        let index = (page - 1) * 15 + i;
        if (index < listsanpham.length) {
            them1sanpham(listsanpham[index], homelist);
        }
    }
}

function them1sanpham(sanpham, home_sp_list) {
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
let page = 1;
window.addEventListener('load', function () {
    page = 1;

    search.querySelector(".home_sanpham_phantrang").addEventListener("click", function (e) {
        if (e.target.tagName == "BUTTON") {
            const phantrang = search.querySelector(".home_sanpham_phantrang");
            let mangbutton = phantrang.children;
            mangbutton[page - 1].classList.remove("nhan"); // bỏ
            page = e.target.textContent; // cập lại page number
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
            mangbutton[page - 1].classList.add("nhan"); // thêm hiện ứng
            duaSPvaolist(listSanPham, homelistsanpham);
        }
    });
});






function taoThanhPhanTrang(phantrang) {
    phantrang.innerHTML = ``;
    let lenghtSanPham = listSanPham.length;

    let soNut = lenghtSanPham / 15 + (lenghtSanPham % 15 > 0 ? 1 : 0);
    for (let i = 1; i <= soNut; i++) {
        let button = document.createElement("button");
        button.textContent = i;
        phantrang.appendChild(button);
    }
    // đánh dấu nút đầu (1) đã nhấn 
    let mangbutton = phantrang.children;
    if (mangbutton[0]) mangbutton[0].classList.add("nhan");
    page = 1;
}
