import {
  // mangsp,
  getListItem,
  setListItem,
  initialData,
} from "../user/assets/js/mang.js";
window.productPage = productPage;
initialData();
let mangsp = getListItem();

const sidebarItemsArrayy = [
  {
    label: "Trang tổng quan",
    icon: "fa-solid fa-house",
    Page: "home",
  },
  {
    label: "Quản lí sản phẩm",
    icon: "fa-solid fa-shop",
    Page: "product",
  },
  {
    label: "Quản lí khách hàng",
    icon: "fa-solid fa-users",
    Page: "user",
  },
  {
    label: "Quản lí đơn hàng",
    icon: "fa-solid fa-cart-shopping",
    Page: "order",
  },
  {
    label: "Thống kê",
    icon: "fa-solid fa-chart-simple",
    Page: "chart",
  },
  {
    label: "Quản lí kho",
    icon: "fa-solid fa-warehouse",
    Page: "store",
  },
  { label: "Trang chủ", icon: "fa-solid fa-circle-left" },
  { label: "Nguyen Van Dat", icon: "fa-solid fa-user" },
  { label: "Đăng xuất", icon: "fa-solid fa-arrow-right-from-bracket" },
];
// render sidebar
const sidebar = document.querySelector(".sidebar-list-item");
const modal = document.querySelector(".modal");

sidebar.innerHTML = sidebarItemsArrayy
  .map(
    (item, index) =>
      `
        <li class="sidebar-item ${index == 0 ? "active" : ""}" key=${index}>
            <a href="#">
                <i class="${item.icon}"></i>
                <span class="title">${item.label}</span>
            </a>
        </li>
    `
  )
  .join("");

const sidebarItems = document.querySelectorAll(".sidebar-item");
const container = document.querySelector(".container");
// handle click sidebar item
sidebarItems.forEach((e, index) => {
  e.addEventListener("click", () => {
    if (!e.classList.contains("active")) {
      sidebarItems.forEach((e) => e.classList.remove("active"));
      sidebarItemsArrayy.map((e) => (e.active = false));
      e.classList.add("active");
      sidebarItemsArrayy[index].active = true;
      loadPage(sidebarItemsArrayy[index].Page);
    }
  });
});
// Handle đổi trang
function loadPage(page) {
  sidebarItemsArrayy.map((e) => {
    if (e.Page) {
      const element = document.querySelector(`.${e.Page}-wrapper`);
      if (element) element.style.display = "none";
    }
  });
  document.querySelector(`.${page}-wrapper`).style.display = "block";
  const fn = `${page}Page`;
  typeof window[fn] == "function" && window[fn]();
}

