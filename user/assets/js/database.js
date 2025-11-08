const Initial = [
  {
    id: "1",
    name: "IPhone 17 Pro Max",
    brand: "Apple",
    category: "Điện thoại",
    thumbnail: "../user/assets/image/sanpham/sp1.png",
    price: 3499000,
    salebefore: 3999000,
    baseprice: 2000000, // giá nhập vào 
    listVersions: [
      { name: "ram", option: ["6GB", "12GB", "24GB"] },
      { name: "dung lượng", option: ["128GB", "256GB"] }
    ],
    listColors: ["Cam Vũ Trụ", "Xanh Đậm", "Bạc"],
    versions: [
      {
        id: "1-cam-6-128",
        color: "Cam Vũ Trụ",
        price: 34990000,
        stock: 10,
        status: true,
        sold: "4.3k",
        version: ["6GB", "128GB"],
      },
      {
        id: "1-xanh-12-256",
        color: "Xanh Đậm",
        price: 34990000,
        stock: 20,
        status: false,
        sold: "4.9k",
        version: ["12GB", "256GB"],
      },
      {
        id: "1-bac-6-256",
        color: "Bạc",
        price: 34990000,
        stock: 30,
        status: false,
        sold: "4.6k",
        version: ["6GB", "256GB"],
      },
    ],
    imgDetail: [
      "../user/assets/image/sanpham/1/16-9-1.png",
      "../user/assets/image/sanpham/1/16-9-2.jpg",
      "../user/assets/image/sanpham/1/16-9-3.png",
      "../user/assets/image/sanpham/1/16-9-4.jpg",
      "../user/assets/image/sanpham/1/16-9-5.jpg",
      "../user/assets/image/sanpham/1/16-9-6.jpg",
      "../user/assets/image/sanpham/1/16-9-7.jpg",
    ],
    infoDetail: {
      "Hệ điều hành": "iOS 26",
      "Chip xử lý (CPU)": "Apple A19 Pro 6 nhân",
      "Chip đồ họa (GPU)": "Apple GPU 6 nhân",
      "RAM": "12GB",
      "Bộ nhớ trong": "256GB",
      "Màn hình": "6.8 inch Super Retina XDR",
      "Camera trước": "12MP TrueDepth",
      "Camera sau": "108MP + 12MP + 12MP",
      "Pin": "4500mAh, sạc nhanh 45W",
      "Kết nối": "5G, Wi-Fi 7, Bluetooth 5.3",
      "Bảo mật": "Face ID, Touch ID",
      "Trọng lượng": "238g",
      "Màu sắc": "Xanh Đậm, Bạc, Cam Vũ Trụ",
    },
    overview: `realme 14T 5G 8GB/256GB nổi bật trong phân khúc tầm trung với chip Dimensity 6300 5G mạnh mẽ, RAM
                    khủng đến 18 GB và màn hình AMOLED 120 Hz sắc nét. Pin 6000 mAh và sạc nhanh 45W đảm bảo thời gian
                    sử dụng cả ngày. Thiết kế mỏng nhẹ, bền bỉ với chuẩn kháng nước và bụi IP69, realme 14T 5G là lựa
                    chọn lý tưởng cho game thủ và những ai đòi hỏi hiệu suất cao.

                    Chiến game cực đỉnh, đa nhiệm siêu mượt mà
                    realme 14T 5G trang bị bộ vi xử lý Dimensity 6300 5G mạnh mẽ, được sản xuất trên tiến trình 6 nm
                    tiên tiến, mang lại tốc độ xử lý 2.4 GHz và tối ưu hóa điện năng. Với kết nối 5G siêu tốc, bạn có
                    thể tải xuống nhanh chóng với tốc độ lên đến 3.3 Gb/s. Hiệu năng chơi game cũng được cải thiện, mượt
                    mà hơn 10% so với thế hệ trước, mang đến trải nghiệm giải trí liên tục và không gián đoạn.    
                     <img src="/user/assets/image/sanpham/1/thongtin.jpg" alt="" > `  ,
  },
];
let listTaiKhoan = [
  {
    hoten: "hoang",
    sdt: "0000000001",
    mk: "hoang123",
    gmail: "tieubaobao@gmail.com",
    diachi: "hoa dong",
    quyenhang: "quanly",
    status: true,
  },
];


export function timPhienBanSanPham(id) {
  const listSanPham = getListSanPham();
  for (let sp of listSanPham) {
    for (let sanpham of sp.versions) {
      if (sanpham.id === id) {
        return sanpham;
      }
    }
  }
  return null;
}


export function timSanPhamTheoTen(ten){
  
}

export function laySanPhamBangLuaChon(id, listpb, mau) {
  let sanpham = timSanPham(id);
  for (let sp of sanpham.versions) {
    if (sp.color === mau && sp.version.length === listpb.length &&
      sp.version.every((v, i) => v === listpb[i])) {
      if (sp.stock <= 0) {
          return;
        }
        sp.stock--;
      return sp;
    }
  }
  return null;
}

export function setListSanPham(mangsp) {
  localStorage.setItem("listSanPham", JSON.stringify(mangsp));
}

export function getListSanPham() {
  const data = JSON.parse(localStorage.getItem("listSanPham"));
  return data || [];
}

export function initialSanPham() {
  if (!localStorage.getItem("listSanPham")) {
    localStorage.setItem("listSanPham", JSON.stringify(Initial));
  }
}
export function initialTaiKhoan() {
  if (localStorage.getItem("listTaiKhoan") === null) {
    localStorage.setItem("listTaiKhoan", JSON.stringify(listTaiKhoan));
  }
}

export function timSanPham(id) {
  const listsp = getListSanPham();
  for (const sanpham of listsp) {
    if (sanpham.id === id) {
      return sanpham;
    }
  }
  return null;
}