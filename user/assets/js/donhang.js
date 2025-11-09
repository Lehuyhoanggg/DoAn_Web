import { timSanPham } from "./database.js";
import { tachetgiaodien } from "./home.js";

const div = document.createElement('DIV');
div.className = "donhang";

document.querySelector(".main").appendChild(div);

window.addEventListener('DOMContentLoaded', function () {
    div.innerHTML =
        `<div class="donhang_text">
            <p class="donhang_text-title">Quản lí đơn hàng của bạn</p>
            <p class="donhang_text-desc">Xem chi tiết, trạng thái của những đơn hàng đã đặt.</p>
        </div>

        <ul class="donhang_list">
    
        </ul>`;
    khoiphucdonhang();
    if (document.querySelector(".donhang_list").children.length === 0) {
        donhangtrong(document.querySelector(".donhang_list"));
    }
    const overlay = document.querySelector('.overlay');
    document.querySelector(".main").appendChild(div);
    const openDonHang = document.querySelector(".open_donhang");
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });

    openDonHang?.addEventListener('click', function () {
        tachetgiaodien();
        div.style.display = 'flex';
    });
    const ul = this.document.querySelector(".donhang_xemchitiet_ul");
    const listxemchitiet = document.querySelectorAll(".donhang_xemchitiet");
    listxemchitiet.forEach(xemchitiet => {
        xemchitiet.addEventListener('click', function () {
            overlay.style.display = 'block';
            ul.style.display = 'flex';
        });



    });
    const listhuy = document.querySelectorAll(".donhang_xemchitiet_xoa");
    listhuy.forEach(huy => {
        huy.addEventListener('click', function (event) {
            event.stopPropagation();
            overlay.style.display = 'none';
            ul.style.display = 'none';
        });
    });




});




export function donhangtrong(ctn) {
    ctn.innerHTML = ``;
    const tb1 = document.createElement("p");
    tb1.textContent = "Bạn chưa có đơn hàng nào";
    tb1.className = "kotimthaysp1";
    const ctn_tb = document.createElement("div");
    ctn_tb.className = "kotimthaysp";
    ctn_tb.appendChild(tb1);

    ctn_tb.innerHTML += `<img class="donhangtrong_icon" src="./user/assets/svg/matcuoi.svg"> 
`;
    ctn.appendChild(ctn_tb);
}





function khoiphucdonhang() {

    const taikhoan = JSON.parse(localStorage.getItem("taikhoandangnhap"));
    if (taikhoan === null) {
        return;
    }

    const listdonhang = JSON.parse(localStorage.getItem("donhang"));
    if (listdonhang === null) {
        return;
    }

    listdonhang.forEach(donhang => {
        if (donhang.sdt === taikhoan.sdt) {
            let donhang_item = document.createElement('LI');
            donhang_item.className = "donhang_item";
            donhang_item.innerHTML = `
                <ul class="donhang_sanpham-list">
                    
                </ul>

                <div class="donhang_tongtien">
                    <div class="donhang_tongtien_top">
                        <span class="donhang_trangthai"> <img src="./user/assets/svg/reload.svg" alt=""> Đang xử lí</span>
                        <button class="donhang_xemchitiet"><div class="donhang_xemchitiet_ul">
                            <h2>Thông tin đơn hàng  <div class="donhang_xemchitiet_xoa">x</div> </h2>
                                <ul class="donhang_xemchitiet_list">

                                    <li class="donhang_ngaydat" >
                                         <i class="fa-solid fa-calendar-days"></i>
                                         Ngày đặt hàng:
                                        <span class="donhang_ngaydat_span">${donhang.thoiGianGiao}</span>
                                    </li>
                                    <li class="donhang_loaithanhtoan">
                                        <i class="fa-solid fa-money-bill-wave"></i>
                                        Loại thanh toán : 
                                        <span class="donhang_loaithanhtoan_span">${donhang.hinhThucThanhToan}</span>
                                    </li>
                                    <li class="donhang_ngaynhan">
                                        <i class="fa-solid fa-clock"></i>
                                        Ngày nhận hàng : 
                                        <span class="donhang_ngaynhan_span">${donhang.thoiGianGiao}</span>
                                    </li>
                                    <li class="donhang_diachi">
                                        <i class="fa-solid fa-location-dot"></i>
                                        Địa điểm nhận : 
                                        <span class="donhang_diachi_span">${donhang.diaChi}</span>
                                    </li>
                                    <li class="donhang_nguoinhan">
                                        <i class="fa-solid fa-user"></i>
                                        Người nhận : 
                                        <span class="donhang_nguoinhan_span">${donhang.tenNguoiNhan}</span>
                                    </li>
                                    <li class="donhang_sdt">
                                        <i class="fa-solid fa-phone"></i>
                                        Số điện thoại nhận : 
                                        <span class="donhang_sdt_span">${donhang.sdtNguoiNhan}</span>
                                    </li>
                                    <li class="donhang_ghichu">
                                        <i class="fa-solid fa-note-sticky"></i>
                                        Ghi chú : 
                                        <span class="donhang_ghichu_span">${donhang.ghiChu}</span>
                                    </li>
                
                                </ul>


                        </div>Xem chi tiết</button>
                    </div>

                    <div>
                        <span>Tổng tiền :</span>
                        <span class="donhang_thanhtien">${donhang.sanpham.thanhtien}<span class="donvi">đ</span></span>
                    </div>
                </div>
                `;

            document.querySelector(".donhang_list").appendChild(donhang_item);
            let listsp = donhang.sanpham.sanpham;
            listsp.forEach(sanpham => {
                let sp = timSanPham(sanpham.id);

                donhang_item.querySelector(".donhang_sanpham-list").innerHTML += `<li class="donhang_sanpham">
                        <div class="donhang_sanpham_left">
                            <img src="${sp.thumbnail}" alt="">
                            <div>
                                <span class="donhang_sanpham-name">${sp.name}</span>
                                <span class="donhang_sanpham-thuonghieu">${sanpham.mau + sanpham.listphienban}</span>
                                <span class="donhang_sanpham-soluong">x${sanpham.soLuong}</span>
                            </div>

                        </div>

                        <div class="donhang_sanpham-right">
                            <span class="donhang_sanpham_thanhtien">${sanpham.thanhtien}<span class="donvi">đ</span></span>
                        </div>

                    </li>`;
            });
        }
    });

}