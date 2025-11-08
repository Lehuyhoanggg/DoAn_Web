const div = document.createElement('DIV');
div.className = "chitietsanpham";
div.innerHTML = ` <div class="chitietsanpham-left">
                <div class="chitietsanpham_img">
                    <div class="chitietsanpham_img-list">

                    </div>

                    <button class="chitietsanpham_img_button-left">
                        < </button>
                            <button class="chitietsanpham_img_button-right"> > </button>

                </div>
                <div class="chitietsanpham_img-mini">
                    <div class="chitietsanpham_img-mini_list">

                    </div>
                </div>
                <div class="chitietsanpham-left_button">
                    <button class="chitietsanpham_thongso-button">Thông số sản phẩm</button>
                    <button class="chitietsanpham_thongtin-button">Thông tin sản phẩm</button>
                </div>
                <ul class="chitietsanpham_thongso">

                </ul>
                <p class="chitietsanpham_thongtin">

                </p>
            </div>
            <div class="chitietsanpham-right">
                <p class="chitietsanpham_name"></p>

                <div class="chitietsanpham_luachonphienban">
                </div>

                <div class="chitietsanpham_luachonmau">

                </div>

                <p class="chitietsanpham_gia"></p>
                <p class="chitietsanpham_gia-sale"></p>
                <div class="chitietsanpham-right_mua">
                    <button class="chitietsanpham_giohang">Thêm vào giỏ</button>
                    <button class="chitietsanpham_muangay"> Mua Ngay</button>
                </div>
                <p> Gọi đặt mua 01234587559 (8:00 - 21:30)</p>
            </div>
`;
document.querySelector(".main").appendChild(div);
const buttonThongTin = document.querySelector(".chitietsanpham_thongtin-button");
const buttonThongSo = document.querySelector(".chitietsanpham_thongso-button");
const thongTinSanPham = document.querySelector(".chitietsanpham_thongtin");
const thongSoSanPham = document.querySelector(".chitietsanpham_thongso");



const chitietsanpham_img = document.querySelector(".chitietsanpham_img");
let chitietsanpham_list = document.querySelector(".chitietsanpham_img-list");
const buttonleft = document.querySelector(".chitietsanpham_img_button-left");
const buttonright = document.querySelector(".chitietsanpham_img_button-right");
let dangxuli_img = false;
let chieudaiCuon = 0;
let chieudailist;



buttonleft.addEventListener('click', function () {
    if (chieudaiCuon === 0) {
        return;
    }
    if (!dangxuli_img) {
        dangxuli_img = true;
        index--;
        chieudaiCuon = tinhchieudaicuon();
        chuyenAnh();
        setTimeout(function () {
            dangxuli_img = false;
        }, 500);
    }
});
buttonright.addEventListener('click', function () {
    if (!dangxuli_img) {
        dangxuli_img = true;
        index++;
        if ((-1 * chieudaiCuon) >= chieudailist) {
            index = 0;
        }
        chuyenAnh();
        setTimeout(function () {
            dangxuli_img = false;
        }, 300);
    }
});


let index = 0;
function chuyenAnh() {
    if (chitietsanpham_list.children.length === 0) {
        return;
    }
    chieudaiCuon = tinhchieudaicuon();
    doiBoderImgMini();
    chitietsanpham_list.style.left = chieudaiCuon + "px";

}
function tinhchieudaicuon() {

    return index * -chitietsanpham_img.offsetWidth;
}



buttonThongTin.addEventListener('click', function () {
    thongTinSanPham.style.display = 'block';
    thongSoSanPham.style.display = 'none';
});

buttonThongSo.addEventListener('click', function () {
    thongTinSanPham.style.display = 'none';
    thongSoSanPham.style.display = 'block';
});



function doiBoderImgMini() {
    if (chitietsanpham_list.children.length === 0) {
        return;
    }
    let listanhmini = document.querySelector(".chitietsanpham_img-mini_list").children;
    for (let i = 0; i < listanhmini.length; i++) {
        listanhmini[i].classList.remove("hienthi");
    }
    if (index >= listanhmini.length) {
        index = 0;
    }
    listanhmini[index].classList.add("hienthi");
}

const listanhmini = document.querySelector(".chitietsanpham_img-mini_list");
listanhmini.addEventListener('click', function (e) {
    const manganhminni = listanhmini.children;
    for (let i = 0; i < manganhminni.length; i++) {
        if (e.target === manganhminni[i]) {
            index = i;
            doiBoderImgMini();
            if (!dangxuli_img) {
                dangxuli_img = true;
                chieudaiCuon = tinhchieudaicuon();
                chuyenAnh();
                setTimeout(function () {
                    dangxuli_img = false;
                }, 300);
            }
        }
    }
});

