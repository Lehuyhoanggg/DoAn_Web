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
