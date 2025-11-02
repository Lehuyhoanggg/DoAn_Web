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


export function themThongTinSpVaoGiaoDien(sanpham) {

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
    thongtin.textContent = sanpham.overview;

    const chitietsp_luachon = document.querySelector(".chitietsanpham_luachonphienban");
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
    gia.textContent = sanpham.price;
    const donvi = document.createElement('SPAN');
    donvi.textContent = 'đ';
    donvi.className="donvi";
    gia.appendChild(donvi);
    const sale = document.querySelector(".chitietsanpham_gia-sale");
    sale.textContent = sanpham.salebefore;
     const donvisale = document.createElement('SPAN');
    donvisale.textContent = 'đ';
    donvisale.className = "donvi-sale";
    sale.appendChild(donvisale);
}