window.addEventListener('resize', function () {
    chieudaiCuon = tinhchieudaicuon();
    chieudailist = (chitietsanpham_list.children.length - 1) * chitietsanpham_img.offsetWidth;
    chuyenAnh();
});


function gansukienMauVaLuaChon() {
    const luaChon = document.querySelectorAll(".chitietsanpham_luachonmau-item");
    luaChon.forEach(button => {
        button.addEventListener('click', function () {
            const buttonparent = button.parentElement;
            const buttonlist = buttonparent.children;
            for (let i = 0; i < buttonlist.length; i++) {
                buttonlist[i].classList.remove("hienthi");
            }
            button.classList.add("hienthi");
        });
    });

    const luaChonPb = document.querySelectorAll(".chitietsanpham_luachonphienban-item");
    luaChonPb.forEach(button => {
        button.addEventListener('click', function () {
            const buttonparent = button.parentElement;
            const buttonlist = buttonparent.children;
            for (let i = 0; i < buttonlist.length; i++) {
                buttonlist[i].classList.remove("hienthi");
            }
            button.classList.add("hienthi");
        });
    });

}
function hienthidisplayanh(index) {
    const list = chitietsanpham_list.children; // danh sách ảnh nhỏ
    const displayImg = document.querySelector(".display_img img"); // ảnh hiển thị lớn
    displayImg.src = list[index].src;
}

const chitietsanpham = document.querySelector(".chitietsanpham");
chitietsanpham_img.addEventListener('click', function (e) {
    if (e.target === buttonleft || e.target === buttonright) {
        return;
    }
    let left;
    let right;
    let display = document.querySelector(".display_img"); const anh = document.createElement('IMG');
    if (display === null) {
        left = document.createElement("button"); right = document.createElement("button");
        display = document.createElement('DIV');
        display.className = "display_img";

        left.className = "display_button-left";
        left.textContent = "<";


        right.className = "display_button-right";
        right.textContent = ">";

        anh.className = "dislay_image";
        display.appendChild(left);
        display.appendChild(right);
        display.appendChild(anh);
        chitietsanpham.appendChild(display);
        display = document.querySelector(".display_img");
    }
    left = document.querySelector(".display_button-left");
    right = document.querySelector(".display_button-right");
    display.style.display = 'flex';
    let indexDisplay = index;
    hienthidisplayanh(indexDisplay);
    left.addEventListener("click", function () {
        indexDisplay--;
        if (indexDisplay < 0) {
            indexDisplay = 0;
        }
        hienthidisplayanh(indexDisplay);
    });

    // Gán sự kiện cho nút phải
    right.addEventListener("click", function () {
        indexDisplay++;
        if (indexDisplay >= chitietsanpham_list.children.length) {
            indexDisplay = 0;
        }
        hienthidisplayanh(indexDisplay);
    });

    display.addEventListener('click', function (e) {
        if (e.target != anh && e.target != left && e.target != right) {
            display.style.display = 'none';
        }
    });
});

export function themThongTinSpVaoGiaoDien(sanpham) {
    chitietsanpham_list.innerHTML = ``;
    listanhmini.innerHTML = ``;
    document.querySelector(".chitietsanpham").dataset.id = sanpham.id;
    for (let duongdan of sanpham.imgDetail) {
        const list_item = document.createElement('IMG');
        list_item.src = duongdan;
        list_item.className = "chitietsanpham_img-item";
        chitietsanpham_list.appendChild(list_item);

        const list_item_anhmini = document.createElement('IMG');
        list_item_anhmini.src = duongdan;
        list_item_anhmini.className = "chitietsanpham_img-mini_item";
        listanhmini.appendChild(list_item_anhmini);
    }
    doiBoderImgMini();


    chieudailist = (chitietsanpham_list.children.length - 1) * chitietsanpham_img.offsetWidth;
    const thongso = document.querySelector(".chitietsanpham_thongso");
    thongso.innerHTML = ``;
    for (const [key, value] of Object.entries(sanpham.infoDetail)) {
        const thongso_item = document.createElement('LI');
        const span1 = document.createElement('SPAN');
        span1.textContent = key;
        const span2 = document.createElement('SPAN');
        span2.textContent = value;
        thongso_item.appendChild(span1);
        thongso_item.appendChild(span2);
        thongso.appendChild(thongso_item);
    }

    const thongtin = document.querySelector(".chitietsanpham_thongtin");
    thongtin.innerHTML = sanpham.overview;

    const chitietsp_luachon = document.querySelector(".chitietsanpham_luachonphienban");
    chitietsp_luachon.innerHTML = ``;


    for (let version of sanpham.listVersions) {

        const listPhieuBan = document.createElement('DIV');
        listPhieuBan.className = "chitietsanpham_luachonphienban-list";
        const phienbanname = document.createElement('SPAN');
        phienbanname.style.fontSize = `17px`;
        phienbanname.textContent = version.name + " :";
        listPhieuBan.appendChild(phienbanname);
        for (let luachon of version.option) {
            const button = document.createElement('BUTTON');
            button.className = "chitietsanpham_luachonphienban-item";
            button.textContent = luachon;
            listPhieuBan.appendChild(button);
        }
        chitietsp_luachon.appendChild(listPhieuBan);
    }

    const chitietsp_luachonMau = document.querySelector(".chitietsanpham_luachonmau");
    chitietsp_luachonMau.innerHTML = ``;

    const chitietsanpham_listMau = document.createElement('DIV');
    chitietsanpham_listMau.className = "chitietsanpham_luachonmau-list";
    const phienbanname = document.createElement('SPAN');
    phienbanname.style.fontSize = `17px`;
    phienbanname.textContent = "Màu :";
    chitietsanpham_listMau.appendChild(phienbanname);
    for (let mau of sanpham.listColors) {
        let button = document.createElement('BUTTON');
        button.className = "chitietsanpham_luachonmau-item";
        button.textContent = mau;
        chitietsanpham_listMau.appendChild(button);
    }
    chitietsp_luachonMau.appendChild(chitietsanpham_listMau);
    gansukienMauVaLuaChon();

    document.querySelector(".chitietsanpham_name").textContent = sanpham.name;
    const gia = document.querySelector(".chitietsanpham_gia");
    gia.innerHTML = ``;
    gia.textContent = sanpham.price;
    const donvi = document.createElement('SPAN');
    donvi.textContent = 'đ';
    donvi.className = "donvi";

    gia.appendChild(donvi);
    const sale = document.querySelector(".chitietsanpham_gia-sale");
    sale.textContent = sanpham.salebefore;
    const donvisale = document.createElement('SPAN');
    donvisale.textContent = 'đ';
    donvisale.className = "donvi-sale";
    sale.appendChild(donvisale);
}

