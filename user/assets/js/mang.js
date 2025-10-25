const Initial = [
  {
    id: "hiqdqkr2", // đặt 6 kí tự chữ và số bất kì k để trùng là đc
    category: "Điện thoại",
    img: "../user/assets/image/sanpham/sp1.png", //path y như v
    name: "IPhone 17 Pro Max2",
    price: "30000000",
    status: true, //auto để true
    stock: "10",
    store: "256GB",
    createdAt: "10/24/2025, 12:25:55 AM", // nhập giờ nào cũng đc nhưng cú pháp y như v
    updatedAt: "10/24/2025, 12:25:55 AM", // nhập giờ nào cũng đc nhưng cú pháp y như v
  },
];

let mangtk = [
  {
    hoten: "hoang",
    sdt: "0000000001",
    mk: "hoang123",
    gmail: "tieubaobao@gmail.com",
    diachi: "hoa dong",
    quyenhang: "quanly",
  },
];

// export let mangsp = getListItem();


let mangsp = [
  {
    anh: "user/assets/image/sanpham/sp1.png",
    ten: "Nubia neo 2",
    gia: 5000000,
    danhmuc: "Điện thoại"
  },
  {
    anh: "user/assets/image/sanpham/sp2.png",
    ten: "Laptop ASUS TUF Gaming F16 FX607VJ-RL034W",
    gia: 150000000,
    danhmuc: "Điện thoại"
  },
  {
    anh: "user/assets/image/sanpham/sp2.png",
    ten: "lap top vip pro",
    gia: 9999999999,
    danhmuc: "Lap top"
  },
  {
    anh: "user/assets/image/sanpham/sp2.png",
    ten: "lap top vip pro",
    gia: 9999999999,
    danhmuc: "Lap top"
  },
  {
    anh: "user/assets/image/sanpham/sp2.png",
    ten: "lap top vip pro",
    gia: 9999999999,
    danhmuc: "Lap top"
  },
  {
    anh: "user/assets/image/sanpham/sp2.png",
    ten: "lap top vip pro",
    gia: 9999999999,
    danhmuc: "Lap top"
  },
  {
    anh: "user/assets/image/sanpham/sp2.png",
    ten: "lap top vip pro",
    gia: 9999999999,
    danhmuc: "Lap top"
  },
  {
    anh: "user/assets/image/sanpham/sp2.png",
    ten: "lap top vip pro",
    gia: 9999999999,
    danhmuc: "Lap top"
  },
  {
    anh: "user/assets/image/sanpham/sp2.png",
    ten: "lap top vip pro",
    gia: 9999999999,
    danhmuc: "Lap top"
  },
  {
    anh: "user/assets/image/sanpham/sp2.png",
    ten: "lap top vip pro",
    gia: 9999999999,
    danhmuc: "Lap top"
  },
  {
    anh: "user/assets/image/sanpham/sp2.png",
    ten: "lap top vip pro",
    gia: 9999999999,
    danhmuc: "Lap top"
  },
  {
    anh: "user/assets/image/sanpham/sp2.png",
    ten: "lap top vip pro",
    gia: 9999999999,
    danhmuc: "Lap top"
  },
  {
    anh: "user/assets/image/sanpham/sp2.png",
    ten: "lap top vip pro",
    gia: 9999999999,
    danhmuc: "Lap top"
  },
  {
    anh: "user/assets/image/sanpham/sp2.png",
    ten: "lap top vip pro",
    gia: 9999999999,
    danhmuc: "Lap top"
  },
  {
    anh: "user/assets/image/sanpham/sp2.png",
    ten: "lap top vip pro",
    gia: 9999999999,
    danhmuc: "Lap top"
  },
  {
    anh: "user/assets/image/sanpham/sp2.png",
    ten: "lap top vip pro",
    gia: 9999999999,
    danhmuc: "Lap top"
  },
  {
    anh: "user/assets/image/sanpham/sp2.png",
    ten: "lap top vip pro",
    gia: 9999999999,
    danhmuc: "Lap top"
  },
  {
    anh: "user/assets/image/sanpham/sp2.png",
    ten: "lap top vip pro",
    gia: 9999999999,
    danhmuc: "Lap top"
  },
  {
    anh: "user/assets/image/sanpham/sp2.png",
    ten: "lap top vip pro",
    gia: 9999999999,
    danhmuc: "Lap top"
  }
];


function taoListSanPham() {
  if (localStorage.getItem("mangsanpham") === null) {
    localStorage.setItem("mangsanpham", JSON.stringify(mangsp));
  }
}

function taoListTaiKhoan() {
  if (localStorage.getItem("mangtaikhoan") === null) {
    localStorage.setItem("mangtaikhoan", JSON.stringify(mangtk));
  }
}