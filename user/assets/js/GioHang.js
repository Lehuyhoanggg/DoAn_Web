const openGioHang = document.querySelector('.header_top_right_giohang');
const giohangOverlay = document.querySelector('.overlay');
let giohangModel = document.querySelector('.giohang');


// Hàm thêm sự kiện đóng giỏ hàng
function themSuKienDong(giohang) {
    const closeBtn = giohang.querySelector('.giohang_top_huy');
    closeBtn.addEventListener('click', () => {
        giohang.style.right = '-600px';
        giohangOverlay.style.display = 'none';
        enableScroll();
    });
}
function themSuKienSoLuong() {
    /// =========== tăng số lượng đơn đặt hàng
    const tangSoLuong = document.querySelector(".tangsoluong");
    const giamSoLuong = document.querySelector(".giamsoluong");
    tangSoLuong.addEventListener('click', function () {
        let so = document.querySelector(".giohang_mid_donhang_chucnang_soluong_value").textContent;
        document.querySelector(".giohang_mid_donhang_chucnang_soluong_value").textContent = Number(so) + 1;
    });
    giamSoLuong.addEventListener('click', function () {
        let so = document.querySelector(".giohang_mid_donhang_chucnang_soluong_value").textContent;
        if (so === "0") {
            return;
        }
        document.querySelector(".giohang_mid_donhang_chucnang_soluong_value").textContent = Number(so) - 1;
    });
}
// Sự kiện khi click mở giỏ hàng
openGioHang.addEventListener('click', () => {
    // Nếu chưa có giỏ hàng trong DOM
    if (!giohangModel) {
        fetch('user/pages/GioHang.html')
            .then(res => res.text())
            .then(html => {
                document.body.insertAdjacentHTML('beforeend', html);

                giohangModel = document.querySelector('.giohang');
                themSuKienDong(giohangModel);
                themSuKienSoLuong();
                giohangModel.style.right = '5px';

                giohangOverlay.style.display = 'block';
                disableScroll();
            })
            .catch(err => console.error('Lỗi tải giỏ hàng:', err));
    }
    // Nếu giỏ hàng đã tồn tại
    else {
        giohangModel.style.right = '5px';
        giohangOverlay.style.display = 'block';
        disableScroll();
    }
});