loadPage("home");
// Trang sản phẩm
function productPage() {
  const loadBtn = document.querySelector(".product-reload-btn");
  const createBtn = document.querySelector(".product-create-btn");

  const categories = [
    { label: "Tất cả" },
    { label: "Điện thoại" },
    { label: "Laptop" },
    { label: "Tai nghe" },
    { label: "Đồng hồ" },
    { label: "Tablet" },
    { label: "SmartWatch" },
    { label: "Màn hình" },
    { label: "Bàn phím" },
    { label: "Chuột" },
    { label: "Khác" },
  ];

  // Render filter
  const loadFilter = () => {
    const product_filter = document.querySelectorAll("#product-filter");
    product_filter.forEach((e) => {
      e.innerHTML = categories
        .map((e) => `<option value="${e.label}">${e.label}</option>`)
        .join("");
    });
  };
  loadFilter();

  // Render sản phẩm
  const renderItem = () => {
    const productContent = document.querySelector(
      ".product-content table tbody"
    );
    const data = getListItem();
    productContent.innerHTML = data
      .map(
        (e) => `
            <tr>
              <th>${e.id}</th>
              <td>${e.name}</td>
              <td>${e.price}đ</td>
              <td>
                  <label class="toggle-wrapper">
                    <input type="checkbox" ${e.status ? "checked" : ""}/>
                    <span class="slider"></span>
                  </label>
              </td>
              <td>${e.category}</td>
              <td>${e.createdAt}</td>
              <td>${e.updatedAt}</td>
              <td><button class="product-detail-btn"><i class="fa-solid fa-eye"></i></button></td>
              <td><button class="product-delete-btn"><i class="fa-solid fa-trash"></i></button></td>
            </tr>
`
      )
      .join("");
  };
  renderItem();

  // Reload btn
  loadBtn.addEventListener("click", () => {
    console.log("reload");
  });

  // Create Btn
  createBtn.addEventListener("click", () => {
    modal.innerHTML = `
    <div class="createModal">
          <div class="createModal-header">
            <span class="createModal-title">Tạo sản phẩm</span>
            <button class="createModal-close-btn"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <div class="createModal-body">
            <label for="name">Tên sản phẩm</label>
            <input type="text" name="name" placeholder="Nhập tên sản phẩm" >

            <label for="price">Giá sản phẩm</label>
            <input type="text" name="price" placeholder="Nhập giá sản phẩm" >

            <label for="store">Dung lượng sản phẩm</label>
            <input type="text" name="store" placeholder="Nhập dung lượng sản phẩm" >

            <label for="stock">Số lượng sản phẩm</label>
            <input type="number" name="stock" placeholder="Nhập số lượng sản phẩm" >

            <label for="store">Danh mục sản phẩm</label>
            <select name="categories" id="product-filter"></select>
          </div>
          <div class="createModal-footer">
            <button class="createModal-accept-btn">Xác nhận</button>
          </div>
        </div>
    `;
    loadFilter();
    modal.style.display = "block";
    const closeBtn = document.querySelector(".createModal-close-btn");
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
    // Create ID
    const createID = () => {
      return Math.random().toString(36).substring(2, 10);
    };

    // lấy categories
    const productFilter = document.querySelector("#product-filter");
    // Handle create product
    const inputs = modal.querySelectorAll("input");

    const handleSubmit = () => {
      let categoryValue = productFilter.value;
      const now = new Date();
      const data = {
        id: createID(),
        status: true,
        img: "../user/assets/image/sanpham/sp1.png",
        category: categoryValue,
        createdAt: now.toLocaleString(),
        updatedAt: now.toLocaleString(),
      };
      inputs.forEach((input) => {
        data[input.name] = input.value;
      });
      mangsp.push(data);
      setListItem(mangsp);
      modal.style.display = "none";
      productPage();
    };

    const submitBtn = document.querySelector(".createModal-accept-btn");
    submitBtn.addEventListener("click", handleSubmit);
  });
  // Detail Btn
  const detailBtn = document.querySelectorAll(".product-detail-btn");
  detailBtn.forEach((e, index) =>
    e.addEventListener("click", () => {
      modal.innerHTML = `
            <div class="createModal">
          <div class="createModal-header">
            <span class="createModal-title">Chi tiết sản phẩm</span>
            <button class="createModal-close-btn"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <div class="product-detail-modal-body">
            <img src=${mangsp[index].img} alt="img">
            <div class="product-detail-modal-info">
              <span><b>Tên sản phẩm: </b><input value="${mangsp[index].name} name="name"/> </span><br>
              <span><b>Giá sản phẩm: </b><input value="${mangsp[index].price}" name="price"/></span><br>
              <span><b>Dung lượng sản phẩm: </b><input value="256GB" name="store"/></span><br>
              <span><b>Danh mục sản phẩm: </b><select name="categories" id="product-filter"></select></span><br>

              <div class="product-detail-modal-btn">
                <button class="product-detail-modal-save-btn">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
    `;
      loadFilter();
      modal.style.display = "block";
      // handle close btn
      const closeBtn = document.querySelector(".createModal-close-btn");
      closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
      });
      // handle category detail
      const category = modal.querySelector("select");
      category.value = mangsp[index].category;
      // handle update product
      const saveBtn = modal.querySelector(".product-detail-modal-save-btn");
      saveBtn.addEventListener("click", () => {
        const inputs = modal.querySelectorAll("input");
        const categoryChange = modal.querySelector("select");
        inputs.forEach((input) => {
          mangsp[index][input.name] = input.value;
        });
        mangsp[index].category = categoryChange.value;
        const now = new Date();
        mangsp[index].updatedAt = now.toLocaleString();
        modal.style.display = "none";
        setListItem(mangsp);
        productPage();
      });
    })
  );
  // Delete Btn
  const deleteBtn = document.querySelectorAll(".product-delete-btn");
  deleteBtn.forEach((e, index) =>
    e.addEventListener("click", () => {
      if (confirm("Bạn có chắc chắn muốn xóa")) {
        mangsp.splice(index, 1);
        setListItem(mangsp);
        productPage();
      }
    })
  );
  // Status Btn
  const statusBtn = document.querySelectorAll(".toggle-wrapper input");
  statusBtn.forEach((e, index) =>
    e.addEventListener("click", () => {
      mangsp[index].status = !mangsp[index].status;
      setListItem(mangsp);
      productPage();
      console.log(mangsp[index]);
    })
  );
}
