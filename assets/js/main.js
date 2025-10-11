let danhmuc;
let mangsanpham;
window.onload = () => {
    taoListSanPham();
    if (home_sp_list.children.length === 0) {
        danhmuc = "Điện thoại";
        mangsanpham = JSON.parse(localStorage.getItem("mangsanpham"));
        if (mangsanpham == null) {
            console.log("loi roi 404");
            return;
        }
        themspvaolist();
    }
}



const home_sp_list = document.querySelector(".home_sanpham_list");
const topmenu = document.querySelector(".topMenu_list");


topmenu.addEventListener('click', function (e) {
    if (e.target.className == "topMenu_list_item") {
        danhmuc = e.target.textContent;
        themspvaolist();
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
    sanpham_item_name.className = "home_sanpham_list_item_name"
    let sanpham_item_prime = document.createElement("span");
    sanpham_item_prime.textContent = fomatgiatien(sanpham.gia);
    sanpham_item_prime.className = "home_sanpham_list_item_prime";

    sanpham_item.appendChild(sanpham_item_img);
    sanpham_item.appendChild(sanpham_item_name);
    sanpham_item.appendChild(sanpham_item_prime);

    const nutMuaNgayHTML = `
        <button class="home_sanpham_list_item_muangay">
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


function themspvaolist() {
    home_sp_list.innerHTML = ``;
    mangsanpham.forEach(sanpham => (sanpham.danhmuc === danhmuc) ? them1sanpham(sanpham) : "");
}
