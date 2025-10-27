const openGioHang = document.querySelector('.header_top_right_giohang');
const giohangOverlay = document.querySelector('.overlay');
let giohangModel = document.querySelector('.giohang');


// Hàm thêm sự kiện đóng giỏ hàng
function themSuKienDong(giohang) {
    const closeBtn = giohang.querySelector('.giohang_top_huy');
    closeBtn.addEventListener('click', () => {
        giohang.style.display = 'none';
        giohangOverlay.style.display = 'none';
        enableScroll();
    });
}

// Sự kiện khi click mở giỏ hàng
openGioHang.addEventListener('click', () => {
    // Nếu chưa có giỏ hàng trong DOM
    if (!giohangModel) {
        fetch('user/pages/giohang.html')
            .then(res => res.text())
            .then(html => {
                document.body.insertAdjacentHTML('beforeend', html);
                
                giohangModel = document.querySelector('.giohang');
                themSuKienDong(giohangModel);
                giohangModel.style.display = 'block';
                giohangOverlay.style.display = 'block';
                disableScroll();
            })
            .catch(err => console.error('Lỗi tải giỏ hàng:', err));
    }
    // Nếu giỏ hàng đã tồn tại
    else {
        giohangModel.style.display = 'block';
        giohangOverlay.style.display = 'block';
        disableScroll();
    }
});
