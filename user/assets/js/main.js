


let danhmuc;
let mangsanpham;
let page_number;

window.onload = () => {
    page_number = 1;
    taoListSanPham();
    if (home_sp_list.children.length === 0) {
        danhmuc = "Điện thoại";
        mangsanpham = JSON.parse(localStorage.getItem("mangsanpham"));
        if (mangsanpham == null) {
            console.log("loi roi 404");
            return;
        }
        themspvaolist();
        let mangbutton = phantrang.children;
        if (mangbutton[0]) mangbutton[0].classList.add("nhan");
    }
}


/// section kham pha san pham

const home_sp_list = document.querySelector(".home_sanpham_list");
const topmenu = document.querySelector(".topMenu_list");


topmenu.addEventListener('click', function (e) {
    if (e.target.className == "topMenu_list_item") {

        danhmuc = e.target.textContent;
        page_number = 1;
        themspvaolist();
        let mangbutton = phantrang.children;
        if (mangbutton[0]) mangbutton[0].classList.add("nhan");
        cuon = false;
        window.scrollTo({
            top: 410,
            behavior: "smooth" // thêm hiệu ứng cuộn mượt
        });
        setTimeout(() => {
            cuon = true;
        }, 500);
    }
});


window.addEventListener("scroll", () => {
    if (window.scrollY >= 410 && window.scrollY <= 800) {
        const header_bottom = document.querySelector(".header_bottom");
        const header = document.querySelector(".header");
        cuon = false;
        header.classList.remove("colai");
        header_bottom.classList.remove("bienmat");
    }
    else {
        cuon = true;
    }
});


function fomatgiatien(gia) {
    return gia + "đ";
}

function them1sanpham(sanpham) {
    let sanpham_item = document.createElement("li");
    sanpham_item.className = "home_sanpham_list_item";

    let sanpham_item_img = document.createElement("img");
    sanpham_item_img.src = sanpham.anh;
    sanpham_item_img.className = "home_sanpham_list_item_img";
    let sanpham_item_name = document.createElement("span");
    sanpham_item_name.textContent = sanpham.ten;
    sanpham_item_name.className = "sanpham_name"
    let sanpham_item_prime = document.createElement("span");
    sanpham_item_prime.textContent = sanpham.gia;
    let primeDv = document.createElement('span');
    primeDv.textContent = "đ";
    primeDv.style.fontSize = "13px";
    primeDv.style.textDecoration = "underline"
    primeDv.style.verticalAlign = "top";
    sanpham_item_prime.appendChild(primeDv);
    sanpham_item_prime.className = "sanpham_prime";

    sanpham_item.appendChild(sanpham_item_img);
    sanpham_item.appendChild(sanpham_item_name);
    sanpham_item.appendChild(sanpham_item_prime);

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
        </button>`;

    sanpham_item.innerHTML += nutMuaNgayHTML;
    home_sp_list.appendChild(sanpham_item);
}

const phantrang = document.querySelector(".home_sanpham_phantrang");

function themButtonPhanTrang() {
    phantrang.innerHTML = ``;
    let mangThoaMan = mangsanpham.filter(sanpham => {
        return sanpham.danhmuc === danhmuc;
    });

    lenghtSanPham = mangThoaMan.length;

    let soNut = lenghtSanPham / 8 + (lenghtSanPham % 8 > 0 ? 1 : 0);
    for (let i = 1; i <= soNut; i++) {
        let button = document.createElement("button");
        button.textContent = i;
        phantrang.appendChild(button);
    }
}



phantrang.addEventListener('click', function (e) {
    if (e.target.tagName == 'BUTTON') {
        let mangbutton = phantrang.children;
        mangbutton[page_number - 1].classList.remove("nhan");
        page_number = e.target.textContent;
        themspvaolist();
        window.scrollTo({
            top: 410,
            behavior: "smooth" // thêm hiệu ứng cuộn mượt
        });


        mangbutton[page_number - 1].classList.add("nhan");

    }
});

function khongtimthaysp(ctn) {
    const tb1 = document.createElement('p');
    tb1.textContent = "Không tìm thấy sản phẩm";
    tb1.className = "kotimthaysp1";
    const tb2 = document.createElement('p');
    tb2.textContent = "Xin lỗi, chúng tôi không thể tìm được kết quả hợp với tìm kiếm của bạn";
    tb2.className = "kotimthaysp2";
    const ctn_tb = document.createElement('div');
    ctn_tb.className = "kotimthaysp";
    ctn_tb.appendChild(tb1);
    ctn_tb.appendChild(tb2);

    ctn_tb.innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 64 64" role="img" aria-label="Mặt buồn">
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
`
    ctn.appendChild(ctn_tb);

}



function themspvaolist() {
    let mangThoaMan = mangsanpham.filter(sanpham => {
        return sanpham.danhmuc === danhmuc;
    });
    home_sp_list.innerHTML = ``;

    if (mangThoaMan.length === 0) {
        khongtimthaysp(home_sp_list);
    }

    for (let i = 0; i < 8; i++) {
        let index = (page_number - 1) * 8 + i;
        if (index < mangThoaMan.length) {
            them1sanpham(mangThoaMan[index]);
        }
    }
    themButtonPhanTrang();


}

/// ////////////