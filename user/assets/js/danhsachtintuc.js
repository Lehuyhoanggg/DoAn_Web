const newsData = [
    {
        id : "1",
        img: "user/assets/image/tintuc/news7.png",
        title: "Motorola Razr 60 sở hữu thiết kế gập vỏ sò cao cấp, camera 50MP màu chuẩn Pantone.",
        meta: "Hồ Xuân Lý • 6/11/2025",
        desc: "Motorola đánh dấu sự trở lại mạnh mẽ tại thị trường Việt Nam với mẫu smartphone gập, motorola Razr 60 và là sản phẩm cao cấp nhất trong lần ra mắt này.",
        link: "#"
    },
    {
        img: "user/assets/image/tintuc/news8.png",
        title: "HONOR X6b Plus: Smartphone giá rẻ chuẩn bền bỉ, sạc nhanh 35W",
        meta: "Hồ Xuân Lý • 5/11/2025",
        desc: "HONOR đã chính thức ra mắt HONOR X6b Plus, mẫu điện thoại giá rẻ mới thuộc X-series, hướng đến người dùng phổ thông cần một thiết bị bền bỉ, pin lâu và camera chất lượng cao.",
        link: "#"
    },
    {
        img: "user/assets/image/tintuc/news9.png",
        title: "iQOO Neo 11 ra mắt: Màn hình 2K 144Hz, Snapdragon 8 Elite và pin 7.500mAh",
        meta: "Hồ Xuân Lý • 1/11/2025",
        desc: "iQOO chính thức trình làng iQOO Neo 11 tại Trung Quốc, mở đầu thế hệ smartphone gaming mới với hiệu năng vượt trội, pin siêu khủng và thiết kế bền bỉ chuẩn IP69.",
        link: "#"
    },
    {
        img: "user/assets/image/tintuc/news10.png",
        title: "HONOR X7d 5G: Pin 6.500mAh, sạc nhanh 35W và loa kép 400%",
        meta: "Hồ Xuân Lý • 30/10/2025",
        desc: "HONOR đã trình làng HONOR X7d 5G, mẫu smartphone tầm trung mới nổi bật với thiết kế cao cấp, độ bền chuẩn SGS 5 sao, pin “khủng” 6.500mAh và vi xử lý Snapdragon 6s Gen 3 mạnh mẽ.",
        link: "#"
    },
    {
        img: "user/assets/image/tintuc/news1.png",
        title: "Apple ra mắt MacBook mới",
        meta: "Hồ Xuân Lý • 17/10/2025",
        desc: "MacBook Pro M5 chính thức ra mắt với hiệu năng vượt trội và thiết kế mỏng nhẹ hơn.",
        link: "#"
    },
    {
        img: "user/assets/image/tintuc/news3.png",
        title: "Xiaomi 15T ra mắt với camera Leica",
        meta: "Hồ Xuân Lý • 15/10/2025",
        desc: "Xiaomi 15T tiếp tục hợp tác với Leica, đem lại khả năng chụp ảnh ấn tượng.",
        link: "#"
    },
    {
        img: "user/assets/image/tintuc/news4.png",
        title: "OPPO Pad 5 và Watch S ra mắt",
        meta: "Hồ Xuân Lý • 14/10/2025",
        desc: "Cặp đôi mới từ OPPO mang lại trải nghiệm đồng bộ và thông minh hơn.",
        link: "#"
    },
    {
        img: "user/assets/image/tintuc/news6.png",
        title: "OPPO chính thức ra mắt Enco X3s, mẫu tai nghe không dây mới.",
        meta: "Hồ Xuân Lý • 13/10/2025",
        desc: "OPPO chính thức ra mắt Enco X3s, mẫu tai nghe không dây mới",
        link: "#"
    },
    {
        img: "user/assets/image/tintuc/news5.png",
        title: "Asus ra mắt ZenBook 2025",
        meta: "Hồ Xuân Lý • 11/10/2025",
        desc: "Mẫu laptop mới của Asus được trang bị chip Intel Ultra và thiết kế sang trọng.",
        link: "#"
    },
    {
        img: "user/assets/image/tintuc/news2.png",
        title: "Samsung Galaxy S25 Ultra lộ diện",
        meta: "Hồ Xuân Lý • 9/10/2025",
        desc: "Thiết kế siêu mỏng, camera 200MP và chip Snapdragon 8 Gen 4 đầy ấn tượng.",
        link: "#"
    },
];

import { vohieuCuon, vohieuGiuCuon, tacThanhDanhMuc } from "./header.js";
const div = document.createElement('DIV');
div.className = "home_tintuc";
div.innerHTML = ` <h2>Tin tức</h2>
                <ul class="home_tintuc_list">
                    <li class="home_tintuc_list_item">
                        <img src="user/assets/image/tintuc/news1.png" alt="MacBook Pro M5">
                        <div class=tintuc_info>
                            <h3>Apple ra mắt MacBook mới</h3>
                            <p>MacBook Pro M5 chính thức được Apple ra mắt vào tối ngày 15/10/2025 với phiên bản 14
                                inch
                                trang bị chip M5 mới.</p>
                            <a href="#" class="doc-them">Đọc thêm</a>
                        </div>
                    </li>

                    <li class="home_tintuc_list_item">
                        <img src="user/assets/image/tintuc/news2.png" alt="Samsung Galaxy S25 Ultra">
                        <div class="tintuc_info">
                            <h3>Samsung Galaxy S25 Ultra lộ diện</h3>
                            <p>Thiết kế siêu mỏng, camera 200MP và chip Snapdragon 8 Gen 4 đầy ấn tượng.</p>
                            <a href="#" class="doc-them">Đọc thêm</a>
                        </div>
                    </li>

                    <li class="home_tintuc_list_item">
                        <img src="user/assets/image/tintuc/news3.png" alt="Xiaomi 15">
                        <h3>Xiaomi 15T ra mắt với camera Leica</h3>
                        <p>Siêu phẩm Xiaomi 15T ra mắt, trang bị cụm camera Leica và chip Snapdragon mới nhất.</p>
                        <a href="#" class="doc-them">Đọc thêm</a>
                    </li>

                    <li class="home_tintuc_list_item">
                        <img src="user/assets/image/tintuc/news4.png" alt="OPPO Pad 5 và OPPO Watch S">
                        <h3>OPPO Pad 5 và OPPO Watch S ra mắt</h3>
                        <p>Cả 2 sản phẩm đều thể hiện rõ hướng đi của OPPO trong việc kết hợp hiệu năng, thiết kế và
                            AI,
                            mang lại trải nghiệm toàn diện cho người dùng.</p>
                        <a href="#" class="doc-them">Đọc thêm</a>
                    </li>
                </ul>
                <div class="xem-them">
                    <a href="#" id="btn-xem-them">Xem thêm ></a>
                </div>`;
