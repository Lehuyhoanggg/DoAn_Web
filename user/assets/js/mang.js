const Initial = [
   {
     name: "IPhone 17 Pro Max",
     brand: "Apple",
     category: "Điện thoại",
     thumbnail: "/user/assets/image/sanpham/sp1.png",
     versions: [
       {
         storage: "256GB",
         colors: [
           {
             color: "Cam Vũ Trụ",
             price: 34990000,
             stock: 10,
             status: true,
             rating: 4.9,
             sold: "4.3k",
           },
           {
             color: "Xanh Đậm",
             price: 34990000,
             stock: 20,
             status: false,
             rating: 4.8,
             sold: "4.9k",
           },
           {
             color: "Bạc",
             price: 34990000,
             stock: 30,
             status: false,
             rating: 0,
             sold: "4.6k",
           },
         ],
       },
     ],
     imgDetail: [],
     infoDetail: {
       "Hệ điều hành": "iOS 26",
       "Chip xử lý (CPU)": "Apple A19 Pro 6 nhân",
       "Chip đồ họa (GPU)": "Apple GPU 6 nhân",
       RAM: "12GB",
       "Dung lượng lưu trữ": "256GB",
       "Dung lượng còn lại (khả dụng) khoảng": "241GB",
     },
     rating: 4.9,
     sold: "4,3k",
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
    status: true,
  },
];

 export let mangsp = getListItem();

export function setListItem(mangsp) {
  localStorage.setItem("mangsanpham", JSON.stringify(mangsp));
}

export function getListItem() {
  const data = JSON.parse(localStorage.getItem("mangsanpham"));
  return data || [];
}

export function initialData() {
  if (!localStorage.getItem("mangsanpham")) {
    localStorage.setItem("mangsanpham", JSON.stringify(Initial));
  }
}

export function taoListTaiKhoan() {
  if (localStorage.getItem("mangtaikhoan") === null) {
    localStorage.setItem("mangtaikhoan", JSON.stringify(mangtk));
  }
}
