// user/assets/js/tim-kiem.js

// (1) IMPORT "DATABASE" THẬT TỪ FILE MANG.JS
// (Vì 2 file .js này nằm cùng thư mục, chúng ta dùng './')
import { getListSanPham } from './database.js';

// (2) GỌI HÀM ĐỂ LẤY TOÀN BỘ SẢN PHẨM THẬT TỪ LOCALSTORAGE
const ALL_PRODUCTS = getListSanPham();

// (3) HÀM GIÚP ĐỔI SỐ (VD: 34990000) SANG TIỀN TỆ (VD: 34.990.000 ₫)
function formatPrice(price) {
    // Nếu không có giá, trả về "Đang cập nhật"
    if (!price) {
        return "Đang cập nhật";
    }
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

// (4) HÀM HIỂN THỊ SẢN PHẨM (ĐÃ CẬP NHẬT ĐỂ ĐỌC CẤU TRÚC MỚI)
function displayProducts(products) {
    const resultsGrid = document.getElementById('search-results-grid');
    
    // Nếu không tìm thấy sản phẩm nào
    if (!products || products.length === 0) {
        resultsGrid.innerHTML = '<p>Không tìm thấy sản phẩm nào phù hợp.</p>';
        return;
    }

    // Tạo HTML cho mỗi sản phẩm tìm được
    resultsGrid.innerHTML = products.map(product => {
        // Lấy thông tin cơ bản từ sản phẩm thật
        // Lưu ý: Chúng ta lấy giá và ảnh của phiên bản/màu sắc ĐẦU TIÊN
        const productName = product.name;
        const productThumbnail = product.thumbnail;
        
        // Lấy giá của phiên bản đầu tiên, màu đầu tiên
        // Dùng '?' (optional chaining) để tránh lỗi nếu 'versions' hoặc 'colors' bị rỗng
        const defaultPrice = product.versions?.[0]?.colors?.[0]?.price; 
        const formattedPrice = formatPrice(defaultPrice);

        return `
            <div class="search-product-card">
                <img src="${productThumbnail}" alt="${productName}">
                <h3>${productName}</h3>
                <p>${formattedPrice}</p>
            </div>
        `;
    }).join('');
}

// (5) HÀM KHỞI TẠO TRANG TÌM KIẾM (ĐÃ SỬA LẠI TÊN 'timkiem')
function initSearchPage() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Lấy giá trị của 'timkiem' trên URL (tên trực quan bạn đã chọn)
    const query = urlParams.get('tim'); 

    const titleElement = document.getElementById('search-results-title');
    
    if (query) {
        titleElement.textContent = `Kết quả tìm kiếm cho: "${query}"`;
        
        // Lọc "database" THẬT
        const lowerCaseQuery = query.toLowerCase();
        
        // Logic lọc: Tìm trong 'product.name'
        const filteredProducts = ALL_PRODUCTS.filter(product => 
            product.name.toLowerCase().includes(lowerCaseQuery)
        );
        
        // Hiển thị sản phẩm đã lọc
        displayProducts(filteredProducts);

    } else {
        titleElement.textContent = 'Vui lòng nhập từ khóa để tìm kiếm';
        displayProducts([]); 
    }
}

// (6) CHẠY HÀM KHI TRANG TẢI XONG
document.addEventListener('DOMContentLoaded', initSearchPage);