function getMau() {
    const luaChon = document.querySelectorAll(".chitietsanpham_luachonmau-item");
    for (let mau of luaChon) {
        if (mau.classList.contains("hienthi")) {
            return mau.textContent;
        }
    }
    return null;
}

function getListLuaChon() {
    let list = [];
    const chitietsp_luachon = document.querySelectorAll(".chitietsanpham_luachonphienban-item");
    for (let phienban of chitietsp_luachon) {
        if (phienban.classList.contains("hienthi")) {
            list.push(phienban.textContent);
        }
    }
    return list.length > 0 ? list : null;
}
export function kiemtraLuaChon() {
    let coMau = false;
    const luaChon = document.querySelectorAll(".chitietsanpham_luachonmau-item");
    for (let mau of luaChon) {
        if (mau.classList.contains("hienthi")) {
            coMau = true;
        }
    }
    if (!coMau) {
        return false;
    }

    const chitietsp_luachon = document.querySelectorAll(".chitietsanpham_luachonphienban-list");

    for (let list of chitietsp_luachon) {
        let chonphienban = false;
        let listphienban = list.querySelectorAll(".chitietsanpham_luachonphienban-item");
        for (let phienban of listphienban) {
            if (phienban.classList.contains("hienthi")) {
                chonphienban = true;
            }
        }
        if (!chonphienban) {
            return false;
        }
    }

    return true;

}
import { hienThongBao } from "./DangNhap.js"
import { laySanPhamBangLuaChon, timSanPham } from "./database.js";

import { themsanphamVaoGio } from "./GioHang.js";
document.addEventListener('click', function (e) {
    if (e.target.className === "chitietsanpham_muangay" || e.target.className === "chitietsanpham_giohang") {
        if (localStorage.getItem("taikhoandangnhap") === null) {
            hienThongBao("error", "Vui vòng đăng nhập để thực hiện chức năng này", "error");
            return;
        }
        const mau = getMau();
        const listLuaChon = getListLuaChon();

        if (getComputedStyle(chitietsanpham).display === 'none') {
            return;
        }

        if (!kiemtraLuaChon()) {
            hienThongBao("error", "Vui vòng nhập đầy đủ lựa chọn", "error");
            return;
        }
        let sanpham = laySanPhamBangLuaChon(chitietsanpham.dataset.id, listLuaChon, mau);
        let sp = timSanPham(chitietsanpham.dataset.id);
        if (sanpham === null) {
            hienThongBao("error", "Phiên bản của sản phẩm dã hết hàng", "error");
            return;
        }
        if (e.target.className === "chitietsanpham_giohang") {
            themsanphamVaoGio(sp, 1, mau, listLuaChon);
        }
        if (e.target.className === "chitietsanpham_muangay") {
            localStorage.setItem("muangay", JSON.stringify([{ id: sp.id, mau: mau, listphienban: listLuaChon, soLuong: 1 }]));
        }
    }

});