document.querySelector(".main").appendChild(div);
const divnew = document.createElement('DIV');
divnew.className = "news-list";
document.querySelector(".home").appendChild(div);

document.querySelector(".main").appendChild(divnew);




// Khi bấm xem thêm trong phần tin tức (trang chủ) sẽ chuyển tới trang danh sách tin tức
document.addEventListener("DOMContentLoaded", () => {
    const btnXemThem = document.getElementById("btn-xem-them");
    const home = document.querySelector(".home");
    const newsList = document.querySelector(".news-list");

    btnXemThem?.addEventListener("click", () => {
        home.style.display = "none";
        newsList.style.display = "block";
        window.scrollTo({ top: 0, behavior: "smooth" });
        vohieuCuon();
        vohieuGiuCuon();
        tacThanhDanhMuc();
    });
});

// Hiển thị trang danh sách tin tức
document.addEventListener("DOMContentLoaded", () => {
    const newsListPage = document.querySelector(".news-list");

    if (newsListPage.childElementCount > 0) return; // nếu đã render rồi thì bỏ qua

    //==================banner==================
    const banner = document.createElement("section");
    banner.className = "news-banner";
    banner.innerHTML = `<img src="user/assets/image/banner/news-banner.png" alt="Công nghệ" />
                <div class="banner-text">
                    <h1>Tin tức công nghệ mới nhất</h1>
                    <p>Cập nhật liên tục xu hướng và sản phẩm công nghệ mới nhất trên thị trường</p>
                </div>`;

    newsListPage.appendChild(banner);

    //==================feature==================
    const feature = document.createElement("section");
    feature.className = "news-feature";
    feature.innerHTML = `<img src="user/assets/image/tintuc/feature-img.png" alt="Feature image" />
                <div class="feature-content">
                    <h1>OPPO Find X9 Series ra mắt tại VN: Camera Hasselblad 200MP, pin 7,500mAh, giá từ 22.99
                        triệu
                    </h1>
                    <p>Hồ Xuân Lý • 31/10/2025</p>
                    <p>OPPO chính thức ra mắt Find X9 và Find X9 Pro tại Việt Nam, cùng thời điểm sự kiện ra mắt toàn cầu tại Barcelona, Tây Ban Nha.</p>
                    <a href="#">Đọc thêm</a>
                </div>`;

    newsListPage.appendChild(feature);

    //==================main content==================
    const main_content = document.createElement("section");
    main_content.className = "news-main";
    main_content.innerHTML = `<div class="news-content">
                    <div id="newsList" class="news-list"></div>
                    <div id="pagination" class="pagination"></div>
                </div>
                <aside class="news-sidebar">
                    <h3>TIN NỔI BẬT</h3>
                    <ul>
                        <li><a href="#">OPPO Find X9 Series ra mắt tại VN</a></li>
                        <li><a href="#">OPPO Pad 5 và Watch S ra mắt</a></li>
                        <li><a href="#">Apple ra mắt MacBook Pro M5</a></li>
                    </ul>
                    <h3>#CHỦ ĐỀ HOT</h3>
                    <div class="tags">
                        <span>#OPPO Find X9 Series</span>
                        <span>#Apple</span>
                        <span>#AI</span>
                        <span>#Oppo</span>
                        <span>#Honor</span>
                        <span>#Samsung</span>
                    </div>
                </aside>`;

    newsListPage.appendChild(main_content);

    // Hiển thị danh sách tin tức và phân trang
    const newsList = document.getElementById("newsList");
    const pagination = document.getElementById("pagination");

    let currentPage = 1;
    const itemsPerPage = 4;

    function renderNewsList() {
        newsList.innerHTML = "";
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const currentNews = newsData.slice(start, end);

        currentNews.forEach(n => {
            const card = document.createElement("div");
            card.classList.add("news-item");
            card.innerHTML = `
            <img src="${n.img}" alt="${n.title}">
            <div class="news-content">
                <h3>${n.title}</h3>
                <p class="meta">${n.meta}</p>
                <p class="desc">${n.desc}</p>
                <a href="${n.link}" class="btn-read">Đọc thêm</a>
            </div>
        `;
            newsList.appendChild(card);
        });
    }

    function renderPagination() {
        pagination.innerHTML = "";
        const totalPages = Math.ceil(newsData.length / itemsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement("button");
            btn.textContent = i;
            if (i === currentPage) btn.classList.add("active");
            btn.addEventListener("click", () => {
                currentPage = i;
                renderNewsList();
                renderPagination();
            });
            pagination.appendChild(btn);
        }
    }

    renderNewsList();
    renderPagination();

});



const div = document.createElement('DIV');
div.className="tintuc